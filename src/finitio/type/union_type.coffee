{TypeType}  = require '../support/ic'
$u          = require '../support/utils'
Type        = require '../type'

class UnionType extends Type
  TypeType this, 'union', ['candidates', 'metadata']

  constructor: (@candidates, @metadata) ->
    $u.each @candidates, (c) ->
      unless c instanceof Type
        $u.argumentError("Finitio.Type expected, got:", c)

    super(@metadata)

  _mDress: (value, Monad)->

    callback = (candidate)->
      candidate.mDress(value, Monad)

    onFailure = (causes)=>
      params = ['value', value]
      Monad.failure this, ["Invalid ${typeName}: `${value}`", params], causes

    Monad.find @candidates, callback, onFailure

  _undress: (value, as) ->
    return value if this is as

    # find a candidate which is a subtype of as
    if (using = $u.find @candidates, (c)-> as.isSuperTypeOf(c))
      return using.undress(value, as)

    # find candidate that includes value
    else if (using = $u.find @candidates, (c)-> c.include(value))
      return using.undress(value, as)

    else
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

  _include: (value, world) ->
    found = $u.find @candidates, (c) -> c.include(value, world)
    found?

  _isSuperTypeOf: (other)->
    (this is other) or
    ($u.any @candidates, (c) -> c.isSuperTypeOf(other)) or
    (other instanceof UnionType and
    $u.every other.candidates, (d)=>
      $u.any @candidates, (c) ->
        c.isSuperTypeOf(d)) or
    super

  _equals: (other) ->
    (this is other) or
    (other instanceof UnionType and @candidatesEquals(other, true)) or
    super

  candidatesEquals: (other, andback) ->
    ok = $u.every @candidates, (c)->
      $u.any other.candidates, (c2)-> c.equals(c2)
    ok and (!andback or other.candidatesEquals(this, false))

  low: ()->
    throw "UnionType#low is not defined yet, sorry!"

  resolveProxies: (system)->
    $u.each @candidates, (c)-> c.resolveProxies(system)

  toString: ()->
    $u.map(@candidates, (c)-> c.toString()).join('|')

module.exports = UnionType
