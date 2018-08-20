// Generated from Sqlpp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var SqlppVisitor = require('./SqlppVisitor').SqlppVisitor;

var grammarFileName = "Sqlpp.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003D\u0170\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0003\u0002\u0003",
    "\u0002\u0005\u0002)\n\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003.\n\u0003\u0003\u0003\u0005\u00031\n\u0003\u0003\u0003\u0005\u0003",
    "4\n\u0003\u0003\u0003\u0005\u00037\n\u0003\u0003\u0003\u0005\u0003:",
    "\n\u0003\u0003\u0003\u0005\u0003=\n\u0003\u0003\u0003\u0005\u0003@\n",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003D\n\u0003\u0003\u0003\u0005",
    "\u0003G\n\u0003\u0003\u0003\u0005\u0003J\n\u0003\u0003\u0003\u0005\u0003",
    "M\n\u0003\u0003\u0003\u0005\u0003P\n\u0003\u0003\u0003\u0005\u0003S",
    "\n\u0003\u0003\u0003\u0005\u0003V\n\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003Z\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0005\u0004i\n\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0005\u0004o\n\u0004\u0007\u0004q\n\u0004",
    "\f\u0004\u000e\u0004t\u000b\u0004\u0005\u0004v\n\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0005\u0006\u0081\n\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0005\u0006\u0097\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0005\u0006\u009d\n\u0006\u0005\u0006\u009f\n\u0006\u0003\u0006",
    "\u0005\u0006\u00a2\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u00ab\n\u0006",
    "\u0003\u0006\u0005\u0006\u00ae\n\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0007\u0006\u00bb\n\u0006\f\u0006\u000e",
    "\u0006\u00be\u000b\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b\u00c8\n\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0005\b\u00ce\n\b\u0007\b\u00d0\n\b\f\b\u000e\b\u00d3\u000b",
    "\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0005\n\u00da\n\n\u0003\n",
    "\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b",
    "\u00e2\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00e7",
    "\n\u000b\u0007\u000b\u00e9\n\u000b\f\u000b\u000e\u000b\u00ec\u000b\u000b",
    "\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0005\u000e\u0103\n\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u0109\n\u000e\u0003\u000e\u0003\u000e",
    "\u0007\u000e\u010d\n\u000e\f\u000e\u000e\u000e\u0110\u000b\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0005\u000e\u0119\n\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0007\u000e\u0120\n\u000e\f\u000e\u000e\u000e",
    "\u0123\u000b\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0128",
    "\n\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u012c\n\u000e\f\u000e\u000e",
    "\u000e\u012f\u000b\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e",
    "\u0134\n\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u0138\n\u000e\f\u000e",
    "\u000e\u000e\u013b\u000b\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u0142\n\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u0161\n\u000e\f\u000e",
    "\u000e\u000e\u0164\u000b\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003",
    "\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0013\u0003",
    "\u0013\u0003\u0013\u0002\u0004\n\u001a\u0014\u0002\u0004\u0006\b\n\f",
    "\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$\u0002\r\u0004",
    "\u0002\"\"&&\u0003\u0002\"%\u0003\u0002/1\u0003\u000245\u0003\u0002",
    ";?\u0004\u0002\r\u000eBB\u0003\u0002\u000f\u0010\u0003\u0002\u0011\u0014",
    "\u0003\u0002\u0015\u0018\u0005\u0002\u000f\u0010\u001b\u001b88\u0003",
    "\u0002@A\u0002\u01a1\u0002(\u0003\u0002\u0002\u0002\u0004Y\u0003\u0002",
    "\u0002\u0002\u0006u\u0003\u0002\u0002\u0002\bw\u0003\u0002\u0002\u0002",
    "\n\u0096\u0003\u0002\u0002\u0002\f\u00bf\u0003\u0002\u0002\u0002\u000e",
    "\u00c2\u0003\u0002\u0002\u0002\u0010\u00d4\u0003\u0002\u0002\u0002\u0012",
    "\u00d7\u0003\u0002\u0002\u0002\u0014\u00dd\u0003\u0002\u0002\u0002\u0016",
    "\u00ed\u0003\u0002\u0002\u0002\u0018\u00f0\u0003\u0002\u0002\u0002\u001a",
    "\u0141\u0003\u0002\u0002\u0002\u001c\u0165\u0003\u0002\u0002\u0002\u001e",
    "\u0167\u0003\u0002\u0002\u0002 \u0169\u0003\u0002\u0002\u0002\"\u016b",
    "\u0003\u0002\u0002\u0002$\u016d\u0003\u0002\u0002\u0002&)\u0005\u001a",
    "\u000e\u0002\')\u0005\u0004\u0003\u0002(&\u0003\u0002\u0002\u0002(\'",
    "\u0003\u0002\u0002\u0002)\u0003\u0003\u0002\u0002\u0002*+\u0005\u0006",
    "\u0004\u0002+-\u0005\b\u0005\u0002,.\u0005\f\u0007\u0002-,\u0003\u0002",
    "\u0002\u0002-.\u0003\u0002\u0002\u0002.0\u0003\u0002\u0002\u0002/1\u0005",
    "\u000e\b\u00020/\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u00021",
    "3\u0003\u0002\u0002\u000224\u0005\u0010\t\u000232\u0003\u0002\u0002",
    "\u000234\u0003\u0002\u0002\u000246\u0003\u0002\u0002\u000257\u0005\u0012",
    "\n\u000265\u0003\u0002\u0002\u000267\u0003\u0002\u0002\u000279\u0003",
    "\u0002\u0002\u00028:\u0005\u0014\u000b\u000298\u0003\u0002\u0002\u0002",
    "9:\u0003\u0002\u0002\u0002:<\u0003\u0002\u0002\u0002;=\u0005\u0016\f",
    "\u0002<;\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002=?\u0003\u0002",
    "\u0002\u0002>@\u0005\u0018\r\u0002?>\u0003\u0002\u0002\u0002?@\u0003",
    "\u0002\u0002\u0002@Z\u0003\u0002\u0002\u0002AC\u0005\b\u0005\u0002B",
    "D\u0005\f\u0007\u0002CB\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002",
    "\u0002DF\u0003\u0002\u0002\u0002EG\u0005\u000e\b\u0002FE\u0003\u0002",
    "\u0002\u0002FG\u0003\u0002\u0002\u0002GI\u0003\u0002\u0002\u0002HJ\u0005",
    "\u0010\t\u0002IH\u0003\u0002\u0002\u0002IJ\u0003\u0002\u0002\u0002J",
    "L\u0003\u0002\u0002\u0002KM\u0005\u0012\n\u0002LK\u0003\u0002\u0002",
    "\u0002LM\u0003\u0002\u0002\u0002MO\u0003\u0002\u0002\u0002NP\u0005\u0014",
    "\u000b\u0002ON\u0003\u0002\u0002\u0002OP\u0003\u0002\u0002\u0002PR\u0003",
    "\u0002\u0002\u0002QS\u0005\u0016\f\u0002RQ\u0003\u0002\u0002\u0002R",
    "S\u0003\u0002\u0002\u0002SU\u0003\u0002\u0002\u0002TV\u0005\u0018\r",
    "\u0002UT\u0003\u0002\u0002\u0002UV\u0003\u0002\u0002\u0002VW\u0003\u0002",
    "\u0002\u0002WX\u0005\u0006\u0004\u0002XZ\u0003\u0002\u0002\u0002Y*\u0003",
    "\u0002\u0002\u0002YA\u0003\u0002\u0002\u0002Z\u0005\u0003\u0002\u0002",
    "\u0002[\\\u0007\u001c\u0002\u0002\\]\u0007\u001d\u0002\u0002]v\u0005",
    "\u001a\u000e\u0002^_\u0007\u001c\u0002\u0002_`\u0007\u001e\u0002\u0002",
    "`a\u0005\u001a\u000e\u0002ab\u0007\u0003\u0002\u0002bc\u0005\u001a\u000e",
    "\u0002cv\u0003\u0002\u0002\u0002de\u0007\u001c\u0002\u0002eh\u0005\u001a",
    "\u000e\u0002fg\u0007 \u0002\u0002gi\u0005$\u0013\u0002hf\u0003\u0002",
    "\u0002\u0002hi\u0003\u0002\u0002\u0002ir\u0003\u0002\u0002\u0002jk\u0007",
    "\u0004\u0002\u0002kn\u0005\u001a\u000e\u0002lm\u0007 \u0002\u0002mo",
    "\u0005$\u0013\u0002nl\u0003\u0002\u0002\u0002no\u0003\u0002\u0002\u0002",
    "oq\u0003\u0002\u0002\u0002pj\u0003\u0002\u0002\u0002qt\u0003\u0002\u0002",
    "\u0002rp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002sv\u0003\u0002",
    "\u0002\u0002tr\u0003\u0002\u0002\u0002u[\u0003\u0002\u0002\u0002u^\u0003",
    "\u0002\u0002\u0002ud\u0003\u0002\u0002\u0002v\u0007\u0003\u0002\u0002",
    "\u0002wx\u0007\u001f\u0002\u0002xy\u0005\n\u0006\u0002y\t\u0003\u0002",
    "\u0002\u0002z{\b\u0006\u0001\u0002{|\u0005\u001a\u000e\u0002|}\u0007",
    " \u0002\u0002}\u0080\u0005 \u0011\u0002~\u007f\u0007!\u0002\u0002\u007f",
    "\u0081\u0005 \u0011\u0002\u0080~\u0003\u0002\u0002\u0002\u0080\u0081",
    "\u0003\u0002\u0002\u0002\u0081\u0097\u0003\u0002\u0002\u0002\u0082\u0083",
    "\u0005\u001a\u000e\u0002\u0083\u0084\u0007 \u0002\u0002\u0084\u0085",
    "\u0007\u0005\u0002\u0002\u0085\u0086\u0005 \u0011\u0002\u0086\u0087",
    "\u0007\u0003\u0002\u0002\u0087\u0088\u0005 \u0011\u0002\u0088\u0089",
    "\u0007\u0006\u0002\u0002\u0089\u0097\u0003\u0002\u0002\u0002\u008a\u008b",
    "\t\u0002\u0002\u0002\u008b\u008c\u0007*\u0002\u0002\u008c\u008d\u0007",
    "\u0007\u0002\u0002\u008d\u008e\u0005\u001a\u000e\u0002\u008e\u008f\u0007",
    " \u0002\u0002\u008f\u0090\u0005 \u0011\u0002\u0090\u0091\u0007\u0004",
    "\u0002\u0002\u0091\u0092\u0005\u001a\u000e\u0002\u0092\u0093\u0007 ",
    "\u0002\u0002\u0093\u0094\u0005 \u0011\u0002\u0094\u0095\u0007\b\u0002",
    "\u0002\u0095\u0097\u0003\u0002\u0002\u0002\u0096z\u0003\u0002\u0002",
    "\u0002\u0096\u0082\u0003\u0002\u0002\u0002\u0096\u008a\u0003\u0002\u0002",
    "\u0002\u0097\u00bc\u0003\u0002\u0002\u0002\u0098\u009e\f\u0007\u0002",
    "\u0002\u0099\u009f\u0007\"\u0002\u0002\u009a\u009c\u0007#\u0002\u0002",
    "\u009b\u009d\u0007&\u0002\u0002\u009c\u009b\u0003\u0002\u0002\u0002",
    "\u009c\u009d\u0003\u0002\u0002\u0002\u009d\u009f\u0003\u0002\u0002\u0002",
    "\u009e\u0099\u0003\u0002\u0002\u0002\u009e\u009a\u0003\u0002\u0002\u0002",
    "\u009f\u00a1\u0003\u0002\u0002\u0002\u00a0\u00a2\u0007(\u0002\u0002",
    "\u00a1\u00a0\u0003\u0002\u0002\u0002\u00a1\u00a2\u0003\u0002\u0002\u0002",
    "\u00a2\u00a3\u0003\u0002\u0002\u0002\u00a3\u00bb\u0005\n\u0006\b\u00a4",
    "\u00a5\f\u0005\u0002\u0002\u00a5\u00a6\u0007\u0004\u0002\u0002\u00a6",
    "\u00bb\u0005\n\u0006\u0006\u00a7\u00a8\f\u0006\u0002\u0002\u00a8\u00aa",
    "\u0007%\u0002\u0002\u00a9\u00ab\u0007&\u0002\u0002\u00aa\u00a9\u0003",
    "\u0002\u0002\u0002\u00aa\u00ab\u0003\u0002\u0002\u0002\u00ab\u00ad\u0003",
    "\u0002\u0002\u0002\u00ac\u00ae\u0007(\u0002\u0002\u00ad\u00ac\u0003",
    "\u0002\u0002\u0002\u00ad\u00ae\u0003\u0002\u0002\u0002\u00ae\u00af\u0003",
    "\u0002\u0002\u0002\u00af\u00b0\u0005\n\u0006\u0002\u00b0\u00b1\u0007",
    ")\u0002\u0002\u00b1\u00b2\u0005\u001a\u000e\u0002\u00b2\u00bb\u0003",
    "\u0002\u0002\u0002\u00b3\u00b4\f\u0004\u0002\u0002\u00b4\u00b5\t\u0003",
    "\u0002\u0002\u00b5\u00b6\u0007\'\u0002\u0002\u00b6\u00b7\u0005\n\u0006",
    "\u0002\u00b7\u00b8\u0007)\u0002\u0002\u00b8\u00b9\u0005\u001a\u000e",
    "\u0002\u00b9\u00bb\u0003\u0002\u0002\u0002\u00ba\u0098\u0003\u0002\u0002",
    "\u0002\u00ba\u00a4\u0003\u0002\u0002\u0002\u00ba\u00a7\u0003\u0002\u0002",
    "\u0002\u00ba\u00b3\u0003\u0002\u0002\u0002\u00bb\u00be\u0003\u0002\u0002",
    "\u0002\u00bc\u00ba\u0003\u0002\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002",
    "\u0002\u00bd\u000b\u0003\u0002\u0002\u0002\u00be\u00bc\u0003\u0002\u0002",
    "\u0002\u00bf\u00c0\u0007+\u0002\u0002\u00c0\u00c1\u0005\u001a\u000e",
    "\u0002\u00c1\r\u0003\u0002\u0002\u0002\u00c2\u00c3\u0007,\u0002\u0002",
    "\u00c3\u00c4\u0007-\u0002\u0002\u00c4\u00c7\u0005\u001a\u000e\u0002",
    "\u00c5\u00c6\u0007 \u0002\u0002\u00c6\u00c8\u0005 \u0011\u0002\u00c7",
    "\u00c5\u0003\u0002\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002\u0002\u00c8",
    "\u00d1\u0003\u0002\u0002\u0002\u00c9\u00ca\u0007\u0004\u0002\u0002\u00ca",
    "\u00cd\u0005\u001a\u000e\u0002\u00cb\u00cc\u0007 \u0002\u0002\u00cc",
    "\u00ce\u0005 \u0011\u0002\u00cd\u00cb\u0003\u0002\u0002\u0002\u00cd",
    "\u00ce\u0003\u0002\u0002\u0002\u00ce\u00d0\u0003\u0002\u0002\u0002\u00cf",
    "\u00c9\u0003\u0002\u0002\u0002\u00d0\u00d3\u0003\u0002\u0002\u0002\u00d1",
    "\u00cf\u0003\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002\u0002\u0002\u00d2",
    "\u000f\u0003\u0002\u0002\u0002\u00d3\u00d1\u0003\u0002\u0002\u0002\u00d4",
    "\u00d5\u0007.\u0002\u0002\u00d5\u00d6\u0005\u001a\u000e\u0002\u00d6",
    "\u0011\u0003\u0002\u0002\u0002\u00d7\u00d9\t\u0004\u0002\u0002\u00d8",
    "\u00da\u00072\u0002\u0002\u00d9\u00d8\u0003\u0002\u0002\u0002\u00d9",
    "\u00da\u0003\u0002\u0002\u0002\u00da\u00db\u0003\u0002\u0002\u0002\u00db",
    "\u00dc\u0005\u0004\u0003\u0002\u00dc\u0013\u0003\u0002\u0002\u0002\u00dd",
    "\u00de\u00073\u0002\u0002\u00de\u00df\u0007-\u0002\u0002\u00df\u00e1",
    "\u0005\u001a\u000e\u0002\u00e0\u00e2\t\u0005\u0002\u0002\u00e1\u00e0",
    "\u0003\u0002\u0002\u0002\u00e1\u00e2\u0003\u0002\u0002\u0002\u00e2\u00ea",
    "\u0003\u0002\u0002\u0002\u00e3\u00e4\u0007\u0004\u0002\u0002\u00e4\u00e6",
    "\u0005\u001a\u000e\u0002\u00e5\u00e7\t\u0005\u0002\u0002\u00e6\u00e5",
    "\u0003\u0002\u0002\u0002\u00e6\u00e7\u0003\u0002\u0002\u0002\u00e7\u00e9",
    "\u0003\u0002\u0002\u0002\u00e8\u00e3\u0003\u0002\u0002\u0002\u00e9\u00ec",
    "\u0003\u0002\u0002\u0002\u00ea\u00e8\u0003\u0002\u0002\u0002\u00ea\u00eb",
    "\u0003\u0002\u0002\u0002\u00eb\u0015\u0003\u0002\u0002\u0002\u00ec\u00ea",
    "\u0003\u0002\u0002\u0002\u00ed\u00ee\u00076\u0002\u0002\u00ee\u00ef",
    "\u0005\u001a\u000e\u0002\u00ef\u0017\u0003\u0002\u0002\u0002\u00f0\u00f1",
    "\u00077\u0002\u0002\u00f1\u00f2\u0005\u001a\u000e\u0002\u00f2\u0019",
    "\u0003\u0002\u0002\u0002\u00f3\u00f4\b\u000e\u0001\u0002\u00f4\u00f5",
    "\u0007\u0007\u0002\u0002\u00f5\u00f6\u0005\u0004\u0003\u0002\u00f6\u00f7",
    "\u0007\b\u0002\u0002\u00f7\u0142\u0003\u0002\u0002\u0002\u00f8\u0142",
    "\u0005\u001e\u0010\u0002\u00f9\u0142\u0005 \u0011\u0002\u00fa\u00fb",
    "\u0005\u001c\u000f\u0002\u00fb\u00fc\u0005\u001a\u000e\u0010\u00fc\u0142",
    "\u0003\u0002\u0002\u0002\u00fd\u00fe\t\u0006\u0002\u0002\u00fe\u0102",
    "\u0007\u0007\u0002\u0002\u00ff\u0103\u0007,\u0002\u0002\u0100\u0103",
    "\u0007B\u0002\u0002\u0101\u0103\u0005\u001a\u000e\u0002\u0102\u00ff",
    "\u0003\u0002\u0002\u0002\u0102\u0100\u0003\u0002\u0002\u0002\u0102\u0101",
    "\u0003\u0002\u0002\u0002\u0103\u0104\u0003\u0002\u0002\u0002\u0104\u0142",
    "\u0007\b\u0002\u0002\u0105\u0106\u0005\"\u0012\u0002\u0106\u0108\u0007",
    "\u0007\u0002\u0002\u0107\u0109\u0005\u001a\u000e\u0002\u0108\u0107\u0003",
    "\u0002\u0002\u0002\u0108\u0109\u0003\u0002\u0002\u0002\u0109\u010e\u0003",
    "\u0002\u0002\u0002\u010a\u010b\u0007\u0004\u0002\u0002\u010b\u010d\u0005",
    "\u001a\u000e\u0002\u010c\u010a\u0003\u0002\u0002\u0002\u010d\u0110\u0003",
    "\u0002\u0002\u0002\u010e\u010c\u0003\u0002\u0002\u0002\u010e\u010f\u0003",
    "\u0002\u0002\u0002\u010f\u0111\u0003\u0002\u0002\u0002\u0110\u010e\u0003",
    "\u0002\u0002\u0002\u0111\u0112\u0007\b\u0002\u0002\u0112\u0142\u0003",
    "\u0002\u0002\u0002\u0113\u0118\u0007\u0005\u0002\u0002\u0114\u0115\u0005",
    "$\u0013\u0002\u0115\u0116\u0007\u0003\u0002\u0002\u0116\u0117\u0005",
    "\u001a\u000e\u0002\u0117\u0119\u0003\u0002\u0002\u0002\u0118\u0114\u0003",
    "\u0002\u0002\u0002\u0118\u0119\u0003\u0002\u0002\u0002\u0119\u0121\u0003",
    "\u0002\u0002\u0002\u011a\u011b\u0007\u0004\u0002\u0002\u011b\u011c\u0005",
    "$\u0013\u0002\u011c\u011d\u0007\u0003\u0002\u0002\u011d\u011e\u0005",
    "\u001a\u000e\u0002\u011e\u0120\u0003\u0002\u0002\u0002\u011f\u011a\u0003",
    "\u0002\u0002\u0002\u0120\u0123\u0003\u0002\u0002\u0002\u0121\u011f\u0003",
    "\u0002\u0002\u0002\u0121\u0122\u0003\u0002\u0002\u0002\u0122\u0124\u0003",
    "\u0002\u0002\u0002\u0123\u0121\u0003\u0002\u0002\u0002\u0124\u0142\u0007",
    "\u0006\u0002\u0002\u0125\u0127\u0007\n\u0002\u0002\u0126\u0128\u0005",
    "\u001a\u000e\u0002\u0127\u0126\u0003\u0002\u0002\u0002\u0127\u0128\u0003",
    "\u0002\u0002\u0002\u0128\u012d\u0003\u0002\u0002\u0002\u0129\u012a\u0007",
    "\u0004\u0002\u0002\u012a\u012c\u0005\u001a\u000e\u0002\u012b\u0129\u0003",
    "\u0002\u0002\u0002\u012c\u012f\u0003\u0002\u0002\u0002\u012d\u012b\u0003",
    "\u0002\u0002\u0002\u012d\u012e\u0003\u0002\u0002\u0002\u012e\u0130\u0003",
    "\u0002\u0002\u0002\u012f\u012d\u0003\u0002\u0002\u0002\u0130\u0142\u0007",
    "\u000b\u0002\u0002\u0131\u0133\u0007\u0019\u0002\u0002\u0132\u0134\u0005",
    "\u001a\u000e\u0002\u0133\u0132\u0003\u0002\u0002\u0002\u0133\u0134\u0003",
    "\u0002\u0002\u0002\u0134\u0139\u0003\u0002\u0002\u0002\u0135\u0136\u0007",
    "\u0004\u0002\u0002\u0136\u0138\u0005\u001a\u000e\u0002\u0137\u0135\u0003",
    "\u0002\u0002\u0002\u0138\u013b\u0003\u0002\u0002\u0002\u0139\u0137\u0003",
    "\u0002\u0002\u0002\u0139\u013a\u0003\u0002\u0002\u0002\u013a\u013c\u0003",
    "\u0002\u0002\u0002\u013b\u0139\u0003\u0002\u0002\u0002\u013c\u0142\u0007",
    "\u001a\u0002\u0002\u013d\u013e\u0007\u0007\u0002\u0002\u013e\u013f\u0005",
    "\u001a\u000e\u0002\u013f\u0140\u0007\b\u0002\u0002\u0140\u0142\u0003",
    "\u0002\u0002\u0002\u0141\u00f3\u0003\u0002\u0002\u0002\u0141\u00f8\u0003",
    "\u0002\u0002\u0002\u0141\u00f9\u0003\u0002\u0002\u0002\u0141\u00fa\u0003",
    "\u0002\u0002\u0002\u0141\u00fd\u0003\u0002\u0002\u0002\u0141\u0105\u0003",
    "\u0002\u0002\u0002\u0141\u0113\u0003\u0002\u0002\u0002\u0141\u0125\u0003",
    "\u0002\u0002\u0002\u0141\u0131\u0003\u0002\u0002\u0002\u0141\u013d\u0003",
    "\u0002\u0002\u0002\u0142\u0162\u0003\u0002\u0002\u0002\u0143\u0144\f",
    "\u000f\u0002\u0002\u0144\u0145\u0007\f\u0002\u0002\u0145\u0161\u0005",
    "\u001a\u000e\u0010\u0146\u0147\f\u000e\u0002\u0002\u0147\u0148\t\u0007",
    "\u0002\u0002\u0148\u0161\u0005\u001a\u000e\u000f\u0149\u014a\f\r\u0002",
    "\u0002\u014a\u014b\t\b\u0002\u0002\u014b\u0161\u0005\u001a\u000e\u000e",
    "\u014c\u014d\f\f\u0002\u0002\u014d\u014e\t\t\u0002\u0002\u014e\u0161",
    "\u0005\u001a\u000e\r\u014f\u0150\f\u000b\u0002\u0002\u0150\u0151\t\n",
    "\u0002\u0002\u0151\u0161\u0005\u001a\u000e\f\u0152\u0153\f\n\u0002\u0002",
    "\u0153\u0154\u00079\u0002\u0002\u0154\u0161\u0005\u001a\u000e\u000b",
    "\u0155\u0156\f\t\u0002\u0002\u0156\u0157\u0007:\u0002\u0002\u0157\u0161",
    "\u0005\u001a\u000e\n\u0158\u0159\f\u0012\u0002\u0002\u0159\u015a\u0007",
    "\t\u0002\u0002\u015a\u0161\u0005$\u0013\u0002\u015b\u015c\f\u0011\u0002",
    "\u0002\u015c\u015d\u0007\n\u0002\u0002\u015d\u015e\u0005\u001a\u000e",
    "\u0002\u015e\u015f\u0007\u000b\u0002\u0002\u015f\u0161\u0003\u0002\u0002",
    "\u0002\u0160\u0143\u0003\u0002\u0002\u0002\u0160\u0146\u0003\u0002\u0002",
    "\u0002\u0160\u0149\u0003\u0002\u0002\u0002\u0160\u014c\u0003\u0002\u0002",
    "\u0002\u0160\u014f\u0003\u0002\u0002\u0002\u0160\u0152\u0003\u0002\u0002",
    "\u0002\u0160\u0155\u0003\u0002\u0002\u0002\u0160\u0158\u0003\u0002\u0002",
    "\u0002\u0160\u015b\u0003\u0002\u0002\u0002\u0161\u0164\u0003\u0002\u0002",
    "\u0002\u0162\u0160\u0003\u0002\u0002\u0002\u0162\u0163\u0003\u0002\u0002",
    "\u0002\u0163\u001b\u0003\u0002\u0002\u0002\u0164\u0162\u0003\u0002\u0002",
    "\u0002\u0165\u0166\t\u000b\u0002\u0002\u0166\u001d\u0003\u0002\u0002",
    "\u0002\u0167\u0168\t\f\u0002\u0002\u0168\u001f\u0003\u0002\u0002\u0002",
    "\u0169\u016a\u0007C\u0002\u0002\u016a!\u0003\u0002\u0002\u0002\u016b",
    "\u016c\u0007C\u0002\u0002\u016c#\u0003\u0002\u0002\u0002\u016d\u016e",
    "\u0007C\u0002\u0002\u016e%\u0003\u0002\u0002\u00022(-0369<?CFILORUY",
    "hnru\u0080\u0096\u009c\u009e\u00a1\u00aa\u00ad\u00ba\u00bc\u00c7\u00cd",
    "\u00d1\u00d9\u00e1\u00e6\u00ea\u0102\u0108\u010e\u0118\u0121\u0127\u012d",
    "\u0133\u0139\u0141\u0160\u0162"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "':'", "','", "'{'", "'}'", "'('", "')'", "'.'", 
                     "'['", "']'", "'||'", "'/'", "'%'", "'+'", "'-'", "'<'", 
                     "'<='", "'>'", "'>='", "'='", "'=='", "'!='", "'<>'", 
                     "'{{'", "'}}'", "'~'", null, null, null, null, null, 
                     null, null, null, null, null, null, null, null, null, 
                     null, null, null, null, null, null, null, null, null, 
                     null, null, null, null, null, null, null, null, null, 
                     null, null, null, null, null, null, "'*'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, "K_SELECT", 
                      "K_ELEMENT", "K_ATTRIBUTE", "K_FROM", "K_AS", "K_AT", 
                      "K_INNER", "K_LEFT", "K_RIGHT", "K_FULL", "K_OUTER", 
                      "K_JOIN", "K_CORRELATE", "K_ON", "K_FLATTEN", "K_WHERE", 
                      "K_GROUP", "K_BY", "K_HAVING", "K_UNION", "K_INTERSECT", 
                      "K_EXCEPT", "K_ALL", "K_ORDER", "K_ASC", "K_DESC", 
                      "K_LIMIT", "K_OFFSET", "K_NOT", "K_AND", "K_OR", "K_SUM", 
                      "K_MIN", "K_MAX", "K_AVG", "K_COUNT", "STRLITERAL", 
                      "NUMBER", "AST", "VAR_NAME", "WS" ];

var ruleNames =  [ "query", "swf_query", "select_clause", "from_clause", 
                   "from_item", "where_clause", "groupby_clause", "having_clause", 
                   "setop_clause", "orderby_clause", "limit_clause", "offset_clause", 
                   "expr", "unary_op", "value", "variable", "func_name", 
                   "attr_name" ];

function SqlppParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

SqlppParser.prototype = Object.create(antlr4.Parser.prototype);
SqlppParser.prototype.constructor = SqlppParser;

Object.defineProperty(SqlppParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

SqlppParser.EOF = antlr4.Token.EOF;
SqlppParser.T__0 = 1;
SqlppParser.T__1 = 2;
SqlppParser.T__2 = 3;
SqlppParser.T__3 = 4;
SqlppParser.T__4 = 5;
SqlppParser.T__5 = 6;
SqlppParser.T__6 = 7;
SqlppParser.T__7 = 8;
SqlppParser.T__8 = 9;
SqlppParser.T__9 = 10;
SqlppParser.T__10 = 11;
SqlppParser.T__11 = 12;
SqlppParser.T__12 = 13;
SqlppParser.T__13 = 14;
SqlppParser.T__14 = 15;
SqlppParser.T__15 = 16;
SqlppParser.T__16 = 17;
SqlppParser.T__17 = 18;
SqlppParser.T__18 = 19;
SqlppParser.T__19 = 20;
SqlppParser.T__20 = 21;
SqlppParser.T__21 = 22;
SqlppParser.T__22 = 23;
SqlppParser.T__23 = 24;
SqlppParser.T__24 = 25;
SqlppParser.K_SELECT = 26;
SqlppParser.K_ELEMENT = 27;
SqlppParser.K_ATTRIBUTE = 28;
SqlppParser.K_FROM = 29;
SqlppParser.K_AS = 30;
SqlppParser.K_AT = 31;
SqlppParser.K_INNER = 32;
SqlppParser.K_LEFT = 33;
SqlppParser.K_RIGHT = 34;
SqlppParser.K_FULL = 35;
SqlppParser.K_OUTER = 36;
SqlppParser.K_JOIN = 37;
SqlppParser.K_CORRELATE = 38;
SqlppParser.K_ON = 39;
SqlppParser.K_FLATTEN = 40;
SqlppParser.K_WHERE = 41;
SqlppParser.K_GROUP = 42;
SqlppParser.K_BY = 43;
SqlppParser.K_HAVING = 44;
SqlppParser.K_UNION = 45;
SqlppParser.K_INTERSECT = 46;
SqlppParser.K_EXCEPT = 47;
SqlppParser.K_ALL = 48;
SqlppParser.K_ORDER = 49;
SqlppParser.K_ASC = 50;
SqlppParser.K_DESC = 51;
SqlppParser.K_LIMIT = 52;
SqlppParser.K_OFFSET = 53;
SqlppParser.K_NOT = 54;
SqlppParser.K_AND = 55;
SqlppParser.K_OR = 56;
SqlppParser.K_SUM = 57;
SqlppParser.K_MIN = 58;
SqlppParser.K_MAX = 59;
SqlppParser.K_AVG = 60;
SqlppParser.K_COUNT = 61;
SqlppParser.STRLITERAL = 62;
SqlppParser.NUMBER = 63;
SqlppParser.AST = 64;
SqlppParser.VAR_NAME = 65;
SqlppParser.WS = 66;

SqlppParser.RULE_query = 0;
SqlppParser.RULE_swf_query = 1;
SqlppParser.RULE_select_clause = 2;
SqlppParser.RULE_from_clause = 3;
SqlppParser.RULE_from_item = 4;
SqlppParser.RULE_where_clause = 5;
SqlppParser.RULE_groupby_clause = 6;
SqlppParser.RULE_having_clause = 7;
SqlppParser.RULE_setop_clause = 8;
SqlppParser.RULE_orderby_clause = 9;
SqlppParser.RULE_limit_clause = 10;
SqlppParser.RULE_offset_clause = 11;
SqlppParser.RULE_expr = 12;
SqlppParser.RULE_unary_op = 13;
SqlppParser.RULE_value = 14;
SqlppParser.RULE_variable = 15;
SqlppParser.RULE_func_name = 16;
SqlppParser.RULE_attr_name = 17;

function QueryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_query;
    return this;
}

QueryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QueryContext.prototype.constructor = QueryContext;

QueryContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

QueryContext.prototype.swf_query = function() {
    return this.getTypedRuleContext(Swf_queryContext,0);
};

QueryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitQuery(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.QueryContext = QueryContext;

SqlppParser.prototype.query = function() {

    var localctx = new QueryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, SqlppParser.RULE_query);
    try {
        this.state = 38;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SqlppParser.T__2:
        case SqlppParser.T__4:
        case SqlppParser.T__7:
        case SqlppParser.T__12:
        case SqlppParser.T__13:
        case SqlppParser.T__22:
        case SqlppParser.T__24:
        case SqlppParser.K_NOT:
        case SqlppParser.K_SUM:
        case SqlppParser.K_MIN:
        case SqlppParser.K_MAX:
        case SqlppParser.K_AVG:
        case SqlppParser.K_COUNT:
        case SqlppParser.STRLITERAL:
        case SqlppParser.NUMBER:
        case SqlppParser.VAR_NAME:
            this.enterOuterAlt(localctx, 1);
            this.state = 36;
            this.expr(0);
            break;
        case SqlppParser.K_SELECT:
        case SqlppParser.K_FROM:
            this.enterOuterAlt(localctx, 2);
            this.state = 37;
            this.swf_query();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Swf_queryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_swf_query;
    return this;
}

Swf_queryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Swf_queryContext.prototype.constructor = Swf_queryContext;

Swf_queryContext.prototype.select_clause = function() {
    return this.getTypedRuleContext(Select_clauseContext,0);
};

Swf_queryContext.prototype.from_clause = function() {
    return this.getTypedRuleContext(From_clauseContext,0);
};

Swf_queryContext.prototype.where_clause = function() {
    return this.getTypedRuleContext(Where_clauseContext,0);
};

Swf_queryContext.prototype.groupby_clause = function() {
    return this.getTypedRuleContext(Groupby_clauseContext,0);
};

Swf_queryContext.prototype.having_clause = function() {
    return this.getTypedRuleContext(Having_clauseContext,0);
};

Swf_queryContext.prototype.setop_clause = function() {
    return this.getTypedRuleContext(Setop_clauseContext,0);
};

Swf_queryContext.prototype.orderby_clause = function() {
    return this.getTypedRuleContext(Orderby_clauseContext,0);
};

Swf_queryContext.prototype.limit_clause = function() {
    return this.getTypedRuleContext(Limit_clauseContext,0);
};

Swf_queryContext.prototype.offset_clause = function() {
    return this.getTypedRuleContext(Offset_clauseContext,0);
};

Swf_queryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitSwf_query(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Swf_queryContext = Swf_queryContext;

SqlppParser.prototype.swf_query = function() {

    var localctx = new Swf_queryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, SqlppParser.RULE_swf_query);
    var _la = 0; // Token type
    try {
        this.state = 87;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SqlppParser.K_SELECT:
            this.enterOuterAlt(localctx, 1);
            this.state = 40;
            this.select_clause();
            this.state = 41;
            this.from_clause();
            this.state = 43;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_WHERE) {
                this.state = 42;
                this.where_clause();
            }

            this.state = 46;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_GROUP) {
                this.state = 45;
                this.groupby_clause();
            }

            this.state = 49;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_HAVING) {
                this.state = 48;
                this.having_clause();
            }

            this.state = 52;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 45)) & ~0x1f) == 0 && ((1 << (_la - 45)) & ((1 << (SqlppParser.K_UNION - 45)) | (1 << (SqlppParser.K_INTERSECT - 45)) | (1 << (SqlppParser.K_EXCEPT - 45)))) !== 0)) {
                this.state = 51;
                this.setop_clause();
            }

            this.state = 55;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
            if(la_===1) {
                this.state = 54;
                this.orderby_clause();

            }
            this.state = 58;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
            if(la_===1) {
                this.state = 57;
                this.limit_clause();

            }
            this.state = 61;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
            if(la_===1) {
                this.state = 60;
                this.offset_clause();

            }
            break;
        case SqlppParser.K_FROM:
            this.enterOuterAlt(localctx, 2);
            this.state = 63;
            this.from_clause();
            this.state = 65;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_WHERE) {
                this.state = 64;
                this.where_clause();
            }

            this.state = 68;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_GROUP) {
                this.state = 67;
                this.groupby_clause();
            }

            this.state = 71;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_HAVING) {
                this.state = 70;
                this.having_clause();
            }

            this.state = 74;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 45)) & ~0x1f) == 0 && ((1 << (_la - 45)) & ((1 << (SqlppParser.K_UNION - 45)) | (1 << (SqlppParser.K_INTERSECT - 45)) | (1 << (SqlppParser.K_EXCEPT - 45)))) !== 0)) {
                this.state = 73;
                this.setop_clause();
            }

            this.state = 77;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_ORDER) {
                this.state = 76;
                this.orderby_clause();
            }

            this.state = 80;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_LIMIT) {
                this.state = 79;
                this.limit_clause();
            }

            this.state = 83;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_OFFSET) {
                this.state = 82;
                this.offset_clause();
            }

            this.state = 85;
            this.select_clause();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Select_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_select_clause;
    return this;
}

Select_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Select_clauseContext.prototype.constructor = Select_clauseContext;


 
Select_clauseContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function SelAttrContext(parser, ctx) {
	Select_clauseContext.call(this, parser);
    this.attrname = null; // ExprContext;
    this.attrval = null; // ExprContext;
    Select_clauseContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SelAttrContext.prototype = Object.create(Select_clauseContext.prototype);
SelAttrContext.prototype.constructor = SelAttrContext;

SqlppParser.SelAttrContext = SelAttrContext;

SelAttrContext.prototype.K_SELECT = function() {
    return this.getToken(SqlppParser.K_SELECT, 0);
};

SelAttrContext.prototype.K_ATTRIBUTE = function() {
    return this.getToken(SqlppParser.K_ATTRIBUTE, 0);
};

SelAttrContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
SelAttrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitSelAttr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SQLSelContext(parser, ctx) {
	Select_clauseContext.call(this, parser);
    Select_clauseContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SQLSelContext.prototype = Object.create(Select_clauseContext.prototype);
SQLSelContext.prototype.constructor = SQLSelContext;

SqlppParser.SQLSelContext = SQLSelContext;

SQLSelContext.prototype.K_SELECT = function() {
    return this.getToken(SqlppParser.K_SELECT, 0);
};

SQLSelContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

SQLSelContext.prototype.K_AS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_AS);
    } else {
        return this.getToken(SqlppParser.K_AS, i);
    }
};


SQLSelContext.prototype.attr_name = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Attr_nameContext);
    } else {
        return this.getTypedRuleContext(Attr_nameContext,i);
    }
};
SQLSelContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitSQLSel(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SelElementContext(parser, ctx) {
	Select_clauseContext.call(this, parser);
    Select_clauseContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SelElementContext.prototype = Object.create(Select_clauseContext.prototype);
SelElementContext.prototype.constructor = SelElementContext;

SqlppParser.SelElementContext = SelElementContext;

SelElementContext.prototype.K_SELECT = function() {
    return this.getToken(SqlppParser.K_SELECT, 0);
};

SelElementContext.prototype.K_ELEMENT = function() {
    return this.getToken(SqlppParser.K_ELEMENT, 0);
};

SelElementContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
SelElementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitSelElement(this);
    } else {
        return visitor.visitChildren(this);
    }
};



SqlppParser.Select_clauseContext = Select_clauseContext;

SqlppParser.prototype.select_clause = function() {

    var localctx = new Select_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, SqlppParser.RULE_select_clause);
    var _la = 0; // Token type
    try {
        this.state = 115;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            localctx = new SelElementContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 89;
            this.match(SqlppParser.K_SELECT);
            this.state = 90;
            this.match(SqlppParser.K_ELEMENT);
            this.state = 91;
            this.expr(0);
            break;

        case 2:
            localctx = new SelAttrContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 92;
            this.match(SqlppParser.K_SELECT);
            this.state = 93;
            this.match(SqlppParser.K_ATTRIBUTE);
            this.state = 94;
            localctx.attrname = this.expr(0);
            this.state = 95;
            this.match(SqlppParser.T__0);
            this.state = 96;
            localctx.attrval = this.expr(0);
            break;

        case 3:
            localctx = new SQLSelContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 98;
            this.match(SqlppParser.K_SELECT);
            this.state = 99;
            this.expr(0);
            this.state = 102;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_AS) {
                this.state = 100;
                this.match(SqlppParser.K_AS);
                this.state = 101;
                this.attr_name();
            }

            this.state = 112;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 104;
                this.match(SqlppParser.T__1);
                this.state = 105;
                this.expr(0);
                this.state = 108;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===SqlppParser.K_AS) {
                    this.state = 106;
                    this.match(SqlppParser.K_AS);
                    this.state = 107;
                    this.attr_name();
                }

                this.state = 114;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function From_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_from_clause;
    return this;
}

From_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
From_clauseContext.prototype.constructor = From_clauseContext;

From_clauseContext.prototype.K_FROM = function() {
    return this.getToken(SqlppParser.K_FROM, 0);
};

From_clauseContext.prototype.from_item = function() {
    return this.getTypedRuleContext(From_itemContext,0);
};

From_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFrom_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.From_clauseContext = From_clauseContext;

SqlppParser.prototype.from_clause = function() {

    var localctx = new From_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, SqlppParser.RULE_from_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 117;
        this.match(SqlppParser.K_FROM);
        this.state = 118;
        this.from_item(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function From_itemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_from_item;
    return this;
}

From_itemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
From_itemContext.prototype.constructor = From_itemContext;


 
From_itemContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function FromILCorrContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.lhs = null; // From_itemContext;
    this.op = null; // Token;
    this.rhs = null; // From_itemContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromILCorrContext.prototype = Object.create(From_itemContext.prototype);
FromILCorrContext.prototype.constructor = FromILCorrContext;

SqlppParser.FromILCorrContext = FromILCorrContext;

FromILCorrContext.prototype.from_item = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(From_itemContext);
    } else {
        return this.getTypedRuleContext(From_itemContext,i);
    }
};

FromILCorrContext.prototype.K_INNER = function() {
    return this.getToken(SqlppParser.K_INNER, 0);
};

FromILCorrContext.prototype.K_LEFT = function() {
    return this.getToken(SqlppParser.K_LEFT, 0);
};

FromILCorrContext.prototype.K_CORRELATE = function() {
    return this.getToken(SqlppParser.K_CORRELATE, 0);
};

FromILCorrContext.prototype.K_OUTER = function() {
    return this.getToken(SqlppParser.K_OUTER, 0);
};
FromILCorrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromILCorr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FromJoinContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.lhs = null; // From_itemContext;
    this.op = null; // Token;
    this.rhs = null; // From_itemContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromJoinContext.prototype = Object.create(From_itemContext.prototype);
FromJoinContext.prototype.constructor = FromJoinContext;

SqlppParser.FromJoinContext = FromJoinContext;

FromJoinContext.prototype.K_JOIN = function() {
    return this.getToken(SqlppParser.K_JOIN, 0);
};

FromJoinContext.prototype.K_ON = function() {
    return this.getToken(SqlppParser.K_ON, 0);
};

FromJoinContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FromJoinContext.prototype.from_item = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(From_itemContext);
    } else {
        return this.getTypedRuleContext(From_itemContext,i);
    }
};

FromJoinContext.prototype.K_INNER = function() {
    return this.getToken(SqlppParser.K_INNER, 0);
};

FromJoinContext.prototype.K_LEFT = function() {
    return this.getToken(SqlppParser.K_LEFT, 0);
};

FromJoinContext.prototype.K_RIGHT = function() {
    return this.getToken(SqlppParser.K_RIGHT, 0);
};

FromJoinContext.prototype.K_FULL = function() {
    return this.getToken(SqlppParser.K_FULL, 0);
};
FromJoinContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromJoin(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FromRangeContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.asvar = null; // VariableContext;
    this.atvar = null; // VariableContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromRangeContext.prototype = Object.create(From_itemContext.prototype);
FromRangeContext.prototype.constructor = FromRangeContext;

SqlppParser.FromRangeContext = FromRangeContext;

FromRangeContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FromRangeContext.prototype.K_AS = function() {
    return this.getToken(SqlppParser.K_AS, 0);
};

FromRangeContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};

FromRangeContext.prototype.K_AT = function() {
    return this.getToken(SqlppParser.K_AT, 0);
};
FromRangeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromRange(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FromRangePairContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.attrname = null; // VariableContext;
    this.attrval = null; // VariableContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromRangePairContext.prototype = Object.create(From_itemContext.prototype);
FromRangePairContext.prototype.constructor = FromRangePairContext;

SqlppParser.FromRangePairContext = FromRangePairContext;

FromRangePairContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FromRangePairContext.prototype.K_AS = function() {
    return this.getToken(SqlppParser.K_AS, 0);
};

FromRangePairContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};
FromRangePairContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromRangePair(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FromFlattenContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.op = null; // Token;
    this.lexpr = null; // ExprContext;
    this.lvar = null; // VariableContext;
    this.rexpr = null; // ExprContext;
    this.rvar = null; // VariableContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromFlattenContext.prototype = Object.create(From_itemContext.prototype);
FromFlattenContext.prototype.constructor = FromFlattenContext;

SqlppParser.FromFlattenContext = FromFlattenContext;

FromFlattenContext.prototype.K_FLATTEN = function() {
    return this.getToken(SqlppParser.K_FLATTEN, 0);
};

FromFlattenContext.prototype.K_AS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_AS);
    } else {
        return this.getToken(SqlppParser.K_AS, i);
    }
};


FromFlattenContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

FromFlattenContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};

FromFlattenContext.prototype.K_INNER = function() {
    return this.getToken(SqlppParser.K_INNER, 0);
};

FromFlattenContext.prototype.K_OUTER = function() {
    return this.getToken(SqlppParser.K_OUTER, 0);
};
FromFlattenContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromFlatten(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FromFullContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.lhs = null; // From_itemContext;
    this.op = null; // Token;
    this.rhs = null; // From_itemContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromFullContext.prototype = Object.create(From_itemContext.prototype);
FromFullContext.prototype.constructor = FromFullContext;

SqlppParser.FromFullContext = FromFullContext;

FromFullContext.prototype.K_ON = function() {
    return this.getToken(SqlppParser.K_ON, 0);
};

FromFullContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FromFullContext.prototype.from_item = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(From_itemContext);
    } else {
        return this.getTypedRuleContext(From_itemContext,i);
    }
};

FromFullContext.prototype.K_FULL = function() {
    return this.getToken(SqlppParser.K_FULL, 0);
};

FromFullContext.prototype.K_OUTER = function() {
    return this.getToken(SqlppParser.K_OUTER, 0);
};

FromFullContext.prototype.K_CORRELATE = function() {
    return this.getToken(SqlppParser.K_CORRELATE, 0);
};
FromFullContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromFull(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FromCommaContext(parser, ctx) {
	From_itemContext.call(this, parser);
    this.lhs = null; // From_itemContext;
    this.op = null; // Token;
    this.rhs = null; // From_itemContext;
    From_itemContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FromCommaContext.prototype = Object.create(From_itemContext.prototype);
FromCommaContext.prototype.constructor = FromCommaContext;

SqlppParser.FromCommaContext = FromCommaContext;

FromCommaContext.prototype.from_item = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(From_itemContext);
    } else {
        return this.getTypedRuleContext(From_itemContext,i);
    }
};
FromCommaContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFromComma(this);
    } else {
        return visitor.visitChildren(this);
    }
};



SqlppParser.prototype.from_item = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new From_itemContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 8;
    this.enterRecursionRule(localctx, 8, SqlppParser.RULE_from_item, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 148;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
        switch(la_) {
        case 1:
            localctx = new FromRangeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 121;
            this.expr(0);
            this.state = 122;
            this.match(SqlppParser.K_AS);
            this.state = 123;
            localctx.asvar = this.variable();
            this.state = 126;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
            if(la_===1) {
                this.state = 124;
                this.match(SqlppParser.K_AT);
                this.state = 125;
                localctx.atvar = this.variable();

            }
            break;

        case 2:
            localctx = new FromRangePairContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 128;
            this.expr(0);
            this.state = 129;
            this.match(SqlppParser.K_AS);
            this.state = 130;
            this.match(SqlppParser.T__2);
            this.state = 131;
            localctx.attrname = this.variable();
            this.state = 132;
            this.match(SqlppParser.T__0);
            this.state = 133;
            localctx.attrval = this.variable();
            this.state = 134;
            this.match(SqlppParser.T__3);
            break;

        case 3:
            localctx = new FromFlattenContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 136;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===SqlppParser.K_INNER || _la===SqlppParser.K_OUTER)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 137;
            this.match(SqlppParser.K_FLATTEN);
            this.state = 138;
            this.match(SqlppParser.T__4);
            this.state = 139;
            localctx.lexpr = this.expr(0);
            this.state = 140;
            this.match(SqlppParser.K_AS);
            this.state = 141;
            localctx.lvar = this.variable();
            this.state = 142;
            this.match(SqlppParser.T__1);
            this.state = 143;
            localctx.rexpr = this.expr(0);
            this.state = 144;
            this.match(SqlppParser.K_AS);
            this.state = 145;
            localctx.rvar = this.variable();
            this.state = 146;
            this.match(SqlppParser.T__5);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 186;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,28,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 184;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new FromILCorrContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 150;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 156;
                    this._errHandler.sync(this);
                    switch(this._input.LA(1)) {
                    case SqlppParser.K_INNER:
                        this.state = 151;
                        localctx.op = this.match(SqlppParser.K_INNER);
                        break;
                    case SqlppParser.K_LEFT:
                        this.state = 152;
                        localctx.op = this.match(SqlppParser.K_LEFT);
                        this.state = 154;
                        this._errHandler.sync(this);
                        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
                        if(la_===1) {
                            this.state = 153;
                            this.match(SqlppParser.K_OUTER);

                        }
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                    }
                    this.state = 159;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===SqlppParser.K_CORRELATE) {
                        this.state = 158;
                        this.match(SqlppParser.K_CORRELATE);
                    }

                    this.state = 161;
                    localctx.rhs = this.from_item(6);
                    break;

                case 2:
                    localctx = new FromCommaContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 162;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 163;
                    localctx.op = this.match(SqlppParser.T__1);
                    this.state = 164;
                    localctx.rhs = this.from_item(4);
                    break;

                case 3:
                    localctx = new FromFullContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 165;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 166;
                    localctx.op = this.match(SqlppParser.K_FULL);
                    this.state = 168;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
                    if(la_===1) {
                        this.state = 167;
                        this.match(SqlppParser.K_OUTER);

                    }
                    this.state = 171;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===SqlppParser.K_CORRELATE) {
                        this.state = 170;
                        this.match(SqlppParser.K_CORRELATE);
                    }

                    this.state = 173;
                    localctx.rhs = this.from_item(0);
                    this.state = 174;
                    this.match(SqlppParser.K_ON);
                    this.state = 175;
                    this.expr(0);
                    break;

                case 4:
                    localctx = new FromJoinContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 177;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 178;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (SqlppParser.K_INNER - 32)) | (1 << (SqlppParser.K_LEFT - 32)) | (1 << (SqlppParser.K_RIGHT - 32)) | (1 << (SqlppParser.K_FULL - 32)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 179;
                    this.match(SqlppParser.K_JOIN);
                    this.state = 180;
                    localctx.rhs = this.from_item(0);
                    this.state = 181;
                    this.match(SqlppParser.K_ON);
                    this.state = 182;
                    this.expr(0);
                    break;

                } 
            }
            this.state = 188;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,28,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function Where_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_where_clause;
    return this;
}

Where_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Where_clauseContext.prototype.constructor = Where_clauseContext;

Where_clauseContext.prototype.K_WHERE = function() {
    return this.getToken(SqlppParser.K_WHERE, 0);
};

Where_clauseContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

Where_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitWhere_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Where_clauseContext = Where_clauseContext;

SqlppParser.prototype.where_clause = function() {

    var localctx = new Where_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, SqlppParser.RULE_where_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 189;
        this.match(SqlppParser.K_WHERE);
        this.state = 190;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Groupby_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_groupby_clause;
    return this;
}

Groupby_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Groupby_clauseContext.prototype.constructor = Groupby_clauseContext;

Groupby_clauseContext.prototype.K_GROUP = function() {
    return this.getToken(SqlppParser.K_GROUP, 0);
};

Groupby_clauseContext.prototype.K_BY = function() {
    return this.getToken(SqlppParser.K_BY, 0);
};

Groupby_clauseContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

Groupby_clauseContext.prototype.K_AS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_AS);
    } else {
        return this.getToken(SqlppParser.K_AS, i);
    }
};


Groupby_clauseContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};

Groupby_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitGroupby_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Groupby_clauseContext = Groupby_clauseContext;

SqlppParser.prototype.groupby_clause = function() {

    var localctx = new Groupby_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, SqlppParser.RULE_groupby_clause);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 192;
        this.match(SqlppParser.K_GROUP);
        this.state = 193;
        this.match(SqlppParser.K_BY);
        this.state = 194;
        this.expr(0);
        this.state = 197;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SqlppParser.K_AS) {
            this.state = 195;
            this.match(SqlppParser.K_AS);
            this.state = 196;
            this.variable();
        }

        this.state = 207;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SqlppParser.T__1) {
            this.state = 199;
            this.match(SqlppParser.T__1);
            this.state = 200;
            this.expr(0);
            this.state = 203;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_AS) {
                this.state = 201;
                this.match(SqlppParser.K_AS);
                this.state = 202;
                this.variable();
            }

            this.state = 209;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Having_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_having_clause;
    return this;
}

Having_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Having_clauseContext.prototype.constructor = Having_clauseContext;

Having_clauseContext.prototype.K_HAVING = function() {
    return this.getToken(SqlppParser.K_HAVING, 0);
};

Having_clauseContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

Having_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitHaving_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Having_clauseContext = Having_clauseContext;

SqlppParser.prototype.having_clause = function() {

    var localctx = new Having_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, SqlppParser.RULE_having_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 210;
        this.match(SqlppParser.K_HAVING);
        this.state = 211;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Setop_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_setop_clause;
    return this;
}

Setop_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Setop_clauseContext.prototype.constructor = Setop_clauseContext;

Setop_clauseContext.prototype.swf_query = function() {
    return this.getTypedRuleContext(Swf_queryContext,0);
};

Setop_clauseContext.prototype.K_UNION = function() {
    return this.getToken(SqlppParser.K_UNION, 0);
};

Setop_clauseContext.prototype.K_INTERSECT = function() {
    return this.getToken(SqlppParser.K_INTERSECT, 0);
};

Setop_clauseContext.prototype.K_EXCEPT = function() {
    return this.getToken(SqlppParser.K_EXCEPT, 0);
};

Setop_clauseContext.prototype.K_ALL = function() {
    return this.getToken(SqlppParser.K_ALL, 0);
};

Setop_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitSetop_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Setop_clauseContext = Setop_clauseContext;

SqlppParser.prototype.setop_clause = function() {

    var localctx = new Setop_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, SqlppParser.RULE_setop_clause);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 213;
        _la = this._input.LA(1);
        if(!(((((_la - 45)) & ~0x1f) == 0 && ((1 << (_la - 45)) & ((1 << (SqlppParser.K_UNION - 45)) | (1 << (SqlppParser.K_INTERSECT - 45)) | (1 << (SqlppParser.K_EXCEPT - 45)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 215;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SqlppParser.K_ALL) {
            this.state = 214;
            this.match(SqlppParser.K_ALL);
        }

        this.state = 217;
        this.swf_query();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Orderby_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_orderby_clause;
    return this;
}

Orderby_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Orderby_clauseContext.prototype.constructor = Orderby_clauseContext;

Orderby_clauseContext.prototype.K_ORDER = function() {
    return this.getToken(SqlppParser.K_ORDER, 0);
};

Orderby_clauseContext.prototype.K_BY = function() {
    return this.getToken(SqlppParser.K_BY, 0);
};

Orderby_clauseContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

Orderby_clauseContext.prototype.K_ASC = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_ASC);
    } else {
        return this.getToken(SqlppParser.K_ASC, i);
    }
};


Orderby_clauseContext.prototype.K_DESC = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_DESC);
    } else {
        return this.getToken(SqlppParser.K_DESC, i);
    }
};


Orderby_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitOrderby_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Orderby_clauseContext = Orderby_clauseContext;

SqlppParser.prototype.orderby_clause = function() {

    var localctx = new Orderby_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, SqlppParser.RULE_orderby_clause);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 219;
        this.match(SqlppParser.K_ORDER);
        this.state = 220;
        this.match(SqlppParser.K_BY);
        this.state = 221;
        this.expr(0);
        this.state = 223;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SqlppParser.K_ASC || _la===SqlppParser.K_DESC) {
            this.state = 222;
            _la = this._input.LA(1);
            if(!(_la===SqlppParser.K_ASC || _la===SqlppParser.K_DESC)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
        }

        this.state = 232;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SqlppParser.T__1) {
            this.state = 225;
            this.match(SqlppParser.T__1);
            this.state = 226;
            this.expr(0);
            this.state = 228;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_ASC || _la===SqlppParser.K_DESC) {
                this.state = 227;
                _la = this._input.LA(1);
                if(!(_la===SqlppParser.K_ASC || _la===SqlppParser.K_DESC)) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                }
            }

            this.state = 234;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Limit_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_limit_clause;
    return this;
}

Limit_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Limit_clauseContext.prototype.constructor = Limit_clauseContext;

Limit_clauseContext.prototype.K_LIMIT = function() {
    return this.getToken(SqlppParser.K_LIMIT, 0);
};

Limit_clauseContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

Limit_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitLimit_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Limit_clauseContext = Limit_clauseContext;

SqlppParser.prototype.limit_clause = function() {

    var localctx = new Limit_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, SqlppParser.RULE_limit_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 235;
        this.match(SqlppParser.K_LIMIT);
        this.state = 236;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Offset_clauseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_offset_clause;
    return this;
}

Offset_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Offset_clauseContext.prototype.constructor = Offset_clauseContext;

Offset_clauseContext.prototype.K_OFFSET = function() {
    return this.getToken(SqlppParser.K_OFFSET, 0);
};

Offset_clauseContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

Offset_clauseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitOffset_clause(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Offset_clauseContext = Offset_clauseContext;

SqlppParser.prototype.offset_clause = function() {

    var localctx = new Offset_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, SqlppParser.RULE_offset_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 238;
        this.match(SqlppParser.K_OFFSET);
        this.state = 239;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;


 
ExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function ExprBagContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprBagContext.prototype = Object.create(ExprContext.prototype);
ExprBagContext.prototype.constructor = ExprBagContext;

SqlppParser.ExprBagContext = ExprBagContext;

ExprBagContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExprBagContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprBag(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprNestSWFContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprNestSWFContext.prototype = Object.create(ExprContext.prototype);
ExprNestSWFContext.prototype.constructor = ExprNestSWFContext;

SqlppParser.ExprNestSWFContext = ExprNestSWFContext;

ExprNestSWFContext.prototype.swf_query = function() {
    return this.getTypedRuleContext(Swf_queryContext,0);
};
ExprNestSWFContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprNestSWF(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprAggrContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.aggr = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprAggrContext.prototype = Object.create(ExprContext.prototype);
ExprAggrContext.prototype.constructor = ExprAggrContext;

SqlppParser.ExprAggrContext = ExprAggrContext;

ExprAggrContext.prototype.K_SUM = function() {
    return this.getToken(SqlppParser.K_SUM, 0);
};

ExprAggrContext.prototype.K_MAX = function() {
    return this.getToken(SqlppParser.K_MAX, 0);
};

ExprAggrContext.prototype.K_MIN = function() {
    return this.getToken(SqlppParser.K_MIN, 0);
};

ExprAggrContext.prototype.K_COUNT = function() {
    return this.getToken(SqlppParser.K_COUNT, 0);
};

ExprAggrContext.prototype.K_AVG = function() {
    return this.getToken(SqlppParser.K_AVG, 0);
};

ExprAggrContext.prototype.K_GROUP = function() {
    return this.getToken(SqlppParser.K_GROUP, 0);
};

ExprAggrContext.prototype.AST = function() {
    return this.getToken(SqlppParser.AST, 0);
};

ExprAggrContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ExprAggrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprAggr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprArrAcsContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprArrAcsContext.prototype = Object.create(ExprContext.prototype);
ExprArrAcsContext.prototype.constructor = ExprArrAcsContext;

SqlppParser.ExprArrAcsContext = ExprArrAcsContext;

ExprArrAcsContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExprArrAcsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprArrAcs(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprParanContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprParanContext.prototype = Object.create(ExprContext.prototype);
ExprParanContext.prototype.constructor = ExprParanContext;

SqlppParser.ExprParanContext = ExprParanContext;

ExprParanContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ExprParanContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprParan(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprObjContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprObjContext.prototype = Object.create(ExprContext.prototype);
ExprObjContext.prototype.constructor = ExprObjContext;

SqlppParser.ExprObjContext = ExprObjContext;

ExprObjContext.prototype.attr_name = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Attr_nameContext);
    } else {
        return this.getTypedRuleContext(Attr_nameContext,i);
    }
};

ExprObjContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExprObjContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprObj(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprBinaryContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.lhs = null; // ExprContext;
    this.op = null; // Token;
    this.rhs = null; // ExprContext;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprBinaryContext.prototype = Object.create(ExprContext.prototype);
ExprBinaryContext.prototype.constructor = ExprBinaryContext;

SqlppParser.ExprBinaryContext = ExprBinaryContext;

ExprBinaryContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ExprBinaryContext.prototype.K_AND = function() {
    return this.getToken(SqlppParser.K_AND, 0);
};

ExprBinaryContext.prototype.K_OR = function() {
    return this.getToken(SqlppParser.K_OR, 0);
};
ExprBinaryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprBinary(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprUnaryContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprUnaryContext.prototype = Object.create(ExprContext.prototype);
ExprUnaryContext.prototype.constructor = ExprUnaryContext;

SqlppParser.ExprUnaryContext = ExprUnaryContext;

ExprUnaryContext.prototype.unary_op = function() {
    return this.getTypedRuleContext(Unary_opContext,0);
};

ExprUnaryContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ExprUnaryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprUnary(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprFuncContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprFuncContext.prototype = Object.create(ExprContext.prototype);
ExprFuncContext.prototype.constructor = ExprFuncContext;

SqlppParser.ExprFuncContext = ExprFuncContext;

ExprFuncContext.prototype.func_name = function() {
    return this.getTypedRuleContext(Func_nameContext,0);
};

ExprFuncContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExprFuncContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprFunc(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprVariContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprVariContext.prototype = Object.create(ExprContext.prototype);
ExprVariContext.prototype.constructor = ExprVariContext;

SqlppParser.ExprVariContext = ExprVariContext;

ExprVariContext.prototype.variable = function() {
    return this.getTypedRuleContext(VariableContext,0);
};
ExprVariContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprVari(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprPathContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprPathContext.prototype = Object.create(ExprContext.prototype);
ExprPathContext.prototype.constructor = ExprPathContext;

SqlppParser.ExprPathContext = ExprPathContext;

ExprPathContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

ExprPathContext.prototype.attr_name = function() {
    return this.getTypedRuleContext(Attr_nameContext,0);
};
ExprPathContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprPath(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprValContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprValContext.prototype = Object.create(ExprContext.prototype);
ExprValContext.prototype.constructor = ExprValContext;

SqlppParser.ExprValContext = ExprValContext;

ExprValContext.prototype.value = function() {
    return this.getTypedRuleContext(ValueContext,0);
};
ExprValContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprVal(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprArrContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprArrContext.prototype = Object.create(ExprContext.prototype);
ExprArrContext.prototype.constructor = ExprArrContext;

SqlppParser.ExprArrContext = ExprArrContext;

ExprArrContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExprArrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprArr(this);
    } else {
        return visitor.visitChildren(this);
    }
};



SqlppParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 24;
    this.enterRecursionRule(localctx, 24, SqlppParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 319;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,45,this._ctx);
        switch(la_) {
        case 1:
            localctx = new ExprNestSWFContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 242;
            this.match(SqlppParser.T__4);
            this.state = 243;
            this.swf_query();
            this.state = 244;
            this.match(SqlppParser.T__5);
            break;

        case 2:
            localctx = new ExprValContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 246;
            this.value();
            break;

        case 3:
            localctx = new ExprVariContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 247;
            this.variable();
            break;

        case 4:
            localctx = new ExprUnaryContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 248;
            this.unary_op();
            this.state = 249;
            this.expr(14);
            break;

        case 5:
            localctx = new ExprAggrContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 251;
            localctx.aggr = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(((((_la - 57)) & ~0x1f) == 0 && ((1 << (_la - 57)) & ((1 << (SqlppParser.K_SUM - 57)) | (1 << (SqlppParser.K_MIN - 57)) | (1 << (SqlppParser.K_MAX - 57)) | (1 << (SqlppParser.K_AVG - 57)) | (1 << (SqlppParser.K_COUNT - 57)))) !== 0))) {
                localctx.aggr = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 252;
            this.match(SqlppParser.T__4);
            this.state = 256;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case SqlppParser.K_GROUP:
                this.state = 253;
                this.match(SqlppParser.K_GROUP);
                break;
            case SqlppParser.AST:
                this.state = 254;
                this.match(SqlppParser.AST);
                break;
            case SqlppParser.T__2:
            case SqlppParser.T__4:
            case SqlppParser.T__7:
            case SqlppParser.T__12:
            case SqlppParser.T__13:
            case SqlppParser.T__22:
            case SqlppParser.T__24:
            case SqlppParser.K_NOT:
            case SqlppParser.K_SUM:
            case SqlppParser.K_MIN:
            case SqlppParser.K_MAX:
            case SqlppParser.K_AVG:
            case SqlppParser.K_COUNT:
            case SqlppParser.STRLITERAL:
            case SqlppParser.NUMBER:
            case SqlppParser.VAR_NAME:
                this.state = 255;
                this.expr(0);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 258;
            this.match(SqlppParser.T__5);
            break;

        case 6:
            localctx = new ExprFuncContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 259;
            this.func_name();
            this.state = 260;
            this.match(SqlppParser.T__4);
            this.state = 262;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__2) | (1 << SqlppParser.T__4) | (1 << SqlppParser.T__7) | (1 << SqlppParser.T__12) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__22) | (1 << SqlppParser.T__24))) !== 0) || ((((_la - 54)) & ~0x1f) == 0 && ((1 << (_la - 54)) & ((1 << (SqlppParser.K_NOT - 54)) | (1 << (SqlppParser.K_SUM - 54)) | (1 << (SqlppParser.K_MIN - 54)) | (1 << (SqlppParser.K_MAX - 54)) | (1 << (SqlppParser.K_AVG - 54)) | (1 << (SqlppParser.K_COUNT - 54)) | (1 << (SqlppParser.STRLITERAL - 54)) | (1 << (SqlppParser.NUMBER - 54)) | (1 << (SqlppParser.VAR_NAME - 54)))) !== 0)) {
                this.state = 261;
                this.expr(0);
            }

            this.state = 268;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 264;
                this.match(SqlppParser.T__1);
                this.state = 265;
                this.expr(0);
                this.state = 270;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 271;
            this.match(SqlppParser.T__5);
            break;

        case 7:
            localctx = new ExprObjContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 273;
            this.match(SqlppParser.T__2);
            this.state = 278;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.VAR_NAME) {
                this.state = 274;
                this.attr_name();
                this.state = 275;
                this.match(SqlppParser.T__0);
                this.state = 276;
                this.expr(0);
            }

            this.state = 287;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 280;
                this.match(SqlppParser.T__1);
                this.state = 281;
                this.attr_name();
                this.state = 282;
                this.match(SqlppParser.T__0);
                this.state = 283;
                this.expr(0);
                this.state = 289;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 290;
            this.match(SqlppParser.T__3);
            break;

        case 8:
            localctx = new ExprArrContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 291;
            this.match(SqlppParser.T__7);
            this.state = 293;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__2) | (1 << SqlppParser.T__4) | (1 << SqlppParser.T__7) | (1 << SqlppParser.T__12) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__22) | (1 << SqlppParser.T__24))) !== 0) || ((((_la - 54)) & ~0x1f) == 0 && ((1 << (_la - 54)) & ((1 << (SqlppParser.K_NOT - 54)) | (1 << (SqlppParser.K_SUM - 54)) | (1 << (SqlppParser.K_MIN - 54)) | (1 << (SqlppParser.K_MAX - 54)) | (1 << (SqlppParser.K_AVG - 54)) | (1 << (SqlppParser.K_COUNT - 54)) | (1 << (SqlppParser.STRLITERAL - 54)) | (1 << (SqlppParser.NUMBER - 54)) | (1 << (SqlppParser.VAR_NAME - 54)))) !== 0)) {
                this.state = 292;
                this.expr(0);
            }

            this.state = 299;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 295;
                this.match(SqlppParser.T__1);
                this.state = 296;
                this.expr(0);
                this.state = 301;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 302;
            this.match(SqlppParser.T__8);
            break;

        case 9:
            localctx = new ExprBagContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 303;
            this.match(SqlppParser.T__22);
            this.state = 305;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__2) | (1 << SqlppParser.T__4) | (1 << SqlppParser.T__7) | (1 << SqlppParser.T__12) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__22) | (1 << SqlppParser.T__24))) !== 0) || ((((_la - 54)) & ~0x1f) == 0 && ((1 << (_la - 54)) & ((1 << (SqlppParser.K_NOT - 54)) | (1 << (SqlppParser.K_SUM - 54)) | (1 << (SqlppParser.K_MIN - 54)) | (1 << (SqlppParser.K_MAX - 54)) | (1 << (SqlppParser.K_AVG - 54)) | (1 << (SqlppParser.K_COUNT - 54)) | (1 << (SqlppParser.STRLITERAL - 54)) | (1 << (SqlppParser.NUMBER - 54)) | (1 << (SqlppParser.VAR_NAME - 54)))) !== 0)) {
                this.state = 304;
                this.expr(0);
            }

            this.state = 311;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 307;
                this.match(SqlppParser.T__1);
                this.state = 308;
                this.expr(0);
                this.state = 313;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 314;
            this.match(SqlppParser.T__23);
            break;

        case 10:
            localctx = new ExprParanContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 315;
            this.match(SqlppParser.T__4);
            this.state = 316;
            this.expr(0);
            this.state = 317;
            this.match(SqlppParser.T__5);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 352;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,47,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 350;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,46,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 321;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 322;
                    localctx.op = this.match(SqlppParser.T__9);
                    this.state = 323;
                    localctx.rhs = this.expr(14);
                    break;

                case 2:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 324;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 325;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===SqlppParser.T__10 || _la===SqlppParser.T__11 || _la===SqlppParser.AST)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 326;
                    localctx.rhs = this.expr(13);
                    break;

                case 3:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 327;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 328;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===SqlppParser.T__12 || _la===SqlppParser.T__13)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 329;
                    localctx.rhs = this.expr(12);
                    break;

                case 4:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 330;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 331;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__14) | (1 << SqlppParser.T__15) | (1 << SqlppParser.T__16) | (1 << SqlppParser.T__17))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 332;
                    localctx.rhs = this.expr(11);
                    break;

                case 5:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 333;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 334;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__18) | (1 << SqlppParser.T__19) | (1 << SqlppParser.T__20) | (1 << SqlppParser.T__21))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 335;
                    localctx.rhs = this.expr(10);
                    break;

                case 6:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 336;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 337;
                    localctx.op = this.match(SqlppParser.K_AND);
                    this.state = 338;
                    localctx.rhs = this.expr(9);
                    break;

                case 7:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 339;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 340;
                    localctx.op = this.match(SqlppParser.K_OR);
                    this.state = 341;
                    localctx.rhs = this.expr(8);
                    break;

                case 8:
                    localctx = new ExprPathContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 342;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 343;
                    this.match(SqlppParser.T__6);
                    this.state = 344;
                    this.attr_name();
                    break;

                case 9:
                    localctx = new ExprArrAcsContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 345;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 346;
                    this.match(SqlppParser.T__7);
                    this.state = 347;
                    this.expr(0);
                    this.state = 348;
                    this.match(SqlppParser.T__8);
                    break;

                } 
            }
            this.state = 354;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,47,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function Unary_opContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_unary_op;
    return this;
}

Unary_opContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Unary_opContext.prototype.constructor = Unary_opContext;

Unary_opContext.prototype.K_NOT = function() {
    return this.getToken(SqlppParser.K_NOT, 0);
};

Unary_opContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitUnary_op(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Unary_opContext = Unary_opContext;

SqlppParser.prototype.unary_op = function() {

    var localctx = new Unary_opContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, SqlppParser.RULE_unary_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 355;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__12) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__24))) !== 0) || _la===SqlppParser.K_NOT)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_value;
    return this;
}

ValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueContext.prototype.constructor = ValueContext;

ValueContext.prototype.STRLITERAL = function() {
    return this.getToken(SqlppParser.STRLITERAL, 0);
};

ValueContext.prototype.NUMBER = function() {
    return this.getToken(SqlppParser.NUMBER, 0);
};

ValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.ValueContext = ValueContext;

SqlppParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, SqlppParser.RULE_value);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 357;
        _la = this._input.LA(1);
        if(!(_la===SqlppParser.STRLITERAL || _la===SqlppParser.NUMBER)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function VariableContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_variable;
    return this;
}

VariableContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VariableContext.prototype.constructor = VariableContext;

VariableContext.prototype.VAR_NAME = function() {
    return this.getToken(SqlppParser.VAR_NAME, 0);
};

VariableContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitVariable(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.VariableContext = VariableContext;

SqlppParser.prototype.variable = function() {

    var localctx = new VariableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, SqlppParser.RULE_variable);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 359;
        this.match(SqlppParser.VAR_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Func_nameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_func_name;
    return this;
}

Func_nameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Func_nameContext.prototype.constructor = Func_nameContext;

Func_nameContext.prototype.VAR_NAME = function() {
    return this.getToken(SqlppParser.VAR_NAME, 0);
};

Func_nameContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitFunc_name(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Func_nameContext = Func_nameContext;

SqlppParser.prototype.func_name = function() {

    var localctx = new Func_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, SqlppParser.RULE_func_name);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 361;
        this.match(SqlppParser.VAR_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Attr_nameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_attr_name;
    return this;
}

Attr_nameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Attr_nameContext.prototype.constructor = Attr_nameContext;

Attr_nameContext.prototype.VAR_NAME = function() {
    return this.getToken(SqlppParser.VAR_NAME, 0);
};

Attr_nameContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitAttr_name(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Attr_nameContext = Attr_nameContext;

SqlppParser.prototype.attr_name = function() {

    var localctx = new Attr_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, SqlppParser.RULE_attr_name);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 363;
        this.match(SqlppParser.VAR_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


SqlppParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 4:
			return this.from_item_sempred(localctx, predIndex);
	case 12:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

SqlppParser.prototype.from_item_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 5);
		case 1:
			return this.precpred(this._ctx, 3);
		case 2:
			return this.precpred(this._ctx, 4);
		case 3:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

SqlppParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 4:
			return this.precpred(this._ctx, 13);
		case 5:
			return this.precpred(this._ctx, 12);
		case 6:
			return this.precpred(this._ctx, 11);
		case 7:
			return this.precpred(this._ctx, 10);
		case 8:
			return this.precpred(this._ctx, 9);
		case 9:
			return this.precpred(this._ctx, 8);
		case 10:
			return this.precpred(this._ctx, 7);
		case 11:
			return this.precpred(this._ctx, 16);
		case 12:
			return this.precpred(this._ctx, 15);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.SqlppParser = SqlppParser;
