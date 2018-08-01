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
 * Evaluate a general query
 */
function evalQuery(db, query) {
  if (query.fromClause !== undefined)
    return swfQuery(db, query);
  return evalExprQuery(query, db);
    
}

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

  let result = EXPRESSIONS[expr.func](...evaluatedParam, envir);
  // console.log("Eval result: ");
  // console.log(result);
  return result;
}

/**
 * Evaluate an SWF (select-where-from) query
 * @param  {object} db    raw database parsed to javascript object (NOT JSON)
 * @param  {object} query Parsed query clause, in the format specified in readme.
 * @return {object}       result of query, in javascript object (NOT JSON)
 */
function swfQuery(db, query) {
  var outputFrom = evalFrom(db, query.from);
  var outputWhere = evalWhere(db, outputFrom, query.where);
  var outputSelect = evalSelect(db, outputWhere, query.select);
  return outputSelect;
}

/**
 * Evaluate the FROM clause of a query. The FROM clause will evaluate to a bag
 * (implemented as array) of bound tuples, which is to be passed to the following
 * clauses
 * @param  {object} envir      environment of the execution. For FROM clause this is usually the database
 * @param  {object} fromClause FROM clause parsed to javascript object format. See readme for detail
 * @return {array}             binding tuples after the FROM clause is evaluated
 */
function evalFrom(envir, fromClause){
  return evalFromItem(fromClause, envir, [{}]);
}

/**
 * Evaluate the WHERE clause of a query. The parsed format of WHERE clause will be a single expression.
 * @param  {object} envir          environment of the evaluation containing variable definitions 
 * @param  {array}  bindOutputFrom binding tuple output of the FROM clause
 * @param  {object} whereClause    WHERE clause of the query parsed to javascript object format
 * @return {array}                 result of the execution of WHERE clause.
 */
function evalWhere(envir, bindOutputFrom, whereClause) {

  // console.log("OutputFrom: ");
  // console.log(bindOutputFrom);
  var currBind = [];

  for (let item of bindOutputFrom) {
    if (evalExprQuery(whereClause, Object.assign({}, item, envir))) {
      currBind.push(item);
    }
  }
  return currBind;
}

/**
 * Evaluate the SELECT clause of a query. 
 * @param  {object} envir           the environment of a query
 * @param  {array}  bindOutputWhere binding tuple out of the previous clause
 * @param  {object} selectClause    select clause parsed to the javascript object format
 * @return {array}                  result of the query (not distinguished between bag and arr for now)
 */
function evalSelect(envir, bindOutputWhere, selectClause) {

  switch (selectClause.selectType) {

    // SELECT ELEMENT ...
    case SEL_TYPES.ELEMENT: {
      var result = [];

      for(let item of bindOutputWhere) {
        result.push(evalExprQuery(selectClause.selectExpr, Object.assign({}, item, envir)));
      }

      return result;
    }

    // SELECT ATTRIBUTE {:} ...
    case SEL_TYPES.ATTRIBUTE: {
      var result = {};

      for(let item of bindOutputWhere) {
        let attrName = evalExprQuery(selectClause.selectAttrName, Object.assign({}, item, envir));

        if(typeof(attrName) !== 'string'){
          throw {
            name: 'NotString',
            message: 'Not a string'
          };
        }

        let attrVal = evalExprQuery(selectClause.selectAttrVal, Object.assign({}, item, envir));

        result[attrName] = attrVal;
      }

      return result;
    }

    // SELECT ..., parsed to SELECT ELEMENT first and then recursively evaluated
    case SEL_TYPES.SQLSELECT: {

      // SELECT * case. the table must be homomorphic to a valid SQL table format
      if (selectClause.selectAll) {
        var result = [];
        for (let t of bindOutputWhere) {
          let newTuple = {}
          for (let table in t) 
            for (let col in t[table])
              newTuple[col] = t[table][col];
          result.push(newTuple);
        }
        return result;
      }

      var elementReconstruct = {
        selectType: SEL_TYPES.ELEMENT,
        selectExpr: {
          func: 'obj',
          param: [],
          isExpr: true
        }
      };

      for(let item of selectClause.selectPairs) {
        if(item.as === undefined){
          let lastElementIndex = item.from.param.length - 1;

          item.as = item.from.param[lastElementIndex];
        }

        let newObj = {};
        newObj.attrName = item.as;
        newObj.attrVal = item.from;

        elementReconstruct.selectExpr.param.push(newObj);

      }

      var result = evalSelect(envir, bindOutputWhere, elementReconstruct);

      return result;
    }
  }

}

/**
 * Evaluate one from_item from the FROM clause. The from clause will be parsed
 * to an array of from_item objects and evaluated in order. Each of the object
 * will be evaluated based on the result of the previous output as well as 
 * other information depending on the operator type (e.g., the join operator
 * will have it's RHS as part of the information of evaluation) 
 * @param  {object} item      a from_item object specifying the op_type, data, etc.
 * @param  {object} envir     environment of the execution
 * @param  {array}  bindTuple binding tuples that's already been evaluated
 * @return {array}            binding tuple after the from_item being evaluated
 */
function evalFromItem(fromItem, envir, bindTuple) {

  var newBind = [];

  switch (fromItem.opType) {

    // "RANGE over" operator (line 4)
    case FROM_OP_TYPES.RANGE: {

      var bindTo = fromItem.bindTo;
      var bindFrom = evalExprQuery(fromItem.bindFrom, envir);

      // Range over collection elements: AS var (AT var)
      if (!Array.isArray(bindFrom)) {
        bindFrom = [bindFrom];
      }

      let pivot = fromItem.at;
      let pivotIndex = 1;

      // case of lhs of AS belongs to environment.
      for (let item of bindTuple) {
        for (let j = 0; j < bindFrom.length; j++) {
          let newTuple = Object.assign({}, item);

          newTuple[bindTo] = bindFrom[j];

          if(pivot !== undefined){
            newTuple[pivot] = pivotIndex;
            pivotIndex++;
          }

          newBind.push(newTuple);
        }
      }

      break;
    }

    // RANGE over an name:value pair (line 5)
    case FROM_OP_TYPES.RANGEPAIR: {
      var bindTo = fromItem.bindTo;
      var bindFrom = evalExprQuery(fromItem.bindFrom, envir);

      // RANGE over tuple attributes: AS {var : var}
      if (typeof(bindFrom) !== 'object' && Array.isArray(bindFrom))
        throw {
          name: 'NotObject',
          message: 'Not an object'
        };

      let attrName = bindTo.attrName;
      let attrVal = bindTo.attrVal;

      // case of lhs of AS belongs to environment.
      for (item of bindTuple) {
        for (pair in bindFrom) {
          let newTuple = Object.assign({}, item);

          newTuple[attrName] = pair;
          newTuple[attrVal] = bindFrom[pair];

          newBind.push(newTuple);
        }
      }

      break;
    }

    // "COMMA" operator representing Cartesian product (flatten also allowed)
    case FROM_OP_TYPES.COMMA: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, item, envir), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);
          newBind.push(newTuple);
        }
      }
        
      break;
    }

    // inner join operator, same as SQL inner join (mostly theta join)
    case FROM_OP_TYPES.INNERJOIN: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, item, envir), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (evalExprQuery(fromItem.on, newTuple)) 
            newBind.push(newTuple);

        }
      }

      break;
    }

    // left join operator same as SQL LEFT OUTER JOIN
    case FROM_OP_TYPES.LEFTJOIN: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      let leftincluded = Array(bindTuple.length).fill(false);

      for (let i = 0; i < bindTuple.length; i++) {

        let item = bindTuple[i];
        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, item, envir), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (evalExprQuery(fromItem.on, newTuple)) {
            newBind.push(newTuple);
            leftincluded[i] = true;
          }
        }
      }

      for (let i = 0; i < leftincluded.length; i++) {
        if (!leftincluded[i]) {
          let newTuple = Object.assign({}, bindTuple[i]);
          newTuple[fromItem.rhs.bindTo] = null;
          newBind.push(newTuple);
        }
      }

      break;
    }

    // right join operator. Notice the RHS cannot contain var from LHS.
    case FROM_OP_TYPES.RIGHTJOIN: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      let rightBindResult = evalFromItem(fromItem.rhs, Object.assign({}, envir), [{}]);
      let rightincluded = Array(rightBindResult.length).fill(false);

      for (let i = 0; i < rightBindResult.length; i++) {

        let item = rightBindResult[i];

        for (let btup of bindTuple) {
          let newTuple = Object.assign({}, item, btup);

          if (evalExprQuery(fromItem.on, newTuple)) {
            newBind.push(newTuple);
            rightincluded[i] = true;
          }
        }
      }

      for (let i = 0; i < rightBindResult.length; i++) {
        if (!rightincluded[i]) {
          let newTuple = Object.assign({}, rightBindResult[i]);

          for (let attr in bindTuple[0]) 
            newTuple[attr] = null;
          
          newBind.push(newTuple);
        }
      }

      break;
    }

    // full join & full correlate operator, same as SQL FULL OUTER JOIN
    case FROM_OP_TYPES.FULLJOIN: case FROM_OP_TYPES.FULLCORR: {
    // full join and full correlate are identical. lhs and rhs cannot use
    // variable defined on the other side.
    
      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      let rightBindResult = evalFromItem(fromItem.rhs, Object.assign({}, envir), [{}]);
      let leftincluded = Array(bindTuple.length).fill(false);
      let rightincluded = Array(rightBindResult.length).fill(false);

      for (let i = 0; i < bindTuple.length; i++) {
        for (let j = 0; j < rightBindResult.length; j++) {
          
          let newTuple = Object.assign({}, bindTuple[i], rightBindResult[j]);

          if (evalExprQuery(fromItem.on, newTuple)) {
            newBind.push(newTuple);
            leftincluded[i] = true;
            rightincluded[j] = true;
          }
        }
      }

      for (let i = 0; i < leftincluded.length; i++) {

        if (!leftincluded[i]) {
          let newTuple = Object.assign({}, bindTuple[i]);
          newTuple[fromItem.rhs.bindTo] = null;
          newBind.push(newTuple);
        }

      }

      for (let i = 0; i < rightincluded.length; i++) {

        if (!rightincluded[i]) {
          let newTuple = Object.assign({}, rightBindResult[i]);

          for (let attr in bindTuple[0]) 
            newTuple[attr] = null;
          
          newBind.push(newTuple);
        }
      }

      break;
    }
  }
  return newBind;
}






