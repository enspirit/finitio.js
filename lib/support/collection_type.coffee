Type            = require '../type'
{ArgumentError} = require '../errors'

# mixin
class CollectionType extends Type

  constructor: (@elmType, @name) ->
    unless @elmType instanceof Type
      throw new ArgumentError("Qjs.Type expected, got", @elmType)

    super(@name)

  equals: (other) ->
    return false unless other instanceof (this.constructor)
    @elmType.equals(other.elmType)

#
module.exports = CollectionType
