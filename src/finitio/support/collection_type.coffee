$u   = require './utils'
Type = require '../type'

# mixin
class CollectionType extends Type

  constructor: (@elmType, @name) ->
    unless @elmType instanceof Type
      $u.argumentError("Finitio.Type expected, got:", @elmType)

    super(@name)

  equals: (other) ->
    (this is other) or
    (other instanceof (this.constructor) and
      @elmType.equals(other.elmType)) or
    super

  isSuperTypeOf: (other)->
    (this is other) or
    (other instanceof (this.constructor) and
      @elmType.isSuperTypeOf(other.elmType)) or
    super

  undress: (value, as)->
    from = @elmType
    to   = as.elmType

    return value if to.isSuperTypeOf(from)

    $u.map value, (v)->
      from.undress(v, to)

#
module.exports = CollectionType
