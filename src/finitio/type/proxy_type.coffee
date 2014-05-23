Type        = require '../type'
$u          = require '../support/utils'

class ProxyType extends Type

  constructor: (@targetRef, @target, @name, @metadata) ->
    unless @targetRef
      $u.argumentError("Proxied name cannot be null on ProxyType")
    super(@name || @target && @target.name, @metadata)

  fetch: ()->
    r = @resolved()
    r.fetch.apply(r, arguments)

  defaultName: ->
    (@target and @target.defaultName()) or @targetRef
  
  _include: (value)->
    @resolved().include(value)

  _dress: (value, helper)->
    @resolved().dress(value, helper)
  
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
module.exports = ProxyType
