var ArgumentError = require("../errors").ArgumentError;

//
var Utilities = $u = {

  //******* Utilities

  /**
    * Returns whether or not the parameter is an array
    *
    * Uses native `isArray` if present
    */
  isArray: function(obj){
    if (obj === null || obj === undefined){
      throw new ArgumentError("Object expected, got", obj);
    }
    if (Array.isArray){
      return Array.isArray(obj);
    } else {
      return toString.call(obj) == '[object Array]';
    }
  },

  //******* ENUMERABLE

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
  each: function(obj, callback){
    // callback can be undefined, but can't be null
    if (callback === null){
      throw new Error("Function expected, got null")
    }
    if (callback === undefined){
      callback = function(){}
    }

    // no date, regexp, undefined or null please
    if (obj === undefined || obj === null ||
      obj instanceof Date || obj instanceof RegExp ||
      typeof(obj) == "boolean"){
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
  },

  /**
    * Returns true if all of the iteration over the enumerable pass the predicate truth test
    *
    * Uses #each to iterate
    * TODO: delegate to *every* if present
    */
  every: function(obj, callback){
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
  },

  /**
    * Returns the first element that apsses a truth test
    *
    * Uses #each to iterate
    * TODO: use *every* if present
    */
  find: function(obj, callback){
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
  },

  /**
    * Returns the values of an enumerable that pass a truth test
    *
    * Uses #each to iterate
    * TODO: use *every* if present
    */
  filter: function(obj, callback){
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
  },

  /**
    * Produces a new array of values by mapping each value in list through a
    * transformation function
    *
    * Uses #each to iterate
    * TODO: use *map* if present
    */
  map: function(obj, callback){
    // callback can be undefined, but can't be null
    if (callback === null || callback === undefined){
      throw new ArgumentError("Function expected, got", callback)
    }
    var values = [];
    $u.each(obj, function(v, k){
      values.push(callback(v, k));
    });
    return values;
  },

  /**
    * Returns the values of an Enumerable (Enumerable (String, Array, Object)
    *
    * ! warning: throws error if called for a non-enumerable
    *
    * Uses #each to iterate
    */
  values: function(obj){
    if (obj instanceof Array){
      return obj;
    }
    var values = [];
    $u.each(obj, function(v){
      values.push(v);
    })

    return values;
  },

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
  keys: function(obj){
    var keys = [];
    $u.each(obj, function(v, k){
      keys.push(k);
    })

    return keys;
  },

  /**
    * Returns the number of values of an Enumerable (String, Array, Object)
    *
    * ! warning: throws error if called for a non-object (even Array)
    *
    * Uses #each to iterate
    */
  size: function(obj){
    var values = $u.values(obj);
    return values.length;
  },

  //******* STRINGS

  /**
    * Capitalizes a string
    *
    * foo => Foo
    * fooBar => FooBar
    * foo bar => FooBar
    * foo_bar => FooBar
    **/
  capitalize: function(obj){
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

}

//
module.exports = Utilities
