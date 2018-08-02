const antlr4 = require('antlr4/index');
const SqlppLexer = require('./SqlppLexer');
const SqlppParser = require('./SqlppParser');
var SqlppVisitor = require('./SqlppVisitor').SqlppVisitor;

CustomListener = function() {
    SqlppVisitor.call(this); // inherit default listener
    return this;
};

// Visit a parse tree produced by SqlppParser#query.
CustomVisitor.prototype.visitQuery = function(ctx) {
  if (ctx.expr() !== null) return this.visit(ctx.expr());
  else                     return this.visit(ctx.swf_query());
};


// Visit a parse tree produced by SqlppParser#swf_query.
CustomVisitor.prototype.visitSwf_query = function(ctx) {
  return {
    select_clause: this.visit(ctx.select_clause()),
    from_clause:   this.visit(ctx.from_clause()),
    where_clause:  ctx.where_clause() === null ? true : this.visit(ctx.where_clause())
  };
};


// Visit a parse tree produced by SqlppParser#SelElement.
CustomVisitor.prototype.visitSelElement = function(ctx) {
  return {
    selectType: 0, // SEL_TYPES.ELEMENT,
    selectExpr: this.visit(ctx.expr())
  };
};


// Visit a parse tree produced by SqlppParser#SelAttr.
CustomVisitor.prototype.visitSelAttr = function(ctx) {
  return {
    selectType: 1, // SEL_TYPES.ATTRIBUTE,
    selectAttrName: this.visit(ctx.attrname),
    selectAttrVal:  this.visit(ctx.attrval)
  };
};


// Visit a parse tree produced by SqlppParser#SQLSel.
// TODO: select *
CustomVisitor.prototype.visitSQLSel = function(ctx) {

  var result = {selectType: 2, selectPairs:[]};
  var resultPos = 0;

  for (var i = 0; i < ctx.children.length; i++) {
    
    if (ctx.children[i].getText().toLowerCase() === ',' 
      || ctx.children[i].getText().toLowerCase() === 'select') 
      continue;

    result.selectPairs[resultPos] = {
      from: this.visit(ctx.children[i++])
    };

    if (ctx.children[i] !== undefined && ctx.children[i].getText().toLowerCase() === 'as')
      result.selectPairs[resultPos].as = ctx.children[++i].getText();

    resultPos++;
  }
  // console.log('sqlsel');
  // console.log(ctx.expr());
  // console.log(ctx.attr_name());
  return result;
};


// Visit a parse tree produced by SqlppParser#from_clause.
CustomVisitor.prototype.visitFrom_clause = function(ctx) {
  return this.visit(ctx.from_item());
};


// Visit a parse tree produced by SqlppParser#FromILCorr.
CustomVisitor.prototype.visitFromILCorr = function(ctx) {

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
CustomVisitor.prototype.visitFromJoin = function(ctx) {

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
CustomVisitor.prototype.visitFromRange = function(ctx) {
  return {
    opType:   0,
    bindFrom: this.visit(ctx.expr()),
    bindTo:   ctx.asvar.getText(),
    at:       ctx.atvar === null ? undefined : ctx.atvar.getText()
  }
};


// Visit a parse tree produced by SqlppParser#FromRangePair.
CustomVisitor.prototype.visitFromRangePair = function(ctx) {
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
CustomVisitor.prototype.visitFromFlatten = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#FromFull.
CustomVisitor.prototype.visitFromFull = function(ctx) {
  return {
    opType: 8,
    lhs: this.visit(ctx.lhs),
    rhs: this.visit(ctx.rhs),
    on:  this.visit(ctx.expr())
  };
};


// Visit a parse tree produced by SqlppParser#FromComma.
CustomVisitor.prototype.visitFromComma = function(ctx) {
  return {
    opType: 1,
    lhs: this.visit(ctx.lhs),
    rhs: this.visit(ctx.rhs)
  };
};


// Visit a parse tree produced by SqlppParser#where_clause.
CustomVisitor.prototype.visitWhere_clause = function(ctx) {
  return this.visit(ctx.expr());
};


// Visit a parse tree produced by SqlppParser#ExprObj.
CustomVisitor.prototype.visitExprObj = function(ctx) {
  var result = {func: 'obj', param: [], isExpr: true};

  for (let i = 0; i < ctx.expr().length; i++) {
    result.param[i] = {
      attrName: ((ctx.attr_name())[i]).getText(),
      attrVal:  this.visit(ctx.expr()[i])
    };
  }

  return result;
};


// TODO: Visit a parse tree produced by SqlppParser#ExprBag.  
CustomVisitor.prototype.visitExprBag = function(ctx) { // TODO
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprBinary.
CustomVisitor.prototype.visitExprBinary = function(ctx) {
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
CustomVisitor.prototype.visitExprNestSWF = function(ctx) {
  return {
    func: 'swf',
    param: [this.visit(ctx.swf_query())],
    isExpr: true
  };
};


// Visit a parse tree produced by SqlppParser#ExprUnary.
CustomVisitor.prototype.visitExprUnary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprFunc.
CustomVisitor.prototype.visitExprFunc = function(ctx) {
  var result = {func: ctx.func_name().getText(), param: [], isExpr: true};

  for (let i = 0; i < ctx.expr().length; i++) {
    result.param[i] = this.visit(ctx.expr()[i]);
  }

  return result;
};


// TODO: Visit a parse tree produced by SqlppParser#ExprArrAcs.
CustomVisitor.prototype.visitExprArrAcs = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#ExprVari.
CustomVisitor.prototype.visitExprVari = function(ctx) {
  return {
    func: 'variable',
    param: [ctx.variable().getText()],
    isExpr: true
  };
};


// Visit a parse tree produced by SqlppParser#ExprPath.
CustomVisitor.prototype.visitExprPath = function(ctx) {
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
CustomVisitor.prototype.visitExprVal = function(ctx) {
  if (ctx.value().STRLITERAL() !== null) {
    var quotedtext = ctx.value().STRLITERAL().getText();
    return quotedtext.substring(1, quotedtext.length - 1);
  }

  return Number(ctx.value().NUMBER().getText());
};


// Visit a parse tree produced by SqlppParser#ExprArr.
CustomVisitor.prototype.visitExprArr = function(ctx) {
  var result = {func: 'arr', param: [], isExpr: true};

  for (let i = 0; i < ctx.expr().length; i++) {
    result.param[i] = this.visit(ctx.expr()[i]);
  }

  return result;
};


// Visit a parse tree produced by SqlppParser#ExprParan.
CustomVisitor.prototype.visitExprParan = function(ctx) {
  return this.visit(ctx.expr());
};


// Visit a parse tree produced by SqlppParser#unary_op.
CustomVisitor.prototype.visitUnary_op = function(ctx) {
  
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
CustomVisitor.prototype.visitValue = function(ctx) {
  if (ctx.NUMBER() !== null)      return Number(ctx.NUMBER().getText());
  else                            return ctx.STRLITERAL().getText();
};


// Visit a parse tree produced by SqlppParser#variable.
CustomVisitor.prototype.visitVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#func_name.
CustomVisitor.prototype.visitFunc_name = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlppParser#attr_name.
CustomVisitor.prototype.visitAttr_name = function(ctx) {
  return this.visitChildren(ctx);
};



exports.CustomVisitor = CustomVisitor;