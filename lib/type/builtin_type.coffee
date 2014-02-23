{NotImplementedError} = require '../errors'
FromQHelper           = require '../support/from_q_helper'
Type                  = require '../type'
_                     = require 'underscore'

# Extend underscore with the string helpers
_.extend _, require 'underscore.string'

# 
class BuiltinType extends Type

  constructor: (@jsType, @name) ->
    super(@name)

  fromQ: (value, helper) ->
    helper ?= new FromQHelper
    helper.$failed(this, value) unless value.constructor == @jsType
    value

  defaultName: ->
    @jsType.name
    
  equals: (other) =>
    return false unless other instanceof BuiltinType
    other.jsType == @jsType

module.exports = BuiltinType