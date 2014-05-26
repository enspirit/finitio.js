{ObjectType} = require './support/ic'
$u           = require './support/utils'
Fetchable    = require './support/fetchable'
Type         = require './type'

#
# A System is a collection of named Finitio types.
#
class System
  ObjectType this, ['imports', 'types'], (s)->
    $u.each s.types, (t)-> t.resolveProxies(s)

  @REF_RGX = /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/

  constructor: (@imports, @types) ->
    @imports ?= []
    @types   ?= []
    $u.each @types, (t)=> this[t.name] = t

  Fetchable this, "types", "type", (name)->
    $u.find @types, (t)-> t.name == name

  resolve: (ref, callback) ->
    match = ref.match(System.REF_RGX)
    if match[1]
      @_resolveQualified(match, callback)
    else
      relevant = $u.filter @imports, (i)-> !i.qualifier
      @_resolveImported([{system: this}].concat(relevant), ref, callback)

  dress: (value) ->
    unless this.Main
      throw new Error("No main on System")
    this.Main.dress(value)

  clone: ->
    new System($u.clone(@imports), $u.clone(@types))

  # Private

  _resolveQualified: (match, callback)->
    callback ?= @_onResolveFailure(match[0])
    imp = $u.find @imports, (u)-> u.qualifier is match[1]
    if sub = imp && imp.system
      @_resolveSingle sub, match[2], callback
    else
      @_onResolveFailure(match[0])()

  _resolveImported: (chain, ref, callback)->
    callback ?= @_onResolveFailure(ref)
    chain[0].system.fetchPath ref, ()=>
      if chain.length>1
        @_resolveImported(chain.slice(1), ref, callback)
      else
        callback()

  _resolveSingle: (system, ref, callback)->
    system.fetchPath ref, callback

  _onResolveFailure: (ref)->
    ()-> throw new Error("No such type `#{ref}`")

#
module.exports = System
