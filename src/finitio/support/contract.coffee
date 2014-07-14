{AbstractType} = require './ic'
$u             = require './utils'
Type           = require '../type'

class Contract

  constructor: (@name, @infoType, @native, @metadata)->
    unless $u.isString(@name)
      $u.argumentError("String expected, got:", @name)

    unless @infoType instanceof Type
      $u.argumentError("Finitio.Type expected, got:", @infoType)

  fetchType: ()->
    @infoType

  resolveProxies: (system)->
    @infoType.resolveProxies(system)

  toString: ()->
    "<" + @name + "> " + @infoType.toString()

class Contract.Explicit extends Contract
  kind: 'explicit'

  dress: (value, world)->
    @native.dress(value, world)

  undress: (value, to)->
    @native.undress(value)

class Contract.External extends Contract
  kind: 'external'

  dress: (value, world)->
    @native.dress(value, world)

  undress: (value, to)->
    @native.undress(value)

class Contract.Internal extends Contract
  kind: 'internal'

  dress: (value, world)->
    @native[@name](value, world)

  undress: (value, to)->
    value['to' + $u.capitalize(@name)]()

class Contract.Identity extends Contract
  kind: 'identity'

  dress: (value, world)->
    value

  undress: (value, to)->
    value

AbstractType Contract,
  [ Contract.Explicit, Contract.External, Contract.Internal, Contract.Identity ],
  [ 'name', 'infoType', 'native', 'metadata' ], 2

module.exports = Contract
