/**
 * Integrated testing.
 * test full queries by using both version and compare the result of the query. 
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

var evalQueryRegular = require('../queryprocessor.js').evalQuery;
var evalQueryPiped = require('../pipedqueryprocessor.js').evalQuery;
var bagify = require('../pipedqueryprocessor.js').bagify;

var totalTest = 0;
var passed = 0;

function assertEquals(expected, actual) {

  totalTest++;

  var resultStackLine = new Error().stack.split('\n')[2].trim();
  var funcName = resultStackLine.split(' ')[1];
  var line = resultStackLine.split(':').reverse()[1];

  // since for this one, the output is compared across query processors but it's hard
  // to guarantee that both of them are not making the same mistakes to pass the test
  // on success the output will be printed to stderr for further judgments.

  if ( (expected === actual) 
    || (expected.__isBag__ && _.isEqual(Multiset.from(expected), Multiset.from(actual)))
    || (expected.__isBag__ === undefined && _.isEqual(expected, actual))) {
    console.log('\x1b[32m%s\x1b[0m', 'Test ' + funcName + ' passed at line ' + line);
    console.error(expected);
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

function initAST(input) {
  var chars = new antlr4.InputStream(input);
  var lexer = new SqlppLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new SqlppParser(tokens);
  parser.buildParseTrees = true;
  return visitor.visit(parser.query());
}

const SENSORDB = {
  sensors: [
    [1.3, 2], 
    [0.7, 0.7, 0.9], 
    [0.3, 0.8, 1.1], 
    [0.7, 1.4]  
  ],
  named: bagify([
    {r: [1.3, 2], n: 'co'}, 
    {r: [0.7, 0.7, 0.9], n: 'no'}, 
    {r: [0.3, 0.8, 1.1], n: 'so2'}, 
    {r: [0.7, 1.4], n: 'co2'}  
  ])
};

const RSTDB = {
  R: bagify([
    {a: 1, b: 1}, 
    {a: 2, b: 2},
    {a: 2, b: 5}
  ]), 
  S: bagify([
    {c: 2, d: 2}, 
    {c: 2, d: 1}, 
    {c: 8, d: 7}
  ]),
  T: bagify([
    {e: [1, 2], f: 1},
    {e: [], f: 3},
    {e: [3, 4], f: 2}
  ]),
  U: bagify([
    {a: 2, b: 2},
    {a: 2, b: 5}
  ]), 
  V: bagify([
    {c: 2, d: 2}, 
    {c: 2, d: 1}
  ]),
};

const READINGSDB = {
  meters: { 
    co: [0.7, [0.5, 2]], 
    no2: ["repair"], 
    so2: [] 
  },
  readings: bagify([
    {co: 2.2},
    {co: 1.2, no2: [0.5, 2]},
    {co: 1.8, no2: 0.7}
  ]),
  gnpair: bagify([
    {gas: "co", num: 0.7}, 
    {gas: "no2", num: 0.5},
    {gas: "no2", num: 2}
  ]),
  cl2: [1,3,5,7,9],
  max: 2
};

const XYZDB = {data: bagify([
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
])};

function testSF() {

  var ast = initAST('SELECT ELEMENT r.co FROM readings AS r');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT ELEMENT {co: r.co, no2: r.no2} FROM readings AS r');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT ATTRIBUTE gas: val FROM meters AS {gas: val}');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y AS b, d.z FROM data AS d');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT r.b, s.d FROM R AS r INNER JOIN S AS s ON r.a = s.c');

  var resultRegular = evalQueryRegular(RSTDB, ast);
  var resultPiped = evalQueryPiped(RSTDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT r.b, s.d FROM R AS r LEFT JOIN S AS s ON r.a = s.c');

  var resultRegular = evalQueryRegular(RSTDB, ast);
  var resultPiped = evalQueryPiped(RSTDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT r.b, s.d FROM R AS r FULL JOIN S AS s ON r.a = s.c');

  var resultRegular = evalQueryRegular(RSTDB, ast);
  var resultPiped = evalQueryPiped(RSTDB, ast);

  assertEquals(resultRegular, resultPiped);
}


function testSFW() {

  var ast = initAST('SELECT ELEMENT r FROM sensors AS s, s AS r WHERE r < 1');

  var resultRegular = evalQueryRegular(SENSORDB, ast);
  var resultPiped = evalQueryPiped(SENSORDB, ast);

  assertEquals(resultRegular, resultPiped);
 

  var ast = initAST('SELECT r.b, s.d FROM R AS r INNER CORRELATE (FROM S AS s WHERE r.a = s.c SELECT ELEMENT s) AS s');

  var resultRegular = evalQueryRegular(RSTDB, ast);
  var resultPiped = evalQueryPiped(RSTDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT r.b, s.d FROM R AS r LEFT CORRELATE (FROM S AS s WHERE r.a != s.c SELECT ELEMENT s) AS s');

  var resultRegular = evalQueryRegular(RSTDB, ast);
  var resultPiped = evalQueryPiped(RSTDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT ELEMENT n.r FROM named AS n WHERE n.r[2] = 0.7');

  var resultRegular = evalQueryRegular(SENSORDB, ast);
  var resultPiped = evalQueryPiped(SENSORDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT ELEMENT {a: r.a, b: r.b, c: s.c, d: s.d} FROM R AS r INNER JOIN S AS s ON r.a <= s.d WHERE r.b <> s.d');

  var resultRegular = evalQueryRegular(RSTDB, ast);
  var resultPiped = evalQueryPiped(RSTDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT ATTRIBUTE gas: val FROM meters AS {gas: val} WHERE val[1] > 1');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);
}

// up to having
function testSFWGH() {

  var ast = initAST('SELECT d.x FROM data AS d GROUP BY d.x');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT avg(d.x) AS avg, sum(d.z) AS y FROM data AS d GROUP BY d.y');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT avg(d.x) AS avg, sum(d.z) AS z FROM data AS d GROUP BY d.y HAVING d.y == \'n\' OR min(d.z) >= 200');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT count(group) AS count, sum(d.z) AS z FROM data AS d GROUP BY d.y HAVING count(*) >= 3');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT ELEMENT group FROM data AS d GROUP BY d.y');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT avg(d.x) AS avg, sum(d.z) AS z FROM data AS d WHERE d.z <> 100 GROUP BY d.y HAVING d.y == \'n\' OR min(d.z) >= 200');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT count(group) AS count, sum(d.z) AS z FROM data AS d WHERE d.z != 200 GROUP BY d.y HAVING count(*) > 1');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT count(*) AS count, r AS r FROM sensors AS s, s AS r GROUP BY r');

  var resultRegular = evalQueryRegular(SENSORDB, ast);
  var resultPiped = evalQueryPiped(SENSORDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('FROM gnpair AS r GROUP BY r.gas AS g SELECT ELEMENT {gas: g, count: count(group), avg: avg(FROM group AS p SELECT ELEMENT p.r.num)');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);
}

// no groupby, up to the end
function testSFWOLO() {

  var ast = initAST('SELECT d.x FROM data AS d ORDER BY d.x');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y DESC, d.x DESC, d.z DESC');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d WHERE d.x > 6 OR d.y == \'o\' ORDER BY d.y, d.x DESC, d.z');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  // limit clause. Edge cases for limit number =0, <len, =len, >len
  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 0');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 5');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 10');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);

  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 20');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  // offset. similar cases with limit
  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z OFFSET 0');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z OFFSET 5');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z OFFSET 10');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);

  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z OFFSET 20');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  // mix limit and offset
  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 4 OFFSET 4');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 5 OFFSET 5');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 5 OFFSET 6');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);

  var ast = initAST('SELECT d.x, d.y, d.z FROM data AS d ORDER BY d.y, d.x DESC, d.z LIMIT 6 OFFSET 5');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  // paper example
  var ast = initAST('FROM readings AS r WHERE r.co < max ORDER BY r.no2 LIMIT 2 SELECT ELEMENT r.no2');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);
}

// any legal SFW SQL++ query (without set operation). Mostly for group by mixed with order by 
// and all kinds of aggregate functions. 
function testSFWAny() {

  var ast = initAST('SELECT count(d.x) AS count, sum(d.z) AS sum FROM data AS d GROUP BY d.y ORDER BY count(d.x), sum(d.z) DESC');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('FROM gnpair AS r GROUP BY r.gas AS g ORDER BY g OFFSET 1 SELECT ELEMENT {gas: g, count: count(group), avg: avg(FROM group AS p SELECT ELEMENT p.r.num)');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);

  // more complicated examples are welcomed...
}

function testExprQuery() {

  var ast = initAST('data');

  var resultRegular = evalQueryRegular(XYZDB, ast);
  var resultPiped = evalQueryPiped(XYZDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('meters.co');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('meters.co[2][1]');

  var resultRegular = evalQueryRegular(READINGSDB, ast);
  var resultPiped = evalQueryPiped(READINGSDB, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('1 + 1 = 2');

  var resultRegular = evalQueryRegular({}, ast);
  var resultPiped = evalQueryPiped({}, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('{{ {x: 1}, {y: 2} }}');

  var resultRegular = evalQueryRegular({}, ast);
  var resultPiped = evalQueryPiped({}, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('true');

  var resultRegular = evalQueryRegular({}, ast);
  var resultPiped = evalQueryPiped({}, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('false');

  var resultRegular = evalQueryRegular({}, ast);
  var resultPiped = evalQueryPiped({}, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('null');

  var resultRegular = evalQueryRegular({}, ast);
  var resultPiped = evalQueryPiped({}, ast);

  assertEquals(resultRegular, resultPiped);


  var ast = initAST('undefined');

  var resultRegular = evalQueryRegular({}, ast);
  var resultPiped = evalQueryPiped({}, ast);

  assertEquals(resultRegular, resultPiped);
  // and more if wanted. but these are rather boring...
}

testSF();
testSFW();
testSFWGH();
testSFWOLO();
testSFWAny();
testExprQuery();

printSummary();


