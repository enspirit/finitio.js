{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class StructType extends Type
  TypeType this, 'struct', ['componentTypes', 'name', 'metadata']

  constructor: (@componentTypes, @name, @metadata) ->
    super(@name, @metadata)

    unless $u.isArray(@componentTypes)
      $u.argumentError("[Finitio::Type] expected, got:", @componentTypes)

    wrongType = $u.find(@componentTypes, (t) -> !(t instanceof Type))
    if wrongType?
      $u.argumentError("[Finitio::Type] expected, got:", wrongType)

  defaultName: ->
    componentNames = $u.map(@componentTypes, (t) -> t.name)
    "<" + componentNames.join(', ') + ">"

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
      return Monad.failure this,
        ["Struct expected, got `$1`", [value]]
    unless value.length == @size()
      return Monad.failure this,
        ["Struct size mismatch ($1 for $2)", [value.length, @size()]]
    mapper = (type, index)=>
      type.mDress(value[index], Monad)
    onFailure = (causes)=>
      Monad.failure this, ["Invalid Struct `$1`", [value]], causes
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