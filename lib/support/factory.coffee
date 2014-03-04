Type                  = require '../type'
_                     = require 'underscore'

## Support
Attribute      = require './attribute'
Heading        = require './heading'

## Types
BuiltinType    = require '../type/builtin_type'
SeqType        = require '../type/seq_type'
SetType        = require '../type/set_type'
SubType        = require '../type/sub_type'
TupleType      = require '../type/tuple_type'
UnionType      = require '../type/union_type'
RelationType   = require '../type/relation_type'

## Errors
{
  NotImplementedError,
  ArgumentError
} = require '../errors'

# Typefactory
class TypeFactory

  ################################################################## Factory

  type: (t, name, callback) ->
    unless callback?
      if typeof name == "function"
        [callback, name] = [name, callback]

    if callback?
      return @subtype(@type(t, name), callback)

    if t instanceof Type
      t

    else if isNativeType(t)
      new BuiltinType(t, name || t.constructor.name)

    else if isRegexp(t)
      @subtype(String, t)

    else if t instanceof Array
      fail("Array of arity 1 expected, got", t) unless t.length == 1
      @seq(t[0], name)

    else if typeof(t) == "object"
      @tuple(t, name)
      
    else
      fail("Unable to factor a Qjs.Type from `#{t}`")

  ########################################################### Type Arguments

  jsType: (t) ->
    if t == 'Number'
      Number
    else if t == 'String'
      String
    else if t == 'Boolean'
      Boolean
    else if isNativeType(t)
      t
    else
      fail("JS primitive expected, got `#{t}`")

  name: (name) ->
    unless not(name?) or ((name.constructor == String) and name.trim().length > 1)
      fail("Wrong type name `#{name}`")

    if name?
      name.trim()
    else
      null

  constraints: (constraints, callback) ->
    constrs = {}
    if callback?
      constrs['predicate'] = callback 

    # Unfortunately, _.isObject(RegExp) == true in JS
    if constraints? and constraints.constructor == RegExp
      constrs['predicate'] = constraints

    else if constraints?
      constrs['predicate'] = constraints unless _.isObject(constraints)

    _.extend(constrs, constraints) if _.isObject(constraints)
    constrs

  attribute: (name, type) ->
    new Attribute(name, @type(type))
  
  attributes: (attributes) ->
    unless typeof attributes is "object"
      fail("Hash expected, got ", attributes)
  
    attr = []
    _.each attributes, (type, name) =>
      attr.push @attribute(name, type)

    attr
    
  heading: (heading) ->
    return heading if heading instanceof Heading
    return heading.heading if heading.heading?
    
    if typeof(heading) is "object"
      new Heading(@attributes(heading))
    else
      fail("Heading expected, got", heading)

  contracts: (contracts) ->
    unless typeof contracts is "object"
      fail("Hash expected, got", contracts)
    
    invalid = _.keys contracts, (k) -> k instanceof String
    if invalid.length > 0
      fail("Invalid contract names `#{invalid}`")

    contracts

  ########################################################## Type generators

  builtin: (primitive, _name) ->
    _name ?= null
    primitive = @jsType(primitive)
    _name = @name(_name)
    new BuiltinType(primitive, _name)

  adt: (primitive, contracts, name) ->
    throw new NotImplementedError("Factory#adt")

  #### Sub and union

  subtype: (superType, _constraints, _name, callback) ->
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
    
    _.each args, (arg) ->
      if arg.constructor == Array
        candidates = _.map arg, (t) -> @type(t)
      
      if arg.constructor == String
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
  match = _.find [Number, Boolean, String], (primitive) ->
    t == primitive

  match?

isRegexp = (t) ->
  return false unless t?
  t.constructor == RegExp

fail = (msg, type) ->
  if type?
    throw new ArgumentError(msg, type)
  else
    throw new ArgumentError(msg)

#
module.exports = TypeFactory