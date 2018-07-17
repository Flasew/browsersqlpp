/* USED TO TEST FROM 

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

var tree = {
  from: {sensors:"s", s:"r", r:"t"}
};

var initial = JSON.parse(db) */

var envir = '{"movie":[' + 
'{"title":"Star Wars", "director":"Lucas", "actor":"Ford"},' + 
'{"title":"Star Wars", "director":"Lucas", "actor":"Fischer"},' + 
'{"title":"Mad Max", "director":"Miller", "actor":"Hardy"}' + 
']}';

var initial = JSON.parse(envir);

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

// from clause
var envBind = initial;     // environmental binding
var newBind = new Set();   // new binding created 
 
for (bindFrom in tree.from) {

  bindTo = tree.from[bindFrom];

  // case of lhs of AS belongs to environment. No Cartesian product needed.
  if (envBind[bindFrom] !== undefined) {
    for (let i = 0; i < envBind[bindFrom].length; i++) {
      let newTuple = {}
      newTuple[bindTo] = envBind[bindFrom][i];
      newBind.add(newTuple);
    }
  }

  // case of lhs of AS is a bound variable. Cartesian product is needed. 
  else {
    let toDel = [];
    let toAdd = [];
    let oldLength = newBind.length;
    // item is an iterable object has bind from as key
    for (let item of newBind) {
      if (item[bindFrom] !== undefined && Array.isArray(item[bindFrom])) {
        toDel.push(item)
        for (let j = 0; j < item[bindFrom].length; j++) {
          let newTuple = Object.create(item)
          console.log(newTuple)
          newTuple[bindTo] = item[bindFrom][j];
          toAdd.push(newTuple);
        }
      }
    } 

    console.log(toAdd)
    console.log(toDel)

    for (let item of toDel) newBind.delete(item);
    for (let item of toAdd) newBind.add(item);
  }
}

//where clause
var outputWhere = [];

for (let i = 0; i < tree.where.length; i++) {
  switch(tree.where[i]["funcName"]) {
    case "eq":
      var param2 = tree.where[i]["param"][1];

      if(typeof(tree.where[i]["param"][0]) === "object"){
        var bindingName = tree.where[i]["param"][0]["binding"];
        var attrName = tree.where[i]["param"][0]["attr"];

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
  for (let j = 0; j < tree.select.length; j++){
    var bindingName = tree.select[j].path;
    var attrName = tree.select[j].attr;

    var tobePushed = {};
    tobePushed[attrName] = outputWhere[i][bindingName][attrName];
    outputSelect.push(tobePushed);
  }
}

var outputQuery = JSON.stringify(outputSelect);

