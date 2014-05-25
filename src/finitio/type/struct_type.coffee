{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class StructType extends Type
  TypeType this, 'struct', ['componentTypes', 'metadata']

  constructor: (@componentTypes, @metadata) ->
    super(@metadata)

    unless $u.isArray(@componentTypes)
      $u.argumentError("[Finitio::Type] expected, got:", @componentTypes)

    wrongType = $u.find(@componentTypes, (t) -> !(t instanceof Type))
    if wrongType?
      $u.argumentError("[Finitio::Type] expected, got:", wrongType)

  size: ->
    $u.size(@componentTypes)

  _include: (value) ->
    $u.isArray(value) and
    $u.size(value) == $u.size(@componentTypes) and
    $u.every $u.zip(value, @componentTypes), (valueAndKey)->
      [value, type] = valueAndKey
      type.include(value)

  _mDress: (value, Monad) ->
    unless value instanceof Array
      return Monad.failure this, ["Array expected, got: `${value}`", [value]]

    unless value.length == @size()
      return Monad.failure this,
        ["Struct size mismatch: ${a} for ${b}", [value.length, @size()]]

    mapper = (type, index)=>
      type.mDress(value[index], Monad)

    onFailure = (causes)=>
      params = ['Struct', value]
      Monad.failure this, ["Invalid ${typeName}: `${value}`", params], causes

    Monad.map @componentTypes, mapper, onFailure

  _undress: (value, as) ->
    unless as instanceof StructType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

    unless as.size() == @size()
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

    from = @componentTypes
    to   = as.componentTypes
    $u.map value, (v, i)->
      from[i].undress(v, to[i])

  _isSuperTypeOf: (other) ->
    (this is other) or
    (other instanceof StructType and
    $u.size(@componentTypes) == $u.size(other.componentTypes) and
    $u.every $u.zip(@componentTypes, other.componentTypes), (cs)->
      cs[0].isSuperTypeOf(cs[1]))

  _equals: (other) ->
    (this is other) or
    (other instanceof StructType and @headingEquals(other)) or
    super

  headingEquals: (other)->
    $u.size(@componentTypes) == $u.size(other.componentTypes) and
    $u.every(@componentTypes, (t, i) -> other.componentTypes[i].equals(t))

module.exports = StructType