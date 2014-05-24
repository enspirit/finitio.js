{TypeType}  = require '../support/ic'
Type        = require '../type'

#
class BuiltinType extends Type
  TypeType this, 'builtin', ['jsType', 'name', 'metadata']

  constructor: (@jsType, @name, @metadata) ->
    super(@name, @metadata)

  defaultName: ->
    @jsType.name

  _mDress: (value, Monad) ->
    if @include(value)
      Monad.success value
    else
      Monad.failure this, ["Invalid $2 `$1`", [value, this]]

  _include: (value) ->
    value instanceof @jsType || (value && value.constructor == @jsType)

  _equals: (other) =>
    (this is other) or
    (other instanceof BuiltinType and other.jsType == @jsType) or
    super

module.exports = BuiltinType
