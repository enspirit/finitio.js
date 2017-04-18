{ObjectType} = require './ic'
$u           = require './utils'
Fetchable    = require './fetchable'
Attribute    = require './attribute'
AnyType      = require '../type/any_type'

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

  allowExtra: (type) ->
    unless @options.allowExtra
      return false

    unless type?
      return true

    @getExtraType()._isSuperTypeOf(type)

  allowExtraValue: (value) ->
    unless @allowExtra()
      return false

    unless value?
      return true

    @getExtraType().include(value)

  getExtraType: ->
    return @options.allowExtra

  multi: ->
    @allowExtra() || $u.any(@attributes, (a) -> !a.required)

  each: (callback) ->
    $u.each(@attributes, callback)

  toString: ->
    str = $u.map(@attributes, (a) -> a.toString()).join(', ')
    if @allowExtra()
      extraType = @options.allowExtra
      str += ", " unless @isEmpty()
      str += "..."
      str += ": " + extraType.toString() unless extraType instanceof AnyType
    str

  names: ->
    $u.map(@attributes, (a) -> a.name)

  isSuperHeadingOf: (other) ->
    # Recognises with itself
    return true if (this is other)
    return false unless other instanceof Heading
    #
    [s, l, r] = $u.triSplit(_attributesByName(this), _attributesByName(other))
    # Each field must be of same type or be parent
    return false unless $u.every(s, (pair)-> pair[0].isSuperAttributeOf(pair[1]))
    # Each missing field must be optional
    return false unless $u.every(l, (a)-> not(a.required))
    # If the other type allows extra attribute
    # this type must too and must allow the other's extra type
    if other.allowExtra()
      return false unless @allowExtra() and @allowExtra(other.options.allowExtra)
    # We allow extra, or there are no extra fields
    return @allowExtra() or $u.isEmpty(r)

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
    @options.allowExtra.resolveProxies(system) if @options.allowExtra

#
module.exports = Heading
