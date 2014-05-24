{TypeType}  = require '../support/ic'
$u          = require '../support/utils'
Fetchable   = require '../support/fetchable'
Type        = require '../type'
Constraint  = require '../support/constraint'

class SubType extends Type
  TypeType this, 'sub', ['superType', 'constraints', 'name', 'metadata']

  constructor: (@superType, @constraints, @name, @metadata) ->
    @name ?= null

    unless @superType instanceof Type
      $u.argumentError("Finitio.Type expected, got", @superType)

    unless @constraints.constructor == Array
      $u.argumentError("Array expected for constraints, got", @constraints)

    unless @constraints.length > 0
      $u.argumentError("Empty constraints not allowed on SubType")

    unless $u.every(@constraints, (c)-> c instanceof Constraint)
      $u.argumentError("Array of constraints expected, got", @constraints)

    super(@name, @metadata)

  Fetchable this, "constraints", "constraint", (name)->
    $u.find @constraints, (c)-> c.name == name

  defaultName: ->
    $u.capitalize(@constraints[0].name)

  _mDress: (value, Monad)->
    success = @superType.mDress(value, Monad)
    callback = (_, constraint)->
      if constraint.accept(success.result)
        success
      else
        Monad.failure constraint, "Constraint `#{constraint.name}` violated"
    onFailure = (causes)=>
      Monad.failure this, ["Invalid value `$1`", [value]], causes
    Monad.refine success, @constraints, callback, onFailure

  _include: (value) ->
    @superType.include(value) && $u.every(@constraints, (c) -> c.accept(value))

  _isSubTypeOf: (other)->
    # if my supertype is itself a subtype of other, then its ok
    # otherwise, we just know nothing unless the constraint can be analyzed.
    other.isSuperTypeOf(@superType)

  _equals: (other) ->
    (this is other) or
    (other instanceof SubType and
      @superTypeEquals(other) and @constraintsEquals(other)) or
    super

  # private

  superTypeEquals: (other) ->
    @superType.equals(other.superType)

  constraintsEquals: (other) ->
    @constraints.length == other.constraints.length and
    $u.every $u.zip(@constraints, other.constraints), (pair)->
      pair[0].equals(pair[1])

  defaultConstraint: (constraint)->
    constraint.isAnonymous() or $u.capitalize(constraint.name) == @name

module.exports = SubType
