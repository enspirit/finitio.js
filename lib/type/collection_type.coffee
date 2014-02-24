Type                                 = require '../type'
{ArgumentError, NotImplementedError} = require '../errors'

class CollectionType

  constructor: (@elmType, @name) ->
    unless @elmType instanceof Type
      throw new Errors.ArgumentError("Qjs.Type expected, got", @elmType)
      super(@name)

  equals: (other) =>
    throw new Errors.NotImplementedError(this, "equals")

module.exports = CollectionType