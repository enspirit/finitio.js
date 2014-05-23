Type        = require '../type'
$u          = require '../support/utils'

class AliasType extends Type

  constructor: (@type, @name, @metadata) ->
    unless @name
      $u.argumentError("Name cannot be null on AliasType")
    super(@name, @metadata)
    @generator = @type.generator

  fetch: ()->
    @type.fetch.apply(@type, arguments)

  defaultName: ->
    @name

  _include: (value)->
    @type.include(value)

  _dress: (value, helper)->
    @type.dress(value, helper)

  _undress: (value, as)->
    @type.undress(value, as)

  _isSuperTypeOf: (child)->
    @type.isSuperTypeOf(child)

  _isSubTypeOf: (sup)->
    @type._isSubTypeOf(sup)

  _equals: (other)->
    @type.equals(other)

  isFake: ()->
    true

  trueOne: ()->
    @type

#
module.exports = AliasType
