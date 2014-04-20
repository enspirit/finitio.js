var ArgumentError = require("../errors").ArgumentError;

//
var Utilities = $u = {};

//******* Utilities

/**
  * Returns whether or not the parameter is an array
  *
  * Uses native `isArray` if present
  */
$u.isArray = function(obj){
  if (Array.isArray){
    return Array.isArray(obj);
  } else {
    return toString.call(obj) == '[object Array]';
  }
}

/**
  * Detects whether the javascript environment is a browser or not (node)
  */
$u.isBrowser = function(){
  return !(typeof exports !== 'undefined' && this.exports !== exports);
}

/**
  * Returns wheter or not the parameter is an object
  */
$u.isObject = function(obj){
  return Object(obj) === obj;
}

/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a deep copy
  */
$u.deepClone = function(obj) {
  if (obj === null || obj === undefined) {
    throw new ArgumentError("Object expected, got", obj);
  }

  if (!$u.isObject(obj)){
    return obj;
  }

  else if (obj instanceof Function){
    return obj
  }

  else if ($u.isArray(obj)){
    return obj.slice();
  }

  else {
    var copy = {}
    $u.each(obj, function(v, k){
      copy[k] = $u.deepClone(v);
    })
    return copy;
  }
};

/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a shallow copy
  */
$u.clone = function(obj) {
  if (obj === null || obj === undefined){
    throw new ArgumentError("Object expected, got", obj);
  }

  if (!$u.isObject(obj)){
    return obj;
  }

  return $u.isArray(obj) ? obj.slice() : $u.extend({}, obj);
};

/**
  * Extends the given object with all the properties of the passsed-in obejct(s)
  */
$u.extend = function(obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  $u.each(args, function(source){
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

//******* ARRAY

$u.zip = function(dest) {
  if (!($u.isArray(dest))) {
    throw new ArgumentError("Array expected, got", dest);
  }

  //
  var sources = Array.prototype.slice.call(arguments, 1);

  // Check validity first
  $u.each(sources, function(source){
    if (!($u.isArray(source))) {
      throw new ArgumentError("Array expected, got", source);
    }
    if ($u.size(source) != $u.size(dest)) {
      throw new ArgumentError("Source(s) and destination Arrays must have same size");
    }
  })

  // Zip!
  var result = $u.map(dest, function(v, i){
    var array = [];
    array.push(v);
    $u.each(sources, function(source){
      array.push(source[i]);
    })
    return array;
  });

  return result;
}

$u.difference = function(objA, objB) {
  if (!($u.isArray(objA))) {
    throw new ArgumentError("Array expected, got", objA);
  }

  if (!($u.isArray(objB))) {
    throw new ArgumentError("Array expected, got", objB);
  }

  return $u.filter(objA, function(v){
    return !$u.contains(objB, v);
  });
}

$u.uniq = function(array, isSorted){
  if (!($u.isArray(array))) {
    throw new ArgumentError("Array expected, got", array);
  }
  if (typeof(isSorted) == "undefined"){
    isSorted = false;
  }
  var result = [];
  var seen = [];
  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];
    if (isSorted ? (!i || seen !== value) : !$u.contains(seen, value)) {
      if (isSorted) seen = value;
      else seen.push(value);
      result.push(array[i]);
    }
  }
  return result;
};

$u.inject = function(obj, start, callback){
  // no date, regexp, undefined or null please
  if (!(obj instanceof Array)) {
    throw new ArgumentError("Array expected, got", obj);
  }
  res = start
  for (var i=0; i<obj.length; i++) {
    res = callback(res, obj[i]);
  }
  return res;
},

//******* ENUMERABLE

/**
  * Returns whether or not a given object is enumerable
  */
$u.isEnumerable = function(obj){
  if (obj === undefined || obj === null || obj instanceof RegExp ||
      obj instanceof Date || typeof(obj) == "boolean"){
    return false;
  }
  return true;
}

/**
  * Iterates over an Enumerable (String, Array, Object)
  * ! warning: Doesn't iterates RegExp, Date, Boolean, undefined, null
  *
  * On String:  callback(character, position)
  * On Array:   callback(value, position)
  * On Objects: callback(value, key)
  *
  * TODO: use *forEach* if present
  */
$u.each = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null){
    throw new Error("Function expected, got null")
  }
  if (callback === undefined){
    callback = function(){}
  }

  // no date, regexp, undefined or null please
  if (!($u.isEnumerable(obj))) {
    throw new ArgumentError("Enumerable (Array, Object, String) expected, got", obj);
  }

  // Strings
  if (typeof(obj) == "string"){
    return $u.each(obj.split(""), callback)
  }

  // Arrays
  if (typeof(obj) == "array"){
    for(var i=0; i<obj.length; i++){
      callback(obj[i], i);
    }
    return;
  }

  // Objects
  for (var key in obj){
    if (obj.hasOwnProperty(key)){
      callback(obj[key], key);
    }
  }
}

/**
  * Returns true if all of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  * TODO: delegate to *every* if present
  */
$u.every = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    $u.each(obj, function(v, k){
      var pass = callback(v, k);
      if (pass !== true){
        throw "fail";
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e != "fail"){
      throw e;
    }
    return false;
  }

  return true;
}

/**
  * Returns the first element that apsses a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
$u.find = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    $u.each(obj, function(v, k){
      var pass = callback(v, k);
      if (pass == true){
        throw {found: v};
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (typeof(e.found) == "undefined"){
      throw e;
    }
    return e.found;
  }

  return null;
}

/**
  * Returns true if any of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  */
$u.any = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback);
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    $u.each(obj, function(v, k){
      var pass = callback(v, k);
      if (pass === true){
        throw "gotcha";
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e != "gotcha"){
      throw e;
    }
    return true;
  }

  return false;
};

/**
  * Returns the values of an enumerable that pass a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
$u.filter = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  var values = [];
  $u.each(obj, function(v){
    if (callback(v)){
      values.push(v);
    }
  });
  return values;
}

/**
  * Returns the values of an enumerable that don't pass the truth test
  * (the exact opposite as $u.filter)
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
$u.reject = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  var values = [];
  $u.each(obj, function(v){
    if (!callback(v)){
      values.push(v);
    }
  });
  return values;
}

/**
  * Produces a new array of values by mapping each value in list through a
  * transformation function
  *
  * Uses #each to iterate
  * TODO: use *map* if present
  */
$u.map = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }
  var values = [];
  $u.each(obj, function(v, k){
    values.push(callback(v, k));
  });
  return values;
}

/**
  * Returns the values of an Enumerable (Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-enumerable
  *
  * Uses #each to iterate
  */
$u.values = function(obj){
  if (obj instanceof Array){
    return obj;
  }
  var values = [];
  $u.each(obj, function(v){
    values.push(v);
  })

  return values;
}

/**
  * Returns the keys of an Enumerable (Enumerable (String, Array, Object)
  *
  * String: array of character positions
  * Array: array of indices
  * Objects: array of keys
  *
  * ! warning: throws error if called for a non-enumerable
  * ! warning: all keys will be strings, whatever is the enumerable
  *
  * Uses #each to iterate
  */
$u.keys = function(obj){
  var keys = [];
  $u.each(obj, function(v, k){
    keys.push(k);
  })

  return keys;
}

/**
  * Returns the number of values of an Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-object (even Array)
  *
  * Uses #each to iterate
  */
$u.size = function(obj){
  var values = $u.values(obj);
  return values.length;
};

/**
  * Returns whether or not an enumerable is empty
  */
$u.isEmpty = function(obj){
  return $u.size(obj) === 0;
};

// Determine if the array or object contains a given value (using `===`).
// Aliased as `include`.
$u.contains = $u.include = function(obj, target) {
  if (!$u.isEnumerable(obj)){
    throw new ArgumentError("Enumerable (Array, Object, String) expected, got", obj);
  }
  var nativeIndexOf = Array.prototype.indexOf;
  if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
  var found = $u.find(obj, function(v){
    return v === target;
  });
  return found != null;
};

//******* STRINGS

/**
  * Capitalizes a string
  *
  * foo => Foo
  * fooBar => FooBar
  * foo bar => FooBar
  * foo_bar => FooBar
  **/
$u.capitalize = function(obj){
  if (typeof(obj) != "string"){
    throw new ArgumentError("String expected, got", obj)
  }
  if (obj.trim() == ""){
    return obj;
  }

  var string = obj;

  // Remove underscores
  if (string.indexOf("_") != -1){

    var tokens = string.split("_");

    for(var i=0; i<tokens.length; i++){
      tokens[i] = $u.capitalize(tokens[i]);
    }

    string = tokens.join('');
  }

  // Remove spaces
  if (string.indexOf(" ") != -1){

    tokens = string.split(" ");
    for(var i=0; i<tokens.length; i++){
      tokens[i] = $u.capitalize(tokens[i])
    }

    string = tokens.join('')
  }

  // Capitalize first letter
  string = string[0].toUpperCase() + string.slice(1);
  return string;
}

//
module.exports = Utilities
