{TypeType}   = require '../support/ic'
$u           = require '../support/utils'
Fetchable    = require '../support/fetchable'
Contract     = require '../support/contract'
Type         = require '../type'

class AdType extends Type
  TypeType this, 'adt', ['jsType', 'contracts', 'name', 'metadata']

  constructor: (@jsType, @contracts, @name, @metadata) ->
    if @jsType and not(@jsType instanceof Function)
      $u.argumentError("Constructor (function) expected, got:", @jsType)

    unless $u.isArray(@contracts)
      $u.argumentError("[Contract] expected, got:", @contracts)

    unless $u.every(@contracts, (c)-> c instanceof Contract)
      $u.argumentError("[Contract] expected, got:", @contracts)

    super(@name, @metadata)

  Fetchable this, "contracts", "contract", (name)->
    $u.find @contracts, (c)-> c.name == name

  contractNames: ->
    $u.map @contracts, (c)-> c.name

  defaultName: ->
    (@jsType && @jsType.name) || "Anonymous"

  _include: (value) ->
    value.constructor == @jsType

  _dress: (value, helper) ->
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

  _undress: (value, as) ->
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
