{TypeType}      = require '../support/ic'
Type            = require '../type'
CollectionType  = require '../support/collection_type'
TupleType       = require '../type/tuple_type'
Heading         = require '../support/heading'
$u              = require '../support/utils'

class RelationType extends Type
  TypeType this, 'relation', ['heading', 'metadata']

  constructor: (@heading, @metadata) ->
    super(@metadata)

    unless @heading instanceof Heading
      $u.argumentError("Heading expected, got:", @heading)

  fetch: ()->
    @heading.fetch.apply(@heading, arguments)

  tupleType: ()->
    @tupleTypeCache ?= new TupleType(@heading)

  _include: (value, world) ->
    value instanceof Array and
      $u.every value, (tuple)=> @tupleType().include(tuple, world)

  _mDress: (value, Monad)->
    unless value instanceof Array
      return Monad.failure this, ["Array expected, got: `${value}`", [value]]

    tupleType = @tupleType()
    index = {}

    mapper = (elm)->
      m = tupleType.mDress(elm, Monad)
      m.onSuccess (tuple)=>
        h = JSON.stringify(tuple)
        if index[h]
          Monad.failure this, ["Duplicate Tuple: `${value}`", [tuple]]
        else
          index[h] = tuple
          m

    onFailure = (causes)=>
      Monad.failure this, ["Invalid ${typeName}", ["Relation"]], causes

    Monad.map value, mapper, onFailure

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

  low: ()->
    new RelationType(@heading.low())

  resolveProxies: (system)->
    @heading.resolveProxies(system)

  toString: ()->
    "{{ " + @heading.toString() + " }}"

#
module.exports = RelationType