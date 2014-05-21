Fetchable = require './fetchable'
Attribute = require './attribute'
$u        = require './utils'

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
      $u.argumentError("Array of Attribute expected")

    @attributes = {}
    $u.each attributes, (attr) =>
      if @attributes[attr.name]?
        $u.argumentError("Attribute names must be unique")
      @attributes[attr.name] = attr

    unless options?
      options = {}
    unless $u.isObject(options)
      $u.argumentError("Hash of options expected")

    @options = $u.extend({}, DEFAULT_OPTIONS, options)

  Fetchable this, "attributes"

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

  isSuperHeadingOf: (other) ->
    return true if (this is other)
    return false unless other instanceof Heading
    [s, l, r] = $u.triSplit(@attributes, other.attributes)
    #
    $u.every(s, (pair)-> pair[0].isSuperAttributeOf(pair[1])) and
    $u.every(l, (a)-> not(a.required)) and
    (@allowExtra() or not(other.allowExtra())) and
    (@allowExtra() or $u.isEmpty(r))

  equals: (other) ->
    (this is other) or
    (other instanceof Heading and
      @attributesEquals(other) and
      @optionsEquals(other))

  attributesEquals: (other) ->
    $u.size(@attributes) == $u.size(other.attributes) and
    $u.every @attributes, (attr, name) ->
      attr.equals(other.attributes[name])

  optionsEquals: (other) ->
    $u.size(@options) == $u.size(other.options) and
    $u.every @options, (opt, name) ->
      opt == other.options[name]

#
module.exports = Heading
