_                                    = require 'underscore'
Type                                 = require '../type'
Handler                              = require '../support/from_q_helper'
{ArgumentError, NotImplementedError} = require '../errors'

# Extend underscore with the string helpers
_.str = require 'underscore.string'

# 'Constant', unaccessible from outside the module
DEFAULT_CONSTRAINT_NAMES = ['default', 'predicate']

class SubType extends Type

  constructor: (@superType, @constraints, @name) ->
    @name ?= null

    unless @superType instanceof Type
      throw new ArgumentError("Qjs.Type expected, got", @superType)

    unless typeof @constraints == "object"
      throw new ArgumentError("Hash expected for constraints, got", @constraints)

    super(@name)

  # Check that `value` can be uped through the supertype, then verify all
  # constraints. Raise an error if anything goes wrong.
  fromQ: (value, handler) ->
    handler ?= new Handler
    # Check that the supertype is able to 'from_q' the value.
    # Rewrite and set cause to any encountered TypeError.
    uped = handler.try this, value, =>
      @superType.fromQ(value, handler)
    
    # Check each constraint in turn
    _.each @constraints, (constraint, name) =>
      return if constraint(uped)
      msg = handler.defaultErrorMessage(this, value)
      msg += " (not #{name})" unless @isDefaultConstraint(name)
      handler.fail(msg)

    # seems good, return the uped value
    uped
  
  defaultName: ->
    _.str.capitalize(_.keys(@constraints)[0])

  equals: (other) ->
    return false unless other instanceof SubType
    other.superType == @superType and 
      _.isEqual _.values(other.constraints), _.values(@constraints)

  # 'private method'

  isDefaultConstraint: (name) ->
    _.contains(DEFAULT_CONSTRAINT_NAMES, name) or
      _.str.capitalize(name.toString()) == @name

module.exports = SubType