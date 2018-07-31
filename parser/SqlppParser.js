// Generated from Sqlpp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var SqlppListener = require('./SqlppListener').SqlppListener;
var grammarFileName = "Sqlpp.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u00033\u00fd\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002\u001e\n\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0005\u0003-\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0005\u00033\n\u0003\u0007\u00035\n\u0003\f\u0003\u000e",
    "\u00038\u000b\u0003\u0005\u0003:\n\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0005\u0005E\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005[",
    "\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005",
    "a\n\u0005\u0005\u0005c\n\u0005\u0003\u0005\u0005\u0005f\n\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0005\u0005o\n\u0005\u0003\u0005\u0005\u0005r\n\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005\u007f\n",
    "\u0005\f\u0005\u000e\u0005\u0082\u000b\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0005\u0007\u0094\n\u0007\u0003\u0007\u0003",
    "\u0007\u0007\u0007\u0098\n\u0007\f\u0007\u000e\u0007\u009b\u000b\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0005\u0007\u00a4\n\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0007\u0007\u00ab\n\u0007\f\u0007\u000e",
    "\u0007\u00ae\u000b\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007",
    "\u00b3\n\u0007\u0003\u0007\u0003\u0007\u0007\u0007\u00b7\n\u0007\f\u0007",
    "\u000e\u0007\u00ba\u000b\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005",
    "\u0007\u00bf\n\u0007\u0003\u0007\u0003\u0007\u0007\u0007\u00c3\n\u0007",
    "\f\u0007\u000e\u0007\u00c6\u000b\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0005\u0007\u00cd\n\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007\u00ec\n",
    "\u0007\f\u0007\u000e\u0007\u00ef\u000b\u0007\u0003\b\u0003\b\u0003\t",
    "\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\r\u0002\u0004\b\f\u000e\u0002\u0004\u0006\b\n\f\u000e",
    "\u0010\u0012\u0014\u0016\u0018\u0002\u000b\u0004\u0002##\'\'\u0003\u0002",
    "#&\u0003\u0002\r\u000f\u0003\u0002\u0010\u0011\u0003\u0002\u0012\u0015",
    "\u0003\u0002\u0016\u0019\u0005\u0002\u0010\u0011\u001c\u001c--\u0003",
    "\u000201\u0003\u0002-/\u0002\u011b\u0002\u001a\u0003\u0002\u0002\u0002",
    "\u00049\u0003\u0002\u0002\u0002\u0006;\u0003\u0002\u0002\u0002\bZ\u0003",
    "\u0002\u0002\u0002\n\u0083\u0003\u0002\u0002\u0002\f\u00cc\u0003\u0002",
    "\u0002\u0002\u000e\u00f0\u0003\u0002\u0002\u0002\u0010\u00f2\u0003\u0002",
    "\u0002\u0002\u0012\u00f4\u0003\u0002\u0002\u0002\u0014\u00f6\u0003\u0002",
    "\u0002\u0002\u0016\u00f8\u0003\u0002\u0002\u0002\u0018\u00fa\u0003\u0002",
    "\u0002\u0002\u001a\u001b\u0005\u0004\u0003\u0002\u001b\u001d\u0005\u0006",
    "\u0004\u0002\u001c\u001e\u0005\n\u0006\u0002\u001d\u001c\u0003\u0002",
    "\u0002\u0002\u001d\u001e\u0003\u0002\u0002\u0002\u001e\u0003\u0003\u0002",
    "\u0002\u0002\u001f \u0007\u001d\u0002\u0002 !\u0007\u001e\u0002\u0002",
    "!:\u0005\f\u0007\u0002\"#\u0007\u001d\u0002\u0002#$\u0007\u001f\u0002",
    "\u0002$%\u0005\f\u0007\u0002%&\u0007\u0003\u0002\u0002&\'\u0005\f\u0007",
    "\u0002\':\u0003\u0002\u0002\u0002()\u0007\u001d\u0002\u0002),\u0005",
    "\f\u0007\u0002*+\u0007!\u0002\u0002+-\u0005\u0016\f\u0002,*\u0003\u0002",
    "\u0002\u0002,-\u0003\u0002\u0002\u0002-6\u0003\u0002\u0002\u0002./\u0007",
    "\u0004\u0002\u0002/2\u0005\f\u0007\u000201\u0007!\u0002\u000213\u0005",
    "\u0016\f\u000220\u0003\u0002\u0002\u000223\u0003\u0002\u0002\u00023",
    "5\u0003\u0002\u0002\u00024.\u0003\u0002\u0002\u000258\u0003\u0002\u0002",
    "\u000264\u0003\u0002\u0002\u000267\u0003\u0002\u0002\u00027:\u0003\u0002",
    "\u0002\u000286\u0003\u0002\u0002\u00029\u001f\u0003\u0002\u0002\u0002",
    "9\"\u0003\u0002\u0002\u00029(\u0003\u0002\u0002\u0002:\u0005\u0003\u0002",
    "\u0002\u0002;<\u0007 \u0002\u0002<=\u0005\b\u0005\u0002=\u0007\u0003",
    "\u0002\u0002\u0002>?\b\u0005\u0001\u0002?@\u0005\f\u0007\u0002@A\u0007",
    "!\u0002\u0002AD\u0005\u0012\n\u0002BC\u0007\"\u0002\u0002CE\u0005\u0012",
    "\n\u0002DB\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002\u0002E[\u0003",
    "\u0002\u0002\u0002FG\u0005\f\u0007\u0002GH\u0007!\u0002\u0002HI\u0007",
    "\u0005\u0002\u0002IJ\u0005\u0012\n\u0002JK\u0007\u0003\u0002\u0002K",
    "L\u0005\u0012\n\u0002LM\u0007\u0006\u0002\u0002M[\u0003\u0002\u0002",
    "\u0002NO\t\u0002\u0002\u0002OP\u0007+\u0002\u0002PQ\u0007\u0007\u0002",
    "\u0002QR\u0005\f\u0007\u0002RS\u0007!\u0002\u0002ST\u0005\u0012\n\u0002",
    "TU\u0007\u0004\u0002\u0002UV\u0005\f\u0007\u0002VW\u0007!\u0002\u0002",
    "WX\u0005\u0012\n\u0002XY\u0007\b\u0002\u0002Y[\u0003\u0002\u0002\u0002",
    "Z>\u0003\u0002\u0002\u0002ZF\u0003\u0002\u0002\u0002ZN\u0003\u0002\u0002",
    "\u0002[\u0080\u0003\u0002\u0002\u0002\\b\f\u0007\u0002\u0002]c\u0007",
    "#\u0002\u0002^`\u0007$\u0002\u0002_a\u0007\'\u0002\u0002`_\u0003\u0002",
    "\u0002\u0002`a\u0003\u0002\u0002\u0002ac\u0003\u0002\u0002\u0002b]\u0003",
    "\u0002\u0002\u0002b^\u0003\u0002\u0002\u0002ce\u0003\u0002\u0002\u0002",
    "df\u0007)\u0002\u0002ed\u0003\u0002\u0002\u0002ef\u0003\u0002\u0002",
    "\u0002fg\u0003\u0002\u0002\u0002g\u007f\u0005\b\u0005\bhi\f\u0005\u0002",
    "\u0002ij\u0007\u0004\u0002\u0002j\u007f\u0005\b\u0005\u0006kl\f\u0006",
    "\u0002\u0002ln\u0007&\u0002\u0002mo\u0007\'\u0002\u0002nm\u0003\u0002",
    "\u0002\u0002no\u0003\u0002\u0002\u0002oq\u0003\u0002\u0002\u0002pr\u0007",
    ")\u0002\u0002qp\u0003\u0002\u0002\u0002qr\u0003\u0002\u0002\u0002rs",
    "\u0003\u0002\u0002\u0002st\u0005\b\u0005\u0002tu\u0007*\u0002\u0002",
    "uv\u0005\f\u0007\u0002v\u007f\u0003\u0002\u0002\u0002wx\f\u0004\u0002",
    "\u0002xy\t\u0003\u0002\u0002yz\u0007(\u0002\u0002z{\u0005\b\u0005\u0002",
    "{|\u0007*\u0002\u0002|}\u0005\f\u0007\u0002}\u007f\u0003\u0002\u0002",
    "\u0002~\\\u0003\u0002\u0002\u0002~h\u0003\u0002\u0002\u0002~k\u0003",
    "\u0002\u0002\u0002~w\u0003\u0002\u0002\u0002\u007f\u0082\u0003\u0002",
    "\u0002\u0002\u0080~\u0003\u0002\u0002\u0002\u0080\u0081\u0003\u0002",
    "\u0002\u0002\u0081\t\u0003\u0002\u0002\u0002\u0082\u0080\u0003\u0002",
    "\u0002\u0002\u0083\u0084\u0007,\u0002\u0002\u0084\u0085\u0005\f\u0007",
    "\u0002\u0085\u000b\u0003\u0002\u0002\u0002\u0086\u0087\b\u0007\u0001",
    "\u0002\u0087\u0088\u0007\u0007\u0002\u0002\u0088\u0089\u0005\u0002\u0002",
    "\u0002\u0089\u008a\u0007\b\u0002\u0002\u008a\u00cd\u0003\u0002\u0002",
    "\u0002\u008b\u00cd\u0005\u0010\t\u0002\u008c\u00cd\u0005\u0012\n\u0002",
    "\u008d\u008e\u0005\u000e\b\u0002\u008e\u008f\u0005\f\u0007\u000f\u008f",
    "\u00cd\u0003\u0002\u0002\u0002\u0090\u0091\u0005\u0014\u000b\u0002\u0091",
    "\u0093\u0007\u0007\u0002\u0002\u0092\u0094\u0005\f\u0007\u0002\u0093",
    "\u0092\u0003\u0002\u0002\u0002\u0093\u0094\u0003\u0002\u0002\u0002\u0094",
    "\u0099\u0003\u0002\u0002\u0002\u0095\u0096\u0007\u0004\u0002\u0002\u0096",
    "\u0098\u0005\f\u0007\u0002\u0097\u0095\u0003\u0002\u0002\u0002\u0098",
    "\u009b\u0003\u0002\u0002\u0002\u0099\u0097\u0003\u0002\u0002\u0002\u0099",
    "\u009a\u0003\u0002\u0002\u0002\u009a\u009c\u0003\u0002\u0002\u0002\u009b",
    "\u0099\u0003\u0002\u0002\u0002\u009c\u009d\u0007\b\u0002\u0002\u009d",
    "\u00cd\u0003\u0002\u0002\u0002\u009e\u00a3\u0007\u0005\u0002\u0002\u009f",
    "\u00a0\u0005\u0016\f\u0002\u00a0\u00a1\u0007\u0003\u0002\u0002\u00a1",
    "\u00a2\u0005\f\u0007\u0002\u00a2\u00a4\u0003\u0002\u0002\u0002\u00a3",
    "\u009f\u0003\u0002\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4",
    "\u00ac\u0003\u0002\u0002\u0002\u00a5\u00a6\u0007\u0004\u0002\u0002\u00a6",
    "\u00a7\u0005\u0016\f\u0002\u00a7\u00a8\u0007\u0003\u0002\u0002\u00a8",
    "\u00a9\u0005\f\u0007\u0002\u00a9\u00ab\u0003\u0002\u0002\u0002\u00aa",
    "\u00a5\u0003\u0002\u0002\u0002\u00ab\u00ae\u0003\u0002\u0002\u0002\u00ac",
    "\u00aa\u0003\u0002\u0002\u0002\u00ac\u00ad\u0003\u0002\u0002\u0002\u00ad",
    "\u00af\u0003\u0002\u0002\u0002\u00ae\u00ac\u0003\u0002\u0002\u0002\u00af",
    "\u00cd\u0007\u0006\u0002\u0002\u00b0\u00b2\u0007\n\u0002\u0002\u00b1",
    "\u00b3\u0005\f\u0007\u0002\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b2",
    "\u00b3\u0003\u0002\u0002\u0002\u00b3\u00b8\u0003\u0002\u0002\u0002\u00b4",
    "\u00b5\u0007\u0004\u0002\u0002\u00b5\u00b7\u0005\f\u0007\u0002\u00b6",
    "\u00b4\u0003\u0002\u0002\u0002\u00b7\u00ba\u0003\u0002\u0002\u0002\u00b8",
    "\u00b6\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9",
    "\u00bb\u0003\u0002\u0002\u0002\u00ba\u00b8\u0003\u0002\u0002\u0002\u00bb",
    "\u00cd\u0007\u000b\u0002\u0002\u00bc\u00be\u0007\u001a\u0002\u0002\u00bd",
    "\u00bf\u0005\f\u0007\u0002\u00be\u00bd\u0003\u0002\u0002\u0002\u00be",
    "\u00bf\u0003\u0002\u0002\u0002\u00bf\u00c4\u0003\u0002\u0002\u0002\u00c0",
    "\u00c1\u0007\u0004\u0002\u0002\u00c1\u00c3\u0005\f\u0007\u0002\u00c2",
    "\u00c0\u0003\u0002\u0002\u0002\u00c3\u00c6\u0003\u0002\u0002\u0002\u00c4",
    "\u00c2\u0003\u0002\u0002\u0002\u00c4\u00c5\u0003\u0002\u0002\u0002\u00c5",
    "\u00c7\u0003\u0002\u0002\u0002\u00c6\u00c4\u0003\u0002\u0002\u0002\u00c7",
    "\u00cd\u0007\u001b\u0002\u0002\u00c8\u00c9\u0007\u0007\u0002\u0002\u00c9",
    "\u00ca\u0005\f\u0007\u0002\u00ca\u00cb\u0007\b\u0002\u0002\u00cb\u00cd",
    "\u0003\u0002\u0002\u0002\u00cc\u0086\u0003\u0002\u0002\u0002\u00cc\u008b",
    "\u0003\u0002\u0002\u0002\u00cc\u008c\u0003\u0002\u0002\u0002\u00cc\u008d",
    "\u0003\u0002\u0002\u0002\u00cc\u0090\u0003\u0002\u0002\u0002\u00cc\u009e",
    "\u0003\u0002\u0002\u0002\u00cc\u00b0\u0003\u0002\u0002\u0002\u00cc\u00bc",
    "\u0003\u0002\u0002\u0002\u00cc\u00c8\u0003\u0002\u0002\u0002\u00cd\u00ed",
    "\u0003\u0002\u0002\u0002\u00ce\u00cf\f\u000e\u0002\u0002\u00cf\u00d0",
    "\u0007\f\u0002\u0002\u00d0\u00ec\u0005\f\u0007\u000f\u00d1\u00d2\f\r",
    "\u0002\u0002\u00d2\u00d3\t\u0004\u0002\u0002\u00d3\u00ec\u0005\f\u0007",
    "\u000e\u00d4\u00d5\f\f\u0002\u0002\u00d5\u00d6\t\u0005\u0002\u0002\u00d6",
    "\u00ec\u0005\f\u0007\r\u00d7\u00d8\f\u000b\u0002\u0002\u00d8\u00d9\t",
    "\u0006\u0002\u0002\u00d9\u00ec\u0005\f\u0007\f\u00da\u00db\f\n\u0002",
    "\u0002\u00db\u00dc\t\u0007\u0002\u0002\u00dc\u00ec\u0005\f\u0007\u000b",
    "\u00dd\u00de\f\t\u0002\u0002\u00de\u00df\u0007.\u0002\u0002\u00df\u00ec",
    "\u0005\f\u0007\n\u00e0\u00e1\f\b\u0002\u0002\u00e1\u00e2\u0007/\u0002",
    "\u0002\u00e2\u00ec\u0005\f\u0007\t\u00e3\u00e4\f\u0011\u0002\u0002\u00e4",
    "\u00e5\u0007\t\u0002\u0002\u00e5\u00ec\u0005\u0016\f\u0002\u00e6\u00e7",
    "\f\u0010\u0002\u0002\u00e7\u00e8\u0007\n\u0002\u0002\u00e8\u00e9\u0005",
    "\f\u0007\u0002\u00e9\u00ea\u0007\u000b\u0002\u0002\u00ea\u00ec\u0003",
    "\u0002\u0002\u0002\u00eb\u00ce\u0003\u0002\u0002\u0002\u00eb\u00d1\u0003",
    "\u0002\u0002\u0002\u00eb\u00d4\u0003\u0002\u0002\u0002\u00eb\u00d7\u0003",
    "\u0002\u0002\u0002\u00eb\u00da\u0003\u0002\u0002\u0002\u00eb\u00dd\u0003",
    "\u0002\u0002\u0002\u00eb\u00e0\u0003\u0002\u0002\u0002\u00eb\u00e3\u0003",
    "\u0002\u0002\u0002\u00eb\u00e6\u0003\u0002\u0002\u0002\u00ec\u00ef\u0003",
    "\u0002\u0002\u0002\u00ed\u00eb\u0003\u0002\u0002\u0002\u00ed\u00ee\u0003",
    "\u0002\u0002\u0002\u00ee\r\u0003\u0002\u0002\u0002\u00ef\u00ed\u0003",
    "\u0002\u0002\u0002\u00f0\u00f1\t\b\u0002\u0002\u00f1\u000f\u0003\u0002",
    "\u0002\u0002\u00f2\u00f3\t\t\u0002\u0002\u00f3\u0011\u0003\u0002\u0002",
    "\u0002\u00f4\u00f5\u00072\u0002\u0002\u00f5\u0013\u0003\u0002\u0002",
    "\u0002\u00f6\u00f7\u00072\u0002\u0002\u00f7\u0015\u0003\u0002\u0002",
    "\u0002\u00f8\u00f9\u00072\u0002\u0002\u00f9\u0017\u0003\u0002\u0002",
    "\u0002\u00fa\u00fb\t\n\u0002\u0002\u00fb\u0019\u0003\u0002\u0002\u0002",
    "\u001b\u001d,269DZ`benq~\u0080\u0093\u0099\u00a3\u00ac\u00b2\u00b8\u00be",
    "\u00c4\u00cc\u00eb\u00ed"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "':'", "','", "'{'", "'}'", "'('", "')'", "'.'", 
                     "'['", "']'", "'||'", "'*'", "'/'", "'%'", "'+'", "'-'", 
                     "'<'", "'<='", "'>'", "'>='", "'='", "'=='", "'!='", 
                     "'<>'", "'{{'", "'}}'", "'~'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      "K_SELECT", "K_ELEMENT", "K_ATTRIBUTE", "K_FROM", 
                      "K_AS", "K_AT", "K_INNER", "K_LEFT", "K_RIGHT", "K_FULL", 
                      "K_OUTER", "K_JOIN", "K_CORRELATE", "K_ON", "K_FLATTEN", 
                      "K_WHERE", "K_NOT", "K_AND", "K_OR", "STRLITERAL", 
                      "NUMBER", "VAR_NAME", "WS" ];

var ruleNames =  [ "swf_query", "select_clause", "from_clause", "from_item", 
                   "where_clause", "expr", "unary_op", "value", "variable", 
                   "func_name", "attr_name", "keyword" ];

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
SqlppParser.T__25 = 26;
SqlppParser.K_SELECT = 27;
SqlppParser.K_ELEMENT = 28;
SqlppParser.K_ATTRIBUTE = 29;
SqlppParser.K_FROM = 30;
SqlppParser.K_AS = 31;
SqlppParser.K_AT = 32;
SqlppParser.K_INNER = 33;
SqlppParser.K_LEFT = 34;
SqlppParser.K_RIGHT = 35;
SqlppParser.K_FULL = 36;
SqlppParser.K_OUTER = 37;
SqlppParser.K_JOIN = 38;
SqlppParser.K_CORRELATE = 39;
SqlppParser.K_ON = 40;
SqlppParser.K_FLATTEN = 41;
SqlppParser.K_WHERE = 42;
SqlppParser.K_NOT = 43;
SqlppParser.K_AND = 44;
SqlppParser.K_OR = 45;
SqlppParser.STRLITERAL = 46;
SqlppParser.NUMBER = 47;
SqlppParser.VAR_NAME = 48;
SqlppParser.WS = 49;

SqlppParser.RULE_swf_query = 0;
SqlppParser.RULE_select_clause = 1;
SqlppParser.RULE_from_clause = 2;
SqlppParser.RULE_from_item = 3;
SqlppParser.RULE_where_clause = 4;
SqlppParser.RULE_expr = 5;
SqlppParser.RULE_unary_op = 6;
SqlppParser.RULE_value = 7;
SqlppParser.RULE_variable = 8;
SqlppParser.RULE_func_name = 9;
SqlppParser.RULE_attr_name = 10;
SqlppParser.RULE_keyword = 11;

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

Swf_queryContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterSwf_query(this);
	}
};

Swf_queryContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitSwf_query(this);
	}
};




SqlppParser.Swf_queryContext = Swf_queryContext;

SqlppParser.prototype.swf_query = function() {

    var localctx = new Swf_queryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, SqlppParser.RULE_swf_query);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 24;
        this.select_clause();
        this.state = 25;
        this.from_clause();
        this.state = 27;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===SqlppParser.K_WHERE) {
            this.state = 26;
            this.where_clause();
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

Select_clauseContext.prototype.K_SELECT = function() {
    return this.getToken(SqlppParser.K_SELECT, 0);
};

Select_clauseContext.prototype.K_ELEMENT = function() {
    return this.getToken(SqlppParser.K_ELEMENT, 0);
};

Select_clauseContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

Select_clauseContext.prototype.K_ATTRIBUTE = function() {
    return this.getToken(SqlppParser.K_ATTRIBUTE, 0);
};

Select_clauseContext.prototype.K_AS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_AS);
    } else {
        return this.getToken(SqlppParser.K_AS, i);
    }
};


Select_clauseContext.prototype.attr_name = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Attr_nameContext);
    } else {
        return this.getTypedRuleContext(Attr_nameContext,i);
    }
};

Select_clauseContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterSelect_clause(this);
	}
};

Select_clauseContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitSelect_clause(this);
	}
};




SqlppParser.Select_clauseContext = Select_clauseContext;

SqlppParser.prototype.select_clause = function() {

    var localctx = new Select_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, SqlppParser.RULE_select_clause);
    var _la = 0; // Token type
    try {
        this.state = 55;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 29;
            this.match(SqlppParser.K_SELECT);
            this.state = 30;
            this.match(SqlppParser.K_ELEMENT);
            this.state = 31;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 32;
            this.match(SqlppParser.K_SELECT);
            this.state = 33;
            this.match(SqlppParser.K_ATTRIBUTE);
            this.state = 34;
            this.expr(0);
            this.state = 35;
            this.match(SqlppParser.T__0);
            this.state = 36;
            this.expr(0);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 38;
            this.match(SqlppParser.K_SELECT);
            this.state = 39;
            this.expr(0);
            this.state = 42;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.K_AS) {
                this.state = 40;
                this.match(SqlppParser.K_AS);
                this.state = 41;
                this.attr_name();
            }

            this.state = 52;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 44;
                this.match(SqlppParser.T__1);
                this.state = 45;
                this.expr(0);
                this.state = 48;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===SqlppParser.K_AS) {
                    this.state = 46;
                    this.match(SqlppParser.K_AS);
                    this.state = 47;
                    this.attr_name();
                }

                this.state = 54;
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

From_clauseContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterFrom_clause(this);
	}
};

From_clauseContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitFrom_clause(this);
	}
};




SqlppParser.From_clauseContext = From_clauseContext;

SqlppParser.prototype.from_clause = function() {

    var localctx = new From_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, SqlppParser.RULE_from_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 57;
        this.match(SqlppParser.K_FROM);
        this.state = 58;
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

From_itemContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

From_itemContext.prototype.K_AS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SqlppParser.K_AS);
    } else {
        return this.getToken(SqlppParser.K_AS, i);
    }
};


From_itemContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};

From_itemContext.prototype.K_AT = function() {
    return this.getToken(SqlppParser.K_AT, 0);
};

From_itemContext.prototype.K_FLATTEN = function() {
    return this.getToken(SqlppParser.K_FLATTEN, 0);
};

From_itemContext.prototype.K_INNER = function() {
    return this.getToken(SqlppParser.K_INNER, 0);
};

From_itemContext.prototype.K_OUTER = function() {
    return this.getToken(SqlppParser.K_OUTER, 0);
};

From_itemContext.prototype.from_item = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(From_itemContext);
    } else {
        return this.getTypedRuleContext(From_itemContext,i);
    }
};

From_itemContext.prototype.K_LEFT = function() {
    return this.getToken(SqlppParser.K_LEFT, 0);
};

From_itemContext.prototype.K_CORRELATE = function() {
    return this.getToken(SqlppParser.K_CORRELATE, 0);
};

From_itemContext.prototype.K_FULL = function() {
    return this.getToken(SqlppParser.K_FULL, 0);
};

From_itemContext.prototype.K_ON = function() {
    return this.getToken(SqlppParser.K_ON, 0);
};

From_itemContext.prototype.K_JOIN = function() {
    return this.getToken(SqlppParser.K_JOIN, 0);
};

From_itemContext.prototype.K_RIGHT = function() {
    return this.getToken(SqlppParser.K_RIGHT, 0);
};

From_itemContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterFrom_item(this);
	}
};

From_itemContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitFrom_item(this);
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
    var _startState = 6;
    this.enterRecursionRule(localctx, 6, SqlppParser.RULE_from_item, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 88;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            this.state = 61;
            this.expr(0);
            this.state = 62;
            this.match(SqlppParser.K_AS);
            this.state = 63;
            this.variable();
            this.state = 66;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
            if(la_===1) {
                this.state = 64;
                this.match(SqlppParser.K_AT);
                this.state = 65;
                this.variable();

            }
            break;

        case 2:
            this.state = 68;
            this.expr(0);
            this.state = 69;
            this.match(SqlppParser.K_AS);
            this.state = 70;
            this.match(SqlppParser.T__2);
            this.state = 71;
            this.variable();
            this.state = 72;
            this.match(SqlppParser.T__0);
            this.state = 73;
            this.variable();
            this.state = 74;
            this.match(SqlppParser.T__3);
            break;

        case 3:
            this.state = 76;
            _la = this._input.LA(1);
            if(!(_la===SqlppParser.K_INNER || _la===SqlppParser.K_OUTER)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 77;
            this.match(SqlppParser.K_FLATTEN);
            this.state = 78;
            this.match(SqlppParser.T__4);
            this.state = 79;
            this.expr(0);
            this.state = 80;
            this.match(SqlppParser.K_AS);
            this.state = 81;
            this.variable();
            this.state = 82;
            this.match(SqlppParser.T__1);
            this.state = 83;
            this.expr(0);
            this.state = 84;
            this.match(SqlppParser.K_AS);
            this.state = 85;
            this.variable();
            this.state = 86;
            this.match(SqlppParser.T__5);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 126;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 124;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new From_itemContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 90;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 96;
                    this._errHandler.sync(this);
                    switch(this._input.LA(1)) {
                    case SqlppParser.K_INNER:
                        this.state = 91;
                        this.match(SqlppParser.K_INNER);
                        break;
                    case SqlppParser.K_LEFT:
                        this.state = 92;
                        this.match(SqlppParser.K_LEFT);
                        this.state = 94;
                        this._errHandler.sync(this);
                        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
                        if(la_===1) {
                            this.state = 93;
                            this.match(SqlppParser.K_OUTER);

                        }
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                    }
                    this.state = 99;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===SqlppParser.K_CORRELATE) {
                        this.state = 98;
                        this.match(SqlppParser.K_CORRELATE);
                    }

                    this.state = 101;
                    this.from_item(6);
                    break;

                case 2:
                    localctx = new From_itemContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 102;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 103;
                    this.match(SqlppParser.T__1);
                    this.state = 104;
                    this.from_item(4);
                    break;

                case 3:
                    localctx = new From_itemContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 105;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 106;
                    this.match(SqlppParser.K_FULL);
                    this.state = 108;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
                    if(la_===1) {
                        this.state = 107;
                        this.match(SqlppParser.K_OUTER);

                    }
                    this.state = 111;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===SqlppParser.K_CORRELATE) {
                        this.state = 110;
                        this.match(SqlppParser.K_CORRELATE);
                    }

                    this.state = 113;
                    this.from_item(0);
                    this.state = 114;
                    this.match(SqlppParser.K_ON);
                    this.state = 115;
                    this.expr(0);
                    break;

                case 4:
                    localctx = new From_itemContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_from_item);
                    this.state = 117;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 118;
                    _la = this._input.LA(1);
                    if(!(((((_la - 33)) & ~0x1f) == 0 && ((1 << (_la - 33)) & ((1 << (SqlppParser.K_INNER - 33)) | (1 << (SqlppParser.K_LEFT - 33)) | (1 << (SqlppParser.K_RIGHT - 33)) | (1 << (SqlppParser.K_FULL - 33)))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 119;
                    this.match(SqlppParser.K_JOIN);
                    this.state = 120;
                    this.from_item(0);
                    this.state = 121;
                    this.match(SqlppParser.K_ON);
                    this.state = 122;
                    this.expr(0);
                    break;

                } 
            }
            this.state = 128;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
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

Where_clauseContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterWhere_clause(this);
	}
};

Where_clauseContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitWhere_clause(this);
	}
};




SqlppParser.Where_clauseContext = Where_clauseContext;

SqlppParser.prototype.where_clause = function() {

    var localctx = new Where_clauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, SqlppParser.RULE_where_clause);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 129;
        this.match(SqlppParser.K_WHERE);
        this.state = 130;
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

ExprContext.prototype.swf_query = function() {
    return this.getTypedRuleContext(Swf_queryContext,0);
};

ExprContext.prototype.value = function() {
    return this.getTypedRuleContext(ValueContext,0);
};

ExprContext.prototype.variable = function() {
    return this.getTypedRuleContext(VariableContext,0);
};

ExprContext.prototype.unary_op = function() {
    return this.getTypedRuleContext(Unary_opContext,0);
};

ExprContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ExprContext.prototype.func_name = function() {
    return this.getTypedRuleContext(Func_nameContext,0);
};

ExprContext.prototype.attr_name = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Attr_nameContext);
    } else {
        return this.getTypedRuleContext(Attr_nameContext,i);
    }
};

ExprContext.prototype.K_AND = function() {
    return this.getToken(SqlppParser.K_AND, 0);
};

ExprContext.prototype.K_OR = function() {
    return this.getToken(SqlppParser.K_OR, 0);
};

ExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterExpr(this);
	}
};

ExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitExpr(this);
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
    var _startState = 10;
    this.enterRecursionRule(localctx, 10, SqlppParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 202;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
        switch(la_) {
        case 1:
            this.state = 133;
            this.match(SqlppParser.T__4);
            this.state = 134;
            this.swf_query();
            this.state = 135;
            this.match(SqlppParser.T__5);
            break;

        case 2:
            this.state = 137;
            this.value();
            break;

        case 3:
            this.state = 138;
            this.variable();
            break;

        case 4:
            this.state = 139;
            this.unary_op();
            this.state = 140;
            this.expr(13);
            break;

        case 5:
            this.state = 142;
            this.func_name();
            this.state = 143;
            this.match(SqlppParser.T__4);
            this.state = 145;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__2) | (1 << SqlppParser.T__4) | (1 << SqlppParser.T__7) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__14) | (1 << SqlppParser.T__23) | (1 << SqlppParser.T__25))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (SqlppParser.K_NOT - 43)) | (1 << (SqlppParser.STRLITERAL - 43)) | (1 << (SqlppParser.NUMBER - 43)) | (1 << (SqlppParser.VAR_NAME - 43)))) !== 0)) {
                this.state = 144;
                this.expr(0);
            }

            this.state = 151;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 147;
                this.match(SqlppParser.T__1);
                this.state = 148;
                this.expr(0);
                this.state = 153;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 154;
            this.match(SqlppParser.T__5);
            break;

        case 6:
            this.state = 156;
            this.match(SqlppParser.T__2);
            this.state = 161;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===SqlppParser.VAR_NAME) {
                this.state = 157;
                this.attr_name();
                this.state = 158;
                this.match(SqlppParser.T__0);
                this.state = 159;
                this.expr(0);
            }

            this.state = 170;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 163;
                this.match(SqlppParser.T__1);
                this.state = 164;
                this.attr_name();
                this.state = 165;
                this.match(SqlppParser.T__0);
                this.state = 166;
                this.expr(0);
                this.state = 172;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 173;
            this.match(SqlppParser.T__3);
            break;

        case 7:
            this.state = 174;
            this.match(SqlppParser.T__7);
            this.state = 176;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__2) | (1 << SqlppParser.T__4) | (1 << SqlppParser.T__7) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__14) | (1 << SqlppParser.T__23) | (1 << SqlppParser.T__25))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (SqlppParser.K_NOT - 43)) | (1 << (SqlppParser.STRLITERAL - 43)) | (1 << (SqlppParser.NUMBER - 43)) | (1 << (SqlppParser.VAR_NAME - 43)))) !== 0)) {
                this.state = 175;
                this.expr(0);
            }

            this.state = 182;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 178;
                this.match(SqlppParser.T__1);
                this.state = 179;
                this.expr(0);
                this.state = 184;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 185;
            this.match(SqlppParser.T__8);
            break;

        case 8:
            this.state = 186;
            this.match(SqlppParser.T__23);
            this.state = 188;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__2) | (1 << SqlppParser.T__4) | (1 << SqlppParser.T__7) | (1 << SqlppParser.T__13) | (1 << SqlppParser.T__14) | (1 << SqlppParser.T__23) | (1 << SqlppParser.T__25))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (SqlppParser.K_NOT - 43)) | (1 << (SqlppParser.STRLITERAL - 43)) | (1 << (SqlppParser.NUMBER - 43)) | (1 << (SqlppParser.VAR_NAME - 43)))) !== 0)) {
                this.state = 187;
                this.expr(0);
            }

            this.state = 194;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===SqlppParser.T__1) {
                this.state = 190;
                this.match(SqlppParser.T__1);
                this.state = 191;
                this.expr(0);
                this.state = 196;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 197;
            this.match(SqlppParser.T__24);
            break;

        case 9:
            this.state = 198;
            this.match(SqlppParser.T__4);
            this.state = 199;
            this.expr(0);
            this.state = 200;
            this.match(SqlppParser.T__5);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 235;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,24,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 233;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 204;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 205;
                    this.match(SqlppParser.T__9);
                    this.state = 206;
                    this.expr(13);
                    break;

                case 2:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 207;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 208;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__10) | (1 << SqlppParser.T__11) | (1 << SqlppParser.T__12))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 209;
                    this.expr(12);
                    break;

                case 3:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 210;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 211;
                    _la = this._input.LA(1);
                    if(!(_la===SqlppParser.T__13 || _la===SqlppParser.T__14)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 212;
                    this.expr(11);
                    break;

                case 4:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 213;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 214;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__15) | (1 << SqlppParser.T__16) | (1 << SqlppParser.T__17) | (1 << SqlppParser.T__18))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 215;
                    this.expr(10);
                    break;

                case 5:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 216;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 217;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SqlppParser.T__19) | (1 << SqlppParser.T__20) | (1 << SqlppParser.T__21) | (1 << SqlppParser.T__22))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 218;
                    this.expr(9);
                    break;

                case 6:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 219;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 220;
                    this.match(SqlppParser.K_AND);
                    this.state = 221;
                    this.expr(8);
                    break;

                case 7:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 222;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 223;
                    this.match(SqlppParser.K_OR);
                    this.state = 224;
                    this.expr(7);
                    break;

                case 8:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 225;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 226;
                    this.match(SqlppParser.T__6);
                    this.state = 227;
                    this.attr_name();
                    break;

                case 9:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, SqlppParser.RULE_expr);
                    this.state = 228;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 229;
                    this.match(SqlppParser.T__7);
                    this.state = 230;
                    this.expr(0);
                    this.state = 231;
                    this.match(SqlppParser.T__8);
                    break;

                } 
            }
            this.state = 237;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,24,this._ctx);
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

Unary_opContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterUnary_op(this);
	}
};

Unary_opContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitUnary_op(this);
	}
};




SqlppParser.Unary_opContext = Unary_opContext;

SqlppParser.prototype.unary_op = function() {

    var localctx = new Unary_opContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, SqlppParser.RULE_unary_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 238;
        _la = this._input.LA(1);
        if(!(((((_la - 14)) & ~0x1f) == 0 && ((1 << (_la - 14)) & ((1 << (SqlppParser.T__13 - 14)) | (1 << (SqlppParser.T__14 - 14)) | (1 << (SqlppParser.T__25 - 14)) | (1 << (SqlppParser.K_NOT - 14)))) !== 0))) {
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

ValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterValue(this);
	}
};

ValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitValue(this);
	}
};




SqlppParser.ValueContext = ValueContext;

SqlppParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, SqlppParser.RULE_value);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 240;
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

VariableContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterVariable(this);
	}
};

VariableContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitVariable(this);
	}
};




SqlppParser.VariableContext = VariableContext;

SqlppParser.prototype.variable = function() {

    var localctx = new VariableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, SqlppParser.RULE_variable);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 242;
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

Func_nameContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterFunc_name(this);
	}
};

Func_nameContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitFunc_name(this);
	}
};




SqlppParser.Func_nameContext = Func_nameContext;

SqlppParser.prototype.func_name = function() {

    var localctx = new Func_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, SqlppParser.RULE_func_name);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 244;
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

Attr_nameContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterAttr_name(this);
	}
};

Attr_nameContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitAttr_name(this);
	}
};




SqlppParser.Attr_nameContext = Attr_nameContext;

SqlppParser.prototype.attr_name = function() {

    var localctx = new Attr_nameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, SqlppParser.RULE_attr_name);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 246;
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

KeywordContext.prototype.K_NOT = function() {
    return this.getToken(SqlppParser.K_NOT, 0);
};

KeywordContext.prototype.K_AND = function() {
    return this.getToken(SqlppParser.K_AND, 0);
};

KeywordContext.prototype.K_OR = function() {
    return this.getToken(SqlppParser.K_OR, 0);
};

KeywordContext.prototype.enterRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.enterKeyword(this);
	}
};

KeywordContext.prototype.exitRule = function(listener) {
    if(listener instanceof SqlppListener ) {
        listener.exitKeyword(this);
	}
};




SqlppParser.KeywordContext = KeywordContext;

SqlppParser.prototype.keyword = function() {

    var localctx = new KeywordContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, SqlppParser.RULE_keyword);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 248;
        _la = this._input.LA(1);
        if(!(((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (SqlppParser.K_NOT - 43)) | (1 << (SqlppParser.K_AND - 43)) | (1 << (SqlppParser.K_OR - 43)))) !== 0))) {
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


SqlppParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 3:
			return this.from_item_sempred(localctx, predIndex);
	case 5:
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
			return this.precpred(this._ctx, 12);
		case 5:
			return this.precpred(this._ctx, 11);
		case 6:
			return this.precpred(this._ctx, 10);
		case 7:
			return this.precpred(this._ctx, 9);
		case 8:
			return this.precpred(this._ctx, 8);
		case 9:
			return this.precpred(this._ctx, 7);
		case 10:
			return this.precpred(this._ctx, 6);
		case 11:
			return this.precpred(this._ctx, 15);
		case 12:
			return this.precpred(this._ctx, 14);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.SqlppParser = SqlppParser;
