class Finitio

  @VERSION: require('../package.json').version

  @CONFORMANCE: "0.4"

  @World = {
    'Finitio': this
    'JsTypes': {
      'Finitio':  Finitio
      'Number':   Number
      'String':   String
      'Boolean':  Boolean
      'Date':     Date
      'Function': Function
      'RegExp':   RegExp
    }
    'importResolver': require('./finitio/resolver')
  }

  @world = ()->
    $u = require('./finitio/support/utils')
    world = $u.extend({}, Finitio.World, { sourceUrl: '/' })
    for arg in arguments
      $u.extend(world, arg) if arg
    world

  @parse = (source, options) ->
    @Parser.parse(source, options || {})

  @system = (source, world)->
    source = @parse(source) if typeof(source)=='string'
    @Meta.System.dress(source, @world(world))

  @bundleFile = (path, world) ->
    (new @Bundler(@world(world))).addFile(path).flush()

  @bundleSource = (source, world) ->
    (new @Bundler(@world(world))).addSource(source).flush()

##
Finitio.TypeError    = require('./finitio/errors').TypeError
Finitio.Utils        = require './finitio/support/utils'
Finitio.Contracts    = require './finitio/contracts'
##
Finitio.Attribute    = require './finitio/support/attribute'
Finitio.Contract     = require './finitio/support/contract'
Finitio.Heading      = require './finitio/support/heading'
Finitio.Constraint   = require './finitio/support/constraint'
##
Finitio.System       = require './finitio/system'
Finitio.Parser       = require './finitio/parser'
Finitio.Bundler      = require './finitio/bundler'
##
Finitio.Type         = require './finitio/type'
Finitio.TypeDef      = require './finitio/type/type_def'
Finitio.TypeRef      = require './finitio/type/type_ref'
##
Finitio.AdType       = require './finitio/type/ad_type'
Finitio.AnyType      = require './finitio/type/any_type'
Finitio.BuiltinType  = require './finitio/type/builtin_type'
Finitio.RelationType = require './finitio/type/relation_type'
Finitio.SeqType      = require './finitio/type/seq_type'
Finitio.SetType      = require './finitio/type/set_type'
Finitio.StructType   = require './finitio/type/struct_type'
Finitio.SubType      = require './finitio/type/sub_type'
Finitio.TupleType    = require './finitio/type/tuple_type'
Finitio.UnionType    = require './finitio/type/union_type'
##
Finitio.Meta         = require './finitio/support/meta'
##
module.exports = Finitio
