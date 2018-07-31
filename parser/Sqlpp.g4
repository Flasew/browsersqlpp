grammar Sqlpp;

/* Parser rules */



select_clause
  : K_SELECT K_ELEMENT expr
  | K_SELECT K_ATTRIBUTE expr ':' expr
  | K_SELECT expr (K_AS attr_name)? (',' expr (K_AS attr_name)?)*
  ;

from_clause
  : K_FROM from_item
  ;

from_item
  : expr K_AS variable (K_AT variable)?
  | expr K_AS '{' variable ':' variable '}'
  | from_item (K_INNER | K_LEFT K_OUTER?) K_CORRELATE? from_item
  | from_item K_FULL K_OUTER? K_CORRELATE? from_item K_ON expr
  | from_item ',' from_item
  | from_item (K_INNER | K_LEFT | K_RIGHT | K_FULL) K_JOIN from_item K_ON expr
  | (K_INNER | K_OUTER) K_FLATTEN '(' expr K_AS variable ',' expr K_AS variable ')'
  ;

where_clause
  : expr
  ;

expr
  : value                                                       // literal values
  | variable                                                    // variable
  | expr '.' attr_name                                          // path
  | expr '[' expr ']'                                           // array access (TODO)
  | unary_op expr                                               // operators & function call
  | expr '||' expr
  | expr ( '*' | '/' | '%' ) expr
  | expr ( '+' | '-' ) expr
  | expr ( '<' | '<=' | '>' | '>=' ) expr
  | expr ( '=' | '==' | '!=' | '<>' ) expr
  | expr K_AND expr
  | expr K_OR expr
  | func_name '(' expr? (',' expr)* ')'
  | '{' (attr_name ':' expr)? (',' attr_name ':' expr)* '}'     // object 
  | '[' expr? (',' expr)* ']'                                   // array
  | '{{' expr? (',' expr)* '}}'                                 // bag (TODO)
  | '(' expr ')'
  ;

unary_op
  : '-'
  | '+'
  | '~'
  | K_NOT
  ;

value
  : STRLITERAL
  | NUMBER
  ;

variable
  : VAR_NAME
  ; 

func_name
  : VAR_NAME
  ;

attr_name
  : VAR_NAME
  ;

keyword
  : K_NOT
  | K_AND
  | K_OR
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

K_NOT: N O T;
K_AND: A N D;
K_OR: O R;

STRLITERAL
  : '\'' (~'\'' | '\'\'')* '\''
  ;

NUMBER
  : DIGIT+ ( '.' DIGIT* )? ( E [-+]? DIGIT+ )?
  | '.' DIGIT+ ( E [-+]? DIGIT+ )?
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