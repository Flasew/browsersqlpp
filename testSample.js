
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

evalExprQuery({
  func: 'path',
  param: ['reading', 'co'],
  isExpr: true
})

evalExprQuery({
  func: 'add',
  param: [1, {
    func: 'sub',
    param: [7, 3],
    isExpr: true
  }],
  isExpr: true
})


var db = {
  W: [1,2,3,4,5,6,7],
  X: [{a: 1, b: 2}, {a: 2, b: 2}]
}

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
      opType: fromOpTypes.innerjoin,
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

var db = {R:[{a: 1, b: 1}, {a: 2, b: 2}, {a: 2, b: 5}], S:[{c: 1, d: 2}, {c: 10, d: 1}, {c: 8, d: 7}]}
var clause = {
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
      opType: fromOpTypes.comma,
      rhs: {
        opType: fromOpTypes.range,
        bindFrom: {
          func: 'variable',
          param: ['S'],
          isExpr: true
        },
        bindTo: 'y'
      }
    }
  ],
  where: {
    func: 'and',
    param: [
      {
        func: 'gt',
        param: [
          5,
          {
            func: 'path',
            param: ['x', 'b'], 
            isExpr: true
          }
        ], 
        isExpr: true
      },
      {
        func: 'gte',
        param: [
          {
            func: 'path',
            param: ['y', 'd'], 
            isExpr: true
          },
          2
        ], 
        isExpr: true
      }
    ], 
    isExpr: true
  }
}
