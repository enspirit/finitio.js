Type            = require '../type'
{ArgumentError} = require '../errors'

# mixin
class CollectionType extends Type

  constructor: (@elmType, @name) ->
    unless @elmType instanceof Type
      throw new ArgumentError("Finitio.Type expected, got", @elmType)

    super(@name)

  equals: (other) ->
    (this is other) or
    (other instanceof (this.constructor) and @elmType.equals(other.elmType)) or
    super

  isSuperTypeOf: (other)->
    (this is other) or
    (other instanceof (this.constructor) and @elmType.isSuperTypeOf(other.elmType)) or
    super

#
module.exports = CollectionType
