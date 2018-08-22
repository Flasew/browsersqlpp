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
    case 7: 
    case 10: 
      return new LeftJoinOperator(envir, clause);

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

  this.bindFrom = evalExprQuery(this.clause.bindFrom, envir);

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
  currValue[this.bindTo] = this.bindFrom[pos];

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

  this.matched = false;
}

LeftJoinOperator.prototype.next = function() {
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

LeftJoinOperator.prototype.close = function() {
  this.constructor.prototype.close.call(this);
}



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

