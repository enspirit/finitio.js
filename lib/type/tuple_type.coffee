Type                  = require '../type'
DressHelper           = require '../support/dress_helper'
{NotImplementedError} = require '../errors'

class TupleType extends Type
  
  constructor: ->
    throw new Errors.NotImplementedError(this, "constructor")

  dress: (value, helper) ->
    throw new Errors.NotImplementedError(this, "dress")

module.exports = TupleType