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

  _mDress: (value, Monad) ->
    if @jsType and value instanceof @jsType
      return Monad.success value
    callback = (contract)->
      m = contract.infoType.mDress(value, Monad)
      m.onSuccess (result)=>
        try
          Monad.success contract.dress(result)
        catch e
          Monad.failure this, e.message, e
    onFailure = (causes)=>
      Monad.failure this, ["Invalid $1 `$2`", [@jsType.name, value]], causes
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
