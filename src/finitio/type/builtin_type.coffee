{TypeType}  = require '../support/ic'
Type        = require '../type'

#
class BuiltinType extends Type
  TypeType this, 'builtin', ['jsType', 'metadata']

  constructor: (@jsType, @metadata) ->
    super(@metadata)

  _mDress: (value, Monad) ->
    if @include(value)
      Monad.success value
    else
      params = [@jsType.name, value]
      Monad.failure this, ["Invalid ${typeName}: `${value}`", params]

  _include: (value) ->
    value instanceof @jsType || (value? && value.constructor == @jsType)

  _equals: (other) =>
    (this is other) or
    (other instanceof BuiltinType and other.jsType == @jsType) or
    super

  toString: ->
    '.' + @jsType.name.toString()

  resolveProxies: (system)->

module.exports = BuiltinType
