grammar:
	java -Xmx500M -cp "/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool -Dlanguage=JavaScript -no-listener -visitor Sqlpp.g4

grammartest:
	java -Xmx500M -cp "/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool Sqlpp.g4

clean:
	rm -f *.java *.class *.interp *.tokens Sqlpp*.js 