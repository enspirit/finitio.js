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
        if (resolved instanceof Function){
          return resolved;
        } else {
          throw new Error("Unknown javascript type: `" + name + "`");
        }
      },

      undress: function(fn){
        throw new Error("Unimplemented");
      }

    }

  };
})();

