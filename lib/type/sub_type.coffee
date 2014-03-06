_               = require 'underscore'
Type            = require '../type'
Constraint      = require '../support/constraint'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'

$u              = require '../support/utils'

class SubType extends Type

  constructor: (@superType, @constraints, @name) ->
    @name ?= null

    unless @superType instanceof Type
      throw new ArgumentError("Qjs.Type expected, got", @superType)

    unless @constraints.constructor == Array
      throw new ArgumentError("Array expected for constraints, got",
        @constraints)

    unless @constraints.length > 0
      throw new ArgumentError("Empty constraints not allowed on SubType")

    unless _.every(@constraints, (c)-> c.constructor == Constraint)
      throw new ArgumentError("Array of constraints expected, got",
        @constraints)

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
    _.each @constraints, (constraint) =>
      return if constraint.accept(uped)
      msg = helper.defaultErrorMessage(this, value)
      msg += " (not #{constraint.name})" unless @defaultConstraint(constraint)
      helper.fail(msg)

    # seems good, return the uped value
    uped

  defaultName: ->
    $u.capitalize(@constraints[0].name)

  include: (value) ->
    @superType.include(value) && _.every(@constraints, (c) -> c.accept(value))

  equals: (other) ->
    return false unless other instanceof SubType
    @superType.equals(other.superType) and
      @constraints.length == other.constraints.length and
      _.every _.zip(@constraints, other.constraints), (pair)->
        pair[0].equals(pair[1])

  defaultConstraint: (constraint)->
    constraint.isAnonymous() or $u.capitalize(constraint.name) == @name

module.exports = SubType
