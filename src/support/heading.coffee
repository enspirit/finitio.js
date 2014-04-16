{ArgumentError,
TypeError}  = require '../errors'
Attribute   = require './attribute'
$u          = require './utils'

#
# Helper class for tuple and relation types.
#
# A heading is a set of attributes, with the constraint that no two
# attributes have the same name.
#
class Heading

  DEFAULT_OPTIONS = {
    allowExtra: false
  }

  constructor: (attributes, options) ->
    unless $u.isArray(attributes) and \
           $u.every(attributes, (a) -> a instanceof Attribute)
      throw new ArgumentError("Array of Attribute expected")

    @attributes = {}
    $u.each attributes, (attr) =>
      if @attributes[attr.name]?
        throw new ArgumentError("Attribute names must be unique")
      @attributes[attr.name] = attr

    unless options?
      options = {}
    unless $u.isObject(options)
      throw new ArgumentError("Hash of options expected")

    @options = $u.extend({}, DEFAULT_OPTIONS, options)

  # TODO: Use getters and setters
  size: ->
    $u.size(@attributes)

  isEmpty: ->
    @size() == 0

  allowExtra: ->
    @options['allowExtra']

  multi: ->
    @options['allowExtra'] || $u.any(@attributes, (a) -> !a.required)

  each: (callback) ->
    $u.each($u.values(@attributes), callback)

  toName: ->
    $u.map($u.values(@attributes), (a) -> a.toName()).join(', ')

  names: ->
    $u.map($u.values(@attributes), (a) -> a.name)

  equals: (other) ->
    return null unless other instanceof Heading

    # check attributes
    return false unless $u.size(@attributes) == $u.size(other.attributes)

    valid = $u.every @attributes, (attr, name) ->
      other_attr = other.attributes[name]
      attr.equals(other_attr)

    return false unless valid

    # check options
    return false unless $u.size(@options) == $u.size(other.options)

    valid = $u.every @options, (opt, name) ->
      other_opt = other.options[name]
      opt == other_opt

    valid

#
module.exports = Heading
