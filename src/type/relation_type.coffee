Type            = require '../type'
CollectionType  = require '../support/collection_type'
TupleType       = require '../type/tuple_type'
Heading         = require '../support/heading'
DressHelper     = require '../support/dress_helper'
{ArgumentError,
TypeError}      = require '../errors'
$u              = require '../support/utils'

class RelationType extends Type

  constructor: (@heading, @name) ->
    super(@name)

    unless @heading instanceof Heading
      throw new ArgumentError("Heading expected, got", @heading)

  include: (value) ->
    value instanceof Array &&
      $u.every value, (tuple) =>
        @tupleType().include(tuple)

  tupleType: ->
    new TupleType(@heading)

  # Apply the corresponding TupleType's `dress` to every element of `value`
  # (any enumerable). Return a Set of transformed tuples. Fail if anything
  # goes wrong transforming tuples or if duplicates are found.
  dress: (value, helper) ->
    helper ?= new DressHelper

    unless typeof(value) == "object" || typeof(value) == "array"
      helper.failed(this, value)

    # Up every tuple and keep results in a "Set"
    set = {}
    helper.iterate value, (tuple, index) =>
      tuple = @tupleType().dress(tuple, helper)
      ## TODO: what a terrible way of 'hashing'
      ## shall we invent a real 'Set' class and hash objects?
      key = JSON.stringify(tuple)
      helper.fail("Duplicate tuple") if set[key]?
      set[key] = tuple

    # Return built tuples
    $u.values(set)

  undress: (value, as) ->
    unless as instanceof RelationType or as instanceof CollectionType
      throw new TypeError("Unable to undress `#{value}` to `#{as}`")

    from = @tupleType()
    to   = if as instanceof RelationType then as.tupleType() else as.elmType
    $u.map value, (val)->
      from.undress(val, to)

  defaultName: ->
    "{{#{@heading.toName()}}}"

  isSuperTypeOf: (other)->
    (this is other) or
    (other instanceof RelationType and @heading.isSuperHeadingOf(other.heading))

  equals: (other) ->
    (this is other) or
    (other instanceof RelationType and @heading.equals(other.heading)) or
    super

#
module.exports = RelationType