{TypeType}   = require '../support/ic'
$u           = require '../support/utils'
Fetchable    = require '../support/fetchable'
Contract     = require '../support/contract'
Type         = require '../type'

class AdType extends Type
  TypeType this, 'adt', ['jsType', 'contracts', 'metadata']

  constructor: (@jsType, @contracts, @metadata) ->
    if @jsType and not(@jsType instanceof Function)
      $u.argumentError("Constructor (function) expected, got:", @jsType)

    unless $u.isArray(@contracts)
      $u.argumentError("[Contract] expected, got:", @contracts)

    unless $u.every(@contracts, (c)-> c instanceof Contract)
      $u.argumentError("[Contract] expected, got:", @contracts)

    super(@metadata)

  Fetchable this, "contracts", "contract", (name)->
    $u.find @contracts, (c)-> c.name == name

  contractNames: ->
    $u.map @contracts, (c)-> c.name

  _include: (value) ->
    value.constructor == @jsType

  _mDress: (value, Monad) ->
    if @jsType and value instanceof @jsType
      return Monad.success value

    callback = (contract)->
      m = contract.infoType.mDress(value, Monad)
      m.onSuccess (result)=>
        try
          Monad.success contract.dress(result)
        catch e
          Monad.failure this, "Dresser failed: #{e.message}", [e]

    onFailure = (causes)=>
      params = [ @jsType && @jsType.name || 'value', value ]
      Monad.failure this, ["Invalid ${typeName}: `${value}`", params], causes

    Monad.find @contracts, callback, onFailure

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
