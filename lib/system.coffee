_     = require 'underscore'

{Error,
KeyError,
ArgumentError} = require './errors'
Qjs            = require './qjs'
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
    for method in Qjs.DSL_METHODS
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

    merged_types = _.extend({}, @types, other.types)
    merged_main  = other.main || @main
    new System(merged_types, merged_main)

  parse: (source) ->
    @merge(Parser.parse(source))

  # TODO: dress: (*args, &bl)

  clone: ->
    new System(_.clone(@types), @main)

#
module.exports = System
