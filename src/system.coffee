$u          = require './support/utils'
Type        = require './type'
TypeFactory = require './support/factory'
Parser      = require './syntax/parser'

#
# A System is a collection of named Finitio types.
#
class System

  constructor: (@types, @main) ->
    @types   ?= {}
    @main    ?= null
    @factory ?= new TypeFactory

    # include types as attribute of the system
    for name,type of @types
      this[type.name] = type

    ## Decorate prototype with factory methods
    for method in TypeFactory.PUBLIC_DSL_METHODS
      this[method] = @factory[method].bind(@factory)

  addType: (type) ->
    unless type instanceof Type
      $u.argumentError("Finitio.Type expected, got:", type)

    if @types[type.name]?
      $u.argumentError("Duplicate type `#{type.name}`")

    @types[type.name] = type
    this[type.name] = type

  getType: (name) ->
    @types[name]

  fetch: (name, callback) ->
    return @types[name] if @types[name]?

    unless callback?
      throw new Error("No such type `#{name}`")

    callback()

  merge: (other) ->
    unless other instanceof System
      $u.argumentError("Finitio.System expected, got:", other)

    merged_types = $u.extend({}, @types, other.types)
    merged_main  = other.main || @main
    new System(merged_types, merged_main)

  parse: (source, options) ->
    options ||= {}
    options.system = @clone()
    Parser.parse(source, options)

  dress: (value) ->
    unless @main
      throw new Error("No main on System")
    @main.dress(value)

  clone: ->
    new System($u.clone(@types), @main)

#
module.exports = System
