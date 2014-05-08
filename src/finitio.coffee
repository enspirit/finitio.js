$u          = require './support/utils'
TypeFactory = require './support/factory'
Parser      = require './syntax/parser'

## base module
class Finitio

  @VERSION: "0.0.1"

  ## DSL

  @FACTORY: new TypeFactory

  for method in TypeFactory.PUBLIC_DSL_METHODS
    Finitio[method] = @FACTORY[method].bind(@FACTORY)

  ## Parsing

  @parse = (source, options) ->
    Parser.parse(source, options || {})

  ## Systems

  @system = (identifier) ->
    path = Path.join __dirname, "#{identifier}.fio"
    if fs.existsSync(path)
      content = fs.readFileSync(path).toString()
      @parse(content)
    else
      throw new Error("Unknown system #{identifier}")

  @DEFAULT_SYSTEM = require("./Finitio/default")

##
$u.extend Finitio, require './errors'
$u.extend Finitio, require './support/contracts'
##
Finitio.System = require './system'
##
Finitio.AliasType    = require './type/alias_type'
Finitio.AdType       = require './type/ad_type'
Finitio.AnyType      = require './type/any_type'
Finitio.BuiltinType  = require './type/builtin_type'
Finitio.RelationType = require './type/relation_type'
Finitio.SeqType      = require './type/seq_type'
Finitio.SetType      = require './type/set_type'
Finitio.StructType   = require './type/struct_type'
Finitio.SubType      = require './type/sub_type'
Finitio.TupleType    = require './type/tuple_type'
Finitio.UnionType    = require './type/union_type'
##
module.exports = Finitio
