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
  swf: function(query, db) {
    // console.log("SUBQUERY");
    // console.log("query: ");
    // console.log(query);
    // console.log("db: ");
    // console.log(db);
    var result = swfQuery(db, query);
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

/**
 * "Where" operator, mostly similar to the selection operator in 
 * relational algebra
 */
function WhereOperator(envir, clause, input) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
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

  this.bindFrom = evalExprQuery(this.clause.bindFrom, envir);

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
      Object.assign({}, this.lhsTuple.value, envir), this.clause.rhs);
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
        Object.assign({}, this.lhsTuple.value, envir), this.clause.rhs);
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
        Object.assign({}, this.lhsTuple.value, envir), this.clause.rhs);
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
      Object.assign({}, this.lhsTuple.value, envir), this.clause.rhs);
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
        Object.assign({}, this.rhsTuple.value, envir), this.clause.lhs);
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

  this.lhsIter = makeFromIterator(this.envir, this.clause.lhs);
  this.lhsIter.open();

  this.lhsBuff = [];

  var currTuple = this.lhsIter.next();

  while(!currTuple.done){
    lhsBuff.push(currTuple);

    currTuple = this.lhsIter.next();
  }

  this.lhsIter.close();


  this.rhsIter = makeFromIterator(this.envir, this.clause.rhs);
  this.rhsIter.open();

  this.rhsBuff = [];

  currTuple = this.rhsIter.next();

  while(!currTuple.done){
    rhsBuff.push(currTuple);

    currTuple = this.rhsIter.next();
  }

  this.rhsIter.close();


  let leftincluded = Array(lhsBuff.length).fill(false);
  let rightincluded = Array(rhsBuff.length).fill(false);

  for (let i = 0; i < lhsBuff.length; i++) {
    for (let j = 0; j < rhsBuff.length; j++) {
      
      let newTuple = Object.assign({}, lhsBuff[i], rhsBuff[j]);

      if (evalExprQuery(fromItem.on, newTuple)) {
        this.result.push(newTuple);
        leftincluded[i] = true;
        rightincluded[j] = true;
      }
    }
  }

  for (let i = 0; i < leftincluded.length; i++) {

    if (!leftincluded[i]) {
      let newTuple = Object.assign({}, lhsBuff[i]);
      newTuple[fromItem.rhs.bindTo] = null;
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

  return currValue;
}

FullJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}

/*-------------------------- WHERE CLAUSE --------------------------*/

WhereOperator.prototype = Object.create(AbstractOpertor.prototype);
WhereOperator.prototype.constructor = AbstractOpertor;

WhereOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  this.input.open();
}

WhereOperator.prototype.next = function() {
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

WhereOperator.prototype.close = function() {
  this.input.close();
  this.constructor.prototype.close.call(this);
}



/*-------------------------- SELECT CLAUSE --------------------------*/
/**
 * "Select" operator, mostly similar to the projection operator in 
 * relational algebra.
 */
function SelectOperator(envir, input, clause) {
  this.clause = clause;
  this.envir = envir;
  this.input = input;
  AbstractOpertor.call(this);
  return this;
}

SelectOperator.prototype = Object.create(AbstractOpertor.prototype);
SelectOperator.prototype.constructor = AbstractOpertor;

SelectOperator.prototype.open = function() {
  this.constructor.prototype.open.call(this);
  this.input.open();
}

SelectOperator.prototype.next = function() {
  this.constructor.prototype.next.call(this);

}

SelectOperator.prototype.close = function() {
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
  this.prevIter = makeFromIterator(this.envir, this.query.from_clause);;

  if (this.query.where_clause !== null && this.query.where_clause !== undefined) {
    this.prevIter = 
      new WhereOperator(this.envir, this.query.where_clause, this.prevIter);
  }

  // if (this.query.groupby_clause !== null && this.query.groupby_clause !== undefined) {
  //   this.prevIter = 
  //     new GroupbyOperator(this.envir, this.query.groupby_clause, this.prevIter);
  // }
  
  // if (this.query.having_clause !== null && this.query.having_clause !== undefined) {
  //   this.prevIter = 
  //     new HavingOperator(this.envir, this.query.having_clause, this.prevIter);
  // }

  // if (this.query.orderby_clause !== null && this.query.orderby_clause !== undefined) {
  //   this.prevIter = 
  //     new OrderByOperator(this.envir, this.query.orderby_clause, this.prevIter);
  // }

  // if (this.query.offset_clause !== null && this.query.offset_clause !== undefined) {
  //   this.prevIter = 
  //     new OffsetOperator(this.envir, this.query.offset_clause, this.prevIter);
  // }

  // if (this.query.limit_clause !== null && this.query.limit_clause !== undefined) {
  //   this.prevIter = 
  //     new LimitOperator(this.envir, this.query.limit_clause, this.prevIter);
  // }

  // this.finalIter = new SelectOperator(this.envir, this.query.select_clause, this.prevIter);
  this.finalIter = this.prevIter;
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

  var output = [];
  var row = result.next();

  while(!row.done){
    output.push(row.value);

    row = result.next();
  }

  result.close();

  return output;
}


var query = document.getElementById("QUERY");
var envir = document.getElementById("DB");
var button = document.getElementById("BUTTON");

var fromArea = document.getElementById("FROM");
var whereArea = document.getElementById("WHERE");
var groupbyArea = document.getElementById("GROUPBY");
var havingArea = document.getElementById("HAVING");
var orderbyArea = document.getElementById("ORDERBY");
var offsetArea = document.getElementById("OFFSET");
var limitArea = document.getElementById("LIMIT");
var selectArea = document.getElementById("SELECT");
  console.log("1231231");
button.addEventListener("click", function(){
  var input = query.value;
  console.log("1231231");
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

  var output = sfwQuery(db, ast);

  fromArea.innerHTML = JSON.stringify(output);

});