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

    # Install the factory methods
    for method in TypeFactory.PUBLIC_DSL_METHODS
      this[method] = @factory[method].bind(@factory)

    # Install delegation to system
    @addType   = @system.addType.bind(@system)
    @resolve   = @system.resolve.bind(@system)

  compile: (source)->
    Parser.parse(source, { compiler: this })
    @system

  setMain: (main)->
    @system.addType(@typeDef(main, 'Main'));

  import: (from, as)->
    unless @resolver
      throw new Error("No import resolver set.")

    sub = @resolver(from)
    if as
      @system.use(sub, as)
    else
      @system.import(sub)

module.exports = Compiler
