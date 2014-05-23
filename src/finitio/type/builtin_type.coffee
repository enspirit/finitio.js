DressHelper = require '../support/dress_helper'
Type        = require '../type'

#
class BuiltinType extends Type
  generator: 'builtin'

  constructor: (@jsType, @name, @metadata) ->
    super(@name, @metadata)

  dress: (value, helper) ->
    helper ?= new DressHelper

    if value == null || value == undefined
      helper.failed(this, value)

    unless @include(value)
      helper.failed(this, value)

    value

  defaultName: ->
    @jsType.name

  include: (value) ->
    value instanceof @jsType || value.constructor == @jsType

  equals: (other) =>
    (this is other) or
    (other instanceof BuiltinType and other.jsType == @jsType) or
    super

module.exports = BuiltinType
