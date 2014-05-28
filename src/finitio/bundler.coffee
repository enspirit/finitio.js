Parser      = require './parser'
Meta        = require './support/meta'
$u          = require './support/utils'

class Bundler

  TEMPLATE = """
    module.exports = (function(){
      var ss = JSONDATA;
      var r = function(fallback){
        return function(path, w, options){
          var s = ss[path];
          if (s){
            if (options.raw){
              return [ path, s ];
            } else {
              return w.Finitio.system(s, w);
            }
          } else if (fallback) {
            return fallback(path, w, options);
          } else {
            throw new Error('Unable to resolve: `' + path + '`');
          }
        };
      };
      return function(w, options){
        if (!w){ w = require('finitio.js').World; }
        w = w.Finitio.world(w, {
          importResolver: r(w.importResolver)
        });
        return w.importResolver('URL', w, options);
      };
    })();
  """

  bundle: (source, world)->
    systems = {}

    # recursively resolve every import
    system = world.Finitio.parse(source)
    @_bundle(system, world, systems)

    # returns the instantiated template
    TEMPLATE.replace(/^[ ]{4}/, '')
            .replace(/JSONDATA/, JSON.stringify(systems))
            .replace(/URL/, world.sourceUrl)

  _bundle: (system, world, systems)->
    # dress the system to catch any error immediately
    world.Finitio.system(system, world)

    # save it under url in systems
    systems[world.sourceUrl] = system
    return unless system.imports

    # recursively resolve imports
    for imp in system.imports
      # resolve in raw mode
      pair = world.importResolver(imp.from, world, raw: true)
      # set the resolved URL, dress the system for catching errors
      imp.from = pair[0]
      # recurse on sub-imports
      newWorld = world.Finitio.world(world, { sourceUrl: pair[0] })
      @_bundle(pair[1], newWorld, systems)

module.exports = Bundler
