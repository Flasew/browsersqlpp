// Generated from Sqlpp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by SqlppParser.
function SqlppListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

SqlppListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
SqlppListener.prototype.constructor = SqlppListener;

// Enter a parse tree produced by SqlppParser#swf_query.
SqlppListener.prototype.enterSwf_query = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#swf_query.
SqlppListener.prototype.exitSwf_query = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#select_clause.
SqlppListener.prototype.enterSelect_clause = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#select_clause.
SqlppListener.prototype.exitSelect_clause = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#from_clause.
SqlppListener.prototype.enterFrom_clause = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#from_clause.
SqlppListener.prototype.exitFrom_clause = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#from_item.
SqlppListener.prototype.enterFrom_item = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#from_item.
SqlppListener.prototype.exitFrom_item = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#where_clause.
SqlppListener.prototype.enterWhere_clause = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#where_clause.
SqlppListener.prototype.exitWhere_clause = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#expr.
SqlppListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#expr.
SqlppListener.prototype.exitExpr = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#unary_op.
SqlppListener.prototype.enterUnary_op = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#unary_op.
SqlppListener.prototype.exitUnary_op = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#value.
SqlppListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#value.
SqlppListener.prototype.exitValue = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#variable.
SqlppListener.prototype.enterVariable = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#variable.
SqlppListener.prototype.exitVariable = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#func_name.
SqlppListener.prototype.enterFunc_name = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#func_name.
SqlppListener.prototype.exitFunc_name = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#attr_name.
SqlppListener.prototype.enterAttr_name = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#attr_name.
SqlppListener.prototype.exitAttr_name = function(ctx) {
};


// Enter a parse tree produced by SqlppParser#keyword.
SqlppListener.prototype.enterKeyword = function(ctx) {
};

// Exit a parse tree produced by SqlppParser#keyword.
SqlppListener.prototype.exitKeyword = function(ctx) {
};



exports.SqlppListener = SqlppListener;