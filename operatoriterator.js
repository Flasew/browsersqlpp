var hash = require('./node_modules/object-hash/dist/object_hash.js');
var _ = require('./node_modules/underscore/underscore.js');

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
    // console.log("SUBQUERY");
    // console.log("query: ");
    // console.log(query);
    // console.log("db: ");
    // console.log(db);
    var result = sfwQuery(db, query);
    // console.log("Sub-query result: ");
    // console.log(result);
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

  // console.log("Function name: " + expr.func);
  // console.log("Parameters: ");
  // console.log(expr.param);
  // console.log("envir: ")
  // console.log(envir)

  let evaluatedParam = [];
  // evaluate parameters first if they're EXPRESSIONS
  for (let i = 0; i < expr.param.length; i++) 

    if (expr.param[i].isExpr) {
      // console.log("expr.param before: ")
      // console.log(expr.param[i])
      evaluatedParam[i] = evalExprQuery(expr.param[i], envir);
      // console.log("expr.param after: ")
      // console.log(expr.param[i])
    }
    else {
      evaluatedParam[i] = expr.param[i];
    }

  //console.log(evaluatedParam);

  let result = EXPRESSIONS[expr.func](...evaluatedParam, envir);
  // console.log("Eval result: ");
  // console.log(result);
  return result;
}

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
 * Base abstract operator "class".
 */

const DONE_ELEMENT = {value: undefined, done: true};

function AbstractOpertor() {
}

AbstractOpertor.prototype.isOpen = false;

AbstractOpertor.prototype.open = function() {
  if (this.isOpen)
    throw {
      name: "InteratorAlreadyOpen",
      message: "This iterator is already open."
    };
  this.isOpen = true;
}

AbstractOpertor.prototype.next = function() {
  if (!this.isOpen)
    throw {
      name: "IteratorNotOpen",
      message: "This iterator is not opened before next was called."
    };

}

AbstractOpertor.prototype.close = function() {
  if (!this.isOpen)
    throw {
      name: "IteratorNotOpen",
      message: "This iterator is not opened before close was called."
    };
  this.isOpen = false;
}


/* ------------------------- FROM CLAUSE --------------------------*/
/**
 * from item iterator factory
 */
function makeFromIterator(envir, clause) {
  switch (clause.opType) {
    case 0: 
      return new RangeOperator(envir, clause);

    case 11: 
      return new RangePairOperator(envir, clause);

    case 1: 
    case 6: 
    case 9: 
      return new CartesianOperator(envir, clause);

    case 2:
      return new InnerJoinOperator(envir, clause);

    case 3:
      return new LeftJoinOperator(envir, clause);

    case 7: 
    case 10: 
      return new LeftCorrOperator(envir, clause);

    case 4:
      return new RightJoinOperator(envir, clause);

    case 5: 
    case 8: 
      return new FullJoinOperator(envir, clause);

    default: 
      throw {
        name: "InvalidFromOpType",
        message: "Operator not recognized"
      };
  }
}

/**
 * "range" operator of the from clause
 */
function RangeOperator(envir, /*input,*/ clause) {
  this.clause = clause;
  this.envir = envir;
  // this.input = input;
  AbstractOpertor.call(this);
  return this;
}

RangeOperator.prototype = Object.create(AbstractOpertor.prototype);
RangeOperator.prototype.constructor = AbstractOpertor;

RangeOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  // this.input.open();

  console.log(this.clause);
  console.log(this.envir);
  this.bindFrom = evalExprQuery(this.clause.bindFrom, this.envir);
  console.log("bindFrom is:");
  console.log(this.bindFrom);

  if (!Array.isArray(this.bindFrom)) {
    this.bindFrom = [this.bindFrom];
  }

  this.bindTo = this.clause.bindTo;
  this.pos = 0;

  // this.currBindTuple = this.input.next();

  this.pivot = this.clause.at;
  this.pivotIndex = 1;
}

RangeOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.pos >= this.bindFrom.length)//{
    // this.currBindTuple = this.input.next();
    // this.pos = 0;
  // }

  // if(this.currBindTuple.done === true){
    return DONE_ELEMENT;
  // }

  var currValue = {}; //Object.assign({}, this.currBindTuple.value);
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
  // this.input.close();
  this.constructor.prototype.close.call(this);
}

/**
 * "range pair" operator of the from clause
 */
function RangePairOperator(envir, /*input,*/ clause) {
  this.clause = clause;
  this.envir = envir;
  // this.input = input;
  AbstractOpertor.call(this);
  return this;
}

RangePairOperator.prototype = Object.create(AbstractOpertor.prototype);
RangePairOperator.prototype.constructor = AbstractOpertor;

RangePairOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  // this.input.open();

  this.bindFrom = evalExprQuery(this.clause.bindFrom, this.envir);

  //check type: should be object, not array
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

  // this.currBindTuple = this.input.next();
}

RangePairOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.posInKeyArr >= this.keyArr.length) // {
  //   this.currBindTuple = this.input.next();
  //   this.posInKeyArr = 0;
  // }

  // if(this.currBindTuple.done === true){
    return DONE_ELEMENT;
  // }

  var currValue = {}; // Object.assign({}, this.currBindTuple.value);

  currValue[this.attrName] = this.keyArr[this.posInKeyArr];
  currValue[this.attrVal] = this.bindFrom[this.keyArr[this.posInKeyArr]];

  this.posInKeyArr++;

  return {
    value: currValue,
    done: false
  };
}

RangePairOperator.prototype.close = function() {
  // this.input.close();
  this.constructor.prototype.close.call(this);
}


/**
 * "Cartesian" operator of the from clause
 */
function CartesianOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

CartesianOperator.prototype = Object.create(AbstractOpertor.prototype);
CartesianOperator.prototype.constructor = AbstractOpertor;

CartesianOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;
}

CartesianOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  while (this.rhsTuple.done === true) {

    if (this.rhsIter !== undefined) 
      this.rhsIter.close();

    this.lhsTuple = this.lhsIter.next();

    if (this.lhsTuple.done === true) {
      this.lhsIter.close();
      return DONE_ELEMENT;
    }

    this.rhsIter = makeFromIterator(
      Object.assign({}, this.lhsTuple.value, this.envir), this.clause.rhs);
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
 * "Inner join" operator of the from clause
 */
function InnerJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

InnerJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
InnerJoinOperator.prototype.constructor = AbstractOpertor;

InnerJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;
}

InnerJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var currValue;
  do {

    while (this.rhsTuple.done === true) {

      if (this.rhsIter !== undefined) 
        this.rhsIter.close();

      this.lhsTuple = this.lhsIter.next();

      if (this.lhsTuple.done === true) {
        this.lhsIter.close();
        return DONE_ELEMENT;
      }

      this.rhsIter = makeFromIterator(
        Object.assign({}, this.lhsTuple.value, this.envir), this.clause.rhs);
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
 * "Left join" operator of the from clause
 */
function LeftJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

LeftJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
LeftJoinOperator.prototype.constructor = AbstractOpertor;

LeftJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;

  this.matched = true;
}

LeftJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var currValue;
  var unmatchedReturn = false;

  do {
    // check if RHS is empty. if so, advance LHS to match the 
    // next tuple. If LHS is also empty, we're done.
    while (this.rhsTuple.done === true) {

      if (this.rhsIter !== undefined) 
        this.rhsIter.close();

      // if no match for the LHS variable was found, 
      // add a null as the RHS bindto result.
      if (this.matched === false) {
        currValue = Object.assign({}, this.lhsTuple.value);
        currValue[this.clause.rhs.bindTo] = null;
        unmatchedReturn = true;
      }
  
      // advance lhsTuple and rhsTuple to the first of each iterator
      this.lhsTuple = this.lhsIter.next();
      this.matched = false;

      if (this.lhsTuple.done === true) {
        this.lhsIter.close();
        return DONE_ELEMENT;
      }

      this.rhsIter = makeFromIterator(
        Object.assign({}, this.lhsTuple.value, this.envir), this.clause.rhs);
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
 * "Left Correlate" operator of the from clause
 */
function LeftCorrOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

LeftCorrOperator.prototype = Object.create(AbstractOpertor.prototype);
LeftCorrOperator.prototype.constructor = AbstractOpertor;

LeftCorrOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.rhsIter = undefined;

  this.lhsIter.open();
  this.lhsTuple = undefined;
  this.rhsTuple = DONE_ELEMENT;

  this.matched = true;
}

LeftCorrOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var currValue;

  if (this.rhsTuple.done === true) {

    if (this.rhsIter !== undefined) 
      this.rhsIter.close();

    // advance lhsTuple and rhsTuple to the first of each iterator
    this.lhsTuple = this.lhsIter.next();
    this.matched = false;

    if (this.lhsTuple.done === true) {
      this.lhsIter.close();
      return DONE_ELEMENT;
    }

    this.rhsIter = makeFromIterator(
      Object.assign({}, this.lhsTuple.value, this.envir), this.clause.rhs);
    this.rhsIter.open();

    this.rhsTuple = this.rhsIter.next();

    // if rhsIterator gives empty, returns the empty case of RHS = null
    if (this.rhsTuple.done === true) {
      currValue = Object.assign({}, this.lhsTuple.value);
      currValue[this.clause.rhs.bindTo] = null;
      return {
        value: currValue,
        done: false
      };
    }

  }

  currValue = Object.assign({}, this.lhsTuple.value, this.rhsTuple.value);

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
 * "Right join" operator of the from clause
 */
function RightJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

RightJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
RightJoinOperator.prototype.constructor = AbstractOpertor;

RightJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.rhsIter = makeFromIterator(this.envir, this.clause.rhs);
  this.lhsIter = undefined;

  this.rhsIter.open();
  this.rhsTuple = undefined;
  this.lhsTuple = DONE_ELEMENT;

  this.matched = true;
}

RightJoinOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var currValue;
  var unmatchedReturn = false;

  do {
    // check if RHS is empty. if so, advance LHS to match the 
    // next tuple. If LHS is also empty, we're done.
    while (this.lhsTuple.done === true) {

      if (this.lhsIter !== undefined) 
        this.lhsIter.close();

      // if no match for the LHS variable was found, 
      // add a null as the RHS bindto result.
      if (this.matched === false) {
        currValue = Object.assign({}, this.rhsTuple.value);
        currValue[this.clause.lhs.bindTo] = null;
        unmatchedReturn = true;
      }
  
      // advance rhsTuple and lhsTuple to the first of each iterator
      this.rhsTuple = this.rhsIter.next();
      this.matched = false;

      if (this.rhsTuple.done === true) {
        this.rhsIter.close();
        return DONE_ELEMENT;
      }

      this.lhsIter = makeFromIterator(
        Object.assign({}, this.rhsTuple.value, this.envir), this.clause.lhs);
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
 * Blocking Operator
 */
function FullJoinOperator(envir, clause) {
  this.clause = clause;
  this.envir = envir;
  this.result = [];
  this.pos = 0;
  AbstractOpertor.call(this);
  return this;
}

FullJoinOperator.prototype = Object.create(AbstractOpertor.prototype);
FullJoinOperator.prototype.constructor = AbstractOpertor;

FullJoinOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  var lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  lhsIter.open();

  var lhsBuff = [];

  var currTuple = lhsIter.next();

  while(!currTuple.done){
    lhsBuff.push(currTuple.value);

    currTuple = lhsIter.next();
  }

  lhsIter.close();

  var rhsIter = makeFromIterator(this.envir, this.clause.rhs);
  rhsIter.open();

  var rhsBuff = [];

  currTuple = rhsIter.next();

  while(!currTuple.done){
    rhsBuff.push(currTuple.value);

    currTuple = rhsIter.next();
  }

  rhsIter.close();


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

  var currValue;

  if(this.pos < this.result.length){
    currValue = {
      value: this.result[this.pos],
      done: false
    };
  }
  else{
    currValue = DONE_ELEMENT;
  }

  this.pos++;

  return currValue;
}

FullJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/*-------------------------- EXPRESSIONS --------------------------*/

/**
 * Iterator for expression queries
 */
function ExpressionIterator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

ExpressionIterator.prototype = Object.create(AbstractOpertor.prototype);
ExpressionIterator.prototype.constructor = AbstractOpertor;

ExpressionIterator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  this.input.open();
}

ExpressionIterator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  var result = this.input.next();

  if (result.done) 
    return DONE_ELEMENT;
  else 
    return {
      value: evalExprQuery(this.clause, Object.assign({}, result.value, this.envir)),
      done: false
    }; 
}

ExpressionIterator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- GROUP BY CLAUSE --------------------------*/
/**
 * "Group By" operator
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

GroupbyOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();

  this.result = [];
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

  this.keyArr = Object.keys(hashKey);
  this.posInKeyArr = 0;
  this.posInKey = 0;

  // console.log(this.map);
  // for (let hashKey in this.map) {
  //   for(let i = 0; i < this.map[hashKey].length; i++){
  //     let item = Object.assign({}, this.map[hashKey][i].key);
  //     item["group"] = this.map[hashKey][i].group;

  //     this.result.push(item);
  //   }
  // }

}

GroupbyOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if (this.posInKey >= this.keyArr[this.posInKeyArr].length) {
    this.posInKeyArr++;
    this.posInKey = 0;
  }

  if (this.posInKeyArr >= this.keyArr.length)
    return DONE_ELEMENT;
  
  var currValue = 
    Object.assign({}, this.map[this.keyArr[this.posInKeyArr]][this.posInKey].key);
  currValuei["group"] = this.map[hashKey][i].group;

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
 * "Order By" operator
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

OrderbyOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();

  var unorderedArr = [];
  var currItem = this.input.next();

  while(!currItem.done){
    unorderedArr.push(currItem.value);

    currItem = this.input.next();
  }

  // construct the comparison function. 
  var comp = function(t1, t2) {

    for (let condition of this.clause) {

      // case of equal: go to the next condition
      let t1res = evalExprQuery(condition.expr, Object.assign({}, t1, this.envir));
      let t2res = evalExprQuery(condition.expr, Object.assign({}, t2, this.envir));

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

  if(this.pos >= this.sortedArr){
    return DONE_ELEMENT;
  }

  var currValue = this.sortedArr[this.pos];

  this.pos++;

  return {
    value: currValue,
    done: false
  };
}

OrderByOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- OFFSET CLAUSE --------------------------*/
/**
 * "OFFSET" operator
 */
function OffsetOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  this.finished = false;
  AbstractOpertor.call(this);
  return this;
}

OffsetOperator.prototype = Object.create(AbstractOpertor.prototype);
OffsetOperator.prototype.constructor = AbstractOpertor;

OffsetOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();

  var offset = evalExprQuery(this.clause, this.envir);
  var skipped = 0;

  while(skipped < offset){
    var currItem = this.input.next();

    if(!currItem.done){
      this.finished = true;
      break;
    }

    skipped++;
  }
}

OffsetOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.finished){
    return DONE_ELEMENT;
  }

  var currItem = this.input.next();

  if(!currItem.done){
    return DONE_ELEMENT;
  }

  var currValue = currItem.value;

  return {
    value: currValue,
    done: false
  };
}

OffsetOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}

/*-------------------------- LIMIT CLAUSE --------------------------*/
/**
 * "LIMIT" operator
 */
function LimitOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  this.count = 0;
  AbstractOpertor.call(this);
  return this;
}

LimitOperator.prototype = Object.create(AbstractOpertor.prototype);
LimitOperator.prototype.constructor = AbstractOpertor;

LimitOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();

  this.limit = evalExprQuery(this.clause, this.envir);
}

LimitOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

  if(this.count >= this.limit){
    return DONE_ELEMENT;
  }

  var currItem = this.input.next();

  if(!currItem.done){
    return DONE_ELEMENT;
  }

  var currValue = currItem.value;

  this.count++;

  return {
    value: currValue,
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
    case 0: 
    case 2:
      return new SelectElementOperator(envir, clause, input);

    case 1: 
      return new SelectAttrOperator(envir, clause, input);

    default: 
      throw {
        name: "InvalidSelOpType",
        message: "Select operator not recognized"
      };
  }
}
/**
 * "Select" operator, mostly similar to the projection operator in 
 * relational algebra.
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

SelectElementOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  // check if the type was select. if so, convert to the sel element clause
  if (this.clause.selectType === 2) {

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

  var result = this.input.next();

  if (result.done) 
    return DONE_ELEMENT;
  else 
    return {
      value: evalExprQuery(this.clause.selectExpr, Object.assign({}, result.value, this.envir)),
      done: false
    }; 
}

SelectElementOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}


function SelectAttrOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

SelectAttrOperator.prototype = Object.create(AbstractOpertor.prototype);
SelectAttrOperator.prototype.constructor = AbstractOpertor;

SelectAttrOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);

  this.input.open();
  this.result = {};

  var currItem = this.input.next();

  while (!currItem.done) {
    let attrName = 
      evalExprQuery(this.clause.selectAttrName, Object.assign({}, currItem.value, this.envir));

    if(typeof(attrName) !== 'string'){
      throw {
        name: 'AttributeNameNotString',
        message: 'Attribute name evaluated to something that\'s not a string'
      };
    }

    let attrVal = evalExprQuery(this.clause.selectAttrVal, Object.assign({}, currItem.value, this.envir));

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
function SFWRootIterator(envir, query) {
  this.query = query;
  this.envir = envir;
  AbstractOpertor.call(this);
  return this;
}

SFWRootIterator.prototype = Object.create(AbstractOpertor.prototype);
SFWRootIterator.prototype.constructor = AbstractOpertor;

SFWRootIterator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  console.log(this.envir);
   var prevIter = makeFromIterator(this.envir, this.query.from_clause);;

  if (this.query.where_clause !== null && this.query.where_clause !== undefined) {
    prevIter = 
      new ExpressionIterator(this.envir, this.query.where_clause, prevIter);
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
      new ExpressionIterator(this.envir, this.query.having_clause, prevIter);
  }

  if (this.query.orderby_clause !== null && this.query.orderby_clause !== undefined) {
    prevIter = 
      new OrderByOperator(this.envir, this.query.orderby_clause, prevIter);
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


function sfwQuery(database, query) {
  var result = new SFWRootIterator(database, query);
  result.open();

  var output;

  if(query.select_clause.selectType === 1){
    output = result.next().value;
  }
  else{
    output = [];
    var row = result.next();

    while(!row.done){
      output.push(row.value);
  
      row = result.next();
    }
  }

  result.close();

  return output;
}








var query = document.getElementById("QUERY");
var envir = document.getElementById("DB");
var button = document.getElementById("BUTTON");

var selectArea = document.getElementById("SELECT");

button.addEventListener("click", function(){
  selectArea.innerHTML = "";

  var input = query.value;

  var chars = new antlr4.InputStream(input);
  var lexer = new SqlppLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new SqlppParser(tokens);
  parser.buildParseTrees = true;
  var tree = parser.query();

  var visitor = new SqlppVisitor();
  var ast = visitor.visit(tree);
  console.log(ast);

  var db = JSON.parse(envir.value);

  var queryResult = sfwQuery(db, ast);

  if(Array.isArray(queryResult)){
    for(let i = 0; i < queryResult.length; i++){
      selectArea.innerHTML = selectArea.innerHTML + "<tr><td>" + JSON.stringify(queryResult[i]) + "</td></tr>";
    }
  }
  else{
      selectArea.innerHTML = selectArea.innerHTML + "<tr><td>" + JSON.stringify(queryResult) + "</td></tr>";
  }

  //fromArea.innerHTML = JSON.stringify(output);

});
