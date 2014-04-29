{NotImplementedError} = require '../errors'
DressHelper           = require '../support/dress_helper'
Type                  = require '../type'

#
class BuiltinType extends Type

  constructor: (@jsType, @name) ->
    super(@name)

  dress: (value, helper) ->
    helper ?= new DressHelper

    if value == null || value == undefined
      helper.failed(this, value)

    unless value.constructor == @jsType
      helper.failed(this, value)

    value

  defaultName: ->
    @jsType.name

  include: (value) ->
    value.constructor == @jsType

  equals: (other) =>
    (this is other) or
    (other instanceof BuiltinType and other.jsType == @jsType) or
    super

module.exports = BuiltinType
