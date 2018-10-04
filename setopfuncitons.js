// "hash based" union. All in memory...
function setUnion(lhs, rhs) {

  var tableSet, matchSet, output;

  // check who is the smaller set and use that to build the hash table.
  if (lhs.length < rhs.length) {
    tableSet = lhs;
    matchSet = rhs;
  }
  else {
    tableSet = rhs;
    matchSet = lhs;
  }                 

  // build the hashtable. separate chaining.
  var table = unorderedSet();

  for (let i = 0; i < tableSet.length; i++) {

    if (table.insert(tableSet[i])) {
      output.push(tableSet[i]);
    }

  }

  // probe with the larger table
  for (let i = 0; i < matchSet.length; i++) {

    if (table.insert(matchSet[i])) {
      output.push(matchSet[i]);
    }

  }

  return output;
}


function setIntersect(lhs, rhs) {

  var tableSet, matchSet, output;

  // check who is the smaller set and use that to build the hash table.
  if (lhs.length < rhs.length) {
    tableSet = lhs;
    matchSet = rhs;
  }
  else {
    tableSet = rhs;
    matchSet = lhs;
  }                 

  // build the hashtable. separate chaining.
  var table = unorderedSet();

  for (let i = 0; i < tableSet.length; i++) 
    table.insert(tableSet[i]);

  // probe with the larger table
  for (let i = 0; i < matchSet.length; i++) {

    if (table.lookup(matchSet[i])) {
      output.push(matchSet[i]);
    }

  }

  return output;
}


function setDiff(lhs, rhs) {           

  // build the hashtable. separate chaining.
  var table = unorderedSet();

  for (let i = 0; i < rhs.length; i++) 
    table.insert(rhs[i]);

  // probe with the larger table
  for (let i = 0; i < lhs.length; i++) {

    if (!table.lookup(lhs[i])) {
      output.push(lhs[i]);
    }

  }

  return output;
}



function multisetUnion(lhs, rhs) {

  var output;
  // TODO: just concat lhs and rhs.
  return output;
}


function setIntersect(lhs, rhs) {

  var tableSet, matchSet, output;

  // check who is the smaller set and use that to build the hash table.
  if (lhs.length < rhs.length) {
    tableSet = lhs;
    matchSet = rhs;
  }
  else {
    tableSet = rhs;
    matchSet = lhs;
  }                 

  // build the hashtable. separate chaining.
  var table = unorderedMultiset();

  for (let i = 0; i < tableSet.length; i++) 
    table.insert(tableSet[i]);

  // probe with the larger table
  for (let i = 0; i < matchSet.length; i++) {

    if (table.lookup(matchSet[i])) {
      output.push(matchSet[i]);
      table.remove(matchSet[i]);
    }

  }

  return output;
}


function multisetDiff(lhs, rhs) {           

  // build the hashtable. separate chaining.
  var table = unorderedSet();

  for (let i = 0; i < rhs.length; i++) 
    table.insert(rhs[i]);

  // probe with the larger table
  for (let i = 0; i < lhs.length; i++) {

    if (!table.lookup(lhs[i])) {
      output.push(lhs[i]);
    }
    else {
      table.remove(lhs[i]);
    }

  }

  return output;
}

/**
 * A small hashtable class written in functional style
 * @return {Object} a new hashtable.
 */
function unorderedSet() {

  var map = {};
  var that = {

    /**
     * Insert a new item into the hashtable.
     * @param  {object} item item to beinserted
     * @return {bool}        true if new item inserted, 
     *                       false if the item already presents in the table
     */
    insert: function(item) {

      let hashcode = hash(item);

      if (map[hashcode] === undefined) {
        map[hashcode] = [item];
        return true;
      }

      for (let tableitem of map[hashcode]) {
        if (_.isEqual(item, tableitem))
          return false;
      }

      map[hashcode].push(item);
      return true;
    }, 

    /**
     * Check if an item is in the table
     * @param  {object} item item to be checked
     * @return {bool}        true if the item is, false otherwise
     */
    lookup: function(item) {
      
      let hashcode = hash(item);

      if (map[hashcode] === undefined) {
        return false;
      }

      for (let tableitem of map[hashcode]) {
        if (_.isEqual(item, tableitem))
          return true;
      }

      return false;
    },

    /**
     * remove an item from the hashtable.
     * @param  {object} item item to be removed
     * @return {bool}        true if the item was removed, f
     *                       alse if the item wasn't in the table in the first place.
     */
    remove: function(item) {

      let hashcode = hash(item);

      if (map[hashcode] === undefined) {
        return false;
      }

      for (let i = 0; i < map[hashcode],length; i++) {
        if (_.isEqual(item, map[hashcode][i])) {
          // TODO: delete the item in the array with no hole
          return true;
        }
      }

      return false;
    }
  };

  return that;
}


/**
 * Another hashtable class that allows duplication, written in functional style
 * @return {Object} a new hashtable allowing duplication.
 */
function unorderedMultiset() {

  var map = {};
  var that = {

    /**
     * Insert a new item into the hashtable.
     * @param  {object} item item to beinserted
     * @return {bool}        true if new item inserted, 
     *                       false if the item already presents in the table
     */
    insert: function(item) {

      let hashcode = hash(item);

      if (map[hashcode] === undefined) {
        map[hashcode] = [item];
      }

      map[hashcode].push(item);
    }, 

    /**
     * Check if an item is in the table
     * @param  {object} item item to be checked
     * @return {bool}        true if the item is, false otherwise
     */
    lookup: function(item) {
      
      let hashcode = hash(item);

      if (map[hashcode] === undefined) {
        return false;
      }

      for (let tableitem of map[hashcode]) {
        if (_.isEqual(item, tableitem))
          return true;
      }

      return false;
    },

    /**
     * remove an item from the hashtable.
     * @param  {object} item item to be removed
     * @return {bool}        true if the item was removed, f
     *                       alse if the item wasn't in the table in the first place.
     */
    remove: function(item) {

      let hashcode = hash(item);

      if (map[hashcode] === undefined) {
        return false;
      }

      for (let i = 0; i < map[hashcode],length; i++) {
        if (_.isEqual(item, map[hashcode][i])) {
          // TODO: delete the item in the array with no hole
          return true;
        }
      }

      return false;
    }
  };

  return that;
}