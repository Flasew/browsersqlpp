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
  outerflat:  10
});

function evalFrom(envir, clauses){
  var currBind = [{}];

  for(element of clauses.from){
    currBind = evalFromItem(element, envir, currBind);
  }

  return currBind;
}

function evalFromItem(info, envir, bindTuple) {
  var newBind = [];

  switch (info["opType"]) {
    case fromOpTypes.range:
      var bindTo = info.bindTo;
      var bindFrom = evalExprQuery(info.bindFrom, envir);

      // range over tuple attributes: AS {var : var}
      if (typeof(bindTo) === 'object') {
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
      }

      // Range over collection elements: AS var (AT var)
      else {
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
      }

      break;

    case fromOpTypes.comma:

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);
        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);
          newBind.push(newTuple);
        }
      }
        
      break;

    case fromOpTypes.innerjoin:

      for (let item of bindTuple) {

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);

        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);

          if (evalExprQuery(info.on, newTuple)) 
            newBind.push(newTuple);

        }
      }

      break;

    case fromOpTypes.leftjoin:

      var newBind = [];
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
          newBind.push(newTuple)
        }
      }

      break;
  }
  return newBind;
}

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

  id: i => i // identity, for "value" type

};

/* functions */

function evalExprQuery(expr, envir) {
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

/* --- SAMPLES --- */
var db = '{"readings": {"co": [0.7, [0.5, 2]], "no2": ["repair"], "so2": []}}';
clause = {
  from: [
    {
      opType: fromOpTypes.range,
      bindFrom: {
        func: 'variable',
        param: ['readings'],
      },
      bindTo: {
        attrName: 'g', 
        attrVal: 'v'
      }
    }
  ]
}
clause = {
  from:[
    {
      opType: fromOpTypes.range,
      bindFrom: {
        func: 'variable',
        param: ['sensors'],
      },
      bindTo: 's'
    },
    {
      opType: fromOpTypes.comma,
      rhs: {
        opType: fromOpTypes.range,
        bindFrom: {
          func: 'variable',
          param: ['s']
        },
        bindTo: 'r'
      }
    }
  ]
}

clause = {
  from:[
    {
      opType: fromOpTypes.range,
      bindFrom: {
        func: 'variable',
        param: ['reading'],
      },
      bindTo: {attrName: 'g', attrVal: 'a'}
    },
    {
      opType: fromOpTypes.comma,
      rhs: {
        opType: fromOpTypes.range,
        bindFrom: {
          func: 'variable',
          param: ['a'],
          isExpr: true
        },
        bindTo: 'v'
      }
    }
  ]
}

var db = '{"sensors": [' + 
         '  [1.3, 2], ' +
         '  [0.7, 0.7, 0.9],' +
         '  [0.3, 0.8, 1.1],' +
         '  [0.7, 1.4]' +
         '],' +
         '"readings":[3, 4]}';

var init = JSON.parse(db)
init = {
  reading: {
    co: [0.7, [0.5, 2]],
    no2: ["repair"],
    so2: []
  }
}

db = {R:[{a: 1, b: 1}, {a: 2, b: 2}], S:[{c: 1, d: 2}, {c: 1, d: 1}]}
clause = {
  from:[
    {
      opType: fromOpTypes.range,
      bindFrom: {
        func: 'variable',
        param: ['R'],
        isExpr: true
      },
      bindTo: 'x'
    },
    {
      opType: fromOpTypes.leftjoin,
      rhs: {
        opType: fromOpTypes.range,
        bindFrom: {
          func: 'variable',
          param: ['S'],
          isExpr: true
        },
        bindTo: 'y'
      },
      on: {
        func: 'eq',
        param: [
          {
            func: 'path',
            param: ['x', 'a'],
            isExpr: true
          },
          {
            func: 'path',
            param: ['y', 'c'],
            isExpr: true
          }
        ],
        isExpr: true
      }
    }
  ]
}