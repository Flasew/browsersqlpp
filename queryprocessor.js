var hash = require('./node_modules/object-hash/dist/object_hash.js');
var _ = require('./node_modules/lodash');

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

    input = JSON.parse(input);

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
  variable: (name, envir) => {
    
    var result = envir[name];
    
    if (result === undefined) 
      throw {
        name: 'VariableNotDefined',
        message: '\'' + name + '\'' + ' is not defined any where in the environment.' 
      };

    return result; 
  },

  // retrieve the value of a variable located by a path 
  path: function(expr, attr, envir) {

    var exprResult = evalExprQuery(expr, envir);
    
    if (exprResult === null) return null;
      
    var finalReault = exprResult[attr];
    return finalReault === undefined ? null: finalReault;;
  },

  // retrieve an element of an array
  arracs: function(expr, pos, envir) {
    
    var exprResult = evalExprQuery(expr, envir);
    var posResult = evalExprQuery(pos, envir) - 1;

    if (exprResult === null) return null;

    var finalReault = exprResult[posResult];
    return finalReault === undefined ? null: finalReault;
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

  bag: function() {
    var result = [];

    for(let i = 0; i < arguments.length - 1; i++){
      result[i] = evalExprQuery(arguments[i], arguments[arguments.length - 1]);
    }

    result.__isBag__ = true;
    
    return result;
  },

  // nested SWF query
  sfw: function(query, db) {
    var result = sfwQuery(db, query);
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

  if (expr === undefined) return null;

  // identity
  if (expr === null || expr.isExpr === undefined) 
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


/**
 * make an array to a bag...
 */
function bagify(arr) {
  arr.__isBag__ = true;
  return arr;
} 

/**
 * Convert a path expression back to the string token, for group by case 3
 * @param  {object} pathExpr parsed path expression
 * @return {string}          original string token with '.'
 */
function pathToStr(pathExpr) {
  var curr = pathExpr;
  var result = pathExpr.param[1];

  while (curr.param[0].func !== 'variable') {
    curr = curr.param[0];
    result = curr.param[1] + '.' + result;
  }

  result = curr.param[0].param[0] + '.' + result;

  return result;
}

function pathToArr(pathExpr) {

  if (pathExpr.func === 'variable') return pathExpr.param[0];

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
    case FROM_OP_TYPES.COMMA: 
    case FROM_OP_TYPES.INNERCORR:
    case FROM_OP_TYPES.INNERFLAT: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, envir, item), [{}]);

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

        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, envir, item), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (evalExprQuery(fromItem.on, newTuple)) 
            newBind.push(newTuple);

        }
      }

      break;
    }

    // left join operator same as SQL LEFT OUTER JOIN
    case FROM_OP_TYPES.LEFTJOIN: 
    case FROM_OP_TYPES.LEFTCORR:
    case FROM_OP_TYPES.OUTERFLAT: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      let leftincluded = Array(bindTuple.length).fill(false);

      for (let i = 0; i < bindTuple.length; i++) {

        let item = bindTuple[i];
        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, envir, item), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (fromItem.opType === FROM_OP_TYPES.LEFTJOIN) {
            if (evalExprQuery(fromItem.on, newTuple)) {
              newBind.push(newTuple);
              leftincluded[i] = true;
            }
          }
          else {
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

/**
 * Evaluate the WHERE clause of a query. The parsed format of WHERE clause will be a single expression.
 * @param  {object} envir          environment of the evaluation containing variable definitions 
 * @param  {array}  prevBindOutput binding tuple output of the FROM clause
 * @param  {object} whereClause    WHERE clause of the query parsed to javascript object format
 * @return {array}                 result of the execution of WHERE clause.
 */
function evalWhere(envir, prevBindOutput, whereClause) {

  if(whereClause === undefined || whereClause === null){
    return prevBindOutput;
  }

  var currBind = [];

  for (let item of prevBindOutput) {
    if (evalExprQuery(whereClause, Object.assign({}, envir, item))) {
      currBind.push(item);
    }
  }
  return currBind;
}

/* group: [{
    expr:
    as:
  }, ...]*/
function evalGroupby(envir, prevBindOutput, groupbyClause) {

  if(groupbyClause === undefined || groupbyClause === null){
    return prevBindOutput;
  }

  var result = [];
  var map = {};

  for (let i = 0; i < prevBindOutput.length; i++){

    var groupby = {};
    for (let j = 0; j < groupbyClause.length; j++) {
      if (groupbyClause[j].as === undefined) {

        let pathArr = pathToArr(groupbyClause[j].expr);
        let curr = groupby;

        while (pathArr.length > 1) {
          if (curr[pathArr[0]] === undefined) {
            curr[pathArr[0]] = {};
          }
          curr = curr[pathArr[0]];
          pathArr.shift();
        }

        curr[pathArr[0]] = evalExprQuery(groupbyClause[j].expr, prevBindOutput[i]);
      }

      else {
        groupby[groupbyClause[j].as] = evalExprQuery(groupbyClause[j].expr, prevBindOutput[i]);
      }
    }

    var hashed = hash(groupby);

    if (map[hashed] !== undefined) {
      var found = false;

      for (let k = 0; k < map[hashed].length; k++){
        if (_.isEqual(map[hashed][k].key, groupby)) {
          map[hashed][k].group.push(prevBindOutput[i]);

          found = true;

          break;
        }
      }
      
      if(!found){
        map[hashed].push({key: groupby, group: [prevBindOutput[i]]});
      }
    }

    else {
      map[hashed] = [{key: groupby, group: [prevBindOutput[i]]}];
    }
  }
  // console.log(map);
  for (let hashKey in map) {
    for(let i = 0; i < map[hashKey].length; i++){
      let item = Object.assign({}, map[hashKey][i].key);
      item["group"] = map[hashKey][i].group;

      result.push(item);
    }
  }

  return result;

}

function evalHaving(envir, prevBindOutput, havingClause) {

  if(havingClause === undefined || havingClause === null){
    return prevBindOutput;
  }

  var currBind = [];

  for (let item of prevBindOutput) {
    if (evalExprQuery(havingClause, Object.assign({}, envir, item))) {
      currBind.push(item);
    }
  }

  return currBind;
}

// order: [{
//   expr: 
//   asc: 
// }, ...]
function evalOrderby(envir, prevBindOutput, orderbyClause) {

  if(orderbyClause === undefined || orderbyClause === null){
    return prevBindOutput;
  }

  // construct the comparison function. 
  var comp = function(t1, t2) {
  // console.log(orderbyClause);
    for (let condition of orderbyClause) {

      // case of equal: go to the next condition
      let t1res = evalExprQuery(condition.expr, Object.assign({}, envir, t1));
      let t2res = evalExprQuery(condition.expr, Object.assign({}, envir, t2));

      if (t1res === t2res) {
        continue;
      }

      // order
      return condition.asc ? ((t1res < t2res) ? -1 : 1) : ((t1res > t2res) ? -1 : 1);

    }

    return 0;
  };

  return prevBindOutput.sort(comp);
  
}

function evalOffset(envir, prevBindOutput, offsetClause){

  var prevBindOutput = Array.from(prevBindOutput);
  if(offsetClause === undefined || offsetClause === null){
    return prevBindOutput;
  }

  var shift = evalExprQuery(offsetClause, envir);

  if(typeof(shift) !== "number"){
    throw{
      name: "invalidOffsetClause",
      message: 'Value of offset clause must be a number'
    };
  }

  for(let i = 0; i < shift; i++){
    prevBindOutput.shift();
  }

  return prevBindOutput;
}

function evalLimit(envir, prevBindOutput, limitClause){
  if(limitClause === undefined || limitClause === null){
    return prevBindOutput;
  }

  var limit = evalExprQuery(limitClause, envir);

  if(typeof(limit) !== "number"){
    throw{
      name: "invalidLimitClause",
      message: 'Value of limit clause must be a number'
    };
  }

  var result = [];

  for (let i = 0; i < limit && i < prevBindOutput.length; i++){
    result.push(prevBindOutput[i]);
  }

  return result;
}


/**
 * Evaluate the SELECT clause of a query with no aggregate query. 
 * @param  {object} envir           the environment of a query
 * @param  {array}  prevBindOutput binding tuple out of the previous clause
 * @param  {object} selectClause    select clause parsed to the javascript object format
 * @return {array}                  result of the query (not distinguished between bag and arr for now)
 */
function evalSelect(envir, prevBindOutput, selectClause) {

  switch (selectClause.selectType) {

    // SELECT ELEMENT ...
    case SEL_TYPES.ELEMENT: {
      var result = []; 
      for(let item of prevBindOutput) {
        result.push(evalExprQuery(selectClause.selectExpr, Object.assign({}, envir, item)));
      }

      return result;
    }

    // SELECT ATTRIBUTE {:} ...
    case SEL_TYPES.ATTRIBUTE: {
      var result = {};

      for(let item of prevBindOutput) {
        let attrName = evalExprQuery(selectClause.selectAttrName, Object.assign({}, envir, item));

        if(typeof(attrName) !== 'string'){
          throw {
            name: 'NotString',
            message: 'Not a string'
          };
        }

        let attrVal = evalExprQuery(selectClause.selectAttrVal, Object.assign({}, envir, item));

        result[attrName] = attrVal;
      }

      return result;
    }

    // SELECT ..., parsed to SELECT ELEMENT first and then recursively evaluated
    case SEL_TYPES.SQLSELECT: {

      // SELECT * case. the table must be homomorphic to a valid SQL table format
      if (selectClause.selectAll) {
        var result = [];
        for (let t of prevBindOutput) {
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

      var result = evalSelect(envir, prevBindOutput, elementReconstruct);

      return result;
    }
  }

}

/**
 * Evaluate a general query
 */
function evalQuery(db, query) {

  if (query === null || query === undefined) 
    return null;

  if (query.from_clause !== undefined)
    return sfwQuery(db, query);

  return evalExprQuery(query, db);
    
}

/**
 * Evaluate an SWF (select-where-from) query
 * @param  {object} db    raw database parsed to javascript object (NOT JSON)
 * @param  {object} query Parsed query clause, in the format specified in readme.
 * @return {object}       result of query, in javascript object (NOT JSON)
 */
function sfwQuery(db, query) {
  var prevOutput = evalFrom(db, query.from_clause);

  if (query.where_clause !== null && query.where_clause !== undefined) 
    prevOutput = evalWhere(db, prevOutput, query.where_clause);

  if (query.groupby_clause !== null && query.groupby_clause !== undefined) 
    prevOutput = evalGroupby(db, prevOutput, query.groupby_clause);
  
  if (query.having_clause !== null && query.having_clause !== undefined) {
    if (query.groupby_clause === null || query.groupby_clause === undefined) {
      throw {
        name: 'InvalidHavingClause',
        message: 'cannot use a having clause without a group by clause'
      };
    }
    prevOutput = evalHaving(db, prevOutput, query.having_clause);
  }

  if (query.orderby_clause !== null && query.orderby_clause !== undefined) 
    prevOutput = evalOrderby(db, prevOutput, query.orderby_clause);
  
  if (query.offset_clause !== null && query.offset_clause !== undefined) 
    prevOutput = evalOffset(db, prevOutput, query.offset_clause);
  
  if (query.limit_clause !== null && query.limit_clause !== undefined) 
    prevOutput = evalLimit(db, prevOutput, query.limit_clause);

  var result = evalSelect(db, prevOutput, query.select_clause);

  if (Array.isArray(result) && (query.orderby_clause === null || query.orderby_clause === undefined)) 
    result = bagify(result);

  return result;
}

exports.bagify = bagify;
exports.evalQuery = evalQuery;