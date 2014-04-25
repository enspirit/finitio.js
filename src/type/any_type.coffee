Type                  = require '../type'

#
class AnyType extends Type

  constructor: (@name) ->
    super(@name)

  dress: (value, helper) ->
    value

  defaultName: ->
    "Any"

  include: (value) ->
    true

  equals: (other) ->
    other instanceof AnyType

module.exports = AnyType
