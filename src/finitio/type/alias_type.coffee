Type            = require '../type'
DressHelper     = require '../support/dress_helper'
$u              = require '../support/utils'

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

  isSuperTypeOf: (other)->
    (this is other) or
    (other instanceof AliasType and @type.isSuperTypeOf(other.type)) or
    super

  _isSubTypeOf: (other)->
    other.isSuperTypeOf(@type)

  equals: (other)->
    (this is other) or
    (other instanceof AliasType and @type.equals(other.type)) or
    @type.equals(other)

#
module.exports = AliasType
