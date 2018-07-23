import * as qp from 'queryprocessor'

var db = {
  R: [
    {a: 1, b: 1}, 
    {a: 2, b: 2},
    {a: 2, b: 5}
  ], 
  S: [
    {c: 2,  d: 2}, 
    {c: 2,  d: 1}, 
    {c: 8,  d: 7}
  ]
};

function selectTestNoAs() {

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
  console.log("Actual: " + result);

}
