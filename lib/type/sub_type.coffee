_               = require 'underscore'
Type            = require '../type'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'

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
  dress: (value, helper) ->
    helper ?= new DressHelper
    # Check that the supertype is able to 'dress' the value.
    # Rewrite and set cause to any encountered TypeError.
    uped = helper.try this, value, =>
      @superType.dress(value, helper)
    
    # Check each constraint in turn
    _.each @constraints, (constraint, name) =>
      if typeof constraint is "function"
        return if constraint(uped)

      # Unfortunately no magic '===' ruby operator here
      if constraint? and constraint.constructor == RegExp
        return if constraint.test(uped)

      msg = helper.defaultErrorMessage(this, value)
      msg += " (not #{name})" unless @isDefaultConstraint(name)
      helper.fail(msg)

    # seems good, return the uped value
    uped
  
  defaultName: ->
    _.str.capitalize(_.keys(@constraints)[0])

  include: (value) ->
    @superType.include(value) && _.every(@constraints, (c, n) -> c(value))    

  equals: (other) ->
    return false unless other instanceof SubType
    other.superType == @superType and 
      _.isEqual _.values(other.constraints), _.values(@constraints)

  # 'private method'

  isDefaultConstraint: (name) ->
    _.contains(DEFAULT_CONSTRAINT_NAMES, name) or
      _.str.capitalize(name.toString()) == @name

module.exports = SubType