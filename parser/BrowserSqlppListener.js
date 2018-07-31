/**
 * SQL++ Grammar parser listener implementation.
 * See Sqlpp.g4 for grammar, SqlppListener.js for function prototype
 */

const antlr4 = require('antlr4/index');
const SqlppLexer = require('./SqlppLexer');
const SqlppParser = require('./SqlppParser');
var SqlppListener = require('./SqlppListener').SqlppListener;

// inherit the default listener
BrowserSqlppListener = function(query) {
  this.query = query;
  SqlppListener.call(this);
  return this;
}

BrowserSqlppListener.prototype = Object.create(SqlppListener.prototype);
BrowserSqlppListener.prototype.constructor = BrowserSqlppListener;

// Override listener methods

exports.BrowserSqlppListener = BrowserSqlppListener;