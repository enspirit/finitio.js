module.exports = (function(){
  return {

    name: {

      dress: function(name, world){
        var resolved = null;
        if (world){
          resolved = (new Function("world", "return world." + name + ";"))(world);
        } else {
          resolved = (new Function("return " + name + ";"))();
        }
        if (resolved){
          return resolved;
        } else {
          msg = "Unknown javascript type: `" + name + "` (";
          msg += Object.keys(world).toString();
          msg += ")";
          throw new Error(msg);
        }
      },

      undress: function(fn){
        throw new Error("Unimplemented");
      }

    }

  };
})();

