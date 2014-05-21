Type        = require '../type'
DressHelper = require '../support/dress_helper'
$u          = require '../support/utils'

class ProxyType extends Type

  constructor: (@targetPath, @target, @name, @metadata) ->
    unless @targetPath
      $u.argumentError("Proxied name cannot be null on ProxyType")
    super(@name || @target && @target.name, @metadata)

  fetch: ()->
    r = @resolved()
    r.fetch.apply(r, arguments)

  defaultName: ->
    (@target and @target.defaultName()) or @targetPath
  
  include: (value)->
    @resolved().include(value)

  dress: (value, helper)->
    @resolved().dress(value, helper)
  
  undress: (value, as)->
    @resolved().undress(value, as)

  isSuperTypeOf: (child)->
    @resolved().isSuperTypeOf(child)

  _isSubTypeOf: (sup)->
    @resolved()._isSubTypeOf(sup)

  # private API

  isFake: ()->
    true

  trueOne: ()->
    @resolved()

  resolve: (system)->
    @target ?= system.fetchPath(@targetPath)

  resolved: ()->
    unless @target
      throw new Error("Proxy is not resolved")
    @target

#
module.exports = ProxyType
