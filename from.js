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

function evalFromItem(info, envir, bindTuple){
  var newBind = [];
  switch(info["opType"]){
    case fromOpTypes.range:
      var bindTo = info.bindTo;
      var bindFrom = evalExprQuery(info.bindFrom, envir);

      // range over tuple attributes: AS {var : var}
      if (typeof(bindTo) === 'object') {
        if(typeof(bindFrom) !== 'object' && Array.isArray(bindFrom))
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
        if(!Array.isArray(bindFrom))
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

      var newBind = [];

      for(let item of bindTuple) {

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);
        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);
          newBind.push(newTuple);
        }
      }
        
      break;

    case fromOpTypes.innerjoin:

      var newBind = [];

      for(let item of bindTuple) {

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);
        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);
          newBind.push(newTuple);
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

  id: i => i // identity, for "value" type

};

/* functions */

function evalExprQuery(expr, envir) {

  // evaluate parameters first if they're expressions
  for (let i = 0; i < expr.param.length; i++) 
    if (expr.param[i].isExpr)
      expr.param[i] = evalExprQuery(expr.param[i]);

  return expressions[expr.func](...expr.param, envir);
}

// function evalExprQuery(expr, environment){

//   switch (expr.func) {
//     case 'variable':
//       return environment[expr.param[0]];
//   }

// }
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

var db = '{"sensors": [' + 
         '  [1.3, 2], ' +
         '  [0.7, 0.7, 0.9],' +
         '  [0.3, 0.8, 1.1],' +
         '  [0.7, 1.4]' +
         '],' +
         '"readings":[3, 4]}';

var init = JSON.parse(db)