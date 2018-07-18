/* USED TO TEST FROM 

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

var clauses = {
  from: {movie: "r"},
  where: [
    {funcName: "equal",
    param: [{binding: "r", attr: "director"},"Lucas"]}
  ],
  select: [
    {path: "r",
    attr: "title"}
  ]
};

var db = '{"sensors":[[' + 
         '  [1.3, 2], ' +
         '  [0.7, 0.7, 0.9],' +
         '  [0.3, 0.8, 1.1],' +
         '  [0.7, 1.4]' +
         ' ],' +
         '[' +
         '  [1.3, 2], ' +
         '  [0.7, 0.7, 0.9],' +
         '  [0.3, 0.8, 1.1],' +
         '  [0.7, 1.4]' +
         ']]}';
*/


/* --- FUNCTIONS --- */
const eq = (l, r) => l === r;
const lt = (l, r) => l < r;
const lte = (l, r) => l <= r;
const gt = (l, r) => l > r;
const gte = (l, r) => l >= r;
// const and = (l, r) => l ? (l && r) : false;
// const or = (l, r) => l ? true : (l || r);

const and = function() {
  for (let i = 0; i < arguments.length; i++) 
    if (!arguments[i])  
      return false;
  return true;
}

const or = function() {
  for (let i = 0; i < arguments.length; i++) 
    if (arguments[i])  
      return true;
  return false;
}
/* --- END FUNCTIONS --- */
/*
var db = '{"sensors": [' + 
         '  [1.3, 2], ' +
         '  [0.7, 0.7, 0.9],' +
         '  [0.3, 0.8, 1.1],' +
         '  [0.7, 1.4]' +
         '],' +
         '"readings":[3, 4]}';
*/

//var db = '{"readings":[0.7, [0.5, 2], "repair"]}';

var db = '{"readings": [{"no2": 0.7, "co": [0.5, 2]}]}';

var clauses = {
  from: {
  	//sensors: {as: "s", at: undefined}, 
  	readings: {as: "t", at: undefined}, 
  	//s: {as: "r", at: undefined}
  	t: {as: {attrName: "g", attrVal: "v"}, at: undefined}
    //readings: {as: "r", at: "p"}
  },
  where:   {
    func: "equal",
    params: [{bind:"r", attr:"director"},"Lucas"]
  }
};

var initial = JSON.parse(db);

// from clause
var envBind = initial;     // environmental binding
var newBind = new Set();   // new binding created 
newBind.add({});

for (bindFrom in clauses.from) {

  bindTo = clauses.from[bindFrom]["as"];

  if(typeof(bindTo) === "object"){
    let toDel = [];
    let toAdd = [];

    let attrName = bindTo["attrName"];
    let attrVal = bindTo["attrVal"];

    // case of lhs of AS belongs to environment.
    if (envBind[bindFrom] !== undefined){
      if(typeof(envBind[bindFrom] === "object")){
        for (item of newBind) {
          toDel.push(item);

          for (pair in envBind[bindFrom]) {
            let newTuple = Object.assign({}, item);

            newTuple[attrName] = pair;
            newTuple[attrVal] = envBind[bindFrom][pair];

            toAdd.push(newTuple);
          }
        }
      }
    }

    // case of lhs of AS is a bound variable.
    else{
      // item is an iterable object has bind from as key
      for (item of newBind) {
        if (item[bindFrom] !== undefined && typeof(item[bindFrom] === "object")) {
          toDel.push(item);

          for (pair in item[bindFrom]) {
            let newTuple = Object.assign({}, item);

            newTuple[attrName] = pair;
            newTuple[attrVal] = item[bindFrom][pair];

            toAdd.push(newTuple);
          }
        }
      } 
    }

    for (item of toDel) newBind.delete(item);
    for (item of toAdd) newBind.add(item);
  }

  else{
    let toDel = [];
    let toAdd = [];

    let pivot = clauses.from[bindFrom]["at"];
    let pivotIndex = 1;

    // case of lhs of AS belongs to environment.
    if (envBind[bindFrom] !== undefined){
      if(Array.isArray(envBind[bindFrom])){
        for (item of newBind) {
          toDel.push(item);

          for (let j = 0; j < envBind[bindFrom].length; j++) {
            let newTuple = Object.assign({}, item);

            newTuple[bindTo] = envBind[bindFrom][j];

            if(pivot !== undefined){
              newTuple[pivot] = pivotIndex;
              pivotIndex++;
            }

            toAdd.push(newTuple);
          }
        }
      }
    }

    // case of lhs of AS is a bound variable.
    else{
      // item is an iterable object has bind from as key
      for (item of newBind) {
        if (item[bindFrom] !== undefined && Array.isArray(item[bindFrom])) {
          toDel.push(item);

          for (let j = 0; j < item[bindFrom].length; j++) {
            let newTuple = Object.assign({}, item);

            newTuple[bindTo] = item[bindFrom][j];

            if(pivot !== undefined){
              newTuple[pivot] = pivotIndex;
              pivotIndex++;
            }

            toAdd.push(newTuple);
          }
        }
      } 
    }

    for (item of toDel) newBind.delete(item);
    for (item of toAdd) newBind.add(item);
  }
}

//where clause
var inputWhere = [...newBind];
var outputWhere = [];

for (let i = 0; i < clauses.where.length; i++) {
  switch(clauses.where[i]["funcName"]) {
    case "equal":
      var param2 = clauses.where[i]["param"][1];

      if(typeof(clauses.where[i]["param"][0]) === "object"){
        var bindingName = clauses.where[i]["param"][0]["binding"];
        var attrName = clauses.where[i]["param"][0]["attr"];

        for (let j = 0; j < bindingArray.length; j++) {
          var param1 = bindingArray[j][bindingName][attrName];
          if(eq(param1, param2)){
            outputWhere.push(bindingArray[j]);
          }
        }
      }
      break;
  }
}

//select clause
var outputSelect = [];

for (let i = 0; i < outputWhere.length; i++){
  for (let j = 0; j < clauses.select.length; j++){
    var bindingName = clauses.select[j].path;
    var attrName = clauses.select[j].attr;

    var tobePushed = {};
    tobePushed[attrName] = outputWhere[i][bindingName][attrName];
    outputSelect.push(tobePushed);
  }
}

var outputQuery = JSON.stringify(outputSelect);

