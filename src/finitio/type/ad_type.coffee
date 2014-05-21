Fetchable    = require '../support/fetchable'
Contract     = require '../support/contract'
DressHelper  = require '../support/dress_helper'
Type         = require '../type'
$u           = require '../support/utils'

class AdType extends Type
  generator: 'adt'

  constructor: (@jsType, @contracts, @name) ->
    if @jsType and not(@jsType instanceof Function)
      $u.argumentError("Constructor (function) expected, got:", @jsType)

    unless $u.isArray(@contracts)
      $u.argumentError("[Contract] expected, got:", @contracts)

    unless $u.every(@contracts, (c)-> c instanceof Contract)
      $u.argumentError("[Contract] expected, got:", @contracts)

    super(@name)

  Fetchable this, "contracts", "contract", (name)->
    $u.find @contracts, (c)-> c.name == name

  contractNames: ->
    $u.map @contracts, (c)-> c.name

  defaultName: ->
    (@jsType && @jsType.name) || "Anonymous"

  include: (value) ->
    value.constructor == @jsType

  dress: (value, helper) ->
    helper ?= new DressHelper

    # Up should be idempotent with respect to the ADT
    return value if @jsType and value instanceof @jsType

    # Try each contract in turn. Do nothing on TypeError as
    # the next candidate could be the good one! Return the
    # first successfully uped.
    uped = null
    candidate = $u.find @contracts, (contract) ->
      [success, uped] = helper.justTry ->
        contract.infoType.dress(value, helper)
      return success

    if candidate?
      [success, uped] = helper.justTry Error, ->
        candidate.dress(uped)
      return uped if success

    # No one succeeded, just fail
    helper.failed(this, value)

  undress: (value, as) ->
    return value unless @jsType

    candidate = null
    if $u.size(@contracts)==1
      # if only one contract let it do its job
      candidate = @contracts[0]
    else
      # otherwise, find the good one
      candidate = $u.find @contracts, (c) ->
        c.infoType.isSuperTypeOf(as)

    if candidate?
      candidate.infoType.undress(candidate.undress(value), as)
    else
      super

#
module.exports = AdType
