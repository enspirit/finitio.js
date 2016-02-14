{ObjectType} = require './ic'
$u           = require './utils'
Fetchable    = require './fetchable'
Attribute    = require './attribute'

#
# Helper class for tuple and relation types.
#
# A heading is a set of attributes, with the constraint that no two
# attributes have the same name.
#
class Heading
  ObjectType this, ['attributes', 'options', 'parameters']
  Fetchable  this, 'attributes', 'attribute', (name)-> this.getAttr(name)

  DEFAULT_OPTIONS = {
    allowExtra: false
  }

  constructor: (@attributes, @options) ->
    # Check the attributes
    unless $u.isArray(@attributes) and \
           $u.every(@attributes, (a) -> a instanceof Attribute)
      $u.argumentError("Array of Attribute expected")

    # Check unique names
    names = {}
    $u.each @attributes, (attr) =>
      if names[attr.name]?
        $u.argumentError("Attribute names must be unique")
      names[attr.name] = attr

    # Check the options
    @options ?= {}
    unless $u.isObject(@options)
      $u.argumentError("Hash of options expected")
    @options = $u.extend({}, DEFAULT_OPTIONS, @options)

  getAttr: (name)->
    $u.find @attributes, (a)-> a.name == name

  size: ->
    @attributes.length

  isEmpty: ->
    @size() == 0

  allowExtra: ->
    @options['allowExtra']

  multi: ->
    @options['allowExtra'] || $u.any(@attributes, (a) -> !a.required)

  each: (callback) ->
    $u.each(@attributes, callback)

  toString: ->
    str = $u.map(@attributes, (a) -> a.toString()).join(', ')
    if @allowExtra()
      str += ", " unless @isEmpty()
      str += "..."
    str

  names: ->
    $u.map(@attributes, (a) -> a.name)

  isSuperHeadingOf: (other) ->
    return true if (this is other)
    return false unless other instanceof Heading
    [s, l, r] = $u.triSplit(_attributesByName(this), _attributesByName(other))
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
    @attributes.length == other.attributes.length and
    $u.every @attributes, (attr) ->
      attr.equals(other.getAttr(attr.name))

  optionsEquals: (other) ->
    $u.size(@options) == $u.size(other.options) and
    $u.every @options, (opt, name) ->
      opt == other.options[name]

  low: ()->
    reattrs = $u.map(@attributes, (a)-> a.low())
    reopts = @options
    new Heading(reattrs, reopts)

  # private

  _attributesByName = (self)->
    h = {}
    $u.each self.attributes, (a)->
      h[a.name] = a
    h

  resolveProxies: (system)->
    $u.each @attributes, (a)-> a.resolveProxies(system)

#
module.exports = Heading
