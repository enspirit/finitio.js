Type        = require '../type'
{KeyError,
ArgumentError
TypeError}  = require '../errors'

#
# Helper class for tuple and relation attributes.
#
# An attribute is simply a `(name: AttrName, type: Type)` pair, where the
# type is a Finitio type.
#
class Attribute

  constructor: (@name, @type, @required) ->
    unless typeof @name == "string"
      throw new ArgumentError("String expected for attribute name, got", @name)

    unless @type instanceof Type
      throw new ArgumentError("Type expected for attribute domain, got", @type)

    @required ?= true

    unless typeof @required == "boolean"
      throw new ArgumentError("Boolean expected for parameter required, got", @mandatory)

  fetchOn: (arg, callback) ->
    unless typeof arg == "object"
      throw new ArgumentError("Object expected, got", arg)

    unless arg[@name]?
      if callback?
        return callback()
      else
        throw new KeyError("Key `#{@name}` not found")

    return arg[@name]

  toName: ->
    if @required
      "#{@name}: #{@type}"
    else
      "#{@name} :? #{@type}"

  isSuperAttributeOf: (other) ->
    (this is other) or
    (@name == other.name and
     (not(@required) or other.required) and
     @type.isSuperTypeOf(other.type))

  equals: (other) ->
    (this is other) or
    (other instanceof Attribute and
     (@name == other.name) and
     (@required == other.required) and
     @type.equals(other.type))

#
module.exports = Attribute
