$u = require './utils'
Type = require '../type'

class Contract

  @IDENTITY = (arg)-> arg

  constructor: (@name, @infoType, @dresser, @undresser)->

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

  @identity: (name, type)->
    new Contract(name, type, @IDENTITY, @IDENTITY)

  @explicit: (name, type, dresser, undresser)->
    new Contract(name, type, dresser, undresser)

  @internal: (name, type, clazz)->
    unless clazz.prototype
      $u.argumentError("Prototyped expected, got:", clazz)

    # dresser: type.contractName(...)
    dresser = clazz[name]

    # undresser: type.prototype.toContractName(...)
    undName = 'to' + $u.capitalize(name)
    unless $u.isFunction(clazz.prototype[undName])
      $u.argumentError("Unable to find undresser #{undName} on", clazz)
    undresser = (value)->
      value[undName](value)

    new Contract(name, type, dresser, undresser)

  @external: (name, type, clazz)->
    new Contract(name, type, clazz.dress, clazz.undress)

  dress: (value, helper)->
    @dresser(value)

  undress: (value, to)->
    @undresser(value)

module.exports = Contract