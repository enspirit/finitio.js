Fetchable   = require '../support/fetchable'
Type        = require '../type'
Constraint  = require '../support/constraint'
DressHelper = require '../support/dress_helper'
$u          = require '../support/utils'

class SubType extends Type
  generator: 'sub'

  constructor: (@superType, @constraints, @name, @metadata) ->
    @name ?= null

    unless @superType instanceof Type
      $u.argumentError("Finitio.Type expected, got", @superType)

    unless @constraints.constructor == Array
      $u.argumentError("Array expected for constraints, got", @constraints)

    unless @constraints.length > 0
      $u.argumentError("Empty constraints not allowed on SubType")

    unless $u.every(@constraints, (c)-> c.constructor == Constraint)
      $u.argumentError("Array of constraints expected, got", @constraints)

    super(@name, @metadata)

  Fetchable this, "constraints", "constraint", (name)->
    $u.find @constraints, (c)-> c.name == name

  # Check that `value` can be uped through the supertype, then verify all
  # constraints. Raise an error if anything goes wrong.
  dress: (value, helper) ->
    helper ?= new DressHelper
    # Check that the supertype is able to 'dress' the value.
    # Rewrite and set cause to any encountered TypeError.
    uped = helper.try this, value, =>
      @superType.dress(value, helper)

    # Check each constraint in turn
    $u.each @constraints, (constraint) =>
      return if constraint.accept(uped)
      msg = helper.defaultErrorMessage(this, value)
      msg += " (not #{constraint.name})" unless @defaultConstraint(constraint)
      helper.fail(msg)

    # seems good, return the uped value
    uped

  defaultName: ->
    $u.capitalize(@constraints[0].name)

  include: (value) ->
    @superType.include(value) && $u.every(@constraints, (c) -> c.accept(value))

  _isSubTypeOf: (other)->
    # if my supertype is itself a subtype of other, then its ok
    # otherwise, we just know nothing unless the constraint can be analyzed.
    other.isSuperTypeOf(@superType)

  equals: (other) ->
    (this is other) or
    (other instanceof SubType and
      @superTypeEquals(other) and @constraintsEquals(other)) or
    super

  superTypeEquals: (other) ->
    @superType.equals(other.superType)

  constraintsEquals: (other) ->
    @constraints.length == other.constraints.length and
    $u.every $u.zip(@constraints, other.constraints), (pair)->
      pair[0].equals(pair[1])

  defaultConstraint: (constraint)->
    constraint.isAnonymous() or $u.capitalize(constraint.name) == @name

module.exports = SubType
