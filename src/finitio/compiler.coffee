Parser      = require './parser'
Meta        = require './systems/meta'
$u          = require './support/utils'

class Compiler

  TEMPLATE = "
    (function(){
      var systems = JSONDATA;
      var cache = {
      };
      var resolver = function(fallback){
        return function(path, world){
          if (cache[path]){
            return cache[path];
          } else if (systems[path]){
            return cache[path] = Finitio.dress(systems[path], world);
          } else if (fallback) {
            return fallback(path, world);
          } else {
            throw new Error('Unable to resolve: `' + path + '`');
          }
        };
      };
      return function(world){
        world = world.Finitio.world(world);
        world.importResolver = resolver(world.importResolver);
        return world.importResolver('URL', world);
      };
    })();
  "

  compile: (source, world, url)->
    systems = {}
    @_compile(world.Finitio.parse(source), world, url, systems)
    TEMPLATE.replace(/^[ ]{4}/, '')
            .replace(/JSONDATA/, JSON.stringify(systems))
            .replace(/URL/, url)

  _compile: (system, world, url, systems)->
    systems[url] = system
    return unless system.imports
    for imp in system.imports
      pair = world.importResolver(imp.from, world, raw: true)
      imp.from = pair[0]
      @_compile(pair[1], world, pair[0], systems)

module.exports = Compiler
