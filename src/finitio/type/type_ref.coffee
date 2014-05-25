Type        = require '../type'
$u          = require '../support/utils'

class TypeRef extends Type

  constructor: (@targetRef, @target, @metadata) ->
    unless @targetRef
      $u.argumentError("Proxied ref cannot be null on TypeRef")
    super(@metadata)

  fetch: ()->
    r = @resolved()
    r.fetch.apply(r, arguments)

  _include: (value)->
    @resolved().include(value)

  _mDress: (value, Monad)->
    @resolved().mDress(value, Monad)

  _undress: (value, as)->
    @resolved().undress(value, as)

  _isSuperTypeOf: (child)->
    @resolved().isSuperTypeOf(child)

  _isSubTypeOf: (sup)->
    @resolved()._isSubTypeOf(sup)

  _equals: (other)->
    @resolved().equals(other)

  # private API

  isFake: ()->
    true

  trueOne: ()->
    @resolved().trueOne()

  resolve: (system)->
    @target ?= system.resolve(@targetRef).fetchType().trueOne()

  resolved: ()->
    unless @target
      throw new Error("Proxy is not resolved")
    @target

#
module.exports = TypeRef
