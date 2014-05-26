module.exports = (function(){

  var resolver = function(pres, r){
    return function(path, world){
      for (var i=0; i<pres.length; i++){
        if (!pres[i](path, world)){
          return null;
        }
      }
      return r(path, world);
    }
  };

  var stdlibCache = {};
  var stdlib = resolver([
    function(path){ return /^finitio\/[a-z]+$/.test(path); },
    function(path){ return !!__dirname; }
  ], function(path, world){
    if (stdlibCache[path]){
      return stdlibCache[path];
    }

    // resolver the file first
    var fs = require('fs');
    var fullPath = __dirname + '/systems/' + path + '.fio';
    try {
      fs.statSync(fullPath);
    } catch (e) {
      throw new Error("No such stdlib system: `" + path + "`");
    }

    // load the source
    var src = fs.readFileSync(fullPath).toString();

    // compile it
    var system = world.Finitio.parse(src, world);

    // update the cache and returns it
    stdlibCache[path] = system;
    return system
  });

  var main = function(path, world){
    var keys = Object.keys(main);
    var k, strategy, result;
    for (var i=0; i<keys.length; i++) {
      strategy = main[keys[i]];
      result = strategy(path, world);
      if (result){
        return result;
      }
    }
    throw new Error("Unable to resolve: `" + path + "`");
  }
  main.StdLib = stdlib;

  return main;
})();
