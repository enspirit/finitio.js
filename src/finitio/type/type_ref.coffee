{TypeType} = require '../support/ic'
$u         = require '../support/utils'
Type       = require '../type'

class TypeRef extends Type
  TypeType this, 'ref', ['typeName', 'metadata']

  constructor: (@typeName, @metadata, @target) ->
    unless @typeName
      $u.argumentError("Proxied ref cannot be null on TypeRef")
    super(@metadata)

  fetch: ()->
    r = @resolved()
    r.fetch.apply(r, arguments)

  _include: (value, world) ->
    @resolved().include(value, world)

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

  low: ()->
    @resolved().low()

  resolve: (system)->
    @target ?= system.resolve(@typeName).fetchType()

  resolveProxies: (system)->
    @resolve(system)

  resolved: ()->
    unless @target
      throw new Error("Proxy is not resolved")
    @target

  toString: ()->
    @typeName

#
module.exports = TypeRef
