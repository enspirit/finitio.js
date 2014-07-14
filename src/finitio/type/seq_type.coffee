{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class SeqType extends CollectionType
  TypeType this, 'seq', ['elmType', 'metadata']

  _include: (value) ->
    value instanceof Array and $u.every(value, (v) => @elmType.include(v))

  _mDress: (value, Monad)->
    unless value instanceof Array
      return Monad.failure this, ["Array expected, got: `${value}`", [value]]

    mapper = (elm)=>
      @elmType.mDress(elm, Monad)

    onFailure = (causes)=>
      Monad.failure this, ["Invalid ${typeName}", ["Sequence"]], causes

    Monad.map value, mapper, onFailure

  _undress: (value, as)->
    unless as instanceof SeqType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")
    super

  resolveProxies: (system)->
    @elmType.resolveProxies(system)

  toString: ()->
    "[" + @elmType.toString() + "]"

#
module.exports = SeqType
