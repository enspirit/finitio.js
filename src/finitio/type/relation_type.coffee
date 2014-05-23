{TypeType}      = require '../support/ic'
Type            = require '../type'
CollectionType  = require '../support/collection_type'
TupleType       = require '../type/tuple_type'
Heading         = require '../support/heading'
$u              = require '../support/utils'

class RelationType extends Type
  TypeType this, 'relation', ['heading', 'name', 'metadata']

  constructor: (@heading, @name, @metadata) ->
    super(@name, @metadata)

    unless @heading instanceof Heading
      $u.argumentError("Heading expected, got:", @heading)

  defaultName: ->
    "{{#{@heading.toName()}}}"

  fetch: ()->
    @heading.fetch.apply(@heading, arguments)

  tupleType: ()->
    @tupleTypeCache ?= new TupleType(@heading)

  _include: (value) ->
    value instanceof Array and
      $u.every value, (tuple)=> @tupleType().include(tuple)

  # Apply the corresponding TupleType's `dress` to every element of `value`
  # (any enumerable). Return a Set of transformed tuples. Fail if anything
  # goes wrong transforming tuples or if duplicates are found.
  _dress: (value, helper) ->
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

  _undress: (value, as) ->
    unless as instanceof RelationType or as instanceof CollectionType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

    from = @tupleType()
    to   = if as instanceof RelationType then as.tupleType() else as.elmType
    $u.map value, (val)->
      from.undress(val, to)

  _isSuperTypeOf: (other)->
    (this is other) or
    (other instanceof RelationType and @heading.isSuperHeadingOf(other.heading))

  _equals: (other) ->
    (this is other) or
    (other instanceof RelationType and @heading.equals(other.heading)) or
    super

#
module.exports = RelationType