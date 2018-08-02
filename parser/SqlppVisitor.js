// Generated from Sqlpp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by SqlppParser.

function SqlppVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

SqlppVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
SqlppVisitor.prototype.constructor = SqlppVisitor;

// Visit a parse tree produced by SqlppParser#query.
SqlppVisitor.prototype.visitQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#swf_query.
SqlppVisitor.prototype.visitSwf_query = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#SelElement.
SqlppVisitor.prototype.visitSelElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#SelAttr.
SqlppVisitor.prototype.visitSelAttr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#SQLSel.
SqlppVisitor.prototype.visitSQLSel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#from_clause.
SqlppVisitor.prototype.visitFrom_clause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromILCorr.
SqlppVisitor.prototype.visitFromILCorr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromJoin.
SqlppVisitor.prototype.visitFromJoin = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromRange.
SqlppVisitor.prototype.visitFromRange = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromRangePair.
SqlppVisitor.prototype.visitFromRangePair = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromFlatten.
SqlppVisitor.prototype.visitFromFlatten = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromFull.
SqlppVisitor.prototype.visitFromFull = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromComma.
SqlppVisitor.prototype.visitFromComma = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#where_clause.
SqlppVisitor.prototype.visitWhere_clause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprObj.
SqlppVisitor.prototype.visitExprObj = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprBag.
SqlppVisitor.prototype.visitExprBag = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprBinary.
SqlppVisitor.prototype.visitExprBinary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprNestSWF.
SqlppVisitor.prototype.visitExprNestSWF = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprUnary.
SqlppVisitor.prototype.visitExprUnary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprFunc.
SqlppVisitor.prototype.visitExprFunc = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprArrAcs.
SqlppVisitor.prototype.visitExprArrAcs = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprVari.
SqlppVisitor.prototype.visitExprVari = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprPath.
SqlppVisitor.prototype.visitExprPath = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprVal.
SqlppVisitor.prototype.visitExprVal = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprArr.
SqlppVisitor.prototype.visitExprArr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprParan.
SqlppVisitor.prototype.visitExprParan = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#unary_op.
SqlppVisitor.prototype.visitUnary_op = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#value.
SqlppVisitor.prototype.visitValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#variable.
SqlppVisitor.prototype.visitVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#func_name.
SqlppVisitor.prototype.visitFunc_name = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#attr_name.
SqlppVisitor.prototype.visitAttr_name = function(ctx) {
  return this.visitChildren(ctx);
};



exports.SqlppVisitor = SqlppVisitor;