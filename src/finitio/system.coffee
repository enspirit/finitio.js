Fetchable   = require './support/fetchable'
$u          = require './support/utils'
Type        = require './type'
TypeFactory = require './support/factory'
Compiler    = require './compiler'

#
# A System is a collection of named Finitio types.
#
class System

  @REF_RGX = /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/

  constructor: (@imports, @uses, @types, @main) ->
    @imports ?= []
    @uses    ?= {}
    @types   ?= {}
    @main    ?= null

    # install all types directly
    $u.extend(this, @types)

  Fetchable this, "types", "type"

  setMain: (main)->
    if @main?
      throw new Error("Main type already set")
    @main = main
    @types['Main'] = main

  addType: (type) ->
    unless type instanceof Type
      $u.argumentError("Finitio.Type expected, got:", type)

    if @types[type.name]?
      $u.argumentError("Duplicate type `#{type.name}`")

    this[type.name] = @types[type.name] = type

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
    unless @main
      throw new Error("No main on System")
    @main.dress(value)

  clone: ->
    new System($u.clone(@imports), $u.clone(@uses), $u.clone(@types), @main)

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
