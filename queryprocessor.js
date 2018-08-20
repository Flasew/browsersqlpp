var hash = require('./node_modules/object-hash/dist/object_hash.js');
var _ = require('./node_modules/underscore/underscore.js');

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
console.log(evaluatedParam);
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
  var outputFrom = evalFrom(db, query.from_clause);
  var outputWhere = evalWhere(db, outputFrom, query.where_clause);
  var outputGroupby = evalGroupBy(db, outputWhere, query.groupby_clause);
  var outputHaving = evalHaving(db, outputGroupby, query.groupby_clause);
  var outputSelect = evalSelect(db, outputHaving, query.select_clause);
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
 * @param  {array}  prevBindOutput binding tuple output of the FROM clause
 * @param  {object} whereClause    WHERE clause of the query parsed to javascript object format
 * @return {array}                 result of the execution of WHERE clause.
 */
function evalWhere(envir, prevBindOutput, whereClause) {

  if(whereClause === null || whereClause === undefined){
    return prevBindOutput;
  }

  // console.log("OutputFrom: ");
  // console.log(bindOutputFrom);
  var currBind = [];

  for (let item of prevBindOutput) {
    if (evalExprQuery(whereClause, Object.assign({}, item, envir))) {
      currBind.push(item);
    }
  }
  return currBind;
}

function evalSelect(envir, prevBindOutput, selectClause) {
  if (selectClause.aggrQuery) 
    return evalSelectAggr(envir, prevBindOutput, selectClause);
  else 
    return evalSelectNoAggr(envir, prevBindOutput, selectClause);
}

/**
 * Evaluate the SELECT clause of a query with no aggregate query. 
 * @param  {object} envir           the environment of a query
 * @param  {array}  prevBindOutput binding tuple out of the previous clause
 * @param  {object} selectClause    select clause parsed to the javascript object format
 * @return {array}                  result of the query (not distinguished between bag and arr for now)
 */
function evalSelectNoAggr(envir, prevBindOutput, selectClause) {

  switch (selectClause.selectType) {

    // SELECT ELEMENT ...
    case SEL_TYPES.ELEMENT: {
      var result = [];

      for(let item of prevBindOutput) {
        result.push(evalExprQuery(selectClause.selectExpr, Object.assign({}, item, envir)));
      }

      return result;
    }

    // SELECT ATTRIBUTE {:} ...
    case SEL_TYPES.ATTRIBUTE: {
      var result = {};

      for(let item of prevBindOutput) {
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

      var result = evalSelectNoAggr(envir, prevBindOutput, elementReconstruct);

      return result;
    }
  }

}

function evalSelectAggr(envir, prevBindOutput, selectClause){
  switch (selectClause.selectType) {

    // SELECT ELEMENT ...
    case SEL_TYPES.ELEMENT: {
      var result = [];

      for(let item of prevBindOutput) {
        result.push(evalExprQuery(selectClause.selectExpr, Object.assign({}, item, envir)));
      }

      return result;
    }

    // SELECT ATTRIBUTE {:} ...
    case SEL_TYPES.ATTRIBUTE: {
      var result = {};

      for(let item of prevBindOutput) {
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

      var result = evalSelectNoAggr(envir, prevBindOutput, elementReconstruct);

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
    case FROM_OP_TYPES.COMMA: 
    case FROM_OP_TYPES.INNERCORR:
    case FROM_OP_TYPES.INNERFLAT: {

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
    case FROM_OP_TYPES.LEFTJOIN: 
    case FROM_OP_TYPES.LEFTCORR:
    case FROM_OP_TYPES.OUTERFLAT: {

      bindTuple = evalFromItem(fromItem.lhs, envir, bindTuple);

      let leftincluded = Array(bindTuple.length).fill(false);

      for (let i = 0; i < bindTuple.length; i++) {

        let item = bindTuple[i];
        let itemBindResult = evalFromItem(fromItem.rhs, Object.assign({}, item, envir), [{}]);

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

/* group: [{
    expr:
    as:
  }, ...]*/
function evalGroupBy(envir, prevBindOutput, groupbyClause) {

  if(groupbyClause === null || groupbyClause === undefined){
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

  if(havingClause === null){
    return prevBindOutput;
  }

  // console.log("OutputFrom: ");
  // console.log(bindOutputFrom);
  var currBind = [];

  for (let item of prevBindOutput) {
    if (evalExprQuery(havingClause, Object.assign({}, item, envir))) {
      currBind.push(item);
    }
  }

  return currBind;
}

// order: [{
//   expr: 
//   asc: 
// }, ...]
function evalOrderBy(envir, prevBindOutput, orderbyClause) {

  if(orderbyClause === null){
    return prevBindOutput;
  }

  // construct the comparison function. 
  var comp = function(t1, t2) {

    for (let condition of orderbyClause) {

      // case of equal: go to the next condition
      let t1res = evalExprQuery(condition, Object.assign({}, t1, envir));
      let t2res = evalExprQuery(condition, Object.assign({}, t2, envir));

      if (t1res === t2res) {
        continue;
      }

      // order
      return conditoin.asc ? ((t1.res < t2.res) ? -1 : 1) : ((t1.res < t2.res) ? 1 : -1);

    }

    return 0;
  };

  return prevBindOutput.sort(comp);
  
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
  var curr = pathExpr;
  var result = [pathExpr.param[1]];

  while (curr.param[0].func !== 'variable') {
    curr = curr.param[0];
    result.unshift(curr.param[1]);
  }

  result.unshift(curr.param[0].param[0]);

  return result;
}





var query = document.getElementById("QUERY");
var envir = document.getElementById("DB");
var button = document.getElementById("BUTTON");

var fromArea = document.getElementById("FROM");
var whereArea = document.getElementById("WHERE");
var groupbyArea = document.getElementById("GROUPBY");
var selectArea = document.getElementById("SELECT");

button.addEventListener("click", function(){
  var input = query.value;
  //console.log(input);
  var chars = new antlr4.InputStream(input);
  var lexer = new SqlppLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new SqlppParser(tokens);
  parser.buildParseTrees = true;
  var tree = parser.query();
  console.log(tree);

  var visitor = new SqlppVisitor();
  var ast = visitor.visit(tree);
  console.log(ast);

  //var listener = new SqlppListener();
  //antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);


  var db = JSON.parse(envir.value);
  //var clause = JSON.parse(tree.value);

  var outputFrom = evalFrom(db, ast.from_clause);
  console.log("Output of FROM Clause:");
  console.log(outputFrom);
  fromArea.innerHTML = JSON.stringify(outputFrom);

  var outputWhere = evalWhere(db, outputFrom, ast.where_clause);
  console.log("Output of WHERE Clause:");
  console.log(outputWhere);
  whereArea.innerHTML = JSON.stringify(outputWhere);

  var outputGroupBy = evalGroupBy(db, outputWhere, ast.groupby_clause);
  console.log("Output of GROUP BY Clause:");
  console.log(outputGroupBy);
  groupbyArea.innerHTML = JSON.stringify(outputGroupBy);

  var outputSelect = evalSelect(db, outputGroupBy, ast.select_clause);
  console.log("Output of SELECT Clause:");
  console.log(outputSelect);
  selectArea.innerHTML = JSON.stringify(outputSelect);

  //console.log(outputSelect);
});