{TypeType} = require '../support/ic'
Type       = require '../type'

#
class AnyType extends Type
  TypeType this, 'any', ['metadata']

  constructor: (@metadata) ->
    super(@metadata)

  _mDress: (value, Monad) ->
    Monad.success value

  _include: (value) ->
    true

  _isSuperTypeOf: (other)->
    true

  _equals: (other) ->
    (other instanceof AnyType) or super

  low: () ->
    this

  resolveProxies: (system)->

  toString: ()->
    return '.'

module.exports = AnyType
