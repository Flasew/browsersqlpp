//for function testSelectElementSingleton(db)
// SELECT ELEMENT r.a
// FROM R AS r
var input1 = "{"R":[{"a":1,"b":1},{"a":2,"b":2},{"a":2,"b":5}],"S":[{"c":2,"d":2},{"c":2,"d":1},{"c":8,"d":7}],"T":[{"e":"1st","f":1},{"e":"2nd","f":2},{"e":"3rd","f":3}]}";
var input2 = "{"from":[{"opType":0,"bindFrom":{"func":"variable","param":["R"],"isExpr":true},"bindTo":"r"}],"where":true,"select":{"selectType":0,"selectExpr":{"func":"path","param":["r","a"],"isExpr":true}}}";


//for function testSelectElementObj(db)
// SELECT ELEMENT {gas: g, val: v}
// FROM reading AS {g: v}
var input1 = "{"reading":{"co":[0.7,[0.5,2]],"no2":["repair"],"so2":[]},"cl2":[1,3,5,7,9]}";
var input2 = "{"from":[{"opType":11,"bindFrom":{"func":"variable","param":["reading"],"isExpr":true},"bindTo":{"attrName":"g","attrVal":"v"}}],"where":true,"select":{"selectType":0,"selectExpr":{"func":"obj","param":[{"attrName":"gas","attrVal":{"func":"variable","param":["g"],"isExpr":true}},{"attrName":"val","attrVal":{"func":"variable","param":["v"],"isExpr":true}}],"isExpr":true}}}";


//for function testSelectElementArr(db)
// SELECT ELEMENT [g, v]
// FROM reading AS {g: v}
var input1 = "{"reading":{"co":[0.7,[0.5,2]],"no2":["repair"],"so2":[]},"cl2":[1,3,5,7,9]}";
var input2 = "{"from":[{"opType":11,"bindFrom":{"func":"variable","param":["reading"],"isExpr":true},"bindTo":{"attrName":"g","attrVal":"v"}}],"where":true,"select":{"selectType":0,"selectExpr":{"func":"arr","param":[{"func":"variable","param":["g"],"isExpr":true},{"func":"variable","param":["v"],"isExpr":true}],"isExpr":true}}}";


//for function testSelectAttribute(db)
// SELECT ATTRIBUTE t.e: t.f
// FROM T as t
var input1 = "{"R":[{"a":1,"b":1},{"a":2,"b":2},{"a":2,"b":5}],"S":[{"c":2,"d":2},{"c":2,"d":1},{"c":8,"d":7}],"T":[{"e":"1st","f":1},{"e":"2nd","f":2},{"e":"3rd","f":3}]}";
var input2 = "{"from":[{"opType":0,"bindFrom":{"func":"variable","param":["T"],"isExpr":true},"bindTo":"t"}],"where":true,"select":{"selectType":1,"selectAttrName":{"func":"path","param":["t","e"],"isExpr":true},"selectAttrVal":{"func":"path","param":["t","f"],"isExpr":true}}}";


//for function testSelectWithAs(db)
// SELECT x.b AS aaa, y.d as bbb
// FROM R as x, S as y
// WHERE x.a < y.c
var input1 = "{"R":[{"a":1,"b":1},{"a":2,"b":2},{"a":2,"b":5}],"S":[{"c":2,"d":2},{"c":2,"d":1},{"c":8,"d":7}],"T":[{"e":"1st","f":1},{"e":"2nd","f":2},{"e":"3rd","f":3}]}";
var input2 = "{"from":[{"opType":0,"bindFrom":{"func":"variable","param":["R"],"isExpr":true},"bindTo":"x"},{"opType":1,"rhs":{"opType":0,"bindFrom":{"func":"variable","param":["S"],"isExpr":true},"bindTo":"y"}}],"where":{"func":"lt","param":[{"func":"path","param":["x","a"],"isExpr":true},{"func":"path","param":["y","c"],"isExpr":true}],"isExpr":true},"select":{"selectType":2,"selectPairs":[{"from":{"func":"path","param":["x","b"],"isExpr":true},"as":"aaa"},{"from":{"func":"path","param":["y","d"],"isExpr":true},"as":"bbb"}]}}";


//for function testSelectNoAs(db)
// SELECT x.b, y.d
// FROM R as x, S as y
// WHERE x.a = y.c
var input1 = "{"R":[{"a":1,"b":1},{"a":2,"b":2},{"a":2,"b":5}],"S":[{"c":2,"d":2},{"c":2,"d":1},{"c":8,"d":7}],"T":[{"e":"1st","f":1},{"e":"2nd","f":2},{"e":"3rd","f":3}]}";
var input2 = "{"from":[{"opType":0,"bindFrom":{"func":"variable","param":["R"],"isExpr":true},"bindTo":"x"},{"opType":1,"rhs":{"opType":0,"bindFrom":{"func":"variable","param":["S"],"isExpr":true},"bindTo":"y"}}],"where":{"func":"eq","param":[{"func":"path","param":["x","a"],"isExpr":true},{"func":"path","param":["y","c"],"isExpr":true}],"isExpr":true},"select":{"selectType":2,"selectPairs":[{"from":{"func":"path","param":["x","b"],"isExpr":true}},{"from":{"func":"path","param":["y","d"],"isExpr":true}}]}}";


//for function testNest1(db)
// FROM    readings AS r
// SELECT  ELEMENT (
//   FROM    r AS {g:v}
//   WHERE   g = "no2"
//   SELECT  ATTRIBUTE g:v )
var input1 = "{"readings":[{"no2":0.6,"co":0.7,"co2":[0.5,2]},{"no2":0.5,"co":[0.4],"co2":1.3}]}";
var input2 = "{"from":[{"opType":0,"bindFrom":{"func":"variable","param":["readings"],"isExpr":true},"bindTo":"r"}],"where":true,"select":{"selectType":0,"selectExpr":{"func":"swf","param":[{"from":[{"opType":11,"bindFrom":{"func":"variable","param":["r"],"isExpr":true},"bindTo":{"attrName":"g","attrVal":"v"}}],"where":{"func":"eq","param":[{"func":"variable","param":["g"],"isExpr":true},"no2"],"isExpr":true},"select":{"selectType":1,"selectAttrName":{"func":"variable","param":["g"],"isExpr":true},"selectAttrVal":{"func":"variable","param":["v"],"isExpr":true}}}],"isExpr":true}}}";

