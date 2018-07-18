
// prefix logical operator. Each of the functions will take two array as arguments,
// and output an array of evaluation result corresponding to the input array's position.

var prefixLogicalFunc = function() {

  /* mathematical relation (also for string) */
  // ==
  var _eq = function(lhs, rhs) { 

    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        result.push(i === j);
    
    return result;
  }

  // !=
  var _neq = function(lhs, rhs) { 

    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        result.push(i !== j);
    
    return result;
  }

  // <
  var _lt = function(lhs, rhs) {

    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        result.push(i < j);
    
    return result;
  }

  // > 
  var _gt = function(lhs, rhs) {

    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        result.push(i > j);
    
    return result;
  }

  // <=
  var _lte = function(lhs, rhs) {

    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        if (i < j || i === j)
          result.push(true);
        else 
          result.push(false);
    
    return result;
  }

  // >= 
  var _gte = function(lhs, rhs) {

    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        if (i > j || i === j)
          result.push(true);
        else 
          result.push(false);
    
    return result;
  }

  /* boolean functions */
  // &&
  var _and = function(lhs, rhs) {
    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        result.push(i && j);
    
    return result;
  }

  // ||
  var _or = function(lhs, rhs) {
    var result = [];

    for (i of lhs) 
      for (j of rhs) 
        result.push(i || j);
    
    return result;
  }

  return {
    eq:   _eq,
    neq:  _neq,
    gt:   _gt,
    lt:   _lt,
    gte:  _gte,
    lte:  _lte,
    and:  _and,
    or:   _or
  }

};

// prefix arithmetic operators
var prefixArithFunc = function() {

  var _add = function(lhs, rhs) {
    return lhs + rhs;
  }

  var _sub = function(lhs, rhs) {
    return lhs - rhs;
  }

  var _mul = function(lhs, rhs) {
    return lhs * rhs;
  }

  var _div = function(lhs, rhs) {
    return lhs / rhs;
  }

  var _mod = function(lhs, rhs) {
    return lhs % rhs;
  }

  return {
    add: _add,
    sub: _sub,
    mul: _mul, 
    div: _div,
    mod: _mod,
  }

}