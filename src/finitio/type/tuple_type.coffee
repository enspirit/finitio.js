Type            = require '../type'
Heading         = require '../support/heading'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
$u              = require '../support/utils'

class TupleType extends Type
  generator: 'tuple'

  constructor: (@heading, @name) ->
    unless @heading instanceof Heading
      $u.argumentError("Heading expected, got:", @heading)

    super(@name)

  fetch: ()->
    @heading.fetch.apply(@heading, arguments)

  include: (value) ->
    return false unless typeof(value) == "object"
    return false unless @areAttributesValid(value)
    $u.every @heading.attributes, (attribute) ->
      if value[attribute.name]?
        attr_val = value[attribute.name]
        attribute.type.include(attr_val)
      else
        true

  # Convert `value` (supposed to be Hash) to a Tuple, by checking attributes
  # and applying `dress` on them in turn. Throw an error if any attribute
  # is missing or unrecognized, as well as if any sub transformation fails.
  dress: (value, helper) ->
    helper ?= new DressHelper

    helper.failed(this, value) unless value instanceof Object

    # Check for extra attributes
    extraAttrs = @extraAttributes(value)
    unless @heading.allowExtra() or $u.isEmpty(extraAttrs)
      helper.fail("Unrecognized attribute `#{extraAttrs[0]}`")

    # Check for missing attributes
    missingAttrs = @missingAttributes(value)
    unless $u.isEmpty(missingAttrs)
      helper.fail("Missing attribute `#{missingAttrs[0]}`")

    # Uped values, i.e. tuple under construction
    uped = {}

    # Up each attribute in turn now.
    $u.each @heading.attributes, (attribute) ->
      present = true
      val = attribute.fetchOn value, ->
        present = false

      return unless present

      helper.deeper attribute.name, ->
        uped[attribute.name] = attribute.type.dress(val, helper)

    uped

  undress: (value, as) ->
    unless as instanceof TupleType
      $u.undressError("Tuple cannot undress to `#{as}` (#{as.constructor}).")

    # Check heading compatibility
    [s, l, r] = $u.triSplit(@heading.attributes, as.heading.attributes)

    # left non empty? do we allow projection undressings?
    unless $u.isEmpty(l)
      $u.undressError("Tuple undress does not allow projecting #{l}")

    # right non empty? do we allow missing attributes?
    unless $u.isEmpty(r)
      $u.undressError("Tuple undress does not support missing #{r}")

    # Do we allow disagreements on required?
    unless $u.every(s, (pair)-> pair[0].required == pair[1].required)
      $u.undressError("Tuple undress requires optional attributes to agree")

    # let undress each attribute in turn
    undressed = {}
    @heading.each (attribute) ->
      attrName  = attribute.name
      attrType  = attribute.type
      attrValue = value[attrName]
      unless attrValue is undefined
        targType  = as.heading.attributes[attrName].type
        undressed[attribute.name] = attrType.undress(attrValue, targType)

    undressed

  defaultName: ->
    "{#{@heading.toName()}}"

  isSuperTypeOf: (other)->
    (this is other) or
    (other instanceof TupleType and @heading.isSuperHeadingOf(other.heading))

  equals: (other) ->
    (this is other) or
    (other instanceof TupleType and @heading.equals(other.heading)) or
    super

  ## 'Private' methods

  attributeNames: ->
    $u.map($u.values(@heading.attributes), (a) -> a.name)

  requiredAttributeNames: ->
    $u.map(
      $u.values(
        $u.filter(
          @heading.attributes, (a) -> a.required
        )
      ), (a) -> a.name)

  extraAttributes: (value) ->
    $u.difference($u.keys(value), @attributeNames())

  missingAttributes: (value) ->
    $u.difference(@requiredAttributeNames(), $u.keys(value))

  areAttributesValid: (value) ->
    (@heading.allowExtra() || $u.isEmpty(@extraAttributes(value))) &&
      $u.isEmpty(@missingAttributes(value))
#
module.exports = TupleType