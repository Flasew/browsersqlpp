/**
 * Unit testing for parser.
 * Since the major purpose for this file is to test the visitors, 
 * only those clause with significant visitor code will be tested.
 */

const _ = require('../node_modules/underscore/underscore.js');
const util = require('../node_modules/util')
const antlr4 = require('../node_modules/antlr4/index');
const SqlppLexer = require('../parser/SqlppLexer').SqlppLexer;
const SqlppParser = require('../parser/SqlppParser').SqlppParser;
const SqlppVisitor = require('../parser/CustomVisitor').CustomVisitor;
var visitor = new SqlppVisitor();

function assertEquals(expected, actual) {

  var resultStackLine = new Error().stack.split('\n')[2].trim();
  var funcName = resultStackLine.split(' ')[1];
  var line = resultStackLine.split(':').reverse()[1];

  if (_.isEqual(expected, actual))
    console.log('\x1b[32m%s\x1b[0m', 'Test ' + funcName + ' passed at line ' + line);
  else {
    console.log('\x1b[31m%s\x1b[0m', 'Test ' + funcName + ' FAILED at line ' + line);
    console.log('\x1b[31m%s\x1b[0m', 'Expected:\n ' + util.inspect(expected, false, null));
    console.log('\x1b[31m%s\x1b[0m', 'Actual:\n ' + util.inspect(actual, false, null));
  }

}

function initParser(input) {
  var chars = new antlr4.InputStream(input);
  var lexer = new SqlppLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new SqlppParser(tokens);
  parser.buildParseTrees = true;
  return parser;
}


const VARX = {func: 'variable', param: ['x'], isExpr: true};
const VARY = {func: 'variable', param: ['y'], isExpr: true};
const VARZ = {func: 'variable', param: ['z'], isExpr: true};

// expression queries
function testExprValueInt() {
  var parser = initParser('5');
  var ast = visitor.visit(parser.expr());
  assertEquals(5, ast);
}

function testExprValueFloat() {
  var parser = initParser('5.55');
  var ast = visitor.visit(parser.expr());
  assertEquals(5.55, ast);
}

function testExprValueStr() {
  var parser = initParser('\'This is a string\'');
  var ast = visitor.visit(parser.expr());
  assertEquals('This is a string', ast);
}

function testExprVariable() {
  var parser = initParser('x');
  var ast = visitor.visit(parser.expr());
  var expected = VARX;
  assertEquals(expected, ast);
}

function testExprPath() {
  var parser = initParser('x.y');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'path',
    param: [VARX, 'y'], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprArrAcs() {
  var parser = initParser('x[1]');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'arracs',
    param: [VARX, 1], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprUnaryNeg() {
  var parser = initParser('-10');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'neg',
    param: [10], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprUnaryNot() {
  var parser = initParser('not x');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'not',
    param: [VARX], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprBinarySimple() {
  var parser = initParser('1 + 3');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'add',
    param: [1, 3], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprBinaryNested() {
  var parser = initParser('x OR y AND z');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'or',
    param: [VARX, {func: 'and', param: [VARY, VARZ], isExpr: true}], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprAggrNoKeyword() {
  var parser = initParser('sum(x)');
  var ast = visitor.visit(parser.expr());
  var expected = {func: 'sum', param: [JSON.stringify(VARX)], isExpr: true};
  assertEquals(expected, ast);
}

function testExprAggrWithKeyword() {
  var parser = initParser('count(group)');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'count', 
    param: [{func: 'variable', param: ['group'], isExpr: true}], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprFuncname() {
  var parser = initParser('somefunction(x, y, z)');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'somefunction', 
    param: [VARX, VARY, VARZ], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprObj() {
  var parser = initParser('{a: x, b: y}');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'obj', 
    param: [{attrName: 'a', attrVal: VARX}, {attrName: 'b', attrVal: VARY}], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprArr() {
  var parser = initParser('[x, 5, \'aaa\', y]');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'arr', 
    param: [VARX, 5, 'aaa', VARY], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprBag() {
  var parser = initParser('{{x, 5, \'aaa\', y}}');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'bag', 
    param: [VARX, 5, 'aaa', VARY], 
    isExpr: true
  };
  assertEquals(expected, ast);
}

function testExprSFW() {
  var parser = initParser('(SELECT x.y FROM x as x)');
  var ast = visitor.visit(parser.expr());
  var expected = {
    func: 'sfw', 
    param: [{
      select_clause:  {selectType: 2, selectPairs:[{from: {func: 'path', param: [VARX, 'y'], isExpr: true}}]},
      from_clause:    {opType: 0, bindFrom: VARX, bindTo: 'x', at: undefined},
      where_clause:   null,
      groupby_clause: null,
      having_clause:  null,
      orderby_clause: null,
      limit_clause:   null,
      offset_clause:  null,
    }], 
    isExpr: true
  };
  assertEquals(expected, ast);

  parser = initParser('SELECT x.y FROM x as x');
  ast = visitor.visit(parser.expr());
  assertEquals(expected, ast);
}

// select clause
function testSelectElement() {
  var parser = initParser('SELECT ELEMENT x');
  var ast = visitor.visit(parser.select_clause());
  var expected = {selectType: 0, selectExpr: VARX};
  assertEquals(expected, ast);
}

function testSelectAttr() {
  var parser = initParser('SELECT ATTRIBUTE x:y');
  var ast = visitor.visit(parser.select_clause());
  var expected = {selectType: 1, selectAttrName: VARX, selectAttrVal: VARY};
  assertEquals(expected, ast);
}

function testSelectSQL() {
  // with as
  var parser = initParser('SELECT x as a, y as b');
  var ast = visitor.visit(parser.select_clause());
  var expected = {
    selectType: 2,
    selectPairs: [{from: VARX, as: 'a'}, {from: VARY, as: 'b'}]
  };
  assertEquals(expected, ast);

  // with partial as
  var parser = initParser('SELECT x as a, y.b');
  var ast = visitor.visit(parser.select_clause());
  var expected = {
    selectType: 2,
    selectPairs: [{from: VARX, as: 'a'}, {from: {func: 'path', param: [VARY, 'b'], isExpr: true}}]
  };
  assertEquals(expected, ast);

  // with no as
  var parser = initParser('SELECT x.a, y.b');
  var ast = visitor.visit(parser.select_clause());
  var expected = {
    selectType: 2,
    selectPairs: [{from: {func: 'path', param: [VARX, 'a'], isExpr: true}}, {from: {func: 'path', param: [VARY, 'b'], isExpr: true}}]
  };
  assertEquals(expected, ast);
}

const XASA = {
    opType: 0,
  bindFrom: VARX, 
  bindTo: 'a',
  at: undefined
};

const YASB = {
  opType: 0,
  bindFrom: VARY, 
  bindTo: 'b',
  at: undefined
};

const TRIVIAL = {
  func: 'eq',
  param: [5, 5],
  isExpr: true
};

// from clause
function testFromRange() {

  // no at
  var parser = initParser('FROM x AS a');
  var ast = visitor.visit(parser.from_clause());
  var expected = XASA;
  assertEquals(expected, ast);

  // with at
  var parser = initParser('FROM x AS a AT p');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 0,
    bindFrom: VARX, 
    bindTo: 'a',
    at: 'p'
  };
  assertEquals(expected, ast);
}

function testFromRangePair() {
  var parser = initParser('FROM x AS {a: b}');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 11,
    bindFrom: VARX, 
    bindTo: {attrName: 'a', attrVal: 'b'},
  };
  assertEquals(expected, ast);
}

function testFromComma() {
  var parser = initParser('FROM x as a, y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 1,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);
}

function testFromInnerCorr() {
  // with 'correlate' kw
  var parser = initParser('FROM x as a INNER CORRELATE y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 6,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);

  // without 'correlate' kw
  var parser = initParser('FROM x as a inner y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 6,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);
}

function testFromLeftCorr() {

  // without 'correlate' kw
  var parser = initParser('FROM x as a left y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 7,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);

  // with 'correlate' kw
  var parser = initParser('FROM x as a LEFT correlate y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 7,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);

  // with 'outer' kw
  var parser = initParser('FROM x as a LEFT outer y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 7,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);

  // with 'correlate' kw
  var parser = initParser('FROM x as a LEFT OUTER correlate y as b');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 7,
    lhs: XASA,
    rhs: YASB
  };
  assertEquals(expected, ast);

}

function testFromFullCorr() {
  // without 'correlate' kw
  var parser = initParser('FROM x as a full y as b on 5 == 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 8,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);

  // with 'correlate' kw
  var parser = initParser('FROM x as a FULL correlate y as b on 5 == 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 8,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);

  // with 'outer' kw
  var parser = initParser('FROM x as a full outer y as b on 5 == 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 8,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);

  // with 'correlate' kw
  var parser = initParser('FROM x as a full OUTER correlate y as b on 5 == 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 8,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);
}

function testFromInnerJoin() {
  var parser = initParser('FROM x as a inner JOIN y as b ON 5 = 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 2,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);
}

function testFromLeftJoin() {
  var parser = initParser('FROM x as a LEFT JOIN y as b ON 5 = 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 3,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);
}

function testFromRightJoin() {
  var parser = initParser('FROM x as a right JOIN y AS b ON 5 = 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 4,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);
}

function testFromFullJoin() {
  var parser = initParser('FROM x as a FulL JOIN y as b ON 5 = 5');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 5
    ,
    lhs: XASA,
    rhs: YASB,
    on: TRIVIAL
  };
  assertEquals(expected, ast);
}

function testFromInnerFlatten() {
  var parser = initParser('FROM inner flATten (x as a, y as b)');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 9,
    lhs: XASA,
    rhs: YASB,
  };
  assertEquals(expected, ast);
}

function testFromOuterFlatten() {
  var parser = initParser('FROM oUtEr flATten (x as a, y as b)');
  var ast = visitor.visit(parser.from_clause());
  var expected = {
    opType: 10,
    lhs: XASA,
    rhs: YASB,
  };
  assertEquals(expected, ast);
}

// where clause
function testWhere() {
  var parser = initParser('WHERE x.a == 5 AND (y.b % 2 <> 1 OR 5 != 5)');
  var ast = visitor.visit(parser.where_clause());
  var expected = {
    func: 'and',
    param: [
      {
        func: 'eq',
        param: [{func: 'path', param: [VARX, 'a'], isExpr: true}, 5],
        isExpr: true
      },
      {
        func: 'or', 
        param:[
          {
            func: 'neq',
            param: [
              {
                func: 'mod', 
                param: [{func: 'path', param: [VARY, 'b'], 
                isExpr: true
              }, 2], isExpr: true}, 1
            ],
            isExpr: true
          }, {func: 'neq', param: [5, 5], isExpr: true}
        ],
        isExpr: true
      }
    ],
    isExpr: true
  };
  assertEquals(expected, ast);
}

// groupby clause
function testGroupby() {

  // with as
  var parser = initParser('GROUP by x as a, y as b');
  var ast = visitor.visit(parser.groupby_clause());
  var expected = [
    {expr: VARX, as: 'a'},
    {expr: VARY, as: 'b'},
  ];
  assertEquals(expected, ast);

  // with partial as
  var parser = initParser('GROUP by x as a, y.b');
  var ast = visitor.visit(parser.groupby_clause());
  var expected = [
    {expr: VARX, as: 'a'},
    {expr: {func: 'path', param: [VARY, 'b'], isExpr: true}, as: undefined}
  ];
  assertEquals(expected, ast);

  // with no as
  var parser = initParser('GROUP by x.a, y.b');
  var ast = visitor.visit(parser.groupby_clause());
  var expected = [
    {expr: {func: 'path', param: [VARX, 'a'], isExpr: true}, as: undefined},
    {expr: {func: 'path', param: [VARY, 'b'], isExpr: true}, as: undefined}
  ];
  assertEquals(expected, ast);
}

// having clause
function testHaving() {
  var parser = initParser('HAVING count(*) > 5 AND sum(y.b) <= 7 AND avg(FROM x as y seleCt eleMENt y) == 9');
  var ast = visitor.visit(parser.having_clause());
  var expected = {
    func: 'and', 
    param: [
      {
        func: 'and', 
        param: [
          {
            func: 'gt',
            param: [
              {
                func: 'count',
                param: [{func: 'variable', param: ['group'], isExpr: true}],
                isExpr: true
              }, 5
            ],
            isExpr: true
          }, 
          {
            func: 'lte', 
            param: [
              {
                func: 'sum', 
                param: [JSON.stringify({func: 'path', param: [VARY, 'b'], isExpr: true})],
                isExpr: true
              }, 7
            ],
            isExpr: true
          }
        ],
        isExpr: true
      }, 
      {
        func: 'eq',
        param: [
          {
            func: 'avg',
            param: [
              {
                func: 'sfw',
                param: [{
                  select_clause: {selectType: 0, selectExpr: VARY},
                  from_clause: {opType: 0, bindFrom: VARX, bindTo: 'y', at: undefined},
                  where_clause:   null,
                  groupby_clause: null,
                  having_clause:  null,
                  orderby_clause: null,
                  limit_clause:   null,
                  offset_clause:  null
                }], 
                isExpr: true
              }
            ],
            isExpr: true
          }, 9
        ],
        isExpr: true
      }
    ],
    isExpr: true
  };
  assertEquals(expected, ast);
}

// orderby clause
function testOrderby() {
  // no specify
  var parser = initParser('ORDER BY x.order, y');
  var ast = visitor.visit(parser.orderby_clause());
  var expected = [
    {expr: {func: 'path', param: [VARX, 'order'], isExpr: true}, asc: true},
    {expr: VARY, asc: true}
  ];
  assertEquals(expected, ast);

  // specify all asc/desc
  var parser = initParser('ORDER BY x.order asc, y desc');
  var ast = visitor.visit(parser.orderby_clause());
  var expected = [
    {expr: {func: 'path', param: [VARX, 'order'], isExpr: true}, asc: true},
    {expr: VARY, asc: false}
  ];
  assertEquals(expected, ast);

  // free for all
  var parser = initParser('ORDER BY x.order desc, y asc, z');
  var ast = visitor.visit(parser.orderby_clause());
  var expected = [
    {expr: {func: 'path', param: [VARX, 'order'], isExpr: true}, asc: false},
    {expr: VARY, asc: true},
    {expr: VARZ, asc: true}
  ];
  assertEquals(expected, ast);
}

// offset clause
function testOffset() {
  var parser = initParser('OFFSET 6');
  var ast = visitor.visit(parser.offset_clause());
  var expected = 6;
  assertEquals(expected, ast);
}

// limit clause
function testLimit() {
  var parser = initParser('limit 6');
  var ast = visitor.visit(parser.limit_clause());
  var expected = 6;
  assertEquals(expected, ast);
}

// entire queries
const SELCL = {selectType: 0, selectExpr: VARY};
const SELAGGRCL = {
  selectType: 2, 
  selectPairs: [{
    from: {func: 'avg', param: [JSON.stringify({func: 'path', param: [VARX, 'a'], isExpr: true})], isExpr: true},
    as: 'avg'
  }]
};
const FROMCL = {opType: 0, bindFrom: VARX, bindTo: 'y', at: undefined};
const WHERECL = TRIVIAL;
const GROUPBYCL = [{expr: {func: 'path', param: [VARY, 'b'], isExpr: true}, as: 'c'}];
const HAVINGCL = {
  func: 'gt',
  param: [{
    func: 'count', 
    param: [{func: 'variable', param: ['group'], isExpr: true}],
    isExpr: true
  }, 7],
  isExpr: true
};
const ORDERBYCL = [
  {expr: {func: 'path', param: [VARX, 'order'], isExpr: true}, asc: false},
  {expr: VARY, asc: true},
  {expr: VARZ, asc: true}
]; 
const ORDERBYAGGRCL = [
  {expr: {func: 'path', param: [VARX, 'order'], isExpr: true}, asc: false},
  {
    expr: {func: 'max', param: [JSON.stringify({func: 'path', param: [VARX, 'a'], isExpr: true})], isExpr: true}, 
    asc: true
  },
  {expr: VARZ, asc: true}
]; 
const OFFSETCL = 5;
const LIMITCL = 6;

const BASEAST = {
  select_clause:  SELCL,
  from_clause:    FROMCL,
  where_clause:   null,
  groupby_clause: null,
  having_clause:  null,
  orderby_clause: null,
  limit_clause:   null,
  offset_clause:  null,
}

function testSF() {
  var parser = initParser('SELECT ELEMENT y FROM x AS y');
  var ast = visitor.visit(parser.sfw_query());
  var expected = Object.assign({}, BASEAST);
  assertEquals(expected, ast);

  var parser = initParser('FROM x AS y SELECT ELEMENT y');
  var ast = visitor.visit(parser.sfw_query());
  assertEquals(expected, ast);
}

function testSFW() {
  var parser = initParser('SELECT ELEMENT y FROM x AS y WHERE 5 = 5');
  var ast = visitor.visit(parser.sfw_query());
  var expected = Object.assign({}, BASEAST);
  expected.where_clause = WHERECL;
  assertEquals(expected, ast);

  var parser = initParser('FROM x AS y WHERE 5 = 5 SELECT ELEMENT y');
  var ast = visitor.visit(parser.sfw_query());
  assertEquals(expected, ast);
}

function testSFWGH() {
  var parser = initParser('SELECT ELEMENT y FROM x AS y WHERE 5 = 5 GROUP BY y.b AS c HAVING count(group) > 7');
  var ast = visitor.visit(parser.sfw_query());
  var expected = Object.assign({}, BASEAST);
  expected.where_clause = WHERECL;
  expected.groupby_clause = GROUPBYCL;
  expected.having_clause = HAVINGCL;
  assertEquals(expected, ast);

  var parser = initParser('FROM x AS y WHERE 5 = 5 GROUP BY y.b AS c HAVING count(group) > 7 SELECT ELEMENT y');
  var ast = visitor.visit(parser.sfw_query());
  assertEquals(expected, ast);
}

function testSFWOOL() {
  var parser = initParser('SELECT ELEMENT y FROM x AS y WHERE 5 = 5 ORDER BY x.order DESC, y ASC, z LIMIT 6 OFFSET 5');
  var ast = visitor.visit(parser.sfw_query());
  var expected = Object.assign({}, BASEAST);
  expected.where_clause = WHERECL;
  expected.orderby_clause = ORDERBYCL;
  expected.limit_clause = LIMITCL;
  expected.offset_clause = OFFSETCL;
  assertEquals(expected, ast);

  var parser = initParser('FROM x AS y WHERE 5 = 5 ORDER BY x.order DESC, y ASC, z LIMIT 6 OFFSET 5 SELECT ELEMENT y');
  var ast = visitor.visit(parser.sfw_query());
  assertEquals(expected, ast);
} 

function testSFWAll() {
  var parser = initParser('SELECT avg(x.a) as avg FROM x AS y WHERE 5 = 5 GROUP BY y.b AS c HAVING count(group) > 7 ORDER BY x.order DESC, max(x.a) ASC, z LIMIT 6 OFFSET 5');
  var ast = visitor.visit(parser.sfw_query());
  var expected = Object.assign({}, BASEAST);
  expected.select_clause = SELAGGRCL;
  expected.where_clause = WHERECL;
  expected.groupby_clause = GROUPBYCL;
  expected.having_clause = HAVINGCL;
  expected.orderby_clause = ORDERBYAGGRCL;
  expected.limit_clause = LIMITCL;
  expected.offset_clause = OFFSETCL;
  assertEquals(expected, ast);

  var parser = initParser('FROM x AS y WHERE 5 = 5 GROUP BY y.b AS c HAVING count(group) > 7 ORDER BY x.order DESC, max(x.a) ASC, z LIMIT 6 OFFSET 5 SELECT avg(x.a) as avg ');
  var ast = visitor.visit(parser.sfw_query());
  assertEquals(expected, ast);
}



testExprValueInt();
testExprValueFloat();
testExprValueStr();
testExprVariable();
testExprPath();
testExprArrAcs();
testExprUnaryNeg();
testExprUnaryNot();
testExprBinarySimple();
testExprBinaryNested();
testExprAggrNoKeyword();
testExprAggrWithKeyword();
testExprFuncname();
testExprObj();
testExprArr();
testExprBag();
testExprSFW();
testSelectElement();
testSelectAttr();
testSelectSQL();
testFromRange();
testFromRangePair();
testFromComma();
testFromInnerCorr();
testFromLeftCorr();
testFromFullCorr();
testFromInnerJoin();
testFromLeftJoin();
testFromRightJoin();
testFromFullJoin();
testFromInnerFlatten();
testFromOuterFlatten();
testWhere();
testGroupby();
testHaving();
testOrderby();
testOffset();
testLimit();
testSF();
testSFW();
testSFWGH();


