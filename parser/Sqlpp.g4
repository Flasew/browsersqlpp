grammar Sqlpp;

/* Parser rules */
query       
  : sfw_query
  | expr
  ;

sfw_query
  : select_clause from_clause (where_clause)? (groupby_clause)? (having_clause)? (setop_clause)? (orderby_clause)? (limit_clause)? (offset_clause)?
  | from_clause (where_clause)? (groupby_clause)? (having_clause)? (setop_clause)? (orderby_clause)? (limit_clause)? (offset_clause)? select_clause
  ;

select_clause
  : K_SELECT K_ELEMENT expr                                         #SelElement
  | K_SELECT K_ATTRIBUTE attrname=expr ':' attrval=expr             #SelAttr
  | K_SELECT expr (K_AS attr_name)? (',' expr (K_AS attr_name)?)*   #SQLSel
  ;

from_clause
  : K_FROM from_item
  ;

from_item
  : expr K_AS asvar=variable (K_AT atvar=variable)?                                           #FromRange
  | expr K_AS '{' attrname=variable ':' attrval=variable '}'                                  #FromRangePair
  | lhs=from_item (op=K_INNER | op=K_LEFT K_OUTER?) K_CORRELATE?    rhs=from_item             #FromILCorr
  | lhs=from_item op=K_FULL K_OUTER? K_CORRELATE?                   rhs=from_item K_ON expr   #FromFull
  | lhs=from_item op=','                                            rhs=from_item             #FromComma
  | lhs=from_item op=(K_INNER | K_LEFT | K_RIGHT | K_FULL) K_JOIN   rhs=from_item K_ON expr   #FromJoin
  | op=(K_INNER | K_OUTER) K_FLATTEN '(' lexpr=expr K_AS lvar=variable ',' rexpr=expr K_AS rvar=variable ')'           #FromFlatten
  ;

where_clause
  : K_WHERE expr
  ;

groupby_clause
  : K_GROUP K_BY expr (K_AS variable)? (',' expr (K_AS variable)?)*
  ;

having_clause
  : K_HAVING expr
  ;

setop_clause
  : op=(K_UNION|K_INTERSECT|K_EXCEPT) (K_ALL)? sfw_query
  ;

orderby_clause
  : K_ORDER K_BY expr (K_ASC | K_DESC)? (',' expr (K_ASC | K_DESC)?)*
  ;

limit_clause
  : K_LIMIT expr
  ;

offset_clause
  : K_OFFSET expr
  ;

expr
  : sfw_query                                                                       #ExprNestSFW    // Nested query
  | '(' sfw_query ')'                                                               #ExprNestSFW
  | value                                                                           #ExprVal        // literal values
  | variable                                                                        #ExprVari       // variable
  | expr '.' attr_name                                                              #ExprPath       // path
  | arr=expr '[' pos=expr ']'                                                       #ExprArrAcs     // array access (TODO)
  | unary_op expr                                                                   #ExprUnary      // operators & function call
  | lhs=expr op='||'                         rhs=expr                               #ExprBinary
  | lhs=expr op=( '*' | '/' | '%' )          rhs=expr                               #ExprBinary
  | lhs=expr op=( '+' | '-' )                rhs=expr                               #ExprBinary
  | lhs=expr op=( '<' | '<=' | '>' | '>=' )  rhs=expr                               #ExprBinary
  | lhs=expr op=( '=' | '==' | '!=' | '<>' ) rhs=expr                               #ExprBinary
  | lhs=expr op=K_AND                        rhs=expr                               #ExprBinary
  | lhs=expr op=K_OR                         rhs=expr                               #ExprBinary
  | aggr=(K_SUM | K_MAX | K_MIN | K_COUNT | K_AVG) '(' (K_GROUP | AST | expr) ')'   #ExprAggr
  | func_name '(' expr? (',' expr)* ')'                                             #ExprFunc
  | '{' (attr_name ':' expr)? (',' attr_name ':' expr)* '}'                         #ExprObj        // object 
  | '[' expr? (',' expr)* ']'                                                       #ExprArr        // array
  | '{{' expr? (',' expr)* '}}'                                                     #ExprBag        // bag (TODO)
  | '(' expr ')'                                                                    #ExprParan
  ;

unary_op
  : '-'
  | '+'
  | '~'
  | K_NOT
  ;

keyword
 : K_SELECT

 | K_ELEMENT
 | K_ATTRIBUTE

 | K_FROM

 | K_AS
 | K_AT

 | K_INNER
 | K_LEFT
 | K_RIGHT
 | K_FULL
 | K_OUTER
 | K_JOIN
 | K_CORRELATE
 | K_ON
 | K_FLATTEN

 | K_WHERE

 | K_GROUP
 | K_BY

 | K_HAVING

 | K_UNION
 | K_INTERSECT
 | K_EXCEPT
 | K_ALL

 | K_ORDER
 | K_ASC
 | K_DESC

 | K_LIMIT

 | K_OFFSET

 | K_NOT
 | K_AND
 | K_OR

 | K_SUM
 | K_MIN
 | K_MAX
 | K_AVG
 | K_COUNT
 ;

value
  : STRLITERAL
  | NUMBER
  ;

variable
  : VAR_NAME
  | keyword
  ; 

func_name
  : VAR_NAME
  | keyword
  ;

attr_name
  : VAR_NAME
  | keyword
  ;

/* Lexer rules */

// keywords
K_SELECT: S E L E C T;

K_ELEMENT: E L E M E N T;
K_ATTRIBUTE: A T T R I B U T E;

K_FROM: F R O M;

K_AS: A S;
K_AT: A T;

K_INNER: I N N E R;
K_LEFT: L E F T;
K_RIGHT: R I G H T;
K_FULL: F U L L;
K_OUTER: O U T E R;
K_JOIN: J O I N;
K_CORRELATE: C O R R E L A T E;
K_ON: O N;
K_FLATTEN: F L A T T E N;

K_WHERE: W H E R E;

K_GROUP: G R O U P;
K_BY: B Y;

K_HAVING: H A V I N G;

K_UNION: U N I O N;
K_INTERSECT: I N T E R S E C T;
K_EXCEPT: E X C E P T;
K_ALL: A L L;

K_ORDER: O R D E R;
K_ASC: A S C;
K_DESC: D E S C;

K_LIMIT: L I M I T;

K_OFFSET: O F F S E T;

K_NOT: N O T;
K_AND: A N D;
K_OR: O R;

K_SUM: S U M;
K_MIN: M I N;
K_MAX: M A X;
K_AVG: A V G;
K_COUNT: C O U N T;

STRLITERAL
  : '\'' (~'\'' | '\'\'')* '\''
  | '"' (~'"'| '""')* '"'
  ;

NUMBER
  : DIGIT+ ( '.' DIGIT* )? ( E [-+]? DIGIT+ )?
  | '.' DIGIT+ ( E [-+]? DIGIT+ )?
  ;

AST
  : '*'
  ;

VAR_NAME
  : [a-zA-Z_] [a-zA-Z0-9_]*
  ;

WS
  : [ \u000B\t\r\n] -> channel(HIDDEN)
  ;



fragment DIGIT : [0-9];

fragment A : [aA];
fragment B : [bB];
fragment C : [cC];
fragment D : [dD];
fragment E : [eE];
fragment F : [fF];
fragment G : [gG];
fragment H : [hH];
fragment I : [iI];
fragment J : [jJ];
fragment K : [kK];
fragment L : [lL];
fragment M : [mM];
fragment N : [nN];
fragment O : [oO];
fragment P : [pP];
fragment Q : [qQ];
fragment R : [rR];
fragment S : [sS];
fragment T : [tT];
fragment U : [uU];
fragment V : [vV];
fragment W : [wW];
fragment X : [xX];
fragment Y : [yY];
fragment Z : [zZ];