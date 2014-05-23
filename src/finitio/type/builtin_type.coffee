{TypeType}  = require '../support/ic'
Type        = require '../type'

#
class BuiltinType extends Type
  TypeType this, 'builtin', ['jsType', 'name', 'metadata']

  constructor: (@jsType, @name, @metadata) ->
    super(@name, @metadata)

  defaultName: ->
    @jsType.name

  _dress: (value, helper) ->
    if value == null || value == undefined
      helper.failed(this, value)

    unless @include(value)
      helper.failed(this, value)

    value

  _include: (value) ->
    value instanceof @jsType || value.constructor == @jsType

  _equals: (other) =>
    (this is other) or
    (other instanceof BuiltinType and other.jsType == @jsType) or
    super

module.exports = BuiltinType
