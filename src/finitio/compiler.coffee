TypeFactory = require './support/factory'
Parser      = require './parser'
$u          = require './support/utils'

class Compiler

  constructor: (@system)->
    # Install the factory methods
    for method in TypeFactory.PUBLIC_DSL_METHODS
      this[method] = @system[method].bind(@system) unless method == 'proxy'

    # created proxies
    @proxies = {}

    # Install delegation to system
    this.addType   = @system.addType.bind(@system)
    this.fetch     = @system.fetch.bind(@system)
    this.fetchPath = @system.fetchPath.bind(@system)

  compile: (source, options)->
    options ?= {}
    options.compiler = this
    Parser.parse(source, options)
    @resolveProxies()
    @system

  setMain: (main)->
    @system.setMain(main);

  proxy: (name)->
    @proxies[name] ?= @system.proxy(name)
    @proxies[name]

  typeDef: (type, name, metadata)->
    if type.anonymous && !type.metadata
      type.setName(name)
      type.setMetadata(metadata)
      type
    else
      @alias(type, name, metadata)

  typeRef: (name)->
    fetched = @fetchPath name, ()=>
      @proxy(name)
    fetched.fetchType()

  resolveProxies: ()->
    $u.each @proxies, (proxy, name)=>
      proxy.resolve(@system)

module.exports = Compiler
