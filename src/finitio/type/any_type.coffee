{TypeType} = require '../support/ic'
Type       = require '../type'

#
class AnyType extends Type
  TypeType this, 'any', ['name', 'metadata']

  constructor: (@name, @metadata) ->
    super(@name, @metadata)

  dress: (value, helper) ->
    value

  defaultName: ->
    "Any"

  include: (value) ->
    true

  isSuperTypeOf: (other)->
    true

  equals: (other) ->
    (other instanceof AnyType) or super

module.exports = AnyType
