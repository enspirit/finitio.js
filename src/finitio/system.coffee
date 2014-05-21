Fetchable   = require './support/fetchable'
$u          = require './support/utils'
Type        = require './type'
TypeFactory = require './support/factory'
Compiler    = require './compiler'

#
# A System is a collection of named Finitio types.
#
class System

  constructor: (@types, @main, @factory) ->
    @types   ?= {}
    @main    ?= null
    @factory ?= new TypeFactory()

    # include types as attribute of the system
    for name,type of @types
      this[type.name] = type

    ## Decorate prototype with factory methods
    for method in TypeFactory.PUBLIC_DSL_METHODS
      this[method] = @factory[method].bind(@factory)

  Fetchable this, "types", "type"

  setMain: (main)->
    if @main?
      throw new Error("Main type already set")
    @main = main
    @types['Main'] = main

  addType: (type) ->
    unless type instanceof Type
      $u.argumentError("Finitio.Type expected, got:", type)

    if @types[type.name]?
      $u.argumentError("Duplicate type `#{type.name}`")

    @types[type.name] = type
    this[type.name] = type

  merge: (other) ->
    unless other instanceof System
      $u.argumentError("Finitio.System expected, got:", other)

    merged_types = $u.extend({}, @types, other.types)
    merged_main  = other.main || @main
    new System(merged_types, merged_main)

  parse: (source) ->
    (new Compiler(@clone())).compile(source)

  dress: (value) ->
    unless @main
      throw new Error("No main on System")
    @main.dress(value)

  clone: ->
    new System($u.clone(@types), @main, @factory)

#
module.exports = System
