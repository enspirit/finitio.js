{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class SeqType extends CollectionType
  TypeType this, 'seq', ['elmType', 'name', 'metadata']

  defaultName: ->
    "[#{@elmType.name}]"

  _include: (value) ->
    value instanceof Array and $u.every(value, (v) => @elmType.include(v))

  _mDress: (value, Monad)->
    unless value instanceof Array
      return Monad.failure this, ["Sequence expected, got `$1`", [value]]
    mapper = (elm)=>
      @elmType.mDress(elm, Monad)
    onFailure = (causes)=>
      Monad.failure this, ["Invalid Sequence `$1`", [value]], causes
    Monad.map value, mapper, onFailure

  _undress: (value, as)->
    unless as instanceof SeqType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")
    super

#
module.exports = SeqType
