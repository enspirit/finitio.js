module.exports = (function(){

  // Builds a resolver instance with preconditions and base function `r`
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

  // --------------------------------------------------- Standard lib resolver

  var stdlib = resolver([
    function(path){ return /^finitio\/[a-z]+$/.test(path); },
    function(path){ return !!__dirname; }
  ], function(path, world){
    // resolve the file first
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
    var system = world.Finitio.load(src);

    // returns it
    var name = path.match(/^finitio\/([a-z]+)$/)[1];
    return [ "http://finitio.io/stdlib/" + name, system ];
  });

  // ------------------------------------------------- Chain of responsibility

  var main = function(path, world){
    var keys = Object.keys(main);
    var k, strategy, result;
    for (var i=0; i<keys.length; i++) {
      strategy = main[keys[i]];
      pair = strategy(path, world);
      if (pair){
        return world.Finitio.compile(pair[1], world);
      }
    }
    throw new Error("Unable to resolve: `" + path + "`");
  }
  main.StdLib = stdlib;

  return main;
})();
