{TypeType} = require '../support/ic'
Type       = require '../type'

#
class AnyType extends Type
  TypeType this, 'any', ['name', 'metadata']

  constructor: (@name, @metadata) ->
    super(@name, @metadata)

  defaultName: ->
    "Any"

  _mDress: (value, Monad) ->
    Monad.success value

  _include: (value) ->
    true

  _isSuperTypeOf: (other)->
    true

  _equals: (other) ->
    (other instanceof AnyType) or super

module.exports = AnyType
