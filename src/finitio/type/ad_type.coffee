DressHelper  = require '../support/dress_helper'
Type         = require '../type'
$u           = require '../support/utils'

class AdType extends Type
  generator: 'adt'

  constructor: (@jsType, @contracts, @name) ->
    if @jsType and not(@jsType instanceof Function)
      $u.argumentError("Constructor (function) expected, got:", @jsType)

    unless typeof @contracts is "object"
      $u.argumentError("Hash expected, got:", @contracts)

    invalid = $u.reject($u.values(@contracts), (v) ->
      v instanceof Array and
        v.length == 3 and
        v[0] instanceof Type and
        v[1] instanceof Function and
        v[2] instanceof Function)

    unless invalid.length == 0
      $u.argumentError("Invalid contracts:", invalid)

    super(@name)


  contractNames: ->
    $u.keys(@contracts)

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
    candidate = $u.find @contracts, (contract, name) ->
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

  undress: (value, as) ->
    return value unless @jsType

    infotype  = null
    undresser = null

    # locate what contract to use
    if $u.size(@contracts)==1
      [infotype, dresser, undresser] = $u.values(@contracts)[0]
    else
      $u.find @contracts, (contract, name) ->
        [infotype, dresser, undresser] = contract
        infotype.isSuperTypeOf(as)

    # undress if found
    if undresser?
      infotype.undress(undresser(value), as)
    else
      super

#
module.exports = AdType
