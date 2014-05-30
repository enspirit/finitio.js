Parser      = require './parser'
Meta        = require './support/meta'
$u          = require './support/utils'
fs          = require 'fs'

class Bundler

  TEMPLATE = """
    module.exports = (function(){
      var ss = JSONDATA;
      var r = function(fallback){
        return function(path, w, options){
          var s = ss[path];
          if (s){
            if (options && options.raw){
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
        if (!w) { w = require('finit' + 'io.js').World; }
        w = w.Finitio.world(w, {
          importResolver: r(w.importResolver)
        });
        return w.importResolver('URL', w, options);
      };
    })();
  """

  constructor: (@world)->
    @systems = {}

  flush: ->
    TEMPLATE.replace(/^[ ]{4}/, '')
            .replace(/JSONDATA/, JSON.stringify(@systems))
            .replace(/URL/, @world.sourceUrl)

  addDirectory: (path) ->
    throw new Error("Bundling directories is not supported")

  addFile: (path) ->
    if fs.lstatSync(path).isDirectory()
      @addDirectory(path)
    else
      src = fs.readFileSync(path).toString()
      @addSource(src)
    this

  addSource: (source) ->
    # recursively resolve every import
    @_bundle(@world.Finitio.parse(source), @world)
    this

  _bundle: (system, world)->
    # dress the system to catch any error immediately
    world.Finitio.system(system, world) if world.check

    # save it under url in systems
    @systems[world.sourceUrl] = system
    return unless system.imports

    # recursively resolve imports
    for imp in system.imports
      # resolve in raw mode
      pair = world.importResolver(imp.from, world, raw: true)
      # set the resolved URL, dress the system for catching errors
      imp.from = pair[0]
      # recurse on sub-imports
      newWorld = world.Finitio.world(world, { sourceUrl: pair[0] })
      @_bundle(pair[1], newWorld)

module.exports = Bundler
