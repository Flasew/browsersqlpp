var envir = '{"movie":[' + 
'{"title":"Star Wars", "director":"Lucas", "actor":"Ford"},' + 
'{"title":"Star Wars", "director":"Lucas", "actor":"Fischer"},' + 
'{"title":"Mad Max", "director":"Miller", "actor":"Hardy"}' + 
']}';

var initial = JSON.parse(envir);

var from = {
	movie: "r"
};

var where = [
	{
		name: "equal",
		param: [{bind:"r", attr:"director"},"Lucas"]
	}
];

var select = [
	{
		path: "r",
		title: "title"
	}
];

var tree = {
	from: {movie:"r"},
	where: [
		{funcName: "equal",
		param: [{binding:"r", attr:"director"},"Lucas"]}
	],
	select: [
		{path: "r",
		attr: "title"}
	]
};

//from clause
var bindingArray = [initial];
var currIndex = 0;
for (original in tree.from) {
	var bindingName = tree.from[original];

	bindingArray[currIndex+1] = [];

	for (var i = 0; i < initial[original].length; i++) {
		bindingArray[currIndex+1][i] = {};
		bindingArray[currIndex+1][i][bindingName] = bindingArray[currIndex][original][i];
	}

	currIndex++;
}

//where clause
var outputWhere = [];

for (var i = 0; i < tree.where.length; i++) {
	switch(tree.where[i]["funcName"]) {
		case "equal":
			var param2 = tree.where[i]["param"][1];

			if(typeof(tree.where[i]["param"][0]) === "object"){
				var bindingName = tree.where[i]["param"][0]["binding"];
				var attrName = tree.where[i]["param"][0]["attr"];

				for (var j = 0; j < bindingArray[currIndex].length; j++) {
					var param1 = bindingArray[currIndex][j][bindingName][attrName];
					if(equal(param1, param2)){
						outputWhere.push(bindingArray[currIndex][j]);
					}
				}
			}
        		break;
	}
}

//select clause
var outputSelect = [];

for (var i = 0; i < outputWhere.length; i++){
	for (var j = 0; j < tree.select.length; j++){
		var bindingName = tree.select[j].path;
		var attrName = tree.select[j].attr;

		var tobePushed = {};
		tobePushed[attrName] = outputWhere[i][bindingName][attrName];
		outputSelect.push(tobePushed);
	}
}

var outputQuery = JSON.stringify(outputSelect);

var equal = function(p1, p2){
	return p1 === p2;
}