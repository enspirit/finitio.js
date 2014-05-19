Type        = require '../type'
DressHelper = require '../support/dress_helper'
$u          = require '../support/utils'

class AliasType extends Type

  constructor: (@type, @name) ->
    unless @name
      $u.argumentError("Name cannot be null on AliasType")
    super(@name)
    @generator = @type.generator

  defaultName: ->
    @name

  include: (value)->
    @type.include(value)

  dress: (value, helper)->
    @type.dress(value, helper)

  undress: (value, as)->
    @type.undress(value, as)

  isSuperTypeOf: (child)->
    @type.isSuperTypeOf(child)

  _isSubTypeOf: (sup)->
    @type._isSubTypeOf(sup)

  isFake: ()->
    true

  trueOne: ()->
    @type

#
module.exports = AliasType
