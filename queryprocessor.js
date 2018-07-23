var fromOpTypes = Object.freeze({
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
  outerflat:  10,
  rangepair:  11
});

var selectTypes = Object.freeze({
  element: 0,
  attribute: 1,
  sqlselect: 2
});


var expressions = {

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
  variable: (name, envir) => envir[name],
  path: function() {
    var result = arguments[arguments.length - 1];

    for (let i = 0; i < arguments.length - 1; i++) {
      result = result[arguments[i]];
    }

    return result;
  },

  id: i => i, // identity, for "value" type

  obj: function() {
    var result = {};

    for(let i = 0; i < arguments.length - 1; i++){
      result[arguments[i]["attrName"]] = evalExprQuery(arguments[i]["attrVal"], arguments[arguments.length - 1]);
    }

    return result;
  },

  arr: function() {
    var result = [];

    for(let i = 0; i < arguments.length - 1; i++){
      result[i] = evalExprQuery(arguments[i], arguments[arguments.length - 1]);
    }

    return result;
  }
};


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
  // evaluate parameters first if they're expressions
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

  let result = expressions[expr.func](...evaluatedParam, envir);
  // console.log("Eval result: ");
  // console.log(result);
  return result;
}


function swfQuery(db, query) {
  var outputFrom = evalFrom(db, query.from);
  var outputWhere = evalWhere(db, outputFrom, query.where);
  var outputSelect = evalSelect(db, outputWhere, query.select);
  return outputSelect;
}

function evalFrom(envir, fromClause){
  var currBind = [];

  for (let element of fromClause){
    currBind = evalFromItem(element, envir, currBind);
  }

  return currBind;
}

function evalWhere(envir, bindOutputFrom, whereClause) {
  var currBind = []
  for (let item of bindOutputFrom) {
    if (evalExprQuery(whereClause, Object.assign({}, item, envir))) {
      currBind.push(item);
    }
  }
  return currBind;
}

function evalSelect(envir, bindOutputWhere, selectClause) {

  switch (selectClause.selectType) {
    case selectTypes.element: {
      var result = [];

      for(let item of bindOutputWhere) {
        result.push(evalExprQuery(selectClause["selectExpr"], Object.assign({}, item, envir)));
      }

      return result;
    }

    case selectTypes.attribute: {
      var result = {};

      for(let item of bindOutputWhere) {
        let attrName = evalExprQuery(selectClause["selectAttrName"], Object.assign({}, item, envir));

        if(typeof(attrName) !== 'string'){
          throw {
            name: 'NotString',
            message: 'Not a string'
          };
        }

        let attrVal = evalExprQuery(selectClause["selectAttrVal"],Object.assign({}, item, envir));

        result[attrName] = attrVal;
      }

      return result;
    }

    case selectTypes.sqlselect: {
      var elementReconstruct = {selectType: selectTypes.element};

      for(let item of selectClause["selectPairs"]) {
        if(item["as"] === undefined){
          let lastElementIndex = item.from.param.length - 1;

          item["as"] = item.from.param[lastElementIndex];
        }

        let attrName = item["as"];
        let attrVal = item["from"];

        elementReconstruct[attrName] = attrVal;

      }

      var result = evalSelect(envir, bindOutputWhere, elementReconstruct);

      return result;
    }
  }

}

function evalFromItem(info, envir, bindTuple) {
  var newBind = [];

  switch (info["opType"]) {
    case fromOpTypes.range: {

      var bindTo = info.bindTo;
      var bindFrom = evalExprQuery(info.bindFrom, envir);

      // Range over collection elements: AS var (AT var)
      if (!Array.isArray(bindFrom))
        bindFrom = [bindFrom];

      let pivot = info.at;
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

    case fromOpTypes.rangepair: {
      var bindTo = info.bindTo;
      var bindFrom = evalExprQuery(info.bindFrom, envir);

      // range over tuple attributes: AS {var : var}
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

    case fromOpTypes.comma: {

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);
        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);
          newBind.push(newTuple);
        }
      }
        
      break;
    }

    case fromOpTypes.innerjoin: {

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (evalExprQuery(info.on, newTuple)) 
            newBind.push(newTuple);

        }
      }

      break;
    }

    case fromOpTypes.leftjoin: {

      let leftincluded = Array(bindTuple.length).fill(false);

      for (let i = 0; i < bindTuple.length; i++) {

        let item = bindTuple[i];
        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (evalExprQuery(info.on, newTuple)) {
            newBind.push(newTuple);
            leftincluded[i] = true;
          }
        }
      }

      for (let i = 0; i < leftincluded.length; i++) {
        if (!leftincluded[i]) {
          let newTuple = Object.assign({}, bindTuple[i]);
          newTuple[info.rhs.bindTo] = null;
          newBind.push(newTuple);
        }
      }

      break;
    }

    case fromOpTypes.rightjoin: {

      let rightBindResult = evalFromItem(info.rhs, Object.assign({}, envir), [{}]);
      let rightincluded = Array(rightBindResult.length).fill(false);

      for (let i = 0; i < rightBindResult.length; i++) {

        let item = rightBindResult[i];

        for (let btup of bindTuple) {
          let newTuple = Object.assign({}, item, btup);

          if (evalExprQuery(info.on, newTuple)) {
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

    case fromOpTypes.fulljoin: case fromOpTypes.fullcorr: {
    // full join and full correlate are identical. lhs and rhs cannot use
    // variable defined on the other side.

      let rightBindResult = evalFromItem(info.rhs, Object.assign({}, envir), [{}]);
      let leftincluded = Array(bindTuple.length).fill(false);
      let rightincluded = Array(rightBindResult.length).fill(false);

      for (let i = 0; i < bindTuple.length; i++) {
        for (let j = 0; j < rightBindResult.length; j++) {
          
          let newTuple = Object.assign({}, bindTuple[i], rightBindResult[j]);

          if (evalExprQuery(info.on, newTuple)) {
            newBind.push(newTuple);
            leftincluded[i] = true;
            rightincluded[j] = true;
          }
        }
      }

      for (let i = 0; i < leftincluded.length; i++) {

        if (!leftincluded[i]) {
          let newTuple = Object.assign({}, bindTuple[i]);
          newTuple[info.rhs.bindTo] = null;
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






