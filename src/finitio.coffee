class Finitio

  @VERSION: "0.0.1"

  @Types = {
    'Finitio':  Finitio
    'Number':   Number
    'String':   String
    'Boolean':  Boolean
    'Date':     Date
    'Function': Function
    'RegExp':   RegExp
  }

  @World = {
    'Finitio': this
    'JsTypes': @Types
    'importResolver': require('./finitio/resolver')
  }

  @compiler = (world)->
    world ?= Finitio.World
    new this.Compiler(world)

  @compile = (source, world) ->
    @compiler(world).compile(source)

  @parse = (source, world) ->
    @compiler(world).compile(source)

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
Finitio.Compiler     = require './finitio/compiler'
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
Finitio.Meta         = require './finitio/systems/meta'
##
module.exports = Finitio
