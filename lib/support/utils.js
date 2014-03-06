/**
 * String utils
 */
var str = {

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
      return obj;
    }
    if (obj.trim() == ""){
      return obj;
    }

    var string = obj;

    // Remove underscores
    if (string.indexOf("_") != -1){

      var tokens = string.split("_");

      for(var i=0; i<tokens.length; i++){
        tokens[i] = str.capitalize(tokens[i]);
      }

      string = tokens.join('');
    }

    // Remove spaces
    if (string.indexOf(" ") != -1){

      tokens = string.split(" ");
      for(var i=0; i<tokens.length; i++){
        tokens[i] = str.capitalize(tokens[i])
      }

      string = tokens.join('')
    }

    // Capitalize first letter
    string = string[0].toUpperCase() + string.slice(1);
    return string;
  }

}

//
module.exports = {
  string: str
}
