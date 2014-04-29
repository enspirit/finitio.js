Type            = require '../type'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'
$u              = require '../support/utils'

class StructType extends Type

  constructor: (@componentTypes, @name) ->
    super(@name)

    unless $u.isArray(@componentTypes)
      throw new ArgumentError("[Finitio::Type] expected, got", @componentTypes)

    wrongType = $u.find(@componentTypes, (t) -> !(t instanceof Type))
    if wrongType?
      throw new ArgumentError("[Finitio::Type] expected, got", wrongType)

  defaultName: ->
    componentNames = $u.map(@componentTypes, (t) -> t.name)
    "<" + componentNames.join(', ') + ">"

  include: (value) ->
    $u.isArray(value) &&
      $u.size(value) == $u.size(@componentTypes) &&
      $u.every(
        $u.zip(value, @componentTypes),
        (valueAndKey) ->
          [value, type] = valueAndKey
          type.include(value)
      )

  dress: (value, helper) ->
    helper ?= new DressHelper

    helper.failed(this, value) unless value instanceof Array

    # check the size
    [cs, vs] = [$u.size(@componentTypes), $u.size(value)]
    helper.fail("Struct size mismatch (#{vs} for #{cs})") unless cs == vs

    # dress components
    array = []
    helper.iterate value, (elm, index) =>
      array.push(@componentTypes[index].dress(elm, helper))
    array

  isSuperTypeOf: (other) ->
    (this is other) or
    (other instanceof StructType and
    $u.size(@componentTypes) == $u.size(other.componentTypes) and
    $u.every $u.zip(@componentTypes, other.componentTypes), (cs)->
      cs[0].isSuperTypeOf(cs[1]))

  equals: (other) ->
    (this is other) or
    (other instanceof StructType and @headingEquals(other))

  headingEquals: (other)->
    $u.size(@componentTypes) == $u.size(other.componentTypes) and
    $u.every(@componentTypes, (t, i) -> other.componentTypes[i].equals(t))

module.exports = StructType