_               = require 'underscore'
Type            = require '../type'
TupleType       = require './tuple_type'
Heading         = require '../support/heading'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'

class RelationType extends Type

  constructor: (@heading, @name) ->
    unless @heading instanceof Heading
      throw new ArgumentError("Heading expected, got", @heading)
    
    @tupleType = new TupleType(heading)

    super(@name)

  defaultName: ->
    "{{#{@heading.toName()}}}"
  
  include: (value) ->
    return false unless typeof value == "object"
    for k, v of value
      tuple = {}
      tuple[k] = v
      return false unless @tupleType.include(tuple)
    return true

  # Apply the corresponding TupleType's `dress` to every element of `value`
  # (any enumerable). Return a Set of transformed tuples. Fail if anything
  # goes wrong transforming tuples or if duplicates are found.
  dress: (value, helper) ->
    helper ?= new DressHelper

    unless typeof(value) == "object" || typeof(value) == "array"
      helper.failed(this, value)

    # Up every tuple and keep results in a "Set"
    set = []
    helper.iterate value, (tuple, index) =>
      tuple = @tupleType.dress(tuple, helper)
      ## TODO: helper.fail("Duplicate tuple") if set[tuple]?
      set.push(tuple)

    # Return built tuples
    set
 
  equals: (other) ->
    return false unless other instanceof RelationType
    @heading.equals(other.heading)

#
module.exports = RelationType