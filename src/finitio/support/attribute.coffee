$u           = require './utils'
{ObjectType} = require './ic'
Type         = require '../type'

#
# Helper class for tuple and relation attributes.
#
# An attribute is simply a `(name: AttrName, type: Type)` pair, where the
# type is a Finitio type.
#
class Attribute
  ObjectType this, ['name', 'type', 'required', 'metadata']

  constructor: (@name, @type, @required, @metadata) ->
    unless typeof @name == "string"
      $u.argumentError("String expected for attribute name, got:", @name)

    unless @type instanceof Type
      $u.argumentError("Type expected for attribute domain, got:", @type)

    @required ?= true

    unless typeof @required == "boolean"
      $u.argumentError("Boolean expected for required, got:", @required)

  fetchType: ()->
    @type

  fetchOn: (arg, callback) ->
    unless typeof arg == "object"
      $u.argumentError("Object expected, got:", arg)

    unless arg[@name]?
      if callback?
        return callback()
      else
        throw new Error("Key `#{@name}` not found")

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

  resolveProxies: (system)->
    @type.resolveProxies(system)

#
module.exports = Attribute
