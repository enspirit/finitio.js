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

  _mDress: (value, Monad)->
    unless value instanceof Array
      return Monad.failure this, ["Relation expected, got `$1`", [value]]

    tupleType = @tupleType()
    index = {}

    mapper = (elm)->
      m = tupleType.mDress(elm, Monad)
      m.onSuccess (tuple)=>
        h = JSON.stringify(tuple)
        if index[h]
          Monad.failure this, ["Duplicate Tuple `$1`", [tuple]]
        else
          index[h] = tuple
          m

    onFailure = (causes)=>
      Monad.failure this, ["Invalid Relation `$1`", [value]], causes

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

#
module.exports = RelationType