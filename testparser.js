/**
 * Unit testing for parser.
 * Since the major purpose for this file is to test the visitors, 
 * only those clause with significant visitor code will be tested.
 */

const _ = require('./node_modules/underscore/underscore.js');
const util = require('./node_modules/util')
const antlr4 = require('./node_modules/antlr4/index');
const SqlppLexer = require('./parser/SqlppLexer').SqlppLexer;
const SqlppParser = require('./parser/SqlppParser').SqlppParser;
const SqlppVisitor = require('./parser/CustomVisitor').CustomVisitor;
var visitor = new SqlppVisitor();

const VARX = {func: 'variable', param: ['x'], isExpr: true};
const VARY = {func: 'variable', param: ['y'], isExpr: true};
const VARZ = {func: 'variable', param: ['z'], isExpr: true};

function assertEquals(expected, actual) {

  var resultStackLine = new Error().stack.split('\n')[2].trim();
  var funcName = resultStackLine.split(' ')[1];
  var line = resultStackLine.split(':').reverse()[1];

  if (_.isEqual(expected, actual))
    console.log('\x1b[32m%s\x1b[0m', 'Test ' + funcName + ' passed at line ' + line);
  else {
    console.log('\x1b[31m%s\x1b[0m', 'Test ' + funcName + ' FAILED at line ' + line);
    console.log('\x1b[31m%s\x1b[0m', '\tExpected: ' + util.inspect(expected, false, null));
    console.log('\x1b[31m%s\x1b[0m', '\tActual: ' + util.inspect(actual, false, null));
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

}

function testSelectAttr() {
  
}

function testSelectSQL() {
  
}

// from clause
function testFromRange() {

}

function testFromRangeAt() {

}

function testFromRangePair() {

}

function testFromComma() {

}

function testFromCommaInnerCorr() {

}

function testFromLeftCorr() {

}

function testFromFullCorr() {

}

function testFromInnerJoin() {
  
}

function testFromLeftJoin() {
  
}

function testFromRightJoin() {
  
}

function testFromFullJoin() {
  
}

function testFromInnerFlatten() {
  
}

function testFromOuterFlatten() {
  
}

// where clause
function testWhere() {

}

// groupby clause
function testGroupby() {

}

// having clause
function testHaving() {

}

// orderby clause
function testOrderby() {

}

// offset clause
function testOffset() {

}

// limit clause
function testLimit() {

}

// entire queries

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
testFromRangeAt();
testFromRangePair();
testFromComma();
testFromCommaInnerCorr();
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


