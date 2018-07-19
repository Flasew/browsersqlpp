
// prefix logical operator. Each of the functions will take two array as arguments,
// and output an array of evaluation result corresponding to the input array's position.

var prefixFuncCtor = function() {

  /* mathematical relation (also for string) */
  var _eq =  (lhs, rhs) => lhs === rhs;                   // ===
  var _neq = (lhs, rhs) => lhs !== rhs;                   // !==
  var _lt =  (lhs, rhs) => lhs < rhs;                     // <
  var _gt =  (lhs, rhs) => lhs > rhs;                     // >
  var _lte = (lhs, rhs) => lhs === rhs || lhs < rhs;      // <=
  var _gte = (lhs, rhs) => lhs === rhs || lhs > rhs;      // >=
  var _and = (lhs, rhs) => lhs && rhs;                    // &&
  var _or =  (lhs, rhs) => lhs || rhs;                    // ||

  var _add = (lhs, rhs) => lhs + rhs;
  var _sub = (lhs, rhs) => lhs - rhs;
  var _mul = (lhs, rhs) => lhs * rhs;
  var _div = (lhs, rhs) => lhs / rhs;
  var _mod = (lhs, rhs) => lhs % rhs;


  return {
    /* Logical */
    eq:   _eq,
    neq:  _neq,
    gt:   _gt,
    lt:   _lt,
    gte:  _gte,
    lte:  _lte,
    and:  _and,
    or:   _or,
    /* Arithmetical */
    add: _add,
    sub: _sub,
    mul: _mul, 
    div: _div,
    mod: _mod
    /* other related to the expr queries */

  }

};

// prefix arithmetic operators
var prefixArithFunc = function() {

  
  return {

  }

}