// namespace
var queryprocessor = queryprocessor || {};

// enumerations 
queryprocessor.enums = queryprocessor.enums || {};

// enumeration of possible operation in from clause
queryprocessor.enums.fromOpTypes = Object.freeze({
  range:      0,
  comma:      1, 
  innerjoin:  2,
  leftjoin:   3,
  rightjoin:  4,
  fulljoin:   5,
  innercorr:  6,
  leftcorr:   7,
  fullcorr:   8,
  innerflat:  9,
  outerflat:  10
});

// Used to evaluate all the expression queries.
queryprocessor.expressions = {

  /* logical operator */
  eq:  (lhs, rhs) => lhs === rhs,                   // ===
  neq: (lhs, rhs) => lhs !== rhs,                   // !==
  lt:  (lhs, rhs) => lhs < rhs,                     // <
  gt:  (lhs, rhs) => lhs > rhs,                     // >
  lte: (lhs, rhs) => lhs === rhs || lhs < rhs,      // <=
  gte: (lhs, rhs) => lhs === rhs || lhs > rhs,      // >=
  and: (lhs, rhs) => lhs && rhs,                    // &&
  or:  (lhs, rhs) => lhs || rhs,                    // ||

  /* arithmetical operator */
  add: (lhs, rhs) => lhs + rhs,
  sub: (lhs, rhs) => lhs - rhs,
  mul: (lhs, rhs) => lhs * rhs,
  div: (lhs, rhs) => lhs / rhs,
  mod: (lhs, rhs) => lhs % rhs,

  /* other */
  vari: function(name) {
    
  }

  id: i => i, // identity, for "value" type

}

/* functions */

queryprocessor.exprQuery = function(exprObj) {

  // evaluate parameters first if they're expressions
  for (let i = 0; i < exprObj.param.length; i++) 
    if (exprObj.param[i].isExpr)
      exprObj.param[i] = queryprocessor.exprQuery(exprObj.param[i]);

  return queryprocessor.expressions[exprObj.expr](...exprObj.param);
}

queryprocessor.setContext = function(dbin) {
  queryprocessor.context = {};
  queryprocessor.context.env = dbin;
  queryprocessor.context.bindTuples = [{}];
}

queryprocessor.rangeOver = function(entry) {

  let bindTo = entry.bindTo;
  let bindFrom = queryprocessor.exprQuery(entry.bindFrom);

  // range over tuple attributes: AS {var : var}
  if (typeof(bindTo) === 'object') {
    let toDel = [];
    let toAdd = [];

    let attrName = bindTo.attrName;
    let attrVal = bindTo.attrVal;

    // case of lhs of AS belongs to environment.
    // if (env[bindFrom] !== undefined){
      // if (typeof(env[bindFrom] === 'object')) {
        for (item of queryprocessor.context.bindTuples) {
          toDel.push(item);

          for (pair in bindFrom) {
            let newTuple = Object.assign({}, item);

            newTuple[attrName] = pair;
            newTuple[attrVal] = env[bindFrom][pair];

            toAdd.push(newTuple);
          }
        }
      // }
    // }

    // case of lhs of AS is a bound variable...join
    // else {
    //   for (item of bindTuples) {
    //     if (item[bindFrom] !== undefined && typeof(item[bindFrom] === 'object')) {
    //       toDel.push(item);

    //       for (pair in item[bindFrom]) {
    //         let newTuple = Object.assign({}, item);

    //         newTuple[attrName] = pair;
    //         newTuple[attrVal] = item[bindFrom][pair];

    //         toAdd.push(newTuple);
    //       }
    //     }
    //   } 
    // }

    for (item of toDel) queryprocessor.context.bindTuples.delete(item);
    for (item of toAdd) queryprocessor.context.bindTuples.add(item);
  }

  // Range over collection elements: AS var (AT var)
  else {
    let toDel = [];
    let toAdd = [];

    let pivot = entry.at;
    let pivotIndex = 1;

    // case of lhs of AS belongs to environment.
    // if (env[bindFrom] !== undefined) {
      // if (Array.isArray(env[bindFrom])) {
        for (item of queryprocessor.context.bindTuples) {
          toDel.push(item);

          for (let j = 0; j < bindFrom.length; j++) {
            let newTuple = Object.assign({}, item);

            newTuple[bindTo] = env[bindFrom][j];

            if(pivot !== undefined){
              newTuple[pivot] = pivotIndex;
              pivotIndex++;
            }

            toAdd.push(newTuple);
          }
        }
      // }
    // }

    // case of lhs of AS is a bound variable.
    // else {
    //   // item is an iterable object has bind from as key
    //   for (item of bindTuples) {
    //     if (item[bindFrom] !== undefined && Array.isArray(item[bindFrom])) {
    //       toDel.push(item);

    //       for (let j = 0; j < item[bindFrom].length; j++) {
    //         let newTuple = Object.assign({}, item);

    //         newTuple[bindTo] = item[bindFrom][j];

    //         if(pivot !== undefined){
    //           newTuple[pivot] = pivotIndex;
    //           pivotIndex++;
    //         }

    //         toAdd.push(newTuple);
    //       }
    //     }
    //   } 
    // }

    for (item of toDel) queryprocessor.context.bindTuples.delete(item);
    for (item of toAdd) queryprocessor.context.bindTuples.add(item);
  }
}

queryprocessor.cartesian = function(entry) {
  let bindTo = entry.bindTo;
  let bindFrom = queryprocessor.exprQuery(entry.bindFrom);

  // range over tuple attributes: AS {var : var}
  if (typeof(bindTo) === 'object') {
    let toDel = [];
    let toAdd = [];

    let attrName = bindTo.attrName;
    let attrVal = bindTo.attrVal;

    // case of lhs of AS belongs to environment.
    // if (env[bindFrom] !== undefined){
      // if (typeof(env[bindFrom] === 'object')) {
        // for (item of queryprocessor.context.bindTuples) {
        //   toDel.push(item);

        //   for (pair in bindFrom) {
        //     let newTuple = Object.assign({}, item);

        //     newTuple[attrName] = pair;
        //     newTuple[attrVal] = env[bindFrom][pair];

        //     toAdd.push(newTuple);
        //   }
        // }
      // }
    // }

    // case of lhs of AS is a bound variable...join
    // else {
      for (item of queryprocessor.context.bindTuples) {
        if (item[bindFrom] !== undefined && typeof(item[bindFrom] === 'object')) {
          toDel.push(item);

          for (pair in item[bindFrom]) {
            let newTuple = Object.assign({}, item);

            newTuple[attrName] = pair;
            newTuple[attrVal] = item[bindFrom][pair];

            toAdd.push(newTuple);
          }
        }
      } 
    // }

    for (item of toDel) queryprocessor.context.bindTuples.delete(item);
    for (item of toAdd) queryprocessor.context.bindTuples.add(item);
  }

  // Range over collection elements: AS var (AT var)
  else {
    let toDel = [];
    let toAdd = [];

    let pivot = entry.at;
    let pivotIndex = 1;

    // case of lhs of AS belongs to environment.
    // if (env[bindFrom] !== undefined) {
      // if (Array.isArray(env[bindFrom])) {
        // for (item of queryprocessor.context.bindTuples) {
        //   toDel.push(item);

        //   for (let j = 0; j < bindFrom.length; j++) {
        //     let newTuple = Object.assign({}, item);

        //     newTuple[bindTo] = env[bindFrom][j];

        //     if(pivot !== undefined){
        //       newTuple[pivot] = pivotIndex;
        //       pivotIndex++;
        //     }

        //     toAdd.push(newTuple);
        //   }
        // }
      // }
    // }

    // case of lhs of AS is a bound variable.
    // else {
      // item is an iterable object has bind from as key
      for (item of bindTuples) {
        if (item[bindFrom] !== undefined && Array.isArray(item[bindFrom])) {
          toDel.push(item);

          for (let j = 0; j < item[bindFrom].length; j++) {
            let newTuple = Object.assign({}, item);

            newTuple[bindTo] = item[bindFrom][j];

            if(pivot !== undefined){
              newTuple[pivot] = pivotIndex;
              pivotIndex++;
            }

            toAdd.push(newTuple);
          }
        }
      } 
    // }

    for (item of toDel) queryprocessor.context.bindTuples.delete(item);
    for (item of toAdd) queryprocessor.context.bindTuples.add(item);
  }
}

/**
 * Evaluate the from clause of the query. The fromClause object is parsed from 
 * the query and contains some (or all) of the following attributes:
 *   opType: int, operation type in the from clause using the enum. 
 *   One of the following:
 *     from: clause right after 'FROM' keyword.
 *     comma: comma separator, syntactic sugar 
 *     ?corr: some sort of correlate (not implemented)
 *     ?join: some sort of join
 *     ?flatten: some sort of flatten (not implemented)
 *    bindFrom: object, an expression query
 *    bindTo: name of the binding variable, or an object if {:} case
 *    at: if 'AT' is specified, at specifies the name of the positional variable
 *    cond: the expression query being evaluated
 * @param  {object} dbin       input database, environmental binding
 * @param  {array} fromClause from clause itself parsed to an object
 * @param  {set} bindTuples  Tuple binding after evaluate all the from clause
 */

queryprocessor.evalFrom = function(fromClause) {
  var envBind = dbin;

  // deal with each entry in the from clause sequentially. 
  for (entry of fromClause) {
    switch (entry.opType) {
      // from: initial input, just bind.
      case enums.fromOpTypes.from:
        bind(envBind, entry, bindTuples);
        break;

      // ,: inner with no correlation, Cartesian product. It's worthwhile to 
      // implement a special method for queryprocessor purpose
      case enums.fromOpTypes.comma: 
        cartesian(envBind, entry, bindTuples);
        break;

      // joins: joins...
      // case enums.fromOpTypes.innerjoin:
      // case enums.fromOpTypes.leftjoin:
      // case enums.fromOpTypes.rightjoin:
      // case enums.fromOpTypes.fulljoin:
        // join(envBind, entry, bindTuples);
        // break;

      default:
        throw {
          name: 'NotImplemented',
          message: 'Operation not implemented.'
        };
    }
  }

}