_     = require 'underscore'

{Error,
KeyError,
ArgumentError} = require './errors'
Qjs            = require './qjs'
Type           = require './type'
TypeFactory    = require './support/factory'

#
# A System is a collection of named Q types.
#
class System

  constructor: (@types, @main) ->
    @types ?= {}
    @main ?= null
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

  # TODO: dress: (*args, &bl)
  
  # TODO: parse: (source)

  clone: ->
    new System(_.clone(@types), _.clone(@main))

#
module.exports = System