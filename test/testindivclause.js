/**
 * Unit testing each iterator and eval* in both edition.
 */
const util = require('../node_modules/util');
const antlr4 = require('../node_modules/antlr4/index');
const SqlppLexer = require('../parser/SqlppLexer').SqlppLexer;
const SqlppParser = require('../parser/SqlppParser').SqlppParser;
const SqlppVisitor = require('../parser/CustomVisitor').CustomVisitor;

var Multiset = require('../node_modules/mnemonist/multi-set');
var hash = require('../node_modules/object-hash/dist/object_hash.js');
var _ = require('../node_modules/lodash');
var visitor = new SqlppVisitor();

var rewire = require('../node_modules/rewire');
var p = rewire('../pipedqueryprocessor.js');
var r = rewire('../queryprocessor.js');

var totalTest = 0;
var passed = 0;

function assertEquals(expected, actual, arrIgnoreOrder=true) {

  totalTest++;

  var resultStackLine = new Error().stack.split('\n')[2].trim();
  var funcName = resultStackLine.split(' ')[1];
  var line = resultStackLine.split(':').reverse()[1];

  if ((arrIgnoreOrder && _.isEqual(Multiset.from(expected), Multiset.from(actual)))
    || (!arrIgnoreOrder && _.isEqual(expected, actual))) {
    console.log('\x1b[32m%s\x1b[0m', 'Test ' + funcName + ' passed at line ' + line);
    passed++;
  }
  else {
    console.log('\x1b[31m%s\x1b[0m', 'Test ' + funcName + ' FAILED at line ' + line);
    console.log('\x1b[31m%s\x1b[0m', 'Expected:\n ' + util.inspect(expected, false, null));
    console.log('\x1b[31m%s\x1b[0m', 'Actual:\n ' + util.inspect(actual, false, null));
  }
}

function printSummary() {
  console.log(passed + '/' + totalTest + ' tests passed.');
}

function initParser(input) {
  var chars = new antlr4.InputStream(input);
  var lexer = new SqlppLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new SqlppParser(tokens);
  parser.buildParseTrees = true;
  return parser;
}

const SENSORDB = {
  sensors: [
    [1.3, 2], 
    [0.7, 0.7, 0.9], 
    [0.3, 0.8, 1.1], 
    [0.7, 1.4]  
  ],
  named: [
    {r: [1.3, 2], n: 'co'}, 
    {r: [0.7, 0.7, 0.9], n: 'no'}, 
    {r: [0.3, 0.8, 1.1], n: 'so2'}, 
    {r: [0.7, 1.4], n: 'co2'}  
  ],
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
    {e: [1, 2], f: 1},
    {e: [], f: 3},
    {e: [3, 4], f: 2}
  ],
  U: [
    {a: 2, b: 2},
    {a: 2, b: 5}
  ], 
  V: [
    {c: 2, d: 2}, 
    {c: 2, d: 1}
  ],
};

const READINGSDB = {
  meters: { 
    co: [0.7, [0.5, 2]], 
    no2: ["repair"], 
    so2: [] 
  },
  readings: [
    {co: 2.2},
    {co: 1.2, no2: [0.5, 2]},
    {co: 1.8, no2: 0.7}
  ],
  cl2: [1,3,5,7,9],
  max: 5
};

const XYZDB = {data: [
  {x: 3,  y: 'o', z: 300},
  {x: 6,  y: 'n', z: 400},
  {x: 5,  y: 'n', z: 200},
  {x: 7,  y: 'm', z: 300},
  {x: 4,  y: 'n', z: 400},
  {x: 8,  y: 'm', z: 100},
  {x: 10, y: 'l', z: 0},
  {x: 1,  y: 'o', z: 300},
  {x: 2,  y: 'o', z: 100},
  {x: 9,  y: 'm', z: 300}
]};

var collectAll = p.__get__('collectAll');

// FROM clauses
var makeFromIterator = p.__get__('makeFromIterator');
var evalFrom = r.__get__('evalFrom');

function testFromRange() {

  var parser = initParser('FROM R as r');
  var ast = visitor.visit(parser.from_clause());
  var expected = [{r: {a: 1, b: 1}}, {r: {a: 2, b: 2}}, {r: {a: 2, b: 5}}];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);


  var parser = initParser('FROM sensors AS s AT p');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {s: [1.3, 2], p: 1}, 
    {s: [0.7, 0.7, 0.9], p: 2}, 
    {s: [0.3, 0.8, 1.1], p: 3}, 
    {s: [0.7, 1.4], p: 4}  
  ];

  var resultPiped = collectAll(makeFromIterator(SENSORDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(SENSORDB, ast)
  assertEquals(expected, resultReg);

}

function testFromRangePair() {

  var parser = initParser('FROM meters as {gas: val}');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {gas: 'co', val: [0.7, [0.5, 2]]}, 
    {gas: 'no2', val: ["repair"]}, 
    {gas: 'so2', val: []}
  ];

  var resultPiped = collectAll(makeFromIterator(READINGSDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(READINGSDB, ast)
  assertEquals(expected, resultReg);

}

// inner corr, inner flat, comma all use this implementation
function testCartesian() {
  
  // comma
  var parser = initParser('FROM R as r, S as s');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 1, b: 1}, s: {c: 2, d: 2}}, 
    {r: {a: 1, b: 1}, s: {c: 2, d: 1}}, 
    {r: {a: 1, b: 1}, s: {c: 8, d: 7}}, 
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}}, 
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}}, 
    {r: {a: 2, b: 2}, s: {c: 8, d: 7}}, 
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}}, 
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}, 
    {r: {a: 2, b: 5}, s: {c: 8, d: 7}} 
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

  // inner corr
  var parser = initParser('FROM R as r INNER S as s');
  var ast = visitor.visit(parser.from_clause());

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

}

function testInnerFlat() {
  // inner flatten
  var parser = initParser('FROM INNER FLATTEN (named AS x, x.r AS y)');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {x: {r: [1.3, 2], n: 'co'}, y: 1.3}, 
    {x: {r: [1.3, 2], n: 'co'}, y: 2}, 
    {x: {r: [0.7, 0.7, 0.9], n: 'no'}, y: 0.7}, 
    {x: {r: [0.7, 0.7, 0.9], n: 'no'}, y: 0.7}, 
    {x: {r: [0.7, 0.7, 0.9], n: 'no'}, y: 0.9}, 
    {x: {r: [0.3, 0.8, 1.1], n: 'so2'}, y: 0.3}, 
    {x: {r: [0.3, 0.8, 1.1], n: 'so2'}, y: 0.8}, 
    {x: {r: [0.3, 0.8, 1.1], n: 'so2'}, y: 1.1}, 
    {x: {r: [0.7, 1.4], n: 'co2'}, y: 0.7},
    {x: {r: [0.7, 1.4], n: 'co2'}, y: 1.4},
  ];

  var resultPiped = collectAll(makeFromIterator(SENSORDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(SENSORDB, ast)
  assertEquals(expected, resultReg);

  // another comma
  var parser = initParser('FROM sensors AS s, s AS r');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {s: [1.3, 2], r: 1.3}, 
    {s: [1.3, 2], r: 2}, 
    {s: [0.7, 0.7, 0.9], r: 0.7}, 
    {s: [0.7, 0.7, 0.9], r: 0.7}, 
    {s: [0.7, 0.7, 0.9], r: 0.9}, 
    {s: [0.3, 0.8, 1.1], r: 0.3}, 
    {s: [0.3, 0.8, 1.1], r: 0.8}, 
    {s: [0.3, 0.8, 1.1], r: 1.1}, 
    {s: [0.7, 1.4], r: 0.7},
    {s: [0.7, 1.4], r: 1.4}  
  ];

  var resultPiped = collectAll(makeFromIterator(SENSORDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(SENSORDB, ast)
  assertEquals(expected, resultReg);
}

function testInnerJoin() {
  var parser = initParser('FROM R AS r INNER JOIN S AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}},
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

}

function testLeftJoin() {
  var parser = initParser('FROM R AS r LEFT JOIN S AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 1, b: 1}, s: null},
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

  var parser = initParser('FROM U AS r LEFT JOIN V AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

}

function testLeftCorr() {

  var parser = initParser('FROM R AS r LEFT CORRELATE (FROM S AS s WHERE r.a = s.c SELECT ELEMENT s) AS s');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 1, b: 1}, s: null},
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);


  var parser = initParser('FROM U AS r LEFT CORRELATE (FROM V AS s WHERE r.a = s.c SELECT ELEMENT s) AS s');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

}

function testOuterFlat() {

  var parser = initParser('FROM OUTER FLATTEN (T AS t, t.e AS e)');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {t: {e: [1, 2], f: 1}, e: 1},
    {t: {e: [1, 2], f: 1}, e: 2},
    {t: {e: [3, 4], f: 2}, e: 3},
    {t: {e: [3, 4], f: 2}, e: 4},
    {t: {e: [], f: 3}, e: null}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);
}

function testRightJoin() {
  var parser = initParser('FROM R AS r RIGHT JOIN S AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: null, s: {c: 8, d: 7}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

  var parser = initParser('FROM U AS r RIGHT JOIN V AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);
}

function testFullJoin() {

  var parser = initParser('FROM R AS r FULL JOIN S AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: null, s: {c: 8, d: 7}},
    {r: {a: 1, b: 1}, s: null},
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);

  var parser = initParser('FROM U AS r FULL JOIN V AS s ON r.a = s.c');
  var ast = visitor.visit(parser.from_clause());
  var expected = [
    {r: {a: 2, b: 2}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 2}, s: {c: 2, d: 1}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 2}},
    {r: {a: 2, b: 5}, s: {c: 2, d: 1}}
  ];

  var resultPiped = collectAll(makeFromIterator(RSTDB, ast));
  assertEquals(expected, resultPiped);

  var resultReg = evalFrom(RSTDB, ast)
  assertEquals(expected, resultReg);
}

// from now on, assume that the FROM_RANGE op works as expected.
const AST_FROMDATA = visitor.visit(initParser('FROM data AS d').from_clause());
const BOUND_FROMDATA = collectAll(makeFromIterator(XYZDB, AST_FROMDATA));

// where clause
var FilterOperator = p.__get__('FilterOperator');
var evalWhere = r.__get__('evalWhere');

function testWhere() {

  var parser = initParser('WHERE d.x >= 5 AND d.y <> \'n\' OR d.z == 100');
  var ast = visitor.visit(parser.where_clause());
  var expected = [
    {d: {x: 2,  y: 'o', z: 100}},
    {d: {x: 7,  y: 'm', z: 300}},
    {d: {x: 8,  y: 'm', z: 100}},
    {d: {x: 9,  y: 'm', z: 300}},
    {d: {x: 10, y: 'l', z: 0}}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new FilterOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalWhere(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);

  // use envir variable
  var fromAST = visitor.visit(initParser('FROM cl2 AS cl2').from_clause());
  var fromResult = collectAll(makeFromIterator(READINGSDB, fromAST));

  var parser = initParser('WHERE cl2 <= max');
  var ast = visitor.visit(parser.where_clause());
  var expected = [{cl2: 1}, {cl2: 3}, {cl2: 5}];

  var fromIterator = makeFromIterator(READINGSDB, fromAST);
  var resultPiped = collectAll(new FilterOperator(READINGSDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalWhere(READINGSDB, fromResult, ast);
  assertEquals(expected, resultReg);
}

// group by clause 
var GroupbyOperator = p.__get__('GroupbyOperator');
var evalGroupby = r.__get__('evalGroupby');

function testGroupby() {

  // no as
  var parser = initParser('GROUP BY d.y');
  var ast = visitor.visit(parser.groupby_clause());
  var expected = [
    {d: {y: 'o'}, group: [{d: {x: 1,  y: 'o', z: 300}}, {d: {x: 2,  y: 'o', z: 100}}, {d: {x: 3,  y: 'o', z: 300}}]},
    {d: {y: 'n'}, group: [{d: {x: 4,  y: 'n', z: 400}}, {d: {x: 5,  y: 'n', z: 200}}, {d: {x: 6,  y: 'n', z: 400}}]},
    {d: {y: 'm'}, group: [{d: {x: 7,  y: 'm', z: 300}}, {d: {x: 8,  y: 'm', z: 100}}, {d: {x: 9,  y: 'm', z: 300}}]},
    {d: {y: 'l'}, group: [{d: {x: 10, y: 'l', z: 0}}]}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new GroupbyOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalGroupby(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);


  // with as
  var parser = initParser('GROUP BY d.y as ygr, d.z as zgr');
  var ast = visitor.visit(parser.groupby_clause());
  var expected = [
    {ygr: 'o', zgr: 300, group: [{d: {x: 1,  y: 'o', z: 300}}, {d: {x: 3,  y: 'o', z: 300}}]},
    {ygr: 'o', zgr: 100, group: [{d: {x: 2,  y: 'o', z: 100}}]},
    {ygr: 'n', zgr: 400, group: [{d: {x: 4,  y: 'n', z: 400}}, {d: {x: 6,  y: 'n', z: 400}}]},
    {ygr: 'n', zgr: 200, group: [{d: {x: 5,  y: 'n', z: 200}}]},
    {ygr: 'm', zgr: 300, group: [{d: {x: 7,  y: 'm', z: 300}}, {d: {x: 9,  y: 'm', z: 300}}]},
    {ygr: 'm', zgr: 100, group: [{d: {x: 8,  y: 'm', z: 100}}]},
    {ygr: 'l', zgr: 0, group: [{d: {x: 10, y: 'l', z: 0}}]}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new GroupbyOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalGroupby(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);


  // mixed
  var parser = initParser('GROUP BY d.y as ygr, d.z');
  var ast = visitor.visit(parser.groupby_clause());
  var expected = [
    {ygr: 'o', d: {z: 300}, group: [{d: {x: 1,  y: 'o', z: 300}}, {d: {x: 3,  y: 'o', z: 300}}]},
    {ygr: 'o', d: {z: 100}, group: [{d: {x: 2,  y: 'o', z: 100}}]},
    {ygr: 'n', d: {z: 400}, group: [{d: {x: 4,  y: 'n', z: 400}}, {d: {x: 6,  y: 'n', z: 400}}]},
    {ygr: 'n', d: {z: 200}, group: [{d: {x: 5,  y: 'n', z: 200}}]},
    {ygr: 'm', d: {z: 300}, group: [{d: {x: 7,  y: 'm', z: 300}}, {d: {x: 9,  y: 'm', z: 300}}]},
    {ygr: 'm', d: {z: 100}, group: [{d: {x: 8,  y: 'm', z: 100}}]},
    {ygr: 'l', d: {z: 0}, group: [{d: {x: 10, y: 'l', z: 0}}]}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new GroupbyOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalGroupby(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);
}

// having clause 
var evalHaving = r.__get__('evalHaving');

function testHaving() {

  // use the 'GROUP BY d.y as ygr, d.z as zgr' binding output in the last test.
  var groupbyAST = visitor.visit(initParser('GROUP BY d.y as ygr, d.z as zgr').groupby_clause());
  var groupbyResult = evalGroupby(XYZDB, BOUND_FROMDATA, groupbyAST);

  // no aggregate 
  var parser = initParser('HAVING ygr <> \'l\' and zgr <= 200');
  var ast = visitor.visit(parser.having_clause());
  var expected = [
    {ygr: 'o', zgr: 100, group: [{d: {x: 2,  y: 'o', z: 100}}]},
    {ygr: 'n', zgr: 200, group: [{d: {x: 5,  y: 'n', z: 200}}]},
    {ygr: 'm', zgr: 100, group: [{d: {x: 8,  y: 'm', z: 100}}]},
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var groupbyIter = new GroupbyOperator(XYZDB, groupbyAST, fromIterator);
  var resultPiped = collectAll(new FilterOperator(XYZDB, ast, groupbyIter));
  assertEquals(expected, resultPiped);

  var resultReg = evalHaving(XYZDB, groupbyResult, ast);
  assertEquals(expected, resultReg);

}

// order by clause
var OrderbyOperator = p.__get__('OrderbyOperator');
var evalOrderby = r.__get__('evalOrderby');

function testOrderby() {

  // simple order by
  var parser = initParser('ORDER BY d.x');
  var ast = visitor.visit(parser.orderby_clause());
  var expected = [
    {d: {x: 1,  y: 'o', z: 300}},
    {d: {x: 2,  y: 'o', z: 100}},
    {d: {x: 3,  y: 'o', z: 300}},
    {d: {x: 4,  y: 'n', z: 400}},
    {d: {x: 5,  y: 'n', z: 200}},
    {d: {x: 6,  y: 'n', z: 400}},
    {d: {x: 7,  y: 'm', z: 300}},
    {d: {x: 8,  y: 'm', z: 100}},
    {d: {x: 9,  y: 'm', z: 300}},
    {d: {x: 10, y: 'l', z: 0}}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new OrderbyOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalOrderby(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg, false);

  // a little bit more complicated
  var parser = initParser('ORDER BY d.y ASC, d.x DESC');
  var ast = visitor.visit(parser.orderby_clause());
  var expected = [
    {d: {x: 10, y: 'l', z: 0}},
    {d: {x: 9,  y: 'm', z: 300}},
    {d: {x: 8,  y: 'm', z: 100}},
    {d: {x: 7,  y: 'm', z: 300}},
    {d: {x: 6,  y: 'n', z: 400}},
    {d: {x: 5,  y: 'n', z: 200}},
    {d: {x: 4,  y: 'n', z: 400}},
    {d: {x: 3,  y: 'o', z: 300}},
    {d: {x: 2,  y: 'o', z: 100}},
    {d: {x: 1,  y: 'o', z: 300}}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new OrderbyOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalOrderby(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg, false);

  // mix mix mix
  var parser = initParser('ORDER BY d.y, d.z DESC, d.x ');
  var ast = visitor.visit(parser.orderby_clause());
  var expected = [
    {d: {x: 10, y: 'l', z: 0}},
    {d: {x: 7,  y: 'm', z: 300}},
    {d: {x: 9,  y: 'm', z: 300}},
    {d: {x: 8,  y: 'm', z: 100}},
    {d: {x: 4,  y: 'n', z: 400}},
    {d: {x: 6,  y: 'n', z: 400}},
    {d: {x: 5,  y: 'n', z: 200}},
    {d: {x: 1,  y: 'o', z: 300}},
    {d: {x: 3,  y: 'o', z: 300}},
    {d: {x: 2,  y: 'o', z: 100}}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(new OrderbyOperator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalOrderby(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg, false);
}

// offset clause
var OffsetOperator = p.__get__('OffsetOperator');
var evalOffset = r.__get__('evalOffset');

function testOffset() {

  // use the simple orderby output
  var orderbyAST = visitor.visit(initParser('ORDER BY d.x').orderby_clause());
  var orderbyResult = evalOrderby(XYZDB, BOUND_FROMDATA, orderbyAST);

  var parser = initParser('OFFSET 5');
  var ast = visitor.visit(parser.offset_clause());
  var expected = [
    {d: {x: 6,  y: 'n', z: 400}},
    {d: {x: 7,  y: 'm', z: 300}},
    {d: {x: 8,  y: 'm', z: 100}},
    {d: {x: 9,  y: 'm', z: 300}},
    {d: {x: 10, y: 'l', z: 0}}
  ];
  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var orderbyIterator = new OrderbyOperator(XYZDB, orderbyAST, fromIterator);
  var resultPiped = collectAll(new OffsetOperator(XYZDB, ast, orderbyIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalOffset(XYZDB, orderbyResult, ast);
  assertEquals(expected, resultReg, false);
  // use the simple orderby output
  var parser = initParser('OFFSET 10');
  var ast = visitor.visit(parser.offset_clause());
  var expected = [];
  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var orderbyIterator = new OrderbyOperator(XYZDB, orderbyAST, fromIterator);
  var resultPiped = collectAll(new OffsetOperator(XYZDB, ast, orderbyIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalOffset(XYZDB, orderbyResult, ast);
  assertEquals(expected, resultReg, false);


}

// limit clause
var LimitOperator = p.__get__('LimitOperator');
var evalLimit = r.__get__('evalLimit');

function testLimit() {
    // use the simple orderby output
  var orderbyAST = visitor.visit(initParser('ORDER BY d.x').orderby_clause());
  var orderbyResult = evalOrderby(XYZDB, BOUND_FROMDATA, orderbyAST);

  var parser = initParser('LIMIT 5');
  var ast = visitor.visit(parser.limit_clause());
  var expected = [
    {d: {x: 1,  y: 'o', z: 300}},
    {d: {x: 2,  y: 'o', z: 100}},
    {d: {x: 3,  y: 'o', z: 300}},
    {d: {x: 4,  y: 'n', z: 400}},
    {d: {x: 5,  y: 'n', z: 200}},
  ];
  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var orderbyIterator = new OrderbyOperator(XYZDB, orderbyAST, fromIterator);
  var resultPiped = collectAll(new LimitOperator(XYZDB, ast, orderbyIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalLimit(XYZDB, orderbyResult, ast);
  assertEquals(expected, resultReg, false);

  // use the simple orderby output
  var parser = initParser('LIMIT 10');
  var ast = visitor.visit(parser.limit_clause());
  var expected = [
    {d: {x: 1,  y: 'o', z: 300}},
    {d: {x: 2,  y: 'o', z: 100}},
    {d: {x: 3,  y: 'o', z: 300}},
    {d: {x: 4,  y: 'n', z: 400}},
    {d: {x: 5,  y: 'n', z: 200}},
    {d: {x: 6,  y: 'n', z: 400}},
    {d: {x: 7,  y: 'm', z: 300}},
    {d: {x: 8,  y: 'm', z: 100}},
    {d: {x: 9,  y: 'm', z: 300}},
    {d: {x: 10, y: 'l', z: 0}}
  ];
  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var orderbyIterator = new OrderbyOperator(XYZDB, orderbyAST, fromIterator);
  var resultPiped = collectAll(new LimitOperator(XYZDB, ast, orderbyIterator));
  assertEquals(expected, resultPiped, false);

  var resultReg = evalLimit(XYZDB, orderbyResult, ast);
  assertEquals(expected, resultReg, false);

}

// select clause
var makeSelectIterator = p.__get__('makeSelectIterator');
var evalSelect = r.__get__('evalSelect');

function testSelectElement() {

  var parser = initParser('SELECT ELEMENT d.x');
  var ast = visitor.visit(parser.select_clause());
  var expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(makeSelectIterator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalSelect(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);

  
  var fromAST = visitor.visit(initParser('FROM sensors AS s AT p, s AS r AT q').from_clause());
  var fromResult = collectAll(makeFromIterator(SENSORDB, fromAST));

  var parser = initParser('SELECT ELEMENT {r: r, p0: p, p1: q}');
  var ast = visitor.visit(parser.select_clause());
  var expected = [
    {r: 1.3, p0: 1, p1: 1},
    {r: 2,   p0: 1, p1: 2}, 
    {r: 0.7, p0: 2, p1: 1},
    {r: 0.7, p0: 2, p1: 2},
    {r: 0.9, p0: 2, p1: 3},
    {r: 0.3, p0: 3, p1: 1},
    {r: 0.8, p0: 3, p1: 2}, 
    {r: 1.1, p0: 3, p1: 3},
    {r: 0.7, p0: 4, p1: 1},
    {r: 1.4, p0: 4, p1: 2}
  ];

  var fromIterator = makeFromIterator(SENSORDB, fromAST);
  var resultPiped = collectAll(makeSelectIterator(SENSORDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalSelect(SENSORDB, fromResult, ast);
  assertEquals(expected, resultReg);

}

function testSelectAttr() {

  var fromAST = visitor.visit(initParser('FROM meters as {g: v}').from_clause());
  var fromResult = collectAll(makeFromIterator(READINGSDB, fromAST));

  var parser = initParser('SELECT ATTRIBUTE g: v');
  var ast = visitor.visit(parser.select_clause());
  var expected = {co: [0.7, [0.5, 2]], no2: ["repair"], so2: []};

  var fromIterator = makeFromIterator(READINGSDB, fromAST);
  var resultPiped = collectAll(makeSelectIterator(READINGSDB, ast, fromIterator))[0];
  assertEquals(expected, resultPiped);

  var resultReg = evalSelect(READINGSDB, fromResult, ast);
  assertEquals(expected, resultReg);
}

function testSelectSQL() {

  // no as
  var parser = initParser('SELECT d.x');
  var ast = visitor.visit(parser.select_clause());
  var expected = [
    {x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5},
    {x: 6}, {x: 7}, {x: 8}, {x: 9}, {x: 10}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(makeSelectIterator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalSelect(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);

  // with all as
  var parser = initParser('SELECT d.x AS a, d.y AS b');
  var ast = visitor.visit(parser.select_clause());
  var expected = [
    {a: 1, b: 'o'}, {a: 2, b: 'o'}, {a: 3, b: 'o'}, 
    {a: 4, b: 'n'}, {a: 5, b: 'n'}, {a: 6, b: 'n'}, 
    {a: 7, b: 'm'}, {a: 8, b: 'm'}, {a: 9, b: 'm'}, {a: 10, b: 'l'}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(makeSelectIterator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalSelect(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);

  // mixed
  var parser = initParser('SELECT d.x, d.y AS b, d.z');
  var ast = visitor.visit(parser.select_clause());
  var expected = [
    {x: 3,  b: 'o', z: 300},
    {x: 6,  b: 'n', z: 400},
    {x: 5,  b: 'n', z: 200},
    {x: 7,  b: 'm', z: 300},
    {x: 4,  b: 'n', z: 400},
    {x: 8,  b: 'm', z: 100},
    {x: 10, b: 'l', z: 0},
    {x: 1,  b: 'o', z: 300},
    {x: 2,  b: 'o', z: 100},
    {x: 9,  b: 'm', z: 300}
  ];

  var fromIterator = makeFromIterator(XYZDB, AST_FROMDATA);
  var resultPiped = collectAll(makeSelectIterator(XYZDB, ast, fromIterator));
  assertEquals(expected, resultPiped);

  var resultReg = evalSelect(XYZDB, BOUND_FROMDATA, ast);
  assertEquals(expected, resultReg);
}


testFromRange();
testFromRangePair();
testCartesian();
testInnerFlat();
testInnerJoin();
testLeftJoin();
testLeftCorr();
testOuterFlat();
testRightJoin();
testFullJoin();
testWhere();
testGroupby();
testHaving();
testOrderby();
testLimit();
testOffset();
testSelectElement();
testSelectAttr();
testSelectSQL();


printSummary();








