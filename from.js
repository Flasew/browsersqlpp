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
  // console.log("IN evalFromItem")
  // console.log(info.opType)
  switch(info["opType"]){
    case fromOpTypes.range:
      var bindTo = info.bindTo;
      var bindFrom = evalExprQuery(info.bindFrom, envir);

      var newBind = [];

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
      console.log(newBind);
      return newBind;

    case fromOpTypes.comma:

      var newBind = [];

      for(let item of bindTuple) {
        console.log("item b4:");
        console.log(item);
        Object.assign({}, item, envir);
        console.log("item assign:");
        console.log(item);

        let itemBindResult = evalFromItem(info.rhs, Object.assign({}, item, envir), [{}]);
        console.log("ibr: ");
        console.log(itemBindResult);
        console.log("item a bind:");
        console.log(item)
        console.log("envir after bind:")
        console.log(envir)
        console.log("bindTuple after bind:")
        console.log(bindTuple)
        for (let result of itemBindResult) {
          let newTuple = Object.assign({}, item, result);
          console.log("item:");
          console.log(item)
          newBind.push(newTuple);
        }
      }
        
      return newBind;
  }
}

function evalExprQuery(expr, environment){

  switch (expr.func) {
    case 'variable':
      return environment[expr.param[0]];
  }

}
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