Parser      = require './parser'
Meta        = require './systems/meta'
$u          = require './support/utils'

class Compiler

  TEMPLATE = """
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
  """

  compile: (source, world, url)->
    systems = {}

    # recursively resolve every import
    system = world.Finitio.parse(source)
    @_compile(system, world, url, systems)

    # returns the instantiated template
    TEMPLATE.replace(/^[ ]{4}/, '')
            .replace(/JSONDATA/, JSON.stringify(systems))
            .replace(/URL/, url)

  _compile: (system, world, url, systems)->
    # dress the system to catch any error immediately
    world.Finitio.dress(system)

    # save it under url in systems
    systems[url] = system
    return unless system.imports

    # recursively resolve imports
    for imp in system.imports
      # resolve in raw mode
      pair = world.importResolver(imp.from, world, raw: true)
      # set the resolved URL, dress the system for catching errors
      imp.from = pair[0]
      # recurse on sub-imports
      @_compile(pair[1], world, pair[0], systems)

module.exports = Compiler
