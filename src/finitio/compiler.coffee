TypeFactory = require './support/factory'
Parser      = require './parser'
$u          = require './support/utils'

class Compiler

  constructor: (options)->
    $u.extend(this, options)

    # Install default collaborators
    @world   ?= {}
    @factory ?= new TypeFactory(@world)
    @system  ?= new System()
    @proxies ?= {}

    # Install the factory methods
    for method in TypeFactory.PUBLIC_DSL_METHODS
      this[method] = @factory[method].bind(@factory) unless method == 'proxy'

    # Install delegation to system
    @addType   = @system.addType.bind(@system)
    @resolve   = @system.resolve.bind(@system)

  compile: (source)->
    @proxies = {}
    Parser.parse(source, { compiler: this })
    @resolveProxies()
    @system

  setMain: (main)->
    @system.addType(@typeDef(main, 'Main'));

  proxy: (name)->
    @proxies[name] ?= @factory.proxy(name)
    @proxies[name]

  typeDef: (type, name, metadata)->
    @alias(type, name, metadata)

  typeRef: (ref)->
    @proxy(ref)

  resolveProxies: ()->
    $u.each @proxies, (proxy, name)=>
      proxy.resolve(@system)
    @proxies = {}

  import: (from, as)->
    unless @resolver
      throw new Error("No import resolver set.")

    sub = @resolver(from)
    if as
      @system.use(sub, as)
    else
      @system.import(sub)

  #

  setTypeName: (type, name)->
    return type unless name?
    return @alias(type, name) unless type.anonymous
    type.setName(name)
    type

  setTypeMetadata: (type, metadata)->
    return type unless metadata?
    return @alias(type, null, metadata) if type.metadata
    type.setMetadata(metadata)
    type

module.exports = Compiler
