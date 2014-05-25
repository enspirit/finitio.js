{ObjectType} = require './support/ic'
$u           = require './support/utils'
Fetchable    = require './support/fetchable'
Type         = require './type'
TypeFactory  = require './support/factory'
Compiler     = require './compiler'

#
# A System is a collection of named Finitio types.
#
class System
  ObjectType this, ['imports', 'uses', 'types']

  @REF_RGX = /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/

  constructor: (@imports, @uses, @types) ->
    @imports ?= []
    @uses    ?= {}
    @types   ?= []

    # install all types directly
    $u.each @types, (t)=> this[t.name] = t

  Fetchable this, "types", "type", (name)->
    $u.find @types, (t)-> t.name == name

  addType: (type) ->
    unless type instanceof Type
      $u.argumentError("Finitio.Type expected, got:", type)

    @types.push(type)
    if type.name
      if this[type.name]?
        $u.argumentError("Duplicate type `#{type.name}`")
      this[type.name] = type
    type

  import: (other) ->
    @imports.push(other)

  use: (other, as) ->
    @uses[as] = other

  resolve: (ref, callback) ->
    match = ref.match(System.REF_RGX)
    if match[1]
      @_resolveQualified(match, callback)
    else
      @_resolveImported([this].concat(@imports), ref, callback)

  parse: (source, options) ->
    options ?= {}
    options.system = @clone()
    (new Compiler(options)).compile(source)

  dress: (value) ->
    unless this.Main
      throw new Error("No main on System")
    this.Main.dress(value)

  clone: ->
    new System($u.clone(@imports), $u.clone(@uses), $u.clone(@types))

  # Private

  _resolveQualified: (match, callback)->
    callback ?= @_onResolveFailure(match[0])
    if sub = @uses[match[1]]
      @_resolveSingle sub, match[2], callback
    else
      @_onResolveFailure(match[0])()

  _resolveImported: (chain, ref, callback)->
    callback ?= @_onResolveFailure(ref)
    chain[0].fetchPath ref, ()=>
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
