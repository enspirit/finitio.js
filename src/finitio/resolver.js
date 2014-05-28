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

  // ----------------------------------------------------------- File resolver

  var findFile = function(origin, extension, candidates){
    try {
      var extended = origin + (extension || '');
      fs.statSync(extended);
      return [ extended, extension || extended.match(/(\.[a-z]{3,4})$/)[1] ];
    } catch (e) {
      if (candidates.length == 0){
        throw new Error("No such file: `" + origin + "`");
      } else {
        return findFile(origin, candidates[0], candidates.slice(1));
      }
    }
  };

  // Matches file:// and resolve it through `fs`, therefore working under
  // node.js environment only
  var fs = require('fs');
  var file = resolver([
    function(path){ return !!fs; },
  ], function(path, world){
    var match = path.match(/^file:\/\/(.*?)$/);
    if (!match) {
      return null;
    }

    // check that it's an existing file
    var pair = findFile(match[1], null, ['.fio', '.json']);
    var file = pair[0], extension = pair[1];
    var src  = fs.readFileSync(file).toString();
    var system = null;

    // load according to the extension
    switch (extension) {
      case '.fio':
        system = world.Finitio.parse(src);
        break;
      case '.json':
        system = JSON.parse(src);
        break;
      default:
        throw new Error("Unrecognized extension: `" + extension + "`");
    }

    // return the pair now
    return [ path, system ];
  });

  // ------------------------------------------------------- Relative resolver

  // Matches ./ and ../ imports and resolve them recursively after making
  // them absolute
  var relative = resolver([
  ], function(path, world){
    var match = path.match(/^(\.\/)|^(\.\.\/)/);
    if (!match){
      return null;
    }

    var url = world.sourceUrl;
    if (!url){
      throw new Error("Unable to resolve relative path: `" + path + "`");
    }

    // relative -> absolute
    url = url.replace(/\/[^\/]+$/, '');
    if (match[2]) {
      // ../ -> parent folder
      url = url.replace(/\/[^\/]+$/, '');
    }
    url = url + '/' + path.slice(match[0].length);

    // delegate the job
    return world.importResolver(url, world, {raw: true});
  });

  // --------------------------------------------------- Standard lib resolver

  // Matches finitio/... and resolve it through the standard library either
  // on disk (if fs is available), or through the web
  var stdlib = resolver([
    function(path){ return !!__dirname; }
  ], function(path, world){
    var match = path.match(/^finitio\/(.*)$/);
    if (!match){
      return null;
    }

    // establish the paths
    var name = match[1];
    try {
      return require('./stdlib/' + name)(world, {raw: true});
    } catch (e) {
      throw new Error("No such stdlib system: `" + path + "`", e);
    }
  });

  // ------------------------------------------------- Chain of responsibility

  var main = function(path, world, options){
    var keys = Object.keys(main);
    var k, strategy, pair;
    for (var i=0; i<keys.length; i++) {
      strategy = main[keys[i]];
      pair = strategy(path, world);
      if (pair){
        if (options && options.raw){
          return pair;
        } else {
          return world.Finitio.system(pair[1], world);
        }
      }
    }
    throw new Error("Unable to resolve: `" + path + "`");
  }
  main.File = file;
  main.StdLib = stdlib;
  main.Relative = relative;

  return main;
})();
