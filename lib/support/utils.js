var ArgumentError = require("../errors").ArgumentError;

//
var Utilities = $u = {

  //******* ENUMERABLE

  every: function(obj, callback){
    // no date, regexp, undefined or null please
    if (obj === undefined || obj === null ||
      obj instanceof Date || obj instanceof RegExp){
      throw new ArgumentError("Enumerable (Array, Object, String) expected, got", obj);
    }

    // Strings
    if (typeof(obj) == "string"){
      return $u.every(obj.split(""), callback)
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
