// Generated from Sqlpp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var SqlppVisitor = require('./SqlppVisitor').SqlppVisitor;

var grammarFileName = "Sqlpp.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003D\u017b\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0003\u0002\u0003\u0002\u0005\u0002+\n\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u00030\n\u0003\u0003\u0003\u0005\u00033\n\u0003",
    "\u0003\u0003\u0005\u00036\n\u0003\u0003\u0003\u0005\u00039\n\u0003\u0003",
    "\u0003\u0005\u0003<\n\u0003\u0003\u0003\u0005\u0003?\n\u0003\u0003\u0003",
    "\u0005\u0003B\n\u0003\u0003\u0003\u0003\u0003\u0005\u0003F\n\u0003\u0003",
    "\u0003\u0005\u0003I\n\u0003\u0003\u0003\u0005\u0003L\n\u0003\u0003\u0003",
    "\u0005\u0003O\n\u0003\u0003\u0003\u0005\u0003R\n\u0003\u0003\u0003\u0005",
    "\u0003U\n\u0003\u0003\u0003\u0005\u0003X\n\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\\\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004k\n\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004q\n\u0004\u0007\u0004",
    "s\n\u0004\f\u0004\u000e\u0004v\u000b\u0004\u0005\u0004x\n\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u0083\n\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0005\u0006\u0099\n\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0005\u0006\u009f\n\u0006\u0005\u0006\u00a1\n\u0006",
    "\u0003\u0006\u0005\u0006\u00a4\n\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u00ad",
    "\n\u0006\u0003\u0006\u0005\u0006\u00b0\n\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006\u00bd\n\u0006\f\u0006",
    "\u000e\u0006\u00c0\u000b\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b\u00ca\n\b\u0003\b\u0003\b",
    "\u0003\b\u0003\b\u0005\b\u00d0\n\b\u0007\b\u00d2\n\b\f\b\u000e\b\u00d5",
    "\u000b\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0005\n\u00dc\n\n\u0003",
    "\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b",
    "\u00e4\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00e9",
    "\n\u000b\u0007\u000b\u00eb\n\u000b\f\u000b\u000e\u000b\u00ee\u000b\u000b",
    "\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0005\u000e\u0106\n\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u010c\n\u000e\u0003\u000e",
    "\u0003\u000e\u0007\u000e\u0110\n\u000e\f\u000e\u000e\u000e\u0113\u000b",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u011c\n\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u0123\n\u000e\f\u000e",
    "\u000e\u000e\u0126\u000b\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005",
    "\u000e\u012b\n\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u012f\n\u000e",
    "\f\u000e\u000e\u000e\u0132\u000b\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0005\u000e\u0137\n\u000e\u0003\u000e\u0003\u000e\u0007\u000e",
    "\u013b\n\u000e\f\u000e\u000e\u000e\u013e\u000b\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0145\n\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e",
    "\u0164\n\u000e\f\u000e\u000e\u000e\u0167\u000b\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003",
    "\u0012\u0005\u0012\u0171\n\u0012\u0003\u0013\u0003\u0013\u0005\u0013",
    "\u0175\n\u0013\u0003\u0014\u0003\u0014\u0005\u0014\u0179\n\u0014\u0003",
    "\u0014\u0002\u0004\n\u001a\u0015\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&\u0002\u000e\u0004\u0002",
    "\"\"&&\u0003\u0002\"%\u0003\u0002/1\u0003\u000245\u0003\u0002;?\u0004",
    "\u0002\r\u000eBB\u0003\u0002\u000f\u0010\u0003\u0002\u0011\u0014\u0003",
    "\u0002\u0015\u0018\u0005\u0002\u000f\u0010\u001b\u001b88\u0003\u0002",
    "\u001c?\u0003\u0002@A\u0002\u01af\u0002*\u0003\u0002\u0002\u0002\u0004",
    "[\u0003\u0002\u0002\u0002\u0006w\u0003\u0002\u0002\u0002\by\u0003\u0002",
    "\u0002\u0002\n\u0098\u0003\u0002\u0002\u0002\f\u00c1\u0003\u0002\u0002",
    "\u0002\u000e\u00c4\u0003\u0002\u0002\u0002\u0010\u00d6\u0003\u0002\u0002",
    "\u0002\u0012\u00d9\u0003\u0002\u0002\u0002\u0014\u00df\u0003\u0002\u0002",
    "\u0002\u0016\u00ef\u0003\u0002\u0002\u0002\u0018\u00f2\u0003\u0002\u0002",
    "\u0002\u001a\u0144\u0003\u0002\u0002\u0002\u001c\u0168\u0003\u0002\u0002",
    "\u0002\u001e\u016a\u0003\u0002\u0002\u0002 \u016c\u0003\u0002\u0002",
    "\u0002\"\u0170\u0003\u0002\u0002\u0002$\u0174\u0003\u0002\u0002\u0002",
    "&\u0178\u0003\u0002\u0002\u0002(+\u0005\u0004\u0003\u0002)+\u0005\u001a",
    "\u000e\u0002*(\u0003\u0002\u0002\u0002*)\u0003\u0002\u0002\u0002+\u0003",
    "\u0003\u0002\u0002\u0002,-\u0005\u0006\u0004\u0002-/\u0005\b\u0005\u0002",
    ".0\u0005\f\u0007\u0002/.\u0003\u0002\u0002\u0002/0\u0003\u0002\u0002",
    "\u000202\u0003\u0002\u0002\u000213\u0005\u000e\b\u000221\u0003\u0002",
    "\u0002\u000223\u0003\u0002\u0002\u000235\u0003\u0002\u0002\u000246\u0005",
    "\u0010\t\u000254\u0003\u0002\u0002\u000256\u0003\u0002\u0002\u00026",
    "8\u0003\u0002\u0002\u000279\u0005\u0012\n\u000287\u0003\u0002\u0002",
    "\u000289\u0003\u0002\u0002\u00029;\u0003\u0002\u0002\u0002:<\u0005\u0014",
    "\u000b\u0002;:\u0003\u0002\u0002\u0002;<\u0003\u0002\u0002\u0002<>\u0003",
    "\u0002\u0002\u0002=?\u0005\u0016\f\u0002>=\u0003\u0002\u0002\u0002>",
    "?\u0003\u0002\u0002\u0002?A\u0003\u0002\u0002\u0002@B\u0005\u0018\r",
    "\u0002A@\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002B\\\u0003",
    "\u0002\u0002\u0002CE\u0005\b\u0005\u0002DF\u0005\f\u0007\u0002ED\u0003",
    "\u0002\u0002\u0002EF\u0003\u0002\u0002\u0002FH\u0003\u0002\u0002\u0002",
    "GI\u0005\u000e\b\u0002HG\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002",
    "\u0002IK\u0003\u0002\u0002\u0002JL\u0005\u0010\t\u0002KJ\u0003\u0002",
    "\u0002\u0002KL\u0003\u0002\u0002\u0002LN\u0003\u0002\u0002\u0002MO\u0005",
    "\u0012\n\u0002NM\u0003\u0002\u0002\u0002NO\u0003\u0002\u0002\u0002O",
    "Q\u0003\u0002\u0002\u0002PR\u0005\u0014\u000b\u0002QP\u0003\u0002\u0002",
    "\u0002QR\u0003\u0002\u0002\u0002RT\u0003\u0002\u0002\u0002SU\u0005\u0016",
    "\f\u0002TS\u0003\u0002\u0002\u0002TU\u0003\u0002\u0002\u0002UW\u0003",
    "\u0002\u0002\u0002VX\u0005\u0018\r\u0002WV\u0003\u0002\u0002\u0002W",
    "X\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002YZ\u0005\u0006\u0004",
    "\u0002Z\\\u0003\u0002\u0002\u0002[,\u0003\u0002\u0002\u0002[C\u0003",
    "\u0002\u0002\u0002\\\u0005\u0003\u0002\u0002\u0002]^\u0007\u001c\u0002",
    "\u0002^_\u0007\u001d\u0002\u0002_x\u0005\u001a\u000e\u0002`a\u0007\u001c",
    "\u0002\u0002ab\u0007\u001e\u0002\u0002bc\u0005\u001a\u000e\u0002cd\u0007",
    "\u0003\u0002\u0002de\u0005\u001a\u000e\u0002ex\u0003\u0002\u0002\u0002",
    "fg\u0007\u001c\u0002\u0002gj\u0005\u001a\u000e\u0002hi\u0007 \u0002",
    "\u0002ik\u0005&\u0014\u0002jh\u0003\u0002\u0002\u0002jk\u0003\u0002",
    "\u0002\u0002kt\u0003\u0002\u0002\u0002lm\u0007\u0004\u0002\u0002mp\u0005",
    "\u001a\u000e\u0002no\u0007 \u0002\u0002oq\u0005&\u0014\u0002pn\u0003",
    "\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002qs\u0003\u0002\u0002\u0002",
    "rl\u0003\u0002\u0002\u0002sv\u0003\u0002\u0002\u0002tr\u0003\u0002\u0002",
    "\u0002tu\u0003\u0002\u0002\u0002ux\u0003\u0002\u0002\u0002vt\u0003\u0002",
    "\u0002\u0002w]\u0003\u0002\u0002\u0002w`\u0003\u0002\u0002\u0002wf\u0003",
    "\u0002\u0002\u0002x\u0007\u0003\u0002\u0002\u0002yz\u0007\u001f\u0002",
    "\u0002z{\u0005\n\u0006\u0002{\t\u0003\u0002\u0002\u0002|}\b\u0006\u0001",
    "\u0002}~\u0005\u001a\u000e\u0002~\u007f\u0007 \u0002\u0002\u007f\u0082",
    "\u0005\"\u0012\u0002\u0080\u0081\u0007!\u0002\u0002\u0081\u0083\u0005",
    "\"\u0012\u0002\u0082\u0080\u0003\u0002\u0002\u0002\u0082\u0083\u0003",
    "\u0002\u0002\u0002\u0083\u0099\u0003\u0002\u0002\u0002\u0084\u0085\u0005",
    "\u001a\u000e\u0002\u0085\u0086\u0007 \u0002\u0002\u0086\u0087\u0007",
    "\u0005\u0002\u0002\u0087\u0088\u0005\"\u0012\u0002\u0088\u0089\u0007",
    "\u0003\u0002\u0002\u0089\u008a\u0005\"\u0012\u0002\u008a\u008b\u0007",
    "\u0006\u0002\u0002\u008b\u0099\u0003\u0002\u0002\u0002\u008c\u008d\t",
    "\u0002\u0002\u0002\u008d\u008e\u0007*\u0002\u0002\u008e\u008f\u0007",
    "\u0007\u0002\u0002\u008f\u0090\u0005\u001a\u000e\u0002\u0090\u0091\u0007",
    " \u0002\u0002\u0091\u0092\u0005\"\u0012\u0002\u0092\u0093\u0007\u0004",
    "\u0002\u0002\u0093\u0094\u0005\u001a\u000e\u0002\u0094\u0095\u0007 ",
    "\u0002\u0002\u0095\u0096\u0005\"\u0012\u0002\u0096\u0097\u0007\b\u0002",
    "\u0002\u0097\u0099\u0003\u0002\u0002\u0002\u0098|\u0003\u0002\u0002",
    "\u0002\u0098\u0084\u0003\u0002\u0002\u0002\u0098\u008c\u0003\u0002\u0002",
    "\u0002\u0099\u00be\u0003\u0002\u0002\u0002\u009a\u00a0\f\u0007\u0002",
    "\u0002\u009b\u00a1\u0007\"\u0002\u0002\u009c\u009e\u0007#\u0002\u0002",
    "\u009d\u009f\u0007&\u0002\u0002\u009e\u009d\u0003\u0002\u0002\u0002",
    "\u009e\u009f\u0003\u0002\u0002\u0002\u009f\u00a1\u0003\u0002\u0002\u0002",
    "\u00a0\u009b\u0003\u0002\u0002\u0002\u00a0\u009c\u0003\u0002\u0002\u0002",
    "\u00a1\u00a3\u0003\u0002\u0002\u0002\u00a2\u00a4\u0007(\u0002\u0002",
    "\u00a3\u00a2\u0003\u0002\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002",
    "\u00a4\u00a5\u0003\u0002\u0002\u0002\u00a5\u00bd\u0005\n\u0006\b\u00a6",
    "\u00a7\f\u0005\u0002\u0002\u00a7\u00a8\u0007\u0004\u0002\u0002\u00a8",
    "\u00bd\u0005\n\u0006\u0006\u00a9\u00aa\f\u0006\u0002\u0002\u00aa\u00ac",
    "\u0007%\u0002\u0002\u00ab\u00ad\u0007&\u0002\u0002\u00ac\u00ab\u0003",
    "\u0002\u0002\u0002\u00ac\u00ad\u0003\u0002\u0002\u0002\u00ad\u00af\u0003",
    "\u0002\u0002\u0002\u00ae\u00b0\u0007(\u0002\u0002\u00af\u00ae\u0003",
    "\u0002\u0002\u0002\u00af\u00b0\u0003\u0002\u0002\u0002\u00b0\u00b1\u0003",
    "\u0002\u0002\u0002\u00b1\u00b2\u0005\n\u0006\u0002\u00b2\u00b3\u0007",
    ")\u0002\u0002\u00b3\u00b4\u0005\u001a\u000e\u0002\u00b4\u00bd\u0003",
    "\u0002\u0002\u0002\u00b5\u00b6\f\u0004\u0002\u0002\u00b6\u00b7\t\u0003",
    "\u0002\u0002\u00b7\u00b8\u0007\'\u0002\u0002\u00b8\u00b9\u0005\n\u0006",
    "\u0002\u00b9\u00ba\u0007)\u0002\u0002\u00ba\u00bb\u0005\u001a\u000e",
    "\u0002\u00bb\u00bd\u0003\u0002\u0002\u0002\u00bc\u009a\u0003\u0002\u0002",
    "\u0002\u00bc\u00a6\u0003\u0002\u0002\u0002\u00bc\u00a9\u0003\u0002\u0002",
    "\u0002\u00bc\u00b5\u0003\u0002\u0002\u0002\u00bd\u00c0\u0003\u0002\u0002",
    "\u0002\u00be\u00bc\u0003\u0002\u0002\u0002\u00be\u00bf\u0003\u0002\u0002",
    "\u0002\u00bf\u000b\u0003\u0002\u0002\u0002\u00c0\u00be\u0003\u0002\u0002",
    "\u0002\u00c1\u00c2\u0007+\u0002\u0002\u00c2\u00c3\u0005\u001a\u000e",
    "\u0002\u00c3\r\u0003\u0002\u0002\u0002\u00c4\u00c5\u0007,\u0002\u0002",
    "\u00c5\u00c6\u0007-\u0002\u0002\u00c6\u00c9\u0005\u001a\u000e\u0002",
    "\u00c7\u00c8\u0007 \u0002\u0002\u00c8\u00ca\u0005\"\u0012\u0002\u00c9",
    "\u00c7\u0003\u0002\u0002\u0002\u00c9\u00ca\u0003\u0002\u0002\u0002\u00ca",
    "\u00d3\u0003\u0002\u0002\u0002\u00cb\u00cc\u0007\u0004\u0002\u0002\u00cc",
    "\u00cf\u0005\u001a\u000e\u0002\u00cd\u00ce\u0007 \u0002\u0002\u00ce",
    "\u00d0\u0005\"\u0012\u0002\u00cf\u00cd\u0003\u0002\u0002\u0002\u00cf",
    "\u00d0\u0003\u0002\u0002\u0002\u00d0\u00d2\u0003\u0002\u0002\u0002\u00d1",
    "\u00cb\u0003\u0002\u0002\u0002\u00d2\u00d5\u0003\u0002\u0002\u0002\u00d3",
    "\u00d1\u0003\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4",
    "\u000f\u0003\u0002\u0002\u0002\u00d5\u00d3\u0003\u0002\u0002\u0002\u00d6",
    "\u00d7\u0007.\u0002\u0002\u00d7\u00d8\u0005\u001a\u000e\u0002\u00d8",
    "\u0011\u0003\u0002\u0002\u0002\u00d9\u00db\t\u0004\u0002\u0002\u00da",
    "\u00dc\u00072\u0002\u0002\u00db\u00da\u0003\u0002\u0002\u0002\u00db",
    "\u00dc\u0003\u0002\u0002\u0002\u00dc\u00dd\u0003\u0002\u0002\u0002\u00dd",
    "\u00de\u0005\u0004\u0003\u0002\u00de\u0013\u0003\u0002\u0002\u0002\u00df",
    "\u00e0\u00073\u0002\u0002\u00e0\u00e1\u0007-\u0002\u0002\u00e1\u00e3",
    "\u0005\u001a\u000e\u0002\u00e2\u00e4\t\u0005\u0002\u0002\u00e3\u00e2",
    "\u0003\u0002\u0002\u0002\u00e3\u00e4\u0003\u0002\u0002\u0002\u00e4\u00ec",
    "\u0003\u0002\u0002\u0002\u00e5\u00e6\u0007\u0004\u0002\u0002\u00e6\u00e8",
    "\u0005\u001a\u000e\u0002\u00e7\u00e9\t\u0005\u0002\u0002\u00e8\u00e7",
    "\u0003\u0002\u0002\u0002\u00e8\u00e9\u0003\u0002\u0002\u0002\u00e9\u00eb",
    "\u0003\u0002\u0002\u0002\u00ea\u00e5\u0003\u0002\u0002\u0002\u00eb\u00ee",
    "\u0003\u0002\u0002\u0002\u00ec\u00ea\u0003\u0002\u0002\u0002\u00ec\u00ed",
    "\u0003\u0002\u0002\u0002\u00ed\u0015\u0003\u0002\u0002\u0002\u00ee\u00ec",
    "\u0003\u0002\u0002\u0002\u00ef\u00f0\u00076\u0002\u0002\u00f0\u00f1",
    "\u0005\u001a\u000e\u0002\u00f1\u0017\u0003\u0002\u0002\u0002\u00f2\u00f3",
    "\u00077\u0002\u0002\u00f3\u00f4\u0005\u001a\u000e\u0002\u00f4\u0019",
    "\u0003\u0002\u0002\u0002\u00f5\u00f6\b\u000e\u0001\u0002\u00f6\u0145",
    "\u0005\u0004\u0003\u0002\u00f7\u00f8\u0007\u0007\u0002\u0002\u00f8\u00f9",
    "\u0005\u0004\u0003\u0002\u00f9\u00fa\u0007\b\u0002\u0002\u00fa\u0145",
    "\u0003\u0002\u0002\u0002\u00fb\u0145\u0005 \u0011\u0002\u00fc\u0145",
    "\u0005\"\u0012\u0002\u00fd\u00fe\u0005\u001c\u000f\u0002\u00fe\u00ff",
    "\u0005\u001a\u000e\u0010\u00ff\u0145\u0003\u0002\u0002\u0002\u0100\u0101",
    "\t\u0006\u0002\u0002\u0101\u0105\u0007\u0007\u0002\u0002\u0102\u0106",
    "\u0007,\u0002\u0002\u0103\u0106\u0007B\u0002\u0002\u0104\u0106\u0005",
    "\u001a\u000e\u0002\u0105\u0102\u0003\u0002\u0002\u0002\u0105\u0103\u0003",
    "\u0002\u0002\u0002\u0105\u0104\u0003\u0002\u0002\u0002\u0106\u0107\u0003",
    "\u0002\u0002\u0002\u0107\u0145\u0007\b\u0002\u0002\u0108\u0109\u0005",
    "$\u0013\u0002\u0109\u010b\u0007\u0007\u0002\u0002\u010a\u010c\u0005",
    "\u001a\u000e\u0002\u010b\u010a\u0003\u0002\u0002\u0002\u010b\u010c\u0003",
    "\u0002\u0002\u0002\u010c\u0111\u0003\u0002\u0002\u0002\u010d\u010e\u0007",
    "\u0004\u0002\u0002\u010e\u0110\u0005\u001a\u000e\u0002\u010f\u010d\u0003",
    "\u0002\u0002\u0002\u0110\u0113\u0003\u0002\u0002\u0002\u0111\u010f\u0003",
    "\u0002\u0002\u0002\u0111\u0112\u0003\u0002\u0002\u0002\u0112\u0114\u0003",
    "\u0002\u0002\u0002\u0113\u0111\u0003\u0002\u0002\u0002\u0114\u0115\u0007",
    "\b\u0002\u0002\u0115\u0145\u0003\u0002\u0002\u0002\u0116\u011b\u0007",
    "\u0005\u0002\u0002\u0117\u0118\u0005&\u0014\u0002\u0118\u0119\u0007",
    "\u0003\u0002\u0002\u0119\u011a\u0005\u001a\u000e\u0002\u011a\u011c\u0003",
    "\u0002\u0002\u0002\u011b\u0117\u0003\u0002\u0002\u0002\u011b\u011c\u0003",
    "\u0002\u0002\u0002\u011c\u0124\u0003\u0002\u0002\u0002\u011d\u011e\u0007",
    "\u0004\u0002\u0002\u011e\u011f\u0005&\u0014\u0002\u011f\u0120\u0007",
    "\u0003\u0002\u0002\u0120\u0121\u0005\u001a\u000e\u0002\u0121\u0123\u0003",
    "\u0002\u0002\u0002\u0122\u011d\u0003\u0002\u0002\u0002\u0123\u0126\u0003",
    "\u0002\u0002\u0002\u0124\u0122\u0003\u0002\u0002\u0002\u0124\u0125\u0003",
    "\u0002\u0002\u0002\u0125\u0127\u0003\u0002\u0002\u0002\u0126\u0124\u0003",
    "\u0002\u0002\u0002\u0127\u0145\u0007\u0006\u0002\u0002\u0128\u012a\u0007",
    "\n\u0002\u0002\u0129\u012b\u0005\u001a\u000e\u0002\u012a\u0129\u0003",
    "\u0002\u0002\u0002\u012a\u012b\u0003\u0002\u0002\u0002\u012b\u0130\u0003",
    "\u0002\u0002\u0002\u012c\u012d\u0007\u0004\u0002\u0002\u012d\u012f\u0005",
    "\u001a\u000e\u0002\u012e\u012c\u0003\u0002\u0002\u0002\u012f\u0132\u0003",
    "\u0002\u0002\u0002\u0130\u012e\u0003\u0002\u0002\u0002\u0130\u0131\u0003",
    "\u0002\u0002\u0002\u0131\u0133\u0003\u0002\u0002\u0002\u0132\u0130\u0003",
    "\u0002\u0002\u0002\u0133\u0145\u0007\u000b\u0002\u0002\u0134\u0136\u0007",
    "\u0019\u0002\u0002\u0135\u0137\u0005\u001a\u000e\u0002\u0136\u0135\u0003",
    "\u0002\u0002\u0002\u0136\u0137\u0003\u0002\u0002\u0002\u0137\u013c\u0003",
    "\u0002\u0002\u0002\u0138\u0139\u0007\u0004\u0002\u0002\u0139\u013b\u0005",
    "\u001a\u000e\u0002\u013a\u0138\u0003\u0002\u0002\u0002\u013b\u013e\u0003",
    "\u0002\u0002\u0002\u013c\u013a\u0003\u0002\u0002\u0002\u013c\u013d\u0003",
    "\u0002\u0002\u0002\u013d\u013f\u0003\u0002\u0002\u0002\u013e\u013c\u0003",
    "\u0002\u0002\u0002\u013f\u0145\u0007\u001a\u0002\u0002\u0140\u0141\u0007",
    "\u0007\u0002\u0002\u0141\u0142\u0005\u001a\u000e\u0002\u0142\u0143\u0007",
    "\b\u0002\u0002\u0143\u0145\u0003\u0002\u0002\u0002\u0144\u00f5\u0003",
    "\u0002\u0002\u0002\u0144\u00f7\u0003\u0002\u0002\u0002\u0144\u00fb\u0003",
    "\u0002\u0002\u0002\u0144\u00fc\u0003\u0002\u0002\u0002\u0144\u00fd\u0003",
    "\u0002\u0002\u0002\u0144\u0100\u0003\u0002\u0002\u0002\u0144\u0108\u0003",
    "\u0002\u0002\u0002\u0144\u0116\u0003\u0002\u0002\u0002\u0144\u0128\u0003",
    "\u0002\u0002\u0002\u0144\u0134\u0003\u0002\u0002\u0002\u0144\u0140\u0003",
    "\u0002\u0002\u0002\u0145\u0165\u0003\u0002\u0002\u0002\u0146\u0147\f",
    "\u000f\u0002\u0002\u0147\u0148\u0007\f\u0002\u0002\u0148\u0164\u0005",
    "\u001a\u000e\u0010\u0149\u014a\f\u000e\u0002\u0002\u014a\u014b\t\u0007",
    "\u0002\u0002\u014b\u0164\u0005\u001a\u000e\u000f\u014c\u014d\f\r\u0002",
    "\u0002\u014d\u014e\t\b\u0002\u0002\u014e\u0164\u0005\u001a\u000e\u000e",
    "\u014f\u0150\f\f\u0002\u0002\u0150\u0151\t\t\u0002\u0002\u0151\u0164",
    "\u0005\u001a\u000e\r\u0152\u0153\f\u000b\u0002\u0002\u0153\u0154\t\n",
    "\u0002\u0002\u0154\u0164\u0005\u001a\u000e\f\u0155\u0156\f\n\u0002\u0002",
    "\u0156\u0157\u00079\u0002\u0002\u0157\u0164\u0005\u001a\u000e\u000b",
    "\u0158\u0159\f\t\u0002\u0002\u0159\u015a\u0007:\u0002\u0002\u015a\u0164",
    "\u0005\u001a\u000e\n\u015b\u015c\f\u0012\u0002\u0002\u015c\u015d\u0007",
    "\t\u0002\u0002\u015d\u0164\u0005&\u0014\u0002\u015e\u015f\f\u0011\u0002",
    "\u0002\u015f\u0160\u0007\n\u0002\u0002\u0160\u0161\u0005\u001a\u000e",
    "\u0002\u0161\u0162\u0007\u000b\u0002\u0002\u0162\u0164\u0003\u0002\u0002",
    "\u0002\u0163\u0146\u0003\u0002\u0002\u0002\u0163\u0149\u0003\u0002\u0002",
    "\u0002\u0163\u014c\u0003\u0002\u0002\u0002\u0163\u014f\u0003\u0002\u0002",
    "\u0002\u0163\u0152\u0003\u0002\u0002\u0002\u0163\u0155\u0003\u0002\u0002",
    "\u0002\u0163\u0158\u0003\u0002\u0002\u0002\u0163\u015b\u0003\u0002\u0002",
    "\u0002\u0163\u015e\u0003\u0002\u0002\u0002\u0164\u0167\u0003\u0002\u0002",
    "\u0002\u0165\u0163\u0003\u0002\u0002\u0002\u0165\u0166\u0003\u0002\u0002",
    "\u0002\u0166\u001b\u0003\u0002\u0002\u0002\u0167\u0165\u0003\u0002\u0002",
    "\u0002\u0168\u0169\t\u000b\u0002\u0002\u0169\u001d\u0003\u0002\u0002",
    "\u0002\u016a\u016b\t\f\u0002\u0002\u016b\u001f\u0003\u0002\u0002\u0002",
    "\u016c\u016d\t\r\u0002\u0002\u016d!\u0003\u0002\u0002\u0002\u016e\u0171",
    "\u0007C\u0002\u0002\u016f\u0171\u0005\u001e\u0010\u0002\u0170\u016e",
    "\u0003\u0002\u0002\u0002\u0170\u016f\u0003\u0002\u0002\u0002\u0171#",
    "\u0003\u0002\u0002\u0002\u0172\u0175\u0007C\u0002\u0002\u0173\u0175",
    "\u0005\u001e\u0010\u0002\u0174\u0172\u0003\u0002\u0002\u0002\u0174\u0173",
    "\u0003\u0002\u0002\u0002\u0175%\u0003\u0002\u0002\u0002\u0176\u0179",
    "\u0007C\u0002\u0002\u0177\u0179\u0005\u001e\u0010\u0002\u0178\u0176",
    "\u0003\u0002\u0002\u0002\u0178\u0177\u0003\u0002\u0002\u0002\u0179\'",
    "\u0003\u0002\u0002\u00025*/258;>AEHKNQTW[jptw\u0082\u0098\u009e\u00a0",
    "\u00a3\u00ac\u00af\u00bc\u00be\u00c9\u00cf\u00d3\u00db\u00e3\u00e8\u00ec",
    "\u0105\u010b\u0111\u011b\u0124\u012a\u0130\u0136\u013c\u0144\u0163\u0165",
    "\u0170\u0174\u0178"].join("");


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

var ruleNames =  [ "query", "sfw_query", "select_clause", "from_clause", 
                   "from_item", "where_clause", "groupby_clause", "having_clause", 
                   "setop_clause", "orderby_clause", "limit_clause", "offset_clause", 
                   "expr", "unary_op", "keyword", "value", "variable", "func_name", 
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
SqlppParser.RULE_sfw_query = 1;
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
SqlppParser.RULE_keyword = 14;
SqlppParser.RULE_value = 15;
SqlppParser.RULE_variable = 16;
SqlppParser.RULE_func_name = 17;
SqlppParser.RULE_attr_name = 18;

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

QueryContext.prototype.sfw_query = function() {
    return this.getTypedRuleContext(Sfw_queryContext,0);
};

QueryContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
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
        this.state = 40;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 38;
            this.sfw_query();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 39;
            this.expr(0);
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

function Sfw_queryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_sfw_query;
    return this;
}

Sfw_queryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Sfw_queryContext.prototype.constructor = Sfw_queryContext;

Sfw_queryContext.prototype.select_clause = function() {
    return this.getTypedRuleContext(Select_clauseContext,0);
};

Sfw_queryContext.prototype.from_clause = function() {
    return this.getTypedRuleContext(From_clauseContext,0);
};

Sfw_queryContext.prototype.where_clause = function() {
    return this.getTypedRuleContext(Where_clauseContext,0);
};

Sfw_queryContext.prototype.groupby_clause = function() {
    return this.getTypedRuleContext(Groupby_clauseContext,0);
};

Sfw_queryContext.prototype.having_clause = function() {
    return this.getTypedRuleContext(Having_clauseContext,0);
};

Sfw_queryContext.prototype.setop_clause = function() {
    return this.getTypedRuleContext(Setop_clauseContext,0);
};

Sfw_queryContext.prototype.orderby_clause = function() {
    return this.getTypedRuleContext(Orderby_clauseContext,0);
};

Sfw_queryContext.prototype.limit_clause = function() {
    return this.getTypedRuleContext(Limit_clauseContext,0);
};

Sfw_queryContext.prototype.offset_clause = function() {
    return this.getTypedRuleContext(Offset_clauseContext,0);
};

Sfw_queryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitSfw_query(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.Sfw_queryContext = Sfw_queryContext;

SqlppParser.prototype.sfw_query = function() {

    var localctx = new Sfw_queryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, SqlppParser.RULE_sfw_query);
    var _la = 0; // Token type
    try {
        this.state = 89;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SqlppParser.K_SELECT:
            this.enterOuterAlt(localctx, 1);
            this.state = 42;
            this.select_clause();
            this.state = 43;
            this.from_clause();
            this.state = 45;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
            if(la_===1) {
                this.state = 44;
                this.where_clause();

            }
            this.state = 48;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
            if(la_===1) {
                this.state = 47;
                this.groupby_clause();

            }
            this.state = 51;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
            if(la_===1) {
                this.state = 50;
                this.having_clause();

            }
            this.state = 54;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
            if(la_===1) {
                this.state = 53;
                this.setop_clause();

            }
            this.state = 57;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
            if(la_===1) {
                this.state = 56;
                this.orderby_clause();

            }
            this.state = 60;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
            if(la_===1) {
                this.state = 59;
                this.limit_clause();

            }
            this.state = 63;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
            if(la_===1) {
                this.state = 62;
                this.offset_clause();

            }
            break;
        case SqlppParser.K_FROM:
            this.enterOuterAlt(localctx, 2);
            this.state = 65;
            this.from_clause();
            this.state = 67;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_WHERE) {
                this.state = 66;
                this.where_clause();
            }

            this.state = 70;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_GROUP) {
                this.state = 69;
                this.groupby_clause();
            }

            this.state = 73;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_HAVING) {
                this.state = 72;
                this.having_clause();
            }

            this.state = 76;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 45)) & ~0x1f) == 0 && ((1 << (_la - 45)) & ((1 << (SqlppParser.K_UNION - 45)) | (1 << (SqlppParser.K_INTERSECT - 45)) | (1 << (SqlppParser.K_EXCEPT - 45)))) !== 0)) {
                this.state = 75;
                this.setop_clause();
            }

            this.state = 79;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_ORDER) {
                this.state = 78;
                this.orderby_clause();
            }

            this.state = 82;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_LIMIT) {
                this.state = 81;
                this.limit_clause();
            }

            this.state = 85;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_OFFSET) {
                this.state = 84;
                this.offset_clause();
            }

            this.state = 87;
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
    try {
        this.state = 117;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            localctx = new SelElementContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 91;
            this.match(SqlppParser.K_SELECT);
            this.state = 92;
            this.match(SqlppParser.K_ELEMENT);
            this.state = 93;
            this.expr(0);
            break;

        case 2:
            localctx = new SelAttrContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 94;
            this.match(SqlppParser.K_SELECT);
            this.state = 95;
            this.match(SqlppParser.K_ATTRIBUTE);
            this.state = 96;
            localctx.attrname = this.expr(0);
            this.state = 97;
            this.match(SqlppParser.T__0);
            this.state = 98;
            localctx.attrval = this.expr(0);
            break;

        case 3:
            localctx = new SQLSelContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 100;
            this.match(SqlppParser.K_SELECT);
            this.state = 101;
            this.expr(0);
            this.state = 104;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
            if(la_===1) {
                this.state = 102;
                this.match(SqlppParser.K_AS);
                this.state = 103;
                this.attr_name();

            }
            this.state = 114;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 106;
                    this.match(SqlppParser.T__1);
                    this.state = 107;
                    this.expr(0);
                    this.state = 110;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
                    if(la_===1) {
                        this.state = 108;
                        this.match(SqlppParser.K_AS);
                        this.state = 109;
                        this.attr_name();

                    } 
                }
                this.state = 116;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
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
        this.state = 119;
        this.match(SqlppParser.K_FROM);
        this.state = 120;
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
        this.state = 150;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
        switch(la_) {
        case 1:
            localctx = new FromRangeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 123;
            this.expr(0);
            this.state = 124;
            this.match(SqlppParser.K_AS);
            this.state = 125;
            localctx.asvar = this.variable();
            this.state = 128;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
            if(la_===1) {
                this.state = 126;
                this.match(SqlppParser.K_AT);
                this.state = 127;
                localctx.atvar = this.variable();

            }
            break;

        case 2:
            localctx = new FromRangePairContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 130;
            this.expr(0);
            this.state = 131;
            this.match(SqlppParser.K_AS);
            this.state = 132;
            this.match(SqlppParser.T__2);
            this.state = 133;
            localctx.attrname = this.variable();
            this.state = 134;
            this.match(SqlppParser.T__0);
            this.state = 135;
            localctx.attrval = this.variable();
            this.state = 136;
            this.match(SqlppParser.T__3);
            break;

        case 3:
            localctx = new FromFlattenContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 138;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===SqlppParser.K_INNER || _la===SqlppParser.K_OUTER)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 139;
            this.match(SqlppParser.K_FLATTEN);
            this.state = 140;
            this.match(SqlppParser.T__4);
            this.state = 141;
            localctx.lexpr = this.expr(0);
            this.state = 142;
            this.match(SqlppParser.K_AS);
            this.state = 143;
            localctx.lvar = this.variable();
            this.state = 144;
            this.match(SqlppParser.T__1);
            this.state = 145;
            localctx.rexpr = this.expr(0);
            this.state = 146;
            this.match(SqlppParser.K_AS);
            this.state = 147;
            localctx.rvar = this.variable();
            this.state = 148;
            this.match(SqlppParser.T__5);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 188;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,28,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 186;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new FromILCorrContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 152;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 158;
                    this._errHandler.sync(this);
                    switch(this._input.LA(1)) {
                    case SqlppParser.K_INNER:
                        this.state = 153;
                        localctx.op = this.match(SqlppParser.K_INNER);
                        break;
                    case SqlppParser.K_LEFT:
                        this.state = 154;
                        localctx.op = this.match(SqlppParser.K_LEFT);
                        this.state = 156;
                        this._errHandler.sync(this);
                        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
                        if(la_===1) {
                            this.state = 155;
                            this.match(SqlppParser.K_OUTER);

                        }
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                    }
                    this.state = 161;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
                    if(la_===1) {
                        this.state = 160;
                        this.match(SqlppParser.K_CORRELATE);

                    }
                    this.state = 163;
                    localctx.rhs = this.from_item(6);
                    break;

                case 2:
                    localctx = new FromCommaContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 164;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 165;
                    localctx.op = this.match(SqlppParser.T__1);
                    this.state = 166;
                    localctx.rhs = this.from_item(4);
                    break;

                case 3:
                    localctx = new FromFullContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 167;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 168;
                    localctx.op = this.match(SqlppParser.K_FULL);
                    this.state = 170;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
                    if(la_===1) {
                        this.state = 169;
                        this.match(SqlppParser.K_OUTER);

                    }
                    this.state = 173;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,26,this._ctx);
                    if(la_===1) {
                        this.state = 172;
                        this.match(SqlppParser.K_CORRELATE);

                    }
                    this.state = 175;
                    localctx.rhs = this.from_item(0);
                    this.state = 176;
                    this.match(SqlppParser.K_ON);
                    this.state = 177;
                    this.expr(0);
                    break;

                case 4:
                    localctx = new FromJoinContext(this, new From_itemContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 179;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 180;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (SqlppParser.K_INNER - 32)) | (1 << (SqlppParser.K_LEFT - 32)) | (1 << (SqlppParser.K_RIGHT - 32)) | (1 << (SqlppParser.K_FULL - 32)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 181;
                    this.match(SqlppParser.K_JOIN);
                    this.state = 182;
                    localctx.rhs = this.from_item(0);
                    this.state = 183;
                    this.match(SqlppParser.K_ON);
                    this.state = 184;
                    this.expr(0);
                    break;

                } 
            }
            this.state = 190;
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
        this.state = 191;
        this.match(SqlppParser.K_WHERE);
        this.state = 192;
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
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 194;
        this.match(SqlppParser.K_GROUP);
        this.state = 195;
        this.match(SqlppParser.K_BY);
        this.state = 196;
        this.expr(0);
        this.state = 199;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,29,this._ctx);
        if(la_===1) {
            this.state = 197;
            this.match(SqlppParser.K_AS);
            this.state = 198;
            this.variable();

        }
        this.state = 209;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,31,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 201;
                this.match(SqlppParser.T__1);
                this.state = 202;
                this.expr(0);
                this.state = 205;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
                if(la_===1) {
                    this.state = 203;
                    this.match(SqlppParser.K_AS);
                    this.state = 204;
                    this.variable();

                } 
            }
            this.state = 211;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,31,this._ctx);
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
        this.state = 212;
        this.match(SqlppParser.K_HAVING);
        this.state = 213;
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
    this.op = null; // Token
    return this;
}

Setop_clauseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Setop_clauseContext.prototype.constructor = Setop_clauseContext;

Setop_clauseContext.prototype.sfw_query = function() {
    return this.getTypedRuleContext(Sfw_queryContext,0);
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
        this.state = 215;
        localctx.op = this._input.LT(1);
        _la = this._input.LA(1);
        if(!(((((_la - 45)) & ~0x1f) == 0 && ((1 << (_la - 45)) & ((1 << (SqlppParser.K_UNION - 45)) | (1 << (SqlppParser.K_INTERSECT - 45)) | (1 << (SqlppParser.K_EXCEPT - 45)))) !== 0))) {
            localctx.op = this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 217;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SqlppParser.K_ALL) {
            this.state = 216;
            this.match(SqlppParser.K_ALL);
        }

        this.state = 219;
        this.sfw_query();
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
        this.state = 221;
        this.match(SqlppParser.K_ORDER);
        this.state = 222;
        this.match(SqlppParser.K_BY);
        this.state = 223;
        this.expr(0);
        this.state = 225;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,33,this._ctx);
        if(la_===1) {
            this.state = 224;
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
        var _alt = this._interp.adaptivePredict(this._input,35,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 227;
                this.match(SqlppParser.T__1);
                this.state = 228;
                this.expr(0);
                this.state = 230;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,34,this._ctx);
                if(la_===1) {
                    this.state = 229;
                    _la = this._input.LA(1);
                    if(!(_la===SqlppParser.K_ASC || _la===SqlppParser.K_DESC)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }

                } 
            }
            this.state = 236;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,35,this._ctx);
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
        this.state = 237;
        this.match(SqlppParser.K_LIMIT);
        this.state = 238;
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
        this.state = 240;
        this.match(SqlppParser.K_OFFSET);
        this.state = 241;
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


function ExprNestSFWContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprNestSFWContext.prototype = Object.create(ExprContext.prototype);
ExprNestSFWContext.prototype.constructor = ExprNestSFWContext;

SqlppParser.ExprNestSFWContext = ExprNestSFWContext;

ExprNestSFWContext.prototype.sfw_query = function() {
    return this.getTypedRuleContext(Sfw_queryContext,0);
};
ExprNestSFWContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitExprNestSFW(this);
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
    this.arr = null; // ExprContext;
    this.pos = null; // ExprContext;
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
        this.state = 322;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,45,this._ctx);
        switch(la_) {
        case 1:
            localctx = new ExprNestSFWContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 244;
            this.sfw_query();
            break;

        case 2:
            localctx = new ExprNestSFWContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 245;
            this.match(SqlppParser.T__4);
            this.state = 246;
            this.sfw_query();
            this.state = 247;
            this.match(SqlppParser.T__5);
            break;

        case 3:
            localctx = new ExprValContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 249;
            this.value();
            break;

        case 4:
            localctx = new ExprVariContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 250;
            this.variable();
            break;

        case 5:
            localctx = new ExprUnaryContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 251;
            this.unary_op();
            this.state = 252;
            this.expr(14);
            break;

        case 6:
            localctx = new ExprAggrContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 254;
            localctx.aggr = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(((((_la - 57)) & ~0x1f) == 0 && ((1 << (_la - 57)) & ((1 << (SqlppParser.K_SUM - 57)) | (1 << (SqlppParser.K_MIN - 57)) | (1 << (SqlppParser.K_MAX - 57)) | (1 << (SqlppParser.K_AVG - 57)) | (1 << (SqlppParser.K_COUNT - 57)))) !== 0))) {
                localctx.aggr = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 255;
            this.match(SqlppParser.T__4);
            this.state = 259;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,36,this._ctx);
            switch(la_) {
            case 1:
                this.state = 256;
                this.match(SqlppParser.K_GROUP);
                break;

            case 2:
                this.state = 257;
                this.match(SqlppParser.AST);
                break;

            case 3:
                this.state = 258;
                this.expr(0);
                break;

            }
            this.state = 261;
            this.match(SqlppParser.T__5);
            break;

        case 7:
            localctx = new ExprFuncContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 262;
            this.func_name();
            this.state = 263;
            this.match(SqlppParser.T__4);
            this.state = 265;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (SqlppParser.T__2 - 3)) | (1 << (SqlppParser.T__4 - 3)) | (1 << (SqlppParser.T__7 - 3)) | (1 << (SqlppParser.T__12 - 3)) | (1 << (SqlppParser.T__13 - 3)) | (1 << (SqlppParser.T__22 - 3)) | (1 << (SqlppParser.T__24 - 3)) | (1 << (SqlppParser.K_SELECT - 3)) | (1 << (SqlppParser.K_ELEMENT - 3)) | (1 << (SqlppParser.K_ATTRIBUTE - 3)) | (1 << (SqlppParser.K_FROM - 3)) | (1 << (SqlppParser.K_AS - 3)) | (1 << (SqlppParser.K_AT - 3)) | (1 << (SqlppParser.K_INNER - 3)) | (1 << (SqlppParser.K_LEFT - 3)) | (1 << (SqlppParser.K_RIGHT - 3)))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (SqlppParser.K_FULL - 35)) | (1 << (SqlppParser.K_OUTER - 35)) | (1 << (SqlppParser.K_JOIN - 35)) | (1 << (SqlppParser.K_CORRELATE - 35)) | (1 << (SqlppParser.K_ON - 35)) | (1 << (SqlppParser.K_FLATTEN - 35)) | (1 << (SqlppParser.K_WHERE - 35)) | (1 << (SqlppParser.K_GROUP - 35)) | (1 << (SqlppParser.K_BY - 35)) | (1 << (SqlppParser.K_HAVING - 35)) | (1 << (SqlppParser.K_UNION - 35)) | (1 << (SqlppParser.K_INTERSECT - 35)) | (1 << (SqlppParser.K_EXCEPT - 35)) | (1 << (SqlppParser.K_ALL - 35)) | (1 << (SqlppParser.K_ORDER - 35)) | (1 << (SqlppParser.K_ASC - 35)) | (1 << (SqlppParser.K_DESC - 35)) | (1 << (SqlppParser.K_LIMIT - 35)) | (1 << (SqlppParser.K_OFFSET - 35)) | (1 << (SqlppParser.K_NOT - 35)) | (1 << (SqlppParser.K_AND - 35)) | (1 << (SqlppParser.K_OR - 35)) | (1 << (SqlppParser.K_SUM - 35)) | (1 << (SqlppParser.K_MIN - 35)) | (1 << (SqlppParser.K_MAX - 35)) | (1 << (SqlppParser.K_AVG - 35)) | (1 << (SqlppParser.K_COUNT - 35)) | (1 << (SqlppParser.STRLITERAL - 35)) | (1 << (SqlppParser.NUMBER - 35)) | (1 << (SqlppParser.VAR_NAME - 35)))) !== 0)) {
                this.state = 264;
                this.expr(0);
            }

            this.state = 271;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 267;
                this.match(SqlppParser.T__1);
                this.state = 268;
                this.expr(0);
                this.state = 273;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 274;
            this.match(SqlppParser.T__5);
            break;

        case 8:
            localctx = new ExprObjContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 276;
            this.match(SqlppParser.T__2);
            this.state = 281;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 26)) & ~0x1f) == 0 && ((1 << (_la - 26)) & ((1 << (SqlppParser.K_SELECT - 26)) | (1 << (SqlppParser.K_ELEMENT - 26)) | (1 << (SqlppParser.K_ATTRIBUTE - 26)) | (1 << (SqlppParser.K_FROM - 26)) | (1 << (SqlppParser.K_AS - 26)) | (1 << (SqlppParser.K_AT - 26)) | (1 << (SqlppParser.K_INNER - 26)) | (1 << (SqlppParser.K_LEFT - 26)) | (1 << (SqlppParser.K_RIGHT - 26)) | (1 << (SqlppParser.K_FULL - 26)) | (1 << (SqlppParser.K_OUTER - 26)) | (1 << (SqlppParser.K_JOIN - 26)) | (1 << (SqlppParser.K_CORRELATE - 26)) | (1 << (SqlppParser.K_ON - 26)) | (1 << (SqlppParser.K_FLATTEN - 26)) | (1 << (SqlppParser.K_WHERE - 26)) | (1 << (SqlppParser.K_GROUP - 26)) | (1 << (SqlppParser.K_BY - 26)) | (1 << (SqlppParser.K_HAVING - 26)) | (1 << (SqlppParser.K_UNION - 26)) | (1 << (SqlppParser.K_INTERSECT - 26)) | (1 << (SqlppParser.K_EXCEPT - 26)) | (1 << (SqlppParser.K_ALL - 26)) | (1 << (SqlppParser.K_ORDER - 26)) | (1 << (SqlppParser.K_ASC - 26)) | (1 << (SqlppParser.K_DESC - 26)) | (1 << (SqlppParser.K_LIMIT - 26)) | (1 << (SqlppParser.K_OFFSET - 26)) | (1 << (SqlppParser.K_NOT - 26)) | (1 << (SqlppParser.K_AND - 26)) | (1 << (SqlppParser.K_OR - 26)) | (1 << (SqlppParser.K_SUM - 26)))) !== 0) || ((((_la - 58)) & ~0x1f) == 0 && ((1 << (_la - 58)) & ((1 << (SqlppParser.K_MIN - 58)) | (1 << (SqlppParser.K_MAX - 58)) | (1 << (SqlppParser.K_AVG - 58)) | (1 << (SqlppParser.K_COUNT - 58)) | (1 << (SqlppParser.VAR_NAME - 58)))) !== 0)) {
                this.state = 277;
                this.attr_name();
                this.state = 278;
                this.match(SqlppParser.T__0);
                this.state = 279;
                this.expr(0);
            }

            this.state = 290;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 283;
                this.match(SqlppParser.T__1);
                this.state = 284;
                this.attr_name();
                this.state = 285;
                this.match(SqlppParser.T__0);
                this.state = 286;
                this.expr(0);
                this.state = 292;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 293;
            this.match(SqlppParser.T__3);
            break;

        case 9:
            localctx = new ExprArrContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 294;
            this.match(SqlppParser.T__7);
            this.state = 296;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (SqlppParser.T__2 - 3)) | (1 << (SqlppParser.T__4 - 3)) | (1 << (SqlppParser.T__7 - 3)) | (1 << (SqlppParser.T__12 - 3)) | (1 << (SqlppParser.T__13 - 3)) | (1 << (SqlppParser.T__22 - 3)) | (1 << (SqlppParser.T__24 - 3)) | (1 << (SqlppParser.K_SELECT - 3)) | (1 << (SqlppParser.K_ELEMENT - 3)) | (1 << (SqlppParser.K_ATTRIBUTE - 3)) | (1 << (SqlppParser.K_FROM - 3)) | (1 << (SqlppParser.K_AS - 3)) | (1 << (SqlppParser.K_AT - 3)) | (1 << (SqlppParser.K_INNER - 3)) | (1 << (SqlppParser.K_LEFT - 3)) | (1 << (SqlppParser.K_RIGHT - 3)))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (SqlppParser.K_FULL - 35)) | (1 << (SqlppParser.K_OUTER - 35)) | (1 << (SqlppParser.K_JOIN - 35)) | (1 << (SqlppParser.K_CORRELATE - 35)) | (1 << (SqlppParser.K_ON - 35)) | (1 << (SqlppParser.K_FLATTEN - 35)) | (1 << (SqlppParser.K_WHERE - 35)) | (1 << (SqlppParser.K_GROUP - 35)) | (1 << (SqlppParser.K_BY - 35)) | (1 << (SqlppParser.K_HAVING - 35)) | (1 << (SqlppParser.K_UNION - 35)) | (1 << (SqlppParser.K_INTERSECT - 35)) | (1 << (SqlppParser.K_EXCEPT - 35)) | (1 << (SqlppParser.K_ALL - 35)) | (1 << (SqlppParser.K_ORDER - 35)) | (1 << (SqlppParser.K_ASC - 35)) | (1 << (SqlppParser.K_DESC - 35)) | (1 << (SqlppParser.K_LIMIT - 35)) | (1 << (SqlppParser.K_OFFSET - 35)) | (1 << (SqlppParser.K_NOT - 35)) | (1 << (SqlppParser.K_AND - 35)) | (1 << (SqlppParser.K_OR - 35)) | (1 << (SqlppParser.K_SUM - 35)) | (1 << (SqlppParser.K_MIN - 35)) | (1 << (SqlppParser.K_MAX - 35)) | (1 << (SqlppParser.K_AVG - 35)) | (1 << (SqlppParser.K_COUNT - 35)) | (1 << (SqlppParser.STRLITERAL - 35)) | (1 << (SqlppParser.NUMBER - 35)) | (1 << (SqlppParser.VAR_NAME - 35)))) !== 0)) {
                this.state = 295;
                this.expr(0);
            }

            this.state = 302;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 298;
                this.match(SqlppParser.T__1);
                this.state = 299;
                this.expr(0);
                this.state = 304;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 305;
            this.match(SqlppParser.T__8);
            break;

        case 10:
            localctx = new ExprBagContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 306;
            this.match(SqlppParser.T__22);
            this.state = 308;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (SqlppParser.T__2 - 3)) | (1 << (SqlppParser.T__4 - 3)) | (1 << (SqlppParser.T__7 - 3)) | (1 << (SqlppParser.T__12 - 3)) | (1 << (SqlppParser.T__13 - 3)) | (1 << (SqlppParser.T__22 - 3)) | (1 << (SqlppParser.T__24 - 3)) | (1 << (SqlppParser.K_SELECT - 3)) | (1 << (SqlppParser.K_ELEMENT - 3)) | (1 << (SqlppParser.K_ATTRIBUTE - 3)) | (1 << (SqlppParser.K_FROM - 3)) | (1 << (SqlppParser.K_AS - 3)) | (1 << (SqlppParser.K_AT - 3)) | (1 << (SqlppParser.K_INNER - 3)) | (1 << (SqlppParser.K_LEFT - 3)) | (1 << (SqlppParser.K_RIGHT - 3)))) !== 0) || ((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (SqlppParser.K_FULL - 35)) | (1 << (SqlppParser.K_OUTER - 35)) | (1 << (SqlppParser.K_JOIN - 35)) | (1 << (SqlppParser.K_CORRELATE - 35)) | (1 << (SqlppParser.K_ON - 35)) | (1 << (SqlppParser.K_FLATTEN - 35)) | (1 << (SqlppParser.K_WHERE - 35)) | (1 << (SqlppParser.K_GROUP - 35)) | (1 << (SqlppParser.K_BY - 35)) | (1 << (SqlppParser.K_HAVING - 35)) | (1 << (SqlppParser.K_UNION - 35)) | (1 << (SqlppParser.K_INTERSECT - 35)) | (1 << (SqlppParser.K_EXCEPT - 35)) | (1 << (SqlppParser.K_ALL - 35)) | (1 << (SqlppParser.K_ORDER - 35)) | (1 << (SqlppParser.K_ASC - 35)) | (1 << (SqlppParser.K_DESC - 35)) | (1 << (SqlppParser.K_LIMIT - 35)) | (1 << (SqlppParser.K_OFFSET - 35)) | (1 << (SqlppParser.K_NOT - 35)) | (1 << (SqlppParser.K_AND - 35)) | (1 << (SqlppParser.K_OR - 35)) | (1 << (SqlppParser.K_SUM - 35)) | (1 << (SqlppParser.K_MIN - 35)) | (1 << (SqlppParser.K_MAX - 35)) | (1 << (SqlppParser.K_AVG - 35)) | (1 << (SqlppParser.K_COUNT - 35)) | (1 << (SqlppParser.STRLITERAL - 35)) | (1 << (SqlppParser.NUMBER - 35)) | (1 << (SqlppParser.VAR_NAME - 35)))) !== 0)) {
                this.state = 307;
                this.expr(0);
            }

            this.state = 314;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 310;
                this.match(SqlppParser.T__1);
                this.state = 311;
                this.expr(0);
                this.state = 316;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 317;
            this.match(SqlppParser.T__23);
            break;

        case 11:
            localctx = new ExprParanContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 318;
            this.match(SqlppParser.T__4);
            this.state = 319;
            this.expr(0);
            this.state = 320;
            this.match(SqlppParser.T__5);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 355;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,47,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 353;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,46,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 324;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 325;
                    localctx.op = this.match(SqlppParser.T__9);
                    this.state = 326;
                    localctx.rhs = this.expr(14);
                    break;

                case 2:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 327;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 328;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===SqlppParser.T__10 || _la===SqlppParser.T__11 || _la===SqlppParser.AST)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 329;
                    localctx.rhs = this.expr(13);
                    break;

                case 3:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 330;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 331;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===SqlppParser.T__12 || _la===SqlppParser.T__13)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 332;
                    localctx.rhs = this.expr(12);
                    break;

                case 4:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 333;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 334;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__14) | (1 << SqlppParser.T__15) | (1 << SqlppParser.T__16) | (1 << SqlppParser.T__17))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 335;
                    localctx.rhs = this.expr(11);
                    break;

                case 5:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 336;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 337;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__18) | (1 << SqlppParser.T__19) | (1 << SqlppParser.T__20) | (1 << SqlppParser.T__21))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 338;
                    localctx.rhs = this.expr(10);
                    break;

                case 6:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 339;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 340;
                    localctx.op = this.match(SqlppParser.K_AND);
                    this.state = 341;
                    localctx.rhs = this.expr(9);
                    break;

                case 7:
                    localctx = new ExprBinaryContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.lhs = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 342;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 343;
                    localctx.op = this.match(SqlppParser.K_OR);
                    this.state = 344;
                    localctx.rhs = this.expr(8);
                    break;

                case 8:
                    localctx = new ExprPathContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 345;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 346;
                    this.match(SqlppParser.T__6);
                    this.state = 347;
                    this.attr_name();
                    break;

                case 9:
                    localctx = new ExprArrAcsContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.arr = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 348;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 349;
                    this.match(SqlppParser.T__7);
                    this.state = 350;
                    localctx.pos = this.expr(0);
                    this.state = 351;
                    this.match(SqlppParser.T__8);
                    break;

                } 
            }
            this.state = 357;
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
        this.state = 358;
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

function KeywordContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SqlppParser.RULE_keyword;
    return this;
}

KeywordContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
KeywordContext.prototype.constructor = KeywordContext;

KeywordContext.prototype.K_SELECT = function() {
    return this.getToken(SqlppParser.K_SELECT, 0);
};

KeywordContext.prototype.K_ELEMENT = function() {
    return this.getToken(SqlppParser.K_ELEMENT, 0);
};

KeywordContext.prototype.K_ATTRIBUTE = function() {
    return this.getToken(SqlppParser.K_ATTRIBUTE, 0);
};

KeywordContext.prototype.K_FROM = function() {
    return this.getToken(SqlppParser.K_FROM, 0);
};

KeywordContext.prototype.K_AS = function() {
    return this.getToken(SqlppParser.K_AS, 0);
};

KeywordContext.prototype.K_AT = function() {
    return this.getToken(SqlppParser.K_AT, 0);
};

KeywordContext.prototype.K_INNER = function() {
    return this.getToken(SqlppParser.K_INNER, 0);
};

KeywordContext.prototype.K_LEFT = function() {
    return this.getToken(SqlppParser.K_LEFT, 0);
};

KeywordContext.prototype.K_RIGHT = function() {
    return this.getToken(SqlppParser.K_RIGHT, 0);
};

KeywordContext.prototype.K_FULL = function() {
    return this.getToken(SqlppParser.K_FULL, 0);
};

KeywordContext.prototype.K_OUTER = function() {
    return this.getToken(SqlppParser.K_OUTER, 0);
};

KeywordContext.prototype.K_JOIN = function() {
    return this.getToken(SqlppParser.K_JOIN, 0);
};

KeywordContext.prototype.K_CORRELATE = function() {
    return this.getToken(SqlppParser.K_CORRELATE, 0);
};

KeywordContext.prototype.K_ON = function() {
    return this.getToken(SqlppParser.K_ON, 0);
};

KeywordContext.prototype.K_FLATTEN = function() {
    return this.getToken(SqlppParser.K_FLATTEN, 0);
};

KeywordContext.prototype.K_WHERE = function() {
    return this.getToken(SqlppParser.K_WHERE, 0);
};

KeywordContext.prototype.K_GROUP = function() {
    return this.getToken(SqlppParser.K_GROUP, 0);
};

KeywordContext.prototype.K_BY = function() {
    return this.getToken(SqlppParser.K_BY, 0);
};

KeywordContext.prototype.K_HAVING = function() {
    return this.getToken(SqlppParser.K_HAVING, 0);
};

KeywordContext.prototype.K_UNION = function() {
    return this.getToken(SqlppParser.K_UNION, 0);
};

KeywordContext.prototype.K_INTERSECT = function() {
    return this.getToken(SqlppParser.K_INTERSECT, 0);
};

KeywordContext.prototype.K_EXCEPT = function() {
    return this.getToken(SqlppParser.K_EXCEPT, 0);
};

KeywordContext.prototype.K_ALL = function() {
    return this.getToken(SqlppParser.K_ALL, 0);
};

KeywordContext.prototype.K_ORDER = function() {
    return this.getToken(SqlppParser.K_ORDER, 0);
};

KeywordContext.prototype.K_ASC = function() {
    return this.getToken(SqlppParser.K_ASC, 0);
};

KeywordContext.prototype.K_DESC = function() {
    return this.getToken(SqlppParser.K_DESC, 0);
};

KeywordContext.prototype.K_LIMIT = function() {
    return this.getToken(SqlppParser.K_LIMIT, 0);
};

KeywordContext.prototype.K_OFFSET = function() {
    return this.getToken(SqlppParser.K_OFFSET, 0);
};

KeywordContext.prototype.K_NOT = function() {
    return this.getToken(SqlppParser.K_NOT, 0);
};

KeywordContext.prototype.K_AND = function() {
    return this.getToken(SqlppParser.K_AND, 0);
};

KeywordContext.prototype.K_OR = function() {
    return this.getToken(SqlppParser.K_OR, 0);
};

KeywordContext.prototype.K_SUM = function() {
    return this.getToken(SqlppParser.K_SUM, 0);
};

KeywordContext.prototype.K_MIN = function() {
    return this.getToken(SqlppParser.K_MIN, 0);
};

KeywordContext.prototype.K_MAX = function() {
    return this.getToken(SqlppParser.K_MAX, 0);
};

KeywordContext.prototype.K_AVG = function() {
    return this.getToken(SqlppParser.K_AVG, 0);
};

KeywordContext.prototype.K_COUNT = function() {
    return this.getToken(SqlppParser.K_COUNT, 0);
};

KeywordContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SqlppVisitor ) {
        return visitor.visitKeyword(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SqlppParser.KeywordContext = KeywordContext;

SqlppParser.prototype.keyword = function() {

    var localctx = new KeywordContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, SqlppParser.RULE_keyword);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 360;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.K_SELECT) | (1 << SqlppParser.K_ELEMENT) | (1 << SqlppParser.K_ATTRIBUTE) | (1 << SqlppParser.K_FROM) | (1 << SqlppParser.K_AS) | (1 << SqlppParser.K_AT))) !== 0) || ((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (SqlppParser.K_INNER - 32)) | (1 << (SqlppParser.K_LEFT - 32)) | (1 << (SqlppParser.K_RIGHT - 32)) | (1 << (SqlppParser.K_FULL - 32)) | (1 << (SqlppParser.K_OUTER - 32)) | (1 << (SqlppParser.K_JOIN - 32)) | (1 << (SqlppParser.K_CORRELATE - 32)) | (1 << (SqlppParser.K_ON - 32)) | (1 << (SqlppParser.K_FLATTEN - 32)) | (1 << (SqlppParser.K_WHERE - 32)) | (1 << (SqlppParser.K_GROUP - 32)) | (1 << (SqlppParser.K_BY - 32)) | (1 << (SqlppParser.K_HAVING - 32)) | (1 << (SqlppParser.K_UNION - 32)) | (1 << (SqlppParser.K_INTERSECT - 32)) | (1 << (SqlppParser.K_EXCEPT - 32)) | (1 << (SqlppParser.K_ALL - 32)) | (1 << (SqlppParser.K_ORDER - 32)) | (1 << (SqlppParser.K_ASC - 32)) | (1 << (SqlppParser.K_DESC - 32)) | (1 << (SqlppParser.K_LIMIT - 32)) | (1 << (SqlppParser.K_OFFSET - 32)) | (1 << (SqlppParser.K_NOT - 32)) | (1 << (SqlppParser.K_AND - 32)) | (1 << (SqlppParser.K_OR - 32)) | (1 << (SqlppParser.K_SUM - 32)) | (1 << (SqlppParser.K_MIN - 32)) | (1 << (SqlppParser.K_MAX - 32)) | (1 << (SqlppParser.K_AVG - 32)) | (1 << (SqlppParser.K_COUNT - 32)))) !== 0))) {
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
    this.enterRule(localctx, 30, SqlppParser.RULE_value);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 362;
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

VariableContext.prototype.keyword = function() {
    return this.getTypedRuleContext(KeywordContext,0);
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
    this.enterRule(localctx, 32, SqlppParser.RULE_variable);
    try {
        this.state = 366;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SqlppParser.VAR_NAME:
            this.enterOuterAlt(localctx, 1);
            this.state = 364;
            this.match(SqlppParser.VAR_NAME);
            break;
        case SqlppParser.K_SELECT:
        case SqlppParser.K_ELEMENT:
        case SqlppParser.K_ATTRIBUTE:
        case SqlppParser.K_FROM:
        case SqlppParser.K_AS:
        case SqlppParser.K_AT:
        case SqlppParser.K_INNER:
        case SqlppParser.K_LEFT:
        case SqlppParser.K_RIGHT:
        case SqlppParser.K_FULL:
        case SqlppParser.K_OUTER:
        case SqlppParser.K_JOIN:
        case SqlppParser.K_CORRELATE:
        case SqlppParser.K_ON:
        case SqlppParser.K_FLATTEN:
        case SqlppParser.K_WHERE:
        case SqlppParser.K_GROUP:
        case SqlppParser.K_BY:
        case SqlppParser.K_HAVING:
        case SqlppParser.K_UNION:
        case SqlppParser.K_INTERSECT:
        case SqlppParser.K_EXCEPT:
        case SqlppParser.K_ALL:
        case SqlppParser.K_ORDER:
        case SqlppParser.K_ASC:
        case SqlppParser.K_DESC:
        case SqlppParser.K_LIMIT:
        case SqlppParser.K_OFFSET:
        case SqlppParser.K_NOT:
        case SqlppParser.K_AND:
        case SqlppParser.K_OR:
        case SqlppParser.K_SUM:
        case SqlppParser.K_MIN:
        case SqlppParser.K_MAX:
        case SqlppParser.K_AVG:
        case SqlppParser.K_COUNT:
            this.enterOuterAlt(localctx, 2);
            this.state = 365;
            this.keyword();
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

Func_nameContext.prototype.keyword = function() {
    return this.getTypedRuleContext(KeywordContext,0);
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
    this.enterRule(localctx, 34, SqlppParser.RULE_func_name);
    try {
        this.state = 370;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SqlppParser.VAR_NAME:
            this.enterOuterAlt(localctx, 1);
            this.state = 368;
            this.match(SqlppParser.VAR_NAME);
            break;
        case SqlppParser.K_SELECT:
        case SqlppParser.K_ELEMENT:
        case SqlppParser.K_ATTRIBUTE:
        case SqlppParser.K_FROM:
        case SqlppParser.K_AS:
        case SqlppParser.K_AT:
        case SqlppParser.K_INNER:
        case SqlppParser.K_LEFT:
        case SqlppParser.K_RIGHT:
        case SqlppParser.K_FULL:
        case SqlppParser.K_OUTER:
        case SqlppParser.K_JOIN:
        case SqlppParser.K_CORRELATE:
        case SqlppParser.K_ON:
        case SqlppParser.K_FLATTEN:
        case SqlppParser.K_WHERE:
        case SqlppParser.K_GROUP:
        case SqlppParser.K_BY:
        case SqlppParser.K_HAVING:
        case SqlppParser.K_UNION:
        case SqlppParser.K_INTERSECT:
        case SqlppParser.K_EXCEPT:
        case SqlppParser.K_ALL:
        case SqlppParser.K_ORDER:
        case SqlppParser.K_ASC:
        case SqlppParser.K_DESC:
        case SqlppParser.K_LIMIT:
        case SqlppParser.K_OFFSET:
        case SqlppParser.K_NOT:
        case SqlppParser.K_AND:
        case SqlppParser.K_OR:
        case SqlppParser.K_SUM:
        case SqlppParser.K_MIN:
        case SqlppParser.K_MAX:
        case SqlppParser.K_AVG:
        case SqlppParser.K_COUNT:
            this.enterOuterAlt(localctx, 2);
            this.state = 369;
            this.keyword();
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

Attr_nameContext.prototype.keyword = function() {
    return this.getTypedRuleContext(KeywordContext,0);
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
    this.enterRule(localctx, 36, SqlppParser.RULE_attr_name);
    try {
        this.state = 374;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case SqlppParser.VAR_NAME:
            this.enterOuterAlt(localctx, 1);
            this.state = 372;
            this.match(SqlppParser.VAR_NAME);
            break;
        case SqlppParser.K_SELECT:
        case SqlppParser.K_ELEMENT:
        case SqlppParser.K_ATTRIBUTE:
        case SqlppParser.K_FROM:
        case SqlppParser.K_AS:
        case SqlppParser.K_AT:
        case SqlppParser.K_INNER:
        case SqlppParser.K_LEFT:
        case SqlppParser.K_RIGHT:
        case SqlppParser.K_FULL:
        case SqlppParser.K_OUTER:
        case SqlppParser.K_JOIN:
        case SqlppParser.K_CORRELATE:
        case SqlppParser.K_ON:
        case SqlppParser.K_FLATTEN:
        case SqlppParser.K_WHERE:
        case SqlppParser.K_GROUP:
        case SqlppParser.K_BY:
        case SqlppParser.K_HAVING:
        case SqlppParser.K_UNION:
        case SqlppParser.K_INTERSECT:
        case SqlppParser.K_EXCEPT:
        case SqlppParser.K_ALL:
        case SqlppParser.K_ORDER:
        case SqlppParser.K_ASC:
        case SqlppParser.K_DESC:
        case SqlppParser.K_LIMIT:
        case SqlppParser.K_OFFSET:
        case SqlppParser.K_NOT:
        case SqlppParser.K_AND:
        case SqlppParser.K_OR:
        case SqlppParser.K_SUM:
        case SqlppParser.K_MIN:
        case SqlppParser.K_MAX:
        case SqlppParser.K_AVG:
        case SqlppParser.K_COUNT:
            this.enterOuterAlt(localctx, 2);
            this.state = 373;
            this.keyword();
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
