Type            = require '../type'
Heading         = require '../support/heading'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'
$u              = require '../support/utils'

class MultiTupleType extends Type

  constructor: (@heading, @name) ->
    unless @heading instanceof Heading
      throw new ArgumentError("Heading expected, got", @heading)

    super(@name)

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

  defaultName: ->
    "{#{@heading.toName()}}"

  equals: (other) ->
    (this is other) or
    (other instanceof MultiTupleType and @heading.equals(other.heading))

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
module.exports = MultiTupleType