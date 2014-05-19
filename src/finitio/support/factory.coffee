Type           = require '../type'

## Support
Attribute      = require './attribute'
Heading        = require './heading'
Constraint     = require './constraint'
$u             = require './utils'

## Types
AliasType      = require '../type/alias_type'
AnyType        = require '../type/any_type'
AdType         = require '../type/ad_type'
SeqType        = require '../type/seq_type'
SetType        = require '../type/set_type'
StructType     = require '../type/struct_type'
SubType        = require '../type/sub_type'
TupleType      = require '../type/tuple_type'
UnionType      = require '../type/union_type'
BuiltinType    = require '../type/builtin_type'
RelationType   = require '../type/relation_type'

# Typefactory
class TypeFactory

  @PUBLIC_DSL_METHODS: [
    'jsType',
    'alias',
    'any',
    'builtin',
    'adt',
    'sub_type',
    'union',
    'seq',
    'set',
    'tuple',
    'relation',
    'type'
  ]

  constructor: (world)->
    @world = {
      'Number':  Number,
      'String':  String,
      'Boolean': Boolean,
      'Date':    Date
    }
    $u.extend(@world, world)

  ################################################################## Factory

  type: (t, name, callback) ->
    unless callback?
      if typeof name == "function"
        [callback, name] = [name, callback]

    if callback?
      return @sub_type(@type(t, name), callback)

    if t instanceof Type
      t

    else if isNativeType(t)
      new BuiltinType(t, name || t.constructor.name)

    else if isRegexp(t)
      @sub_type(String, t)

    else if t instanceof Array
      fail("Array of arity 1 expected, got", t) unless t.length == 1
      @seq(t[0], name)

    else if typeof(t) == "object"
      @tuple(t, name)

    else
      fail("Unable to factor a Finitio.Type from `#{t}`")

  ########################################################### Type Arguments

  jsType: (t) ->
    if typeof(t) == 'string'
      parts = t.split('.')
      $u.inject parts, @world, (memo, part)->
        memo[part] || throw new Error("Unknown type #{t} (#{part} not found)")

    else if isNativeType(t) || t instanceof Function
      t

    else
      fail("JS primitive expected, got `#{t}`")

  name: (name) ->
    unless not(name?) or \
        ((name.constructor == String) and name.trim().length > 1)
      fail("Wrong type name `#{name}`")

    if name?
      name.trim()
    else
      null

  constraint: (_name, _native) ->
    return _name if _name instanceof Constraint

    if typeof(_name) isnt "string"
      [_name, _native] = ['default', _name]

    new Constraint(_name, _native)

  constraints: (constraints, callback) ->
    constrs = []
    if callback?
      constrs.push @constraint('default', callback)

    if constraints?
      if constraints.constructor == Array
        $u.each constraints, (c) =>
          constrs.push(@constraint(c))
      else if constraints.constructor == RegExp
        constrs.push @constraint(constraints)
      else if typeof(constraints) is "object"
        $u.each constraints, (c, n) =>
          constrs.push(@constraint(n, c))
      else
        constrs.push @constraint(constraints)

    constrs

  attribute: (name, type, required) ->
    new Attribute(name, @type(type), required)

  attributes: (attributes) ->
    unless typeof attributes is "object"
      fail("Hash expected, got ", attributes)

    attr = []
    $u.each attributes, (type, name) =>
      attr.push @attribute(name, type)

    attr

  heading: (heading, opts) ->
    return heading if heading instanceof Heading
    return heading.heading if heading.heading?

    if heading.constructor == Array
      new Heading(heading, opts)
    else if typeof(heading) is "object"
      new Heading(@attributes(heading), opts)
    else
      fail("Heading expected, got", heading)

  contracts: (contracts) ->
    unless typeof contracts is "object"
      fail("Hash expected, got", contracts)

    invalid = $u.filter($u.keys(contracts), (k) -> k instanceof String)

    if invalid.length > 0
      fail("Invalid contract names `#{invalid}`")

    contracts

  ########################################################## Type generators

  alias: (type, name) ->
    name = @name(name)
    type = @type(type)

    if type.anonymous
      type.setName(name)
      type
    else
      new AliasType(type, name)

  any: (name) ->
    name     ?= null
    name      = @name(name)
    new AnyType(name)

  builtin: (primitive, _name) ->
    _name    ?= null
    primitive = @jsType(primitive)
    _name     = @name(_name)
    new BuiltinType(primitive, _name)

  adt: (primitive, _contracts, _name) ->
    _name    ?= null
    primitive = @jsType(primitive) if primitive?
    contracts = @contracts(_contracts)
    _name     = @name(_name)

    new AdType(primitive, _contracts, _name)


  #### Sub and union

  sub_type: (superType, _constraints, _name, callback) ->
    unless callback?
      if typeof _name == "function"
        [callback, _name] = [_name, callback]

    unless callback?
      if typeof _constraints == "function"
        [callback, _constraints] = [_constraints, callback]

    superType    = @type(superType)
    _constraints = @constraints(_constraints, callback)
    _name        = @name(_name)

    new SubType(superType, _constraints, _name)

  union: (args...) ->
    [candidates, _name] = [[], null]

    $u.each args, (arg) =>
      if arg.constructor == Array
        candidates = $u.map arg, (t) => @type(t)

      else if arg.constructor == String
        _name = @name(_name)

      else
        candidates.push(arg)

    new UnionType(candidates, _name)

  #### Collections

  seq: (elmType, name) ->
    elmType = @type(elmType)
    name    = @name(name)

    new SeqType(elmType, name)

  set: (elmType, name) ->
    elmType = @type(elmType)
    name    = @name(name)

    new SetType(elmType, name)

  struct: (componentTypes, name) ->
    componentTypes = $u.map(componentTypes, (t) => @type(t))
    name           = @name(name)

    new StructType(componentTypes, name)

 #### Tuples and relations

  tuple: (heading, name) ->
    heading = @heading(heading)
    name    = @name(name)

    new TupleType(heading, name)

  relation: (heading, name) ->
    heading = @heading(heading)
    name    = @name(name)

    new RelationType(heading, name)

# 'private' Utility functions
# (only in the scope of this module)

isNativeType = (t) ->
  return false unless t?
  match = $u.find [Number, Boolean, String], (primitive) ->
    t == primitive

  match?

isRegexp = (t) ->
  return false unless t?
  t.constructor == RegExp

fail = (msg, type) ->
  if type?
    throw new Error(msg, type)
  else
    throw new Error(msg)

#
module.exports = TypeFactory
