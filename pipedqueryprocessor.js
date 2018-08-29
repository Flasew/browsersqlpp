var hash = require('./node_modules/object-hash/dist/object_hash.js');
var _ = require('./node_modules/lodash');
var util = require('./node_modules/util');

/*--------------------------- ENUM OF OPERATOR TYPES ---------------------*/
/**
 * Type of different "from operations" as an enum. Used in the from clause. 
 */
const FROM_OP_TYPES = Object.freeze({
  RANGE:      0,
  COMMA:      1,
  INNERJOIN:  2,
  LEFTJOIN:   3,
  RIGHTJOIN:  4,
  FULLJOIN:   5,
  INNERCORR:  6,
  LEFTCORR:   7,
  FULLCORR:   8,
  INNERFLAT:  9,
  OUTERFLAT:  10,
  RANGEPAIR:  11
});

/**
 * Type of different "select" as an enum. Used in the select clause.
 * Note: SQLSELECT is a syntactic sugar of the element case; during query 
 * execution it will be converted to an "select element" clause.
 */
const SEL_TYPES = Object.freeze({
  ELEMENT:   0,
  ATTRIBUTE: 1,
  SQLSELECT: 2
});

const AGGR_FUNC = Object.freeze(['avg', 'sum', 'max', 'min', 'count']);

const SET_OP_TYPES = Object.freeze({
  UNION:     0,
  INTERSECT: 1,
  EXCEPT:    2
});

/*--------------------------- UTILITY FUNCTIONS --------------------------*/

/**
 * Convert a path expression object to an array object, each element being a
 * name of of the variable in the path (i.e. x.a => ['x', 'a']. 
 * Notice that the input expression must only have "path" 
 * and "variable" expressions in it.
 * @param  {object} pathExpr expression of the path
 * @return {array}           an array equivalent to the path
 */
function pathToArr(pathExpr) {
  var curr = pathExpr;
  var result = [pathExpr.param[1]];

  while (curr.param[0].func !== 'variable') {
    curr = curr.param[0];
    result.unshift(curr.param[1]);
  }

  result.unshift(curr.param[0].param[0]);

  return result;
}

/**
 * Collect all of the output of an iterator to an array. 
 * Precondition: iterator is not opened.
 * Postcondition: iterator is closed.
 * @param  {object} iterator an iterator object
 * @return {array}          all output of the iterator
 */
function collectAll(iterator) {

  iterator.open();

  var result = [];
  var row = iterator.next();

  while (!row.done) {
    result.push(row.value);
    row = iterator.next();
  }

  iterator.close();

  return result;
}

/*--------------------------- EXPRESSIONS --------------------------*/

/**
 * All possible different expressions used in expression query. 
 * The object 'expression' is essentially a library of different expressions,
 * implemented as functions. Called by evalExprQuery in the form of 
 * expression['function_name']
 */
const EXPRESSIONS = {

  /* logical operator */
  eq:  (lhs, rhs) => lhs === rhs,                   // ===
  neq: (lhs, rhs) => lhs !== rhs,                   // !==
  lt:  (lhs, rhs) => lhs < rhs,                     // <
  gt:  (lhs, rhs) => lhs > rhs,                     // >
  lte: (lhs, rhs) => lhs === rhs || lhs < rhs,      // <=
  gte: (lhs, rhs) => lhs === rhs || lhs > rhs,      // >=
  and: (lhs, rhs) => lhs && rhs,                    // &&
  or:  (lhs, rhs) => lhs || rhs,                    // ||
  not: (arg) => !arg,                               // !

  /* arithmetical operator */
  add: (lhs, rhs) => lhs + rhs,
  sub: (lhs, rhs) => lhs - rhs,
  mul: (lhs, rhs) => lhs * rhs,
  div: (lhs, rhs) => lhs / rhs,
  mod: (lhs, rhs) => lhs % rhs,
  neg: arg => -arg,

  /* aggregate operator */
  avg: function(input, envir) {
    // case of dealing with an aggregate function.
    if (Array.isArray(input))
      return (input.reduce((a,b) => a + b, 0)) / (input.length);

    // other wise, the input is of SQL format, deal with the input expression
    // this requires the "group" attribute of the envir argument.
    if (envir.group === undefined) 
      throw {
        name: "BadAggregate",
        massage: "illegal aggregate argument"
      };

    var sum = envir.group.map(item => evalExprQuery(input, item)).reduce((acc, curr) => (acc + curr), 0);
    var cnt = envir.group.length;

    return sum / cnt;
  },

  count: function(input, envir) {

    // case of dealing with an aggregate function.
    if (Array.isArray(input))
      return input.length;

    // other wise, the input is of SQL format, deal with the input expression
    // this requires the "group" attribute of the envir argument.
    if (envir.group === undefined) 
      throw {
        name: "BadAggregate",
        massage: "illegal aggregate argument"
      };

    return envir.group.length;
  },

  min: function(input, envir) {
    if(Array.isArray(input)){
       return (input.reduce((acc, curr) => curr < acc ? curr : acc));
    }

    if (envir.group === undefined) 
      throw {
        name: "BadAggregate",
        massage: "illegal aggregate argument"
      };

    input = JSON.parse(input);

    var mimimum = envir.group.map(item => evalExprQuery(input, item)).reduce((acc, curr) => curr < acc ? curr : acc);

    return mimimum;
  },

  max: function(input, envir) {
    if(Array.isArray(input)) {
      return (input.reduce((acc, curr) => curr > acc ? curr : acc));
    }

    if (envir.group === undefined) 
      throw {
        name: "BadAggregate",
        massage: "illegal aggregate argument"
      };

    input = JSON.parse(input);

    var maximum = envir.group.map(item => evalExprQuery(input, item)).reduce((acc, curr) => curr > acc ? curr : acc);

    return maximum;
  },

  sum: function(input, envir) {

    // case of dealing with an aggregate function.
    if (Array.isArray(input))
      return input.reduce((acc, curr) => acc + curr, 0);

    // other wise, the input is of SQL format, deal with the input expression
    // this requires the "group" attribute of the envir argument.
    if (envir.group === undefined) 
      throw {
        name: "BadAggregate",
        massage: "illegal aggregate argument"
      };

    input = JSON.parse(input);

    return envir.group.map(item => evalExprQuery(input, item)).reduce((acc, curr) => (acc + curr), 0);
  },
  //collection => collection.reduce((a,b) => a + b, 0),

  /* other */

  // retrieve the value of a variable under an environment
  variable: (name, envir) => envir[name],

  // retrieve the value of a variable located by a path 
  path: function(expr, attr, envir) {
    var exprResult = evalExprQuery(expr, envir);
    return exprResult[attr];
  },

  id: i => i, // identity

  // evaluate to the form of {attr: expr}
  obj: function() {
    var result = {};

    for(let i = 0; i < arguments.length - 1; i++){
      result[arguments[i]["attrName"]] = evalExprQuery(arguments[i]["attrVal"], arguments[arguments.length - 1]);
    }

    return result;
  },

  // evaluated to an array of variable in the order of argument
  arr: function() {
    var result = [];

    for(let i = 0; i < arguments.length - 1; i++){
      result[i] = evalExprQuery(arguments[i], arguments[arguments.length - 1]);
    }

    return result;
  },

  // nested SWF query
  sfw: function(query, db) {
    // console.log('nestdb: ', util.inspect(db))
    // console.log('nestq: ', util.inspect(query))
    var result = sfwQuery(db, query);
    // console.log('nest: ', util.inspect(result))
    return result;
  }

};

/**
 * Evaluate an expression query. An expression query is specified as an object
 * in the following format: {func: <string>, param: <array>, isExpr: true}
 * otherwise the expression is treated as an identity and itself will be returned. 
 * For the isExpr objects, it will have a specified function (func) with 
 * parameters given in param as an array; if param also contains an isExpr 
 * object, it will be evaluated recursively. When calling the "func" functions,
 * the environment will always be given as the LAST parameter to func.
 * @param  {object} expr  Expression object, if with an isExpr will be evaluated, otherwise identity returned
 * @param  {object} envir environment for the evaluation, usually binding environment concated with binding tuple
 * @return {object}       result of the evaluation
 */
function evalExprQuery(expr, envir) {

  // identity
  if (expr.isExpr === undefined) 
    return expr;

  expr = Object.assign({}, expr);

  let evaluatedParam = [];

  // evaluate parameters first if they're EXPRESSIONS
  for (let i = 0; i < expr.param.length; i++) 

    if (expr.param[i].isExpr) {
      evaluatedParam[i] = evalExprQuery(expr.param[i], envir);
    }
    else {
      evaluatedParam[i] = expr.param[i];
    }

  let result = EXPRESSIONS[expr.func](...evaluatedParam, envir);

  return result;
}

/*-------------------------------- ITERATORS -----------------------------*/

/**
 * Base abstract operator "class".
 */

// element signaling an iterator is empty.
const DONE_ELEMENT = {value: undefined, done: true};

function AbstractOpertor() {
}

AbstractOpertor.prototype.isOpen = false;

// the base functions check if the iterator has the appropriate state.
AbstractOpertor.prototype.open = function() {
  if (this.isOpen)
    throw {
      name: "InteratorAlreadyOpen",
      message: this.name + ": This iterator is already open."
    };
  this.isOpen = true;
}

AbstractOpertor.prototype.next = function() {
  if (!this.isOpen)
    throw {
      name: "IteratorNotOpen",
      message: this.name + ": This iterator is not opened before next was called."
    };

}

AbstractOpertor.prototype.close = function() {
  if (!this.isOpen)
    throw {
      name: "IteratorNotOpen",
      message: this.name + ": This iterator is not opened before close was called."
    };
  this.isOpen = false;
}

/*
 * For the following operator iterators, the input arguments are:
 * @param {object} envir binding environment
 * @param {object} clause corresponding query clause AST
 * @param {object} input input iterator from preceding operator 
 */

/* ------------------------- FROM CLAUSE --------------------------*/
/**
 * Factory method to make an iterator of the from clause. Returns the correct
 * iterator object corresponding to the from clause.
 * @param  {object} envir  environment binding
 * @param  {object} clause from clause AST
 * @return {object}        corresponding iterator
 */
function makeFromIterator(envir, clause) {
  switch (clause.opType) {
    case FROM_OP_TYPES.RANGE: 
      return new RangeOperator(envir, clause);

    case FROM_OP_TYPES.RANGEPAIR: 
      return new RangePairOperator(envir, clause);

    case FROM_OP_TYPES.INNERCORR: 
    case FROM_OP_TYPES.COMMA: 
    case FROM_OP_TYPES.INNERFLAT: 
      return new CartesianOperator(envir, clause);

    case FROM_OP_TYPES.INNERJOIN:
      return new InnerJoinOperator(envir, clause);

    case FROM_OP_TYPES.LEFTJOIN:
      return new LeftJoinOperator(envir, clause);

    case FROM_OP_TYPES.LEFTCORR: 
    case FROM_OP_TYPES.OUTERFLAT: 
      return new LeftCorrOperator(envir, clause);

    case FROM_OP_TYPES.RIGHTJOIN:
      return new RightJoinOperator(envir, clause);

    case FROM_OP_TYPES.FULLJOIN: 
    case FROM_OP_TYPES.FULLCORR: 
      return new FullJoinOperator(envir, clause);

    default: 
      throw {
        name: "InvalidFromOpType",
        message: "Operator not recognized"
      };
  }
}

/**
 * "range" operator of the from clause. Non-blocking.
 */
function RangeOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

RangeOperator.prototype = Object.create(AbstractOpertor.prototype);
RangeOperator.prototype.constructor = AbstractOpertor;
RangeOperator.prototype.name = 'RangeOperator';

RangeOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.bindFrom = evalExprQuery(this.clause.bindFrom, this.envir);
  // console.log('envir: ', this.envir);
  // console.log('bfrom: ', this.bindFrom);

  if (!Array.isArray(this.bindFrom)) {
    this.bindFrom = [this.bindFrom];
  }

  this.bindTo = this.clause.bindTo;
  this.pos = 0;

  this.pivot = this.clause.at;
  this.pivotIndex = 1;
}

// returns the next tuple in the bindFrom array with the binding name
RangeOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.pos >= this.bindFrom.length)
    return DONE_ELEMENT;

  var currValue = {}; 
  currValue[this.bindTo] = this.bindFrom[this.pos];

  this.pos++;

  if(this.pivot !== undefined){
    currValue[this.pivot] = this.pivotIndex;

    this.pivotIndex++;
  }

  return {
    value: currValue,
    done: false
  };
}

RangeOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/**
 * "range pair" operator of the from clause. Non-blocking.
 */
function RangePairOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

RangePairOperator.prototype = Object.create(AbstractOpertor.prototype);
RangePairOperator.prototype.constructor = AbstractOpertor;
RangePairOperator.prototype.name = 'RangePairOperator';

RangePairOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.bindFrom = evalExprQuery(this.clause.bindFrom, this.envir);

  // check type: should be object, not array
  if (typeof(this.bindFrom) !== 'object' || Array.isArray(this.bindFrom)) {
    throw{
      name: 'NotObject',
      message: 'Not an object'
    };
  }

  this.bindTo = this.clause.bindTo;

  this.attrName = this.clause.bindTo.attrName;
  this.attrVal = this.clause.bindTo.attrVal;

  this.keyArr = Object.keys(this.bindFrom);
  this.posInKeyArr = 0;

}

// returns the next attribute in the bindFrom array with the binding name
RangePairOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.posInKeyArr >= this.keyArr.length) 
    return DONE_ELEMENT;

  var currValue = {}; 

  currValue[this.attrName] = this.keyArr[this.posInKeyArr];
  currValue[this.attrVal] = this.bindFrom[this.keyArr[this.posInKeyArr]];

  this.posInKeyArr++;

  return {
    value: currValue,
    done: false
  };
}

RangePairOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}


/**
 * "Cartesian" operator of the from clause. Non-blocking.
 * Open both the lhs and rhs as iterators. For each tuple of the lhs, 
 * match all the tuple of the rhs in the next() call.
 */
function CartesianOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

CartesianOperator.prototype = Object.create(AbstractOpertor.prototype);
CartesianOperator.prototype.constructor = AbstractOpertor;
CartesianOperator.prototype.name = 'CartesianOperator';

CartesianOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;

  this.finished = false;
}

CartesianOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.finished) return DONE_ELEMENT;

  while (this.rhsTuple.done === true) {

    if (this.rhsIter !== undefined) 
      this.rhsIter.close();

    this.lhsTuple = this.lhsIter.next();

    if (this.lhsTuple.done) {
      this.finished = true;
      this.lhsIter.close();
      return DONE_ELEMENT;
    }

    this.rhsIter = makeFromIterator(
      Object.assign({}, this.envir, this.lhsTuple.value), this.clause.rhs);
    this.rhsIter.open();

    this.rhsTuple = this.rhsIter.next();
  }

  var currValue = Object.assign({}, this.lhsTuple.value, this.rhsTuple.value);

  this.rhsTuple = this.rhsIter.next();

  return {
    value: currValue,
    done: false
  };

}

CartesianOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/**
 * "Inner join" operator of the from clause. Mostly same with the Cartesian 
 * except inner join will assert the "on" condition.
 */
function InnerJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

InnerJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
InnerJoinOperator.prototype.constructor = AbstractOpertor;
InnerJoinOperator.prototype.name = 'InnerJoinOperator';

InnerJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;

  this.finished = false;
}

InnerJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.finished) return DONE_ELEMENT;

  var currValue;
  do {
    while (this.rhsTuple.done) {

      if (this.rhsIter !== undefined) 
        this.rhsIter.close();

      this.lhsTuple = this.lhsIter.next();

      if (this.lhsTuple.done) {
        this.finished = true;
        this.lhsIter.close();
        return DONE_ELEMENT;
      }

      this.rhsIter = makeFromIterator(
        Object.assign({}, this.envir, this.lhsTuple.value), this.clause.rhs);
      this.rhsIter.open();

      this.rhsTuple = this.rhsIter.next();
    }

    currValue = Object.assign({}, this.lhsTuple.value, this.rhsTuple.value);

    this.rhsTuple = this.rhsIter.next();

  } while (!evalExprQuery(this.clause.on, currValue));

  return {
    value: currValue,
    done: false
  };

}

InnerJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/**
 * "Left join" operator of the from clause. Similar to the inner join iterator
 * but for each lhs tuple, record if there was a match after asserting the 
 * 'on' condition for all of the rhs tuples. If none was found, a 'null'
 * will be attached to the attribute provided by the rhs iterator. 
 */
function LeftJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

LeftJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
LeftJoinOperator.prototype.constructor = AbstractOpertor;
LeftJoinOperator.prototype.name = 'LeftJoinOperator';

LeftJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;

  this.matched = true;
  this.finished = false;
}

LeftJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.finished) return DONE_ELEMENT;

  var currValue;
  var unmatchedReturn = false;

  do {
    // check if RHS is empty. if so, advance LHS to match the 
    // next tuple. If LHS is also empty, we're done.
    while (this.rhsTuple.done) {

      if (this.rhsIter !== undefined) 
        this.rhsIter.close();

      // if no match for the LHS variable was found, 
      // add a null as the RHS bindto result.
      if (!this.matched) {
        currValue = Object.assign({}, this.lhsTuple.value);
        currValue[this.clause.rhs.bindTo] = null;
        unmatchedReturn = true;
      }
  
      // advance lhsTuple and rhsTuple to the first of each iterator
      this.lhsTuple = this.lhsIter.next();
      this.matched = false;

      if (this.lhsTuple.done === true) {
        this.finished = true;
        this.lhsIter.close();
        return unmatchedReturn ? {value: currValue, done: false} : DONE_ELEMENT;
      }

      this.rhsIter = makeFromIterator(
        Object.assign({}, this.envir, this.lhsTuple.value), this.clause.rhs);
      this.rhsIter.open();

      this.rhsTuple = this.rhsIter.next();
    }

    if (unmatchedReturn) 
      return  {
        value: currValue,
        done: false
      };

    currValue = Object.assign({}, this.lhsTuple.value, this.rhsTuple.value);

    this.rhsTuple = this.rhsIter.next();

  } while (!evalExprQuery(this.clause.on, currValue));

  this.matched = true;

  return {
    value: currValue,
    done: false
  };

}

LeftJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/**
 * "Left Correlate" operator of the from clause. Similar to left join, add null
 * to rhs if rhs returns empty.
 */
function LeftCorrOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

LeftCorrOperator.prototype = Object.create(AbstractOpertor.prototype);
LeftCorrOperator.prototype.constructor = AbstractOpertor;
LeftCorrOperator.prototype.name = 'LeftCorrOperator';

LeftCorrOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);

  this.lhsIter.open();
  this.lhsTuple = this.lhsIter.next();
  // console.log('lhsT: ', util.inspect(this.lhsTuple));

  if (this.lhsTuple.done) {
    this.lhsIter.close();
    this.finished = true;
    return;
  }

  this.finished = false;
  this.rhsIter = makeFromIterator(
    Object.assign({}, this.envir, this.lhsTuple.value), this.clause.rhs);
  this.rhsIter.open();
  this.rhsTuple = this.rhsIter.next();
  // console.log('rhs: ', util.inspect(this.clause.rhs));
  // console.log('rhst: ', util.inspect(this.rhsTuple));

  this.matched = false;
}

LeftCorrOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.finished) return DONE_ELEMENT;

  var unmatchedReturn = undefined;

  if (this.rhsTuple.done) {

    this.rhsIter.close();

    if (!this.matched) {
      currValue = Object.assign({}, this.lhsTuple.value);
      currValue[this.clause.rhs.bindTo] = null;
      unmatchedReturn = {
        value: currValue,
        done: false
      };
    }

    // advance lhsTuple and rhsTuple to the first of each iterator
    this.lhsTuple = this.lhsIter.next();
    this.matched = false;

    if (this.lhsTuple.done) {
      this.finished = true;
      this.lhsIter.close();
      return DONE_ELEMENT;
    }

    this.rhsIter = makeFromIterator(
      Object.assign({}, this.envir, this.lhsTuple.value), this.clause.rhs);
    this.rhsIter.open();

    this.rhsTuple = this.rhsIter.next();

    // if rhsIterator gives empty, returns the empty case of RHS = null
    if (this.rhsTuple.done) {
      currValue = Object.assign({}, this.lhsTuple.value);
      currValue[this.clause.rhs.bindTo] = null;
      this.matched = true;
      return {
        value: currValue,
        done: false
      };
    }
    if (unmatchedReturn != undefined) return unmatchedReturn;
  }

  currValue = Object.assign({}, this.lhsTuple.value, this.rhsTuple.value);
  this.matched = true;
  this.rhsTuple = this.rhsIter.next();

  return {
    value: currValue,
    done: false
  };

}

LeftCorrOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/**
 * "Right join" operator of the from clause. just flip lhs and rhs of left join
 */
function RightJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

RightJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
RightJoinOperator.prototype.constructor = AbstractOpertor;
RightJoinOperator.prototype.name = 'RightJoinOperator';

RightJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.rhsIter = makeFromIterator(this.envir, this.clause.rhs);
  this.lhsIter = undefined;

  this.rhsIter.open();
  this.rhsTuple = undefined;
  this.lhsTuple = DONE_ELEMENT;

  this.matched = true;
  this.finished = false;
}

RightJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.finished) return DONE_ELEMENT;

  var currValue;
  var unmatchedReturn = false;

  do {
    // check if lhs is empty. if so, advance rhs to match the 
    // next tuple. If rhs is also empty, we're done.
    while (this.lhsTuple.done) {

      if (this.lhsIter !== undefined) 
        this.lhsIter.close();

      // if no match for the rhs variable was found, 
      // add a null as the lhs bindto result.
      if (!this.matched) {
        currValue = Object.assign({}, this.rhsTuple.value);
        currValue[this.clause.lhs.bindTo] = null;
        unmatchedReturn = true;
      }
  
      // advance rhsTuple and lhsTuple to the first of each iterator
      this.rhsTuple = this.rhsIter.next();
      this.matched = false;

      if (this.rhsTuple.done === true) {
        this.finished = true;
        this.rhsIter.close();
        return unmatchedReturn ? {value: currValue, done: false} : DONE_ELEMENT;
      }

      this.lhsIter = makeFromIterator(
        Object.assign({}, this.envir, this.rhsTuple.value), this.clause.lhs);
      this.lhsIter.open();

      this.lhsTuple = this.lhsIter.next();
    }

    if (unmatchedReturn) 
      return  {
        value: currValue,
        done: false
      };

    currValue = Object.assign({}, this.rhsTuple.value, this.lhsTuple.value);

    this.lhsTuple = this.lhsIter.next();

  } while (!evalExprQuery(this.clause.on, currValue));

  this.matched = true;

  return {
    value: currValue,
    done: false
  };

}

RightJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/**
 * "Full join" operator of the from clause
 * Blocking Operator, do the good old boolean array full join first and then
 * use pos to gather the return values used for next.
 */
function FullJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

FullJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
FullJoinOperator.prototype.constructor = AbstractOpertor;
FullJoinOperator.prototype.name = 'FullJoinOperator';

FullJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.result = [];
  this.pos = 0;

  var lhsBuff = collectAll(makeFromIterator(this.envir, this.clause.lhs));
  var rhsBuff = collectAll(makeFromIterator(this.envir, this.clause.rhs));

  let leftincluded = Array(lhsBuff.length).fill(false);
  let rightincluded = Array(rhsBuff.length).fill(false);

  for (let i = 0; i < lhsBuff.length; i++) {
    for (let j = 0; j < rhsBuff.length; j++) {
      
      let newTuple = Object.assign({}, lhsBuff[i], rhsBuff[j]);

      if (evalExprQuery(this.clause.on, newTuple)) {
        this.result.push(newTuple);
        leftincluded[i] = true;
        rightincluded[j] = true;
      }
    }
  }

  for (let i = 0; i < leftincluded.length; i++) {

    if (!leftincluded[i]) {
      let newTuple = Object.assign({}, lhsBuff[i]);
      for (let attr in rhsBuff[0]) 
        newTuple[attr] = null;
      this.result.push(newTuple);
    }

  }

  for (let i = 0; i < rightincluded.length; i++) {

    if (!rightincluded[i]) {
      let newTuple = Object.assign({}, rhsBuff[i]);

      for (let attr in lhsBuff[0]) 
        newTuple[attr] = null;
      
      this.result.push(newTuple);
    }

  }
}

FullJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.pos < this.result.length) {
    return  {
      value: this.result[this.pos++],
      done: false
    };
  }

  return DONE_ELEMENT;
}

FullJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/*-------------------------- EXPRESSIONS --------------------------*/

/**
 * Iterator for expression queries. For each tuple in the input iterator, 
 * evaluate clause and return.
 */
function FilterOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

FilterOperator.prototype = Object.create(AbstractOpertor.prototype);
FilterOperator.prototype.constructor = AbstractOpertor;
FilterOperator.prototype.name = 'FilterOperator';

FilterOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  this.input.open();
}

FilterOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var result;

  do {
    result = this.input.next();

    if (result.done) 
      return DONE_ELEMENT;

  } while (!evalExprQuery(this.clause, Object.assign({}, this.envir, result.value)));

  return {
    value: result.value,
    done: false
  }; 
}

FilterOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- GROUP BY CLAUSE --------------------------*/
/**
 * "Group By" operator. Build the hashtable on the all the result of input (blocking),
 * but each return tuple is computed on-the-go.
 */
function GroupbyOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

GroupbyOperator.prototype = Object.create(AbstractOpertor.prototype);
GroupbyOperator.prototype.constructor = AbstractOpertor;
GroupbyOperator.prototype.name = 'GroupbyOperator';

GroupbyOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();
  this.map = {};

  var currItem = this.input.next();

  while(!currItem.done){
    var groupby = {};

    for (let j = 0; j < this.clause.length; j++) {
      if (this.clause[j].as === undefined) {

        let pathArr = pathToArr(this.clause[j].expr);
        let curr = groupby;

        while (pathArr.length > 1) {
          if (curr[pathArr[0]] === undefined) {
            curr[pathArr[0]] = {};
          }
          curr = curr[pathArr[0]];
          pathArr.shift();
        }

        curr[pathArr[0]] = evalExprQuery(this.clause[j].expr, currItem.value);
      }

      else {
        groupby[this.clause[j].as] = evalExprQuery(this.clause[j].expr, currItem.value);
      }
    }

    var hashed = hash(groupby);

    if (this.map[hashed] !== undefined) {
      var found = false;

      for (let k = 0; k < this.map[hashed].length; k++){
        if (_.isEqual(this.map[hashed][k].key, groupby)) {
          this.map[hashed][k].group.push(currItem.value);
          found = true;
          break;
        }
      }
      
      if(!found){
        this.map[hashed].push({key: groupby, group: [currItem.value]});
      }
    }

    else {
      this.map[hashed] = [{key: groupby, group: [currItem.value]}];
    }

    currItem = this.input.next();
  }

  this.keyArr = Object.keys(this.map);
  this.posInKeyArr = 0;
  this.posInKey = 0;

}

GroupbyOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.posInKey >= this.map[this.keyArr[this.posInKeyArr]].length) {
    this.posInKeyArr++;
    this.posInKey = 0;
  }

  if (this.posInKeyArr >= this.keyArr.length)
    return DONE_ELEMENT;

  var currValue = 
    Object.assign({}, this.map[this.keyArr[this.posInKeyArr]][this.posInKey].key);
  currValue["group"] = this.map[this.keyArr[this.posInKeyArr]][this.posInKey].group;

  this.posInKey++;

  return {
    value: currValue,
    done: false
  };

}

GroupbyOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- ORDER BY CLAUSE --------------------------*/
/**
 * "Order By" operator. Do a sort on collected output of input iterator.
 * Has blocking nature.
 */
function OrderbyOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

OrderbyOperator.prototype = Object.create(AbstractOpertor.prototype);
OrderbyOperator.prototype.constructor = AbstractOpertor;
OrderbyOperator.prototype.name = 'OrderbyOperator';

OrderbyOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  var unorderedArr = collectAll(input);

  var orderby_clause = this.clause;
  var environment = this.envir;

  // construct the comparison function. 
  var comp = function(t1, t2) {

    for (let condition of orderby_clause) {
      // case of equal: go to the next condition
      let t1res = evalExprQuery(condition.expr, Object.assign({}, t1, environment));
      let t2res = evalExprQuery(condition.expr, Object.assign({}, t2, environment));

      if (t1res === t2res) {
        continue;
      }

      // order
      return condition.asc ? ((t1res < t2res) ? -1 : 1) : ((t1res > t2res) ? -1 : 1);

    }

    return 0;
  };

  this.sortedArr = unorderedArr.sort(comp);

  this.pos = 0;
}

OrderbyOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.pos >= this.sortedArr.length){
    return DONE_ELEMENT;
  }

  var currValue = this.sortedArr[this.pos];

  this.pos++;

  return {
    value: currValue,
    done: false
  };
}

OrderbyOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/*-------------------------- OFFSET CLAUSE --------------------------*/
/**
 * "OFFSET" operator. Skip the first specified number of tuples on open.
 */
function OffsetOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;

  AbstractOpertor.call(this);
  return this;
}

OffsetOperator.prototype = Object.create(AbstractOpertor.prototype);
OffsetOperator.prototype.constructor = AbstractOpertor;
OffsetOperator.prototype.name = 'OffsetOperator';

OffsetOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();
  this.finished = false;

  var offset = evalExprQuery(this.clause, this.envir);
  var skipped = 0;

  while(skipped < offset){
    var currItem = this.input.next();

    if (!currItem.done) {
      this.finished = true;
      break;
    }

    skipped++;
  }
}

OffsetOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.finished)
    return DONE_ELEMENT;

  var currItem = this.input.next();

  if(currItem.done)
    return DONE_ELEMENT;

  return {
    value: currItem.value,
    done: false
  };

}

OffsetOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- LIMIT CLAUSE --------------------------*/
/**
 * "LIMIT" operator. Count only output specified number of tuples and then 
 * gives DONE_ELEMENT.
 */
function LimitOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

LimitOperator.prototype = Object.create(AbstractOpertor.prototype);
LimitOperator.prototype.constructor = AbstractOpertor;
LimitOperator.prototype.name = 'LimitOperator';

LimitOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();
  this.count = 0;
  this.limit = evalExprQuery(this.clause, this.envir);
}

LimitOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.count >= this.limit)
    return DONE_ELEMENT;
  
  var currItem = this.input.next();

  if(currItem.done)
    return DONE_ELEMENT;

  this.count++;

  return {
    value: currItem.value,
    done: false
  };
}

LimitOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- SELECT CLAUSE --------------------------*/
/**
 * select iterator factory
 */
function makeSelectIterator(envir, clause, input) {
  switch (clause.selectType) {
    case SEL_TYPES.ELEMENT: 
    case SEL_TYPES.SQLSELECT:
      return new SelectElementOperator(envir, clause, input);

    case SEL_TYPES.ATTRIBUTE: 
      return new SelectAttrOperator(envir, clause, input);

    default: 
      throw {
        name: "InvalidSelOpType",
        message: "Select operator not recognized"
      };
  }
}
/**
 * "Select element" operator, mostly similar to the projection operator in 
 * relational algebra. If the input operator is a SQL type of select, 
 * convert it to the equivalent Select Element clause first.
 */
function SelectElementOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

SelectElementOperator.prototype = Object.create(AbstractOpertor.prototype);
SelectElementOperator.prototype.constructor = AbstractOpertor;
SelectElementOperator.prototype.name = 'SelectElementOperator';

SelectElementOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  // check if the type was select. if so, convert to the sel element clause
  if (this.clause.selectType === SEL_TYPES.SQLSELECT) {

    var elementReconstruct = {
      selectType: 0,
      selectExpr: {
        func: 'obj',
        param: [],
        isExpr: true
      }
    };

    for(let item of this.clause.selectPairs) {
      if(item.as === undefined){
        let lastElementIndex = item.from.param.length - 1;

        item.as = item.from.param[lastElementIndex];
      }

      let newObj = {};
      newObj.attrName = item.as;
      newObj.attrVal = item.from;

      elementReconstruct.selectExpr.param.push(newObj);
    }

    this.clause = elementReconstruct;
  }

  this.input.open();
}

SelectElementOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var currItem = this.input.next();

  if (currItem.done) 
    return DONE_ELEMENT;
  else {
    // console.log("expr: ", this.clause.selectExpr)
    // console.log('assobj: ', Object.assign({}, this.envir))
    // console.log('evalres: ', evalExprQuery(this.clause.selectExpr, Object.assign({}, this.envir, currItem.value)))
    return {
      value: evalExprQuery(this.clause.selectExpr, Object.assign({}, this.envir, currItem.value)),
      done: false
    }; 
  }
}

SelectElementOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/**
 * Select attribute operator. This operator is special in a sense that it is 
 * blocking and is guaranteed to return only one valid output in the next 
 * method, which is an object as specified by the query clause. 
 */
function SelectAttrOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

SelectAttrOperator.prototype = Object.create(AbstractOpertor.prototype);
SelectAttrOperator.prototype.constructor = AbstractOpertor;
SelectAttrOperator.prototype.name = 'SelectAttrOperator';

SelectAttrOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();
  this.result = {};

  var currItem = this.input.next();

  while (!currItem.done) {
    let attrName = 
      evalExprQuery(this.clause.selectAttrName, Object.assign({}, this.envir, currItem.value));

    if(typeof(attrName) !== 'string'){
      throw {
        name: 'AttributeNameNotString',
        message: 'Attribute name evaluated to something that\'s not a string'
      };
    }

    let attrVal = evalExprQuery(this.clause.selectAttrVal, Object.assign({}, this.envir, currItem.value));

    this.result[attrName] = attrVal;
    currItem = this.input.next();
  }

  this.finished = false;
  
}

SelectAttrOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.finished) 
    return DONE_ELEMENT;
  else {
    this.finished = true;
    return {
      value: this.result,
      done: false
    }; 
  }
}

SelectAttrOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*----------------------- SFW ROOT ITERATOR ------------------------*/

/** 
 * The SFW root iterator creates a pipeline structures of all of the iterators
 * required to finish the query clause. it iterates through the final output 
 * of the query.
 */
function SFWRootIterator(envir, query) {
  this.query = query;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

SFWRootIterator.prototype = Object.create(AbstractOpertor.prototype);
SFWRootIterator.prototype.constructor = AbstractOpertor;
SFWRootIterator.prototype.name = 'SFWRootIterator';

SFWRootIterator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  var prevIter = makeFromIterator(this.envir, this.query.from_clause);;

  if (this.query.where_clause !== null && this.query.where_clause !== undefined) {
    prevIter = 
      new FilterOperator(this.envir, this.query.where_clause, prevIter);
  }

  if (this.query.groupby_clause !== null && this.query.groupby_clause !== undefined) {
    prevIter = 
      new GroupbyOperator(this.envir, this.query.groupby_clause, prevIter);
  }
  
  if (this.query.having_clause !== null && this.query.having_clause !== undefined) {
    if (this.query.groupby_clause === null || this.query.groupby_clause === undefined) {
      throw {
        name: 'InvalidHavingClause',
        message: 'cannot use a having clause without a group by clause'
      };
    }
    prevIter = 
      new FilterOperator(this.envir, this.query.having_clause, prevIter);
  }

  if (this.query.orderby_clause !== null && this.query.orderby_clause !== undefined) {
    prevIter = 
      new OrderbyOperator(this.envir, this.query.orderby_clause, prevIter);
  }

  if (this.query.offset_clause !== null && this.query.offset_clause !== undefined) {
    prevIter = 
      new OffsetOperator(this.envir, this.query.offset_clause, prevIter);
  }

  if (this.query.limit_clause !== null && this.query.limit_clause !== undefined) {
    prevIter = 
      new LimitOperator(this.envir, this.query.limit_clause, prevIter);
  }

  this.finalIter = makeSelectIterator(this.envir, this.query.select_clause, prevIter);
  
  // have fun :)
  this.finalIter.open();
}

SFWRootIterator.prototype.next = function() {
  this.constructor.prototype.next.call(this);
  return this.finalIter.next();;
}

SFWRootIterator.prototype.close = function() {
  this.finalIter.close();
  this.constructor.prototype.close.call(this);
}

/**
 * Evaluate an SFW (select-from-where) query.
 * @param  {object} db    raw database parsed to javascript object (NOT JSON)
 * @param  {object} query Parsed query clause, in the format specified in readme.
 * @return {object}       result of query, in javascript object (NOT JSON)
 */
function sfwQuery(database, query) {

  var result = collectAll(new SFWRootIterator(database, query));

  if (query.select_clause.selectType === 1) {
    return result[0];
  }

  return result;
}

/**
 * Evaluate a general query
 */
function evalQuery(db, query) {

  if (query.from_clause !== undefined)
    return sfwQuery(db, query);

  return evalExprQuery(query, db);
    
}

exports.evalQuery = evalQuery;
