TypeFactory = require './finitio/support/factory'

## base module
class Finitio

  @VERSION: "0.0.1"

  @compiler = (options)->
    options         ?= { }
    options.world   ?= { Finitio: this }
    options.factory ?= new this.TypeFactory(options.world)
    options.system  ?= new this.System()
    new this.Compiler(options)

  @compile = (source, options) ->
    @compiler(options).compile(source)

  @parse = (source, options) ->
    @compiler(options).compile(source)

##
Finitio.Utils = require './finitio/support/utils'
Finitio.Utils.extend Finitio, require './finitio/errors'
Finitio.Utils.extend Finitio, require './finitio/support/contracts'
##
Finitio.System       = require './finitio/system'
Finitio.Parser       = require './finitio/parser'
Finitio.Compiler     = require './finitio/compiler'
Finitio.TypeFactory  = require './finitio/support/factory'
##
Finitio.Type         = require './finitio/type'
Finitio.AliasType    = require './finitio/type/alias_type'
Finitio.ProxyType    = require './finitio/type/proxy_type'
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
module.exports = Finitio
