{NotImplementedError} = require '../errors'
DressHelper           = require '../support/dress_helper'
Type                  = require '../type'
_                     = require 'underscore'

#
class BuiltinType extends Type

  constructor: (@jsType, @name) ->
    super(@name)

  dress: (value, helper) ->
    helper ?= new DressHelper
    helper.failed(this, value) unless value.constructor == @jsType
    value

  defaultName: ->
    @jsType.name

  include: (value) ->
    value.constructor == @jsType

  equals: (other) =>
    return false unless other instanceof BuiltinType
    other.jsType == @jsType

module.exports = BuiltinType
