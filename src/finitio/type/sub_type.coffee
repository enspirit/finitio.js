{TypeType}  = require '../support/ic'
$u          = require '../support/utils'
Fetchable   = require '../support/fetchable'
Type        = require '../type'
Constraint  = require '../support/constraint'

class SubType extends Type
  TypeType this, 'sub', ['superType', 'constraints', 'metadata']

  constructor: (@superType, @constraints, @metadata) ->
    unless @superType instanceof Type
      $u.argumentError("Finitio.Type expected, got", @superType)

    unless @constraints.constructor == Array
      $u.argumentError("Array expected for constraints, got", @constraints)

    unless @constraints.length > 0
      $u.argumentError("Empty constraints not allowed on SubType")

    unless $u.every(@constraints, (c)-> c instanceof Constraint)
      $u.argumentError("Array of constraints expected, got", @constraints)

    super(@metadata)

  Fetchable this, "constraints", "constraint", (name)->
    $u.find @constraints, (c)-> c.name == name

  _mDress: (value, Monad)->
    success = @superType.mDress(value, Monad)

    callback = (_, constraint)->
      if constraint.accept(success.result, Monad.world)
        success
      else
        if constraint.name?
          msg = "Invalid ${typeName} (not ${cName}): `${value}`"
          params = ['value', constraint.name, value]
        else
          msg = "Invalid ${typeName}: `${value}`"
          params = ['value', value]
        Monad.failure constraint, [msg, params]

    onFailure = (causes)=>
      Monad.failure this, causes[0].error

    Monad.refine success, @constraints, callback, onFailure

  _include: (value, world) ->
    @superType.include(value) && $u.every(@constraints, (c) -> c.accept(value, world))

  _isSubTypeOf: (other)->
    # if my supertype is itself a subtype of other, then its ok
    # otherwise, we just know nothing unless the constraint can be analyzed.
    other.isSuperTypeOf(@superType)

  _equals: (other) ->
    (this is other) or
    (other instanceof SubType and
      @superTypeEquals(other) and @constraintsEquals(other)) or
    super

  low: ()->
    @superType.low()

  toString: ()->
    @superType.toString() + "( x | ... )"

  # private

  superTypeEquals: (other) ->
    @superType.equals(other.superType)

  constraintsEquals: (other) ->
    @constraints.length == other.constraints.length and
    $u.every $u.zip(@constraints, other.constraints), (pair)->
      pair[0].equals(pair[1])

  resolveProxies: (system)->
    @superType.resolveProxies(system)

module.exports = SubType
