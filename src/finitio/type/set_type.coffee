{TypeType}      = require '../support/ic'
$u              = require '../support/utils'
Type            = require '../type'
CollectionType  = require '../support/collection_type'

class SetType extends CollectionType
  TypeType this, 'set', ['elmType', 'metadata']

  _include: (value) ->
    return false unless value instanceof Array
    return false unless $u.every(value, (v) => @elmType.include(v))
    $u.uniq(value).length == value.length

  _mDress: (value, Monad)->
    unless value instanceof Array
      return Monad.failure this, ["Array expected, got: `${value}`", [value]]

    mapper = (elm)=>
      @elmType.mDress(elm, Monad)

    onFailure = (causes)=>
      Monad.failure this, ["Invalid ${typeName}", ["Set"]], causes

    m = Monad.map value, mapper, onFailure

    findDuplicate = (set)->
      $u.find set, (elm, i)-> set.indexOf(elm) != i

    m.onSuccess (set)=>
      return m unless d = findDuplicate(set)
      err = Monad.failure this, ["Duplicate value: `${value}`", [d]]
      err.onFailure (cause)=>
        Monad.failure this, "Invalid Set", [cause]

  _undress: (value, as)->
    unless as instanceof CollectionType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")
    super

  low: ()->
    new SetType(@elmType.low())

  resolveProxies: (system)->
    @elmType.resolveProxies(system)

  toString: ()->
    "{" + @elmType.toString() + "}"

#
module.exports = SetType
