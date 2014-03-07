{Error,
KeyError,
ArgumentError} = require './errors'
Type           = require './type'
TypeFactory    = require './support/factory'
Parser         = require './syntax/parser'

#
# A System is a collection of named Q types.
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
      throw new ArgumentError("Qjs.Type expected, got", type)

    if @types[type.name]?
      throw new Error("Duplicate type name `#{type.name}`")

    @types[type.name] = type
    this[type.name] = type

  getType: (name) ->
    @types[name]

  fetch: (name, callback) ->
    return @types[name] if @types[name]?

    unless callback?
      throw new KeyError("No type found: #{name}")

    callback()

  merge: (other) ->
    unless other instanceof System
      throw new ArgumentError("Qjs.System expected, got", other)

    merged_types = $u.extend({}, @types, other.types)
    merged_main  = other.main || @main
    new System(merged_types, merged_main)

  parse: (source) ->
    Parser.parse(source, system: @clone())

  dress: (value) ->
    unless @main
      throw new Error("No main on System")
    @main.dress(value)

  clone: ->
    new System($u.clone(@types), @main)

#
module.exports = System
