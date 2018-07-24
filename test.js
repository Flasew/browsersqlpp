const READINGDB = {
  reading: { 
    co: [0.7, [0.5, 2]], 
    no2: ["repair"], 
    so2: [] 
  },
  cl2: [1,3,5,7,9],
};

const LASTREADING = {
  readings: [
    {co: 2.2},
    {co: 1.2, no2: [0.5, 2]},
    {co: 1.8, no2: 0.7}
  ],
  max: 2
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

const REDB = {
  readings: [1.3, 0.7, 0.3, 0.8]
};

const SENSORDB = {
  sensors: [
    [1.3, 2], 
    [0.7, 0.7, 0.9], 
    [0.3, 0.8, 1.1], 
    [0.7, 1.4]  
  ]
};

const RSDB = {
  R: [
    {a: 1, b: 10}, 
    {a: 2, b: 20},
    {a: 3, b: 30}
  ], 
  S: [
    {c: 3,  d: 60}, 
    {c: 4,  d: 80}, 
    {c: 1,  d: 20}
  ]
};

const READINGSDB = {readings: [
  { no2: 0.6, co: 0.7,     co2: [ 0.5, 2 ] },
  { no2: 0.5, co: [ 0.4 ], co2: 1.3 }
]};

/* From Clause Test Cases */

/* --- TEST CASE 1 --- */
/* range over collection elements */
function testFromElement(db) {

  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['readings'],
          isExpr: true
        },
        bindTo: 'r'
      }
    ]
  };

  var expected = '[{"r":1.3},{"r":0.7},{"r":0.3},{"r":0.8}]';
  var result = JSON.stringify(evalFrom(db, clause.from));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
}

/* --- TEST CASE 2 --- */
/* range over tuple attributes */
function testFromAttribute(db) {

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
          attrVal: 'v'
        }
      }
    ],
  };

  var expected = '[{"g":"co","v":[0.7,[0.5,2]]},{"g":"no2","v":["repair"]},{"g":"so2","v":[]}]';
  var result = JSON.stringify((evalFrom(db, clause.from)));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
}

/* --- TEST CASE 3 --- */
/* Cartesian Product  */
function testFromComma(db) {

  var clause = {
    from:[
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['sensors'],
          isExpr: true
        },
        bindTo: 's'
      },
      {
        opType: FROM_OP_TYPES.COMMA,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
          bindFrom: {
            func: 'variable',
            param: ['s'],
            isExpr: true
          },
          bindTo: 'r'
        }
      }
    ]
  };

  var expected = '[{"s":[1.3,2],"r":1.3},{"s":[1.3,2],"r":2},{"s":[0.7,0.7,0.9],"r":0.7},{"s":[0.7,0.7,0.9],"r":0.7},{"s":[0.7,0.7,0.9],"r":0.9},{"s":[0.3,0.8,1.1],"r":0.3},{"s":[0.3,0.8,1.1],"r":0.8},{"s":[0.3,0.8,1.1],"r":1.1},{"s":[0.7,1.4],"r":0.7},{"s":[0.7,1.4],"r":1.4}]';
  var result = JSON.stringify(evalFrom(db, clause.from));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);

}

/* --- TEST CASE 4 --- */
/* Inner Join  */
function testFromInnerJoin(db) {

  var clause = {
    from:[
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
        opType: FROM_OP_TYPES.INNERJOIN,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
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
  };

  var expected = '[{"x":{"a":1,"b":10},"y":{"c":1,"d":20}},{"x":{"a":3,"b":30},"y":{"c":3,"d":60}}]';
  var result = JSON.stringify(evalFrom(db, clause.from));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
}

/* --- TEST CASE 5 --- */
/* Left Join  */
function testFromLeftJoin(db) {

  var clause = {
    from:[
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
        opType: FROM_OP_TYPES.LEFTJOIN,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
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
  };

  var expected = '[{"x":{"a":1,"b":10},"y":{"c":1,"d":20}},{"x":{"a":3,"b":30},"y":{"c":3,"d":60}},{"x":{"a":2,"b":20},"y":null}]';
  var result = JSON.stringify(evalFrom(db, clause.from));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
}

/* --- TEST CASE 6 --- */
/* Right Join  */
function testFromRightJoin(db) {

  var clause = {
    from:[
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
        opType: FROM_OP_TYPES.RIGHTJOIN,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
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
  };

  var expected = '[{"y":{"c":3,"d":60},"x":{"a":3,"b":30}},{"y":{"c":1,"d":20},"x":{"a":1,"b":10}},{"y":{"c":4,"d":80},"x":null}]';
  var result = JSON.stringify(evalFrom(db, clause.from));

  console.log("Expected: " + expected);
  console.log("Actual: " + result);
}

/* --- TEST CASE 7 --- */
/* Full Join  */
function testFromFullJoin(db) {

  var clause = {
    from:[
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
        opType: FROM_OP_TYPES.FULLJOIN,
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
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
  };

  var expected = '[{"x":{"a":1,"b":10},"y":{"c":1,"d":20}},{"x":{"a":3,"b":30},"y":{"c":3,"d":60}},{"x":{"a":2,"b":20},"y":null},{"y":{"c":4,"d":80},"x":null}]';
  var result = JSON.stringify(evalFrom(db, clause.from));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

/* WHERE */
function testWhereEquiJoin(db) {

  // SELECT * 
  // FROM R AS r, S AS s,
  // WHERE r.a = s.c
  
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {func: 'variable', param: ['R'], isExpr: true},
        bindTo: 'r'
      },
      {
        opType: FROM_OP_TYPES.COMMA, 
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
          bindFrom: {func: 'variable', param: ['S'], isExpr: true},
          bindTo: 's'
        }
      }
    ],
    where: {
      func: 'eq',
      param: [
        {
          func: 'path',
          param: ['r', 'a'],
          isExpr: true
        },
        {
          func: 'path',
          param: ['s', 'c'],
          isExpr: true
        }
      ],
      isExpr: true
    },
    select: {
      selectType: SEL_TYPES.SQLSELECT,
      selectAll: true 
    }
  };

  var expected = '[{"a":2,"b":2,"c":2,"d":2},{"a":2,"b":2,"c":2,"d":1},{"a":2,"b":5,"c":2,"d":2},{"a":2,"b":5,"c":2,"d":1}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

function testWhereInequal(db) {

  // SELECT * 
  // FROM R AS r, S AS s,
  // WHERE r.a < s.c
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {func: 'variable', param: ['R'], isExpr: true},
        bindTo: 'r'
      },
      {
        opType: FROM_OP_TYPES.COMMA, 
        rhs: {
          opType: FROM_OP_TYPES.RANGE,
          bindFrom: {func: 'variable', param: ['S'], isExpr: true},
          bindTo: 's'
        }
      }
    ],
    where: {
      func: 'lt',
      param: [
        {
          func: 'path',
          param: ['r', 'a'],
          isExpr: true
        },
        {
          func: 'path',
          param: ['s', 'c'],
          isExpr: true
        }
      ],
      isExpr: true
    },
    select: {
      selectType: SEL_TYPES.SQLSELECT,
      selectAll: true 
    }
  };

  var expected = '[{"a":1,"b":1,"c":2,"d":2},{"a":1,"b":1,"c":2,"d":1},{"a":1,"b":1,"c":8,"d":7},{"a":2,"b":2,"c":8,"d":7},{"a":2,"b":5,"c":8,"d":7}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

function testWhereConjunctive(db) {

  // SELECT * 
  // FROM R as x, S as y
  // WHERE 5 > x.b AND y.d >= 2
  
  var clause = {
    from:[
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
    },
    select: {
      selectType: SEL_TYPES.SQLSELECT,
      selectAll: true 
    }
  };

  var expected = '[{"a":1,"b":1,"c":2,"d":2},{"a":1,"b":1,"c":8,"d":7},{"a":2,"b":2,"c":2,"d":2},{"a":2,"b":2,"c":8,"d":7}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

function testWhereMixedSrc(db) {
  // SELECT ELEMENT r.co
  // FROM readings AS r
  // WHERE r.co >= max
  
  var clause = {
    from: [{
      opType: FROM_OP_TYPES.RANGE,
      bindFrom: {func: 'variable', param: ['readings'], isExpr: true},
      bindTo: 'r'
    }],
    where: {
      func: 'gte',
      param: [
        {
          func: 'path',
          param: ['r', 'co'],
          isExpr: true
        },
        {
          func: 'variable',
          param: ['max'],
          isExpr: true
        },
      ],
      isExpr: true
    },
    select: {
      selectType: SEL_TYPES.ELEMENT,
      selectExpr: {func: 'path', param: ['r', 'co'], isExpr: true}
    }
  };
  var expected = '[2.2]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

/* SELECT */
function testSelectElementSingleton(db) {

  // SELECT ELEMENT r.a
  // FROM R AS r
  var clause = {
    from: [
      {
        opType: FROM_OP_TYPES.RANGE,
        bindFrom: {
          func: 'variable',
          param: ['R'],
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
        param: ['r', 'a'],
        isExpr: true
      }
    }
  };

  var expected = '[1,2,2]';
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

  var expected = '[{"gas":"co","val":[0.7,[0.5,2]]},{"gas":"no2","val":["repair"]},{"gas":"so2","val":[]}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
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

/* Other tests */

/* Nested query */
function testNest1(db) {

  // FROM    readings AS r
  // SELECT  ELEMENT (
  //   FROM    r AS {g:v}
  //   WHERE   g = "no2"
  //   SELECT  ATTRIBUTE g:v )
  var clause = {
    from: [{
      opType: FROM_OP_TYPES.RANGE,
      bindFrom: {func: 'variable', param: ['readings'], isExpr: true},
      bindTo: 'r'
    }],
    where: true,
    select: {
      selectType: SEL_TYPES.ELEMENT,
      selectExpr: {
        func: 'swf',
        param: [{
          from: [{
            opType: FROM_OP_TYPES.RANGEPAIR,
            bindFrom: {func: 'variable', param: ['r'], isExpr: true},
            bindTo: {attrName: 'g', attrVal: 'v'}
          }],
          where: {
            func: 'eq', 
            param: [
              {
                func: 'variable', 
                param: ['g'],
                isExpr: true
              },
              'no2',
            ],
            isExpr: true
          },
          select: {
            selectType: SEL_TYPES.ATTRIBUTE,
            selectAttrName: {func: 'variable', param: ['g'], isExpr: true},
            selectAttrVal:  {func: 'variable', param: ['v'], isExpr: true}
          }
        }],
        isExpr: true
      }
    }
  };

  var expected = '[{"no2":0.6},{"no2":0.5}]';
  var result = JSON.stringify(swfQuery(db, clause));

  console.log("Expected: " + expected);
  console.log("Actual:   " + result);
}

testFromElement(REDB);
testFromAttribute(READINGDB);
testFromComma(SENSORDB);
testFromInnerJoin(RSDB);
testFromLeftJoin(RSDB);
testFromRightJoin(RSDB);
testFromFullJoin(RSDB);

testWhereEquiJoin(RSTDB);
testWhereInequal(RSTDB);
testWhereConjunctive(RSTDB);
testWhereMixedSrc(LASTREADING);

testSelectElementSingleton(RSTDB);
testSelectElementObj(READINGDB);
testSelectElementArr(READINGDB);
testSelectAttribute(RSTDB);
testSelectWithAs(RSTDB);
testSelectNoAs(RSTDB);

testNest1(READINGSDB);

