test: testparser testclauses testqueries

testparser: 
	cd test && node testparser.js

testclauses:
	cd test && node testindivclause.js

testqueries:
	cd test && node testfullquerycrossed.js 2>/dev/null

npmpackage:
	npm install 
