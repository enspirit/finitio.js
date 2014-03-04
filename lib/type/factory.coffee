Type                  = require '../type'
_                     = require 'underscore'

## Types
BuiltinType    = require '../type/builtin_type'
SeqType        = require '../type/seq_type'
SubType        = require '../type/sub_type'
TupleType      = require '../type/tuple_type'
UnionType      = require '../type/union_type'

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
      new BuiltinType(t, name || t.constructor.name)

    else if isRegexp(t)
      @subtype(String, t)

    else if typeof(t) == "object"
      #@tuple(t, name)
      fail("Not Implemented")

    else
      fail("Unable to factor a Qjs.Type from `#{t}`")

  ########################################################### Type Arguments

  jsType: (t) ->
    unless isNativeType(t)
      fail("JS primitive expected, got `#{t}`")
    t

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

  ########################################################## Type generators

  builtin: (primitive, _name) ->
    _name ?= null
    primitive = @jsType(primitive)
    _name = @name(_name)
    new BuiltinType(primitive, _name)

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

fail = (msg) ->
  throw new ArgumentError(msg)

#
module.exports = TypeFactory