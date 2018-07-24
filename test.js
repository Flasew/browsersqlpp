const READINGDB = {
  reading: { 
    co: [0.7, [0.5, 2]], 
    no2: ["repair"], 
    so2: [] 
  },
  cl2: [1,3,5,7,9],
  max: 6
};

const RSTDB = {
  R: [
    {a: 1, b: 1}, 
    {a: 2, b: 2},
    {a: 2, b: 5}
  ], 
  S: [
    {c: 2, d: 2}, 
    {c: 2, d: 1}, 
    {c: 8, d: 7}
  ],
  T: [
    {e: "1st", f: 1},
    {e: "2nd", f: 2},
    {e: "3rd", f: 3}
  ]
};


function testSelectElementSingleton(db) {

  // SELECT ELEMENT r.co
  // FROM R AS r
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['reading'],
          isExpr: true
        },
        bindTo: 'r'
      }
    ],
    where: true,
    select: {
      selectType: SEL_TYPES.ELEMENT,
      selectExpr: {
        func: 'path',
        param: ['r', 'co'],
        isExpr: true
      }
    }
  };

  var expected = '[0.7,[0.5,2]]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
}

function testSelectElementObj(db) {
  // SELECT ELEMENT {gas: g, val: v}
  // FROM reading AS {g: v}
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGEPAIR,
        bindFrom: {
          func: 'variable',
          param: ['reading'],
          isExpr: true
        },
        bindTo: {
          attrName: 'g', 
          attrVal:  'v'
        }
      }
    ],
    where: true,
    select: {
      selectType: SEL_TYPES.ELEMENT,
      selectExpr: {
        func: 'obj',
        param: [
          {attrName: 'gas', attrVal: {func: 'variable', param:['g'], isExpr: true}},
          {attrName: 'val', attrVal: {func: 'variable', param:['v'], isExpr: true}}
        ],
        isExpr: true
      }
    }
  };

  var expected = '[{gas:"co",val:[0.7,[0.5,2]]},{gas:"no2",val:["repair"]},{gas:"so2",val:[]}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
} 

function testSelectElementArr(db) {

  // SELECT ELEMENT [g, v]
  // FROM reading AS {g: v}
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGEPAIR,
        bindFrom: {
          func: 'variable',
          param: ['reading'],
          isExpr: true
        },
        bindTo: {
          attrName: 'g', 
          attrVal:  'v'
        }
      }
    ],
    where: true,
    select: {
      selectType: SEL_TYPES.ELEMENT,
      selectExpr: {
        func: 'arr',
        param: [
          {func: 'variable', param:['g'], isExpr: true},
          {func: 'variable', param:['v'], isExpr: true}
        ],
        isExpr: true
      }
    }
  };

  var expected = '[["co",[0.7,[0.5,2]]],["no2",["repair"]],["so2",[]]]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
} 

function testSelectAttribute(db) {
  // SELECT ATTRIBUTE t.e: t.f
  // FROM T as t
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['T'],
          isExpr: true
        },
        bindTo: 't'
      }
    ],
    where: true,
    select: {
      selectType: SEL_TYPES.ATTRIBUTE,
      selectAttrName: {func: 'path', param: ['t','e'], isExpr: true},
      selectAttrVal:  {func: 'path', param: ['t','f'], isExpr: true}
    }
  };

  var expected = '{"1st":1},{"2nd":2},{"3rd":3}';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

function testSelectWithAs(db) {
  // SELECT x.b AS aaa, y.d as bbb
  // FROM R as x, S as y
  // WHERE x.a < y.c
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['R'],
          isExpr: true
        },
        bindTo: 'x'
      },
      {
        opType: FROM_OP_TYPES.COMMA,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
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
      func: 'lt',
      param: [
        {
          func: "path",
          param: ['x', 'a'],
          isExpr: true
        },
        {
          func: "path",
          param: ['y', 'c'],
          isExpr: true
        }
      ],
      isExpr: true
    },
    select: {
      selectType: SEL_TYPES.SQLSELECT,
      selectPairs: [
        {from: {func: "path", param: ['x', 'b'], isExpr: true}, as: 'aaa'},
        {from: {func: "path", param: ['y', 'd'], isExpr: true}, as: 'bbb'}
      ]
    }
  };

  var expected = '[{"aaa":1,"bbb":2},{"aaa":1,"bbb":1},{"aaa":1,"bbb":7},{"aaa":2,"bbb":7},{"aaa":5,"bbb":7}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);

}


function testSelectNoAs(db) {

  // SELECT x.b, y.d
  // FROM R as x, S as y
  // WHERE x.a = y.c
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['R'],
          isExpr: true
        },
        bindTo: 'x'
      },
      {
        opType: FROM_OP_TYPES.COMMA,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
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
      func: 'eq',
      param: [
        {
          func: "path",
          param: ['x', 'a'],
          isExpr: true
        },
        {
          func: "path",
          param: ['y', 'c'],
          isExpr: true
        }
      ],
      isExpr: true
    },
    select: {
      selectType: SEL_TYPES.SQLSELECT,
      selectPairs: [
        {from: {func: "path", param: ['x', 'b'], isExpr: true}},
        {from: {func: "path", param: ['y', 'd'], isExpr: true}}
      ]
    }
  };

  var expected = '[{"b":2,"d":2},{"b":2,"d":1},{"b":5,"d":2},{"b":5,"d":1}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);

}

testSelectElementSingleton(READINGDB);
testSelectElementObj(READINGDB);
testSelectElementArr(READINGDB);
testSelectAttribute(RSTDB);
testSelectWithAs(RSTDB);
testSelectNoAs(RSTDB);



