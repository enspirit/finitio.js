{ArgumentError
TypeError}   = require '../errors'
DressHelper  = require '../support/dress_helper'
Type         = require '../type'
_            = require 'underscore'

class AdType extends Type

  constructor: (@jsType, @contracts, @name) ->
    unless @jsType instanceof Function
      throw new ArgumentError("Constructor (function) expected, got", @jsType)
    
    unless typeof @contracts is "object"
      throw new ArgumentError("Hash expected, got", @contracts)

    invalid = _.reject(_.values(@contracts), (v) ->
        v instanceof Array and 
          v.length == 2 and
          v[0] instanceof Type and 
          v[1] instanceof Function
      )
    
    unless invalid.length == 0
      throw new ArgumentError("Invalid contracts `#{invalid}`")

    super(@name)

  contractNames: ->
    _.keys(@contracts)
  
  defaultName: ->
    @jsType.name

  include: (value) ->
    value.constructor == @jsType
  
  dress: (value, helper) ->
    helper ?= new DressHelper
    
    # Up should be idempotent with respect to the ADT
    return value if value instanceof @jsType

    # Try each contract in turn. Do nothing on TypeError as
    # the next candidate could be the good one! Return the
    # first successfully uped.
    uped = null
    candidate = _.find @contracts, (contract, name) ->
      [infotype, upper] = contract

      # First make the dress transformation on the information type
      [success, uped] = helper.justTry ->
        infotype.dress(value, helper)
      return success

    if candidate?
      [infoType, upper] = candidate
      # Seems nice, just try to get one stage higher now
      [success, uped] = helper.justTry Error, ->
        upper(uped)
      
      return uped if success

    # No one succeeded, just fail
    helper.failed(this, value)

# 
module.exports = AdType