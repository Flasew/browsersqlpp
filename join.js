// TNLJ
// This implementation is intended to be used on Equi-join only for now.
var operatorJoin = function(dbin, bindDB, joinParam) {

  switch (joinParam.joinType) {

    case 0: case 1:

      for (left of dbin[joinParam.lhs]) {
      rhsloop:
        for (right of dbin[joinParam.rhs]) {

          // this step assumes the parser put the correct entry in joinCond,
          // which is not necessarily easy. More check might be needed if the 
          // parser is unable to perform all the task.
          
          if (joinParam.joinType === 0) {
            for (c of joinParam.cond) {
              // only "and" for now, must all agree to produce a tuple
              if (left[c.lhs] !== right[c.rhs]) 
                continue rhsloop;
            }
          }

          let newTuple = Object.assign({}, left);
          for (attr in right) {
            if (newTuple[attr] === undefined) {
              newTuple[attr] = right[attr];
            }
            else {
              newTuple[joinParam.lhs + '.' + attr] = newTuple[attr];
              newTuple[joinParam.rhs + '.' + attr] = right[attr];
              delete newTuple[attr];
            }
          }
          bindTuple = {};
          bindTuple[joinParam.bindingName] = newTuple;
          bindDB.push(bindTuple);
        }
      }
    break;
  }
  
}

db = {R:[{a: 1, b: 1}, {a: 2, b: 2}], S:[{c: 1, b: 2}, {c: 2, b: 1}]}
bdb = []
joinParam = {lhs: 'R', rhs: 'S', cond:[{lhs: 'a', rhs: 'c'}], joinType: 0, bindingName: 'T'}
operatorJoin(db, bdb, joinParam)
/*
joinParam = {
  lhs: database (string),
  rhs: database (string),
  cond: [
    {
      lhs:
      rhs:
    }, ...
  ]
  joinType: (int),
  bindingName: (str)
}
joinType : 
  0 = inner
  1 = cross
 */

// > db = {R:[{a: 1, b: 1}, {a: 2, b: 2}], S:[{c: 1, b: 2}, {c: 2, b: 1}]}
// { R: [ { a: 1, b: 1 }, { a: 2, b: 2 } ],
//   S: [ { c: 1, b: 2 }, { c: 2, b: 1 } ] }
// > bindDB = {}
// {}
// > bindDB = []
// []
// > joinParam = {lhs: 'R', rhs: 'S', cond:[{lhs: 'a', rhs: 'a'}], joinType: 1, bindingName: 'T'}
// { lhs: 'R',
//   rhs: 'S',
//   cond: [ { lhs: 'a', rhs: 'a' } ],
//   joinType: 1,
//   bindingName: 'T' }
