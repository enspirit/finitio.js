_               = require 'underscore'
Type            = require '../type'
Heading         = require '../support/heading'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'

$u              = require '../support/utils'

class TupleType extends Type

  constructor: (@heading, @name) ->
    unless @heading instanceof Heading
      throw new ArgumentError("Heading expected, got", @heading)

    @name ?= null
    super(@name)

  # Convert `value` (supposed to be Hash) to a Tuple, by checking attributes
  # and applying `dress` on them in turn. Throw an error if any attribute
  # is missing or unrecognized, as well as if any sub transformation fails.
  dress: (value, helper) ->
    helper ?= new DressHelper

    helper.failed(this, value) unless value instanceof Object

    # Uped values, i.e. tuple under construction
    uped = {}

    # Check the tuple arity and fail fast if extra attributes
    # (missing attributes are handled just after)
    if $u.size(value) > $u.size(@heading.names())
      extra = $u.difference($u.keys(value), @heading.names())
      helper.fail("Unrecognized attribute `#{extra[0]}`")

    # Up each attribute in turn now. Fail on missing ones.
    $u.each @heading.attributes, (attribute) ->
      val = attribute.fetchOn value, ->
        helper.fail("Missing attribute `#{attribute.name}`")

      helper.deeper attribute.name, ->
        uped[attribute.name] = attribute.type.dress(val, helper)

    uped

  include: (value) ->
    return false unless typeof(value) == "object"
    return false if $u.size(value) > $u.size(@heading.attributes)
    $u.every @heading.attributes, (attribute) ->
      return false unless value[attribute.name]?
      attr_val = value[attribute.name]
      attribute.type.include(attr_val)

  defaultName: ->
    "{#{@heading.toName()}}"

  equals: (other) ->
    return false unless other instanceof TupleType
    @heading.equals(other.heading)


module.exports = TupleType
