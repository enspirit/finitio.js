{ArgumentError,
TypeError}  = require '../errors'
Attribute   = require './attribute'
_           = require 'underscore'

#
# Helper class for tuple and relation types.
#
# A heading is a set of attributes, with the constraint that no two
# attributes have the same name.
#
class Heading

  constructor: (attributes) ->
    unless _.isArray(attributes) and \
           _.every(attributes, (a) -> a instanceof Attribute)
      throw new ArgumentError("Array of Attribute expected")

    @attributes = {}
    _.each attributes, (attr) =>
      if @attributes[attr.name]?
        throw new ArgumentError("Attribute names must be unique")
      @attributes[attr.name] = attr

  # TODO: Use getters and setters
  size: ->
    _.size(@attributes)

  isEmpty: ->
    @size() == 0

  each: (callback) ->
    _.each(_.values(@attributes), callback)

  toName: ->
    _.map(_.values(@attributes), (a) -> a.toName()).join(', ')

  names: ->
    _.map(_.values(@attributes), (a) -> a.name)

  equals: (other) ->
    return null unless other instanceof Heading
    return false unless _.size(@attributes) == _.size(other.attributes)

    valid = _.every @attributes, (attr, name) ->
      other_attr = other.attributes[name]
      attr.equals(attr)
    
    valid


#
module.exports = Heading