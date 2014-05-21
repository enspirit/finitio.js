$u = require './utils'
Type = require '../type'

class Contract

  constructor: (@name, @infoType, @dresser, @undresser, @metadata)->
    unless $u.isString(@name)
      $u.argumentError("String expected, got:", @name)

    unless @infoType instanceof Type
      $u.argumentError("Finitio.Type expected, got:", @infoType)

    unless $u.isFunction(@dresser)
      console.log(@dresser)
      $u.argumentError("Function expected, got:", @dresser)

    unless $u.isFunction(@undresser)
      console.log(@undresser)
      $u.argumentError("Function expected, got:", @undresser)

  fetchType: ()->
    @infoType

  dress: (value, helper)->
    @dresser(value)

  undress: (value, to)->
    @undresser(value)

module.exports = Contract
