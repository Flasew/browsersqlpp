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
  if (ctx.expr() !== null) return this.visit(ctx.expr());
  else                     return this.visit(ctx.swf_query());
};


// Visit a parse tree produced by SqlppParser#swf_query.
SqlppVisitor.prototype.visitSwf_query = function(ctx) {
  return {
    select_clause: this.visit(ctx.select_clause()),
    from_clause:   this.visit(ctx.from_clause()),
    where_clause:  ctx.where_clause() === null ? true : this.visit(ctx.where_clause())
  };
};


// Visit a parse tree produced by SqlppParser#SelElement.
SqlppVisitor.prototype.visitSelElement = function(ctx) {
  return {
    selectType: 0, // SEL_TYPES.ELEMENT,
    selectExpr: this.visit(ctx.expr())
  };
};


// Visit a parse tree produced by SqlppParser#SelAttr.
SqlppVisitor.prototype.visitSelAttr = function(ctx) {
  return {
    selectType: 2, // SEL_TYPES.ATTRIBUTE,
    selectAttrName: this.visit(ctx.attrname),
    selectAttrVal:  this.visit(ctx.attrval)
  };
};


// TODO: Visit a parse tree produced by SqlppParser#SQLSel.
SqlppVisitor.prototype.visitSQLSel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#from_clause.
SqlppVisitor.prototype.visitFrom_clause = function(ctx) {
  return this.visit(ctx.from_item());
};


// Visit a parse tree produced by SqlppParser#FromILCorr.
SqlppVisitor.prototype.visitFromILCorr = function(ctx) {

  var op = ctx.op.text.toLowerCase();

  if (op === 'inner')   op = 6;
  else                  op = 7;

  return {
    opType: op,
    lhs: this.visit(ctx.lhs),
    rhs: this.visit(ctx.rhs)
  };

};


// Visit a parse tree produced by SqlppParser#FromJoin.
SqlppVisitor.prototype.visitFromJoin = function(ctx) {

  var op;
  
  switch(ctx.op.text.toLowerCase()) {
    case 'inner': op = 2; break;
    case 'left' : op = 3; break;
    case 'right': op = 4; break;
    case 'full' : op = 5; break;
  }

  return {
    opType: op,
    lhs: this.visit(ctx.lhs),
    rhs: this.visit(ctx.rhs),
    on:  this.visit(ctx.expr())
  };

};


// Visit a parse tree produced by SqlppParser#FromRange.
SqlppVisitor.prototype.visitFromRange = function(ctx) {
  return {
    opType:   0,
    bindFrom: this.visit(ctx.expr()),
    bindTo:   ctx.asvar.getText(),
    at:       ctx.atvar === null ? undefined : ctx.atvar.getText()
  }
};


// Visit a parse tree produced by SqlppParser#FromRangePair.
SqlppVisitor.prototype.visitFromRangePair = function(ctx) {
  return {
    opType:   11,
    bindFrom: this.visit(ctx.expr()),
    bindTo:   {
      attrName: ctx.attrname.getText(),
      attrVal : ctx.attrval.getText()
    }
  };
};


// TODO: Visit a parse tree produced by SqlppParser#FromFlatten. 
SqlppVisitor.prototype.visitFromFlatten = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromFull.
SqlppVisitor.prototype.visitFromFull = function(ctx) {
  return {
    opType: 8,
    lhs: this.visit(ctx.lhs),
    rhs: this.visit(ctx.rhs),
    on:  this.visit(ctx.expr())
  };
};


// Visit a parse tree produced by SqlppParser#FromComma.
SqlppVisitor.prototype.visitFromComma = function(ctx) {
  return {
    opType: 1,
    lhs: this.visit(ctx.lhs),
    rhs: this.visit(ctx.rhs)
  };
};


// Visit a parse tree produced by SqlppParser#where_clause.
SqlppVisitor.prototype.visitWhere_clause = function(ctx) {
  return this.visit(ctx.expr());
};


// Visit a parse tree produced by SqlppParser#ExprObj.
SqlppVisitor.prototype.visitExprObj = function(ctx) {
  return this.visitChildren(ctx);
};


// TODO: Visit a parse tree produced by SqlppParser#ExprBag.  
SqlppVisitor.prototype.visitExprBag = function(ctx) { // TODO
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprBinary.
SqlppVisitor.prototype.visitExprBinary = function(ctx) {
  var result = {isExpr: true};
  
  //ctx.op.getInputStream().getText(ctx.op.start, ctx.op.stop)

  switch (ctx.op.text.toLowerCase()) {
    case '||' :   result.func = 'concat'; break;
    case '*'  :   result.func = 'mul';    break;
    case '/'  :   result.func = 'div';    break;
    case '%'  :   result.func = 'mod';    break;
    case '+'  :   result.func = 'add';    break;
    case '-'  :   result.func = 'sub';    break;
    case '<'  :   result.func = 'lt' ;    break;
    case '<=' :   result.func = 'lte';    break;
    case '>'  :   result.func = 'gt' ;    break;
    case '>=' :   result.func = 'gte';    break;
    case '='  :   
    case '==' :   result.func = 'eq' ;    break;
    case '!=' :   
    case '<>' :   result.func = 'neq';    break;
    case 'and':   result.func = 'and';    break;
    case 'or' :   result.func = 'or' ;    break;
    default: throw {
      name: 'WORNG',
      Message: ctx.op.text.toLowerCase()
    };
  }

  result.param = [];
  result.param[0] = this.visit(ctx.lhs);
  result.param[1] = this.visit(ctx.rhs);

  result.isExpr = true;

  return result;
};


// Visit a parse tree produced by SqlppParser#ExprNestSWF.
SqlppVisitor.prototype.visitExprNestSWF = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprUnary.
SqlppVisitor.prototype.visitExprUnary = function(ctx) {
  return this.visitChildren(ctx);
};


// TODO Visit a parse tree produced by SqlppParser#ExprFunc.
SqlppVisitor.prototype.visitExprFunc = function(ctx) {
  // return {
  //   func: ctx.func_name().getText(),
  //   param: [],
  //   isExpr: true
  // };
};


// TODO: Visit a parse tree produced by SqlppParser#ExprArrAcs.
SqlppVisitor.prototype.visitExprArrAcs = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprVari.
SqlppVisitor.prototype.visitExprVari = function(ctx) {
  return {
    func: 'variable',
    param: [ctx.variable().getText()],
    isExpr: true
  };
};


// TODO: Visit a parse tree produced by SqlppParser#ExprPath.
SqlppVisitor.prototype.visitExprPath = function(ctx) {
  return {
    func: 'path',
    param: [
      this.visit(ctx.expr()),
      ctx.attr_name().getText()
    ],
    isExpr: true
  };
};


// Visit a parse tree produced by SqlppParser#ExprVal.
SqlppVisitor.prototype.visitExprVal = function(ctx) {
  return ctx.value().STRLITERAL() !== null ? ctx.value().STRLITERAL().getText() : Number(ctx.value().NUMBER().getText());
};


// Visit a parse tree produced by SqlppParser#ExprArr.
SqlppVisitor.prototype.visitExprArr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprParan.
SqlppVisitor.prototype.visitExprParan = function(ctx) {
  return this.visit(ctx.expr());
};


// Visit a parse tree produced by SqlppParser#unary_op.
SqlppVisitor.prototype.visitUnary_op = function(ctx) {
  
  var result = {};

  switch (ctx.unary_op().getText().toLowerCase()) {
    case '+': result.func = 'id';  break;
    case '-': result.func = 'neg'; break;
    case '~': 
    case 'not': result.func = 'not'; break;
  }

  result.param = [];
  result.param[0] = this.visit(ctx.expr());

  result.isExpr = true;

  return result;
};


// Visit a parse tree produced by SqlppParser#value.
SqlppVisitor.prototype.visitValue = function(ctx) {
  if (ctx.NUMBER() !== null)      return Number(ctx.NUMBER().getText());
  else                            return ctx.STRLITERAL().getText();
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