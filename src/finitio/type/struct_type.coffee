Type            = require '../type'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
$u              = require '../support/utils'

class StructType extends Type
  generator: 'struct'

  constructor: (@componentTypes, @name) ->
    super(@name)

    unless $u.isArray(@componentTypes)
      $u.argumentError("[Finitio::Type] expected, got:", @componentTypes)

    wrongType = $u.find(@componentTypes, (t) -> !(t instanceof Type))
    if wrongType?
      $u.argumentError("[Finitio::Type] expected, got:", wrongType)

  defaultName: ->
    componentNames = $u.map(@componentTypes, (t) -> t.name)
    "<" + componentNames.join(', ') + ">"

  size: ->
    $u.size(@componentTypes)

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
    [cs, vs] = [@size(), $u.size(value)]
    helper.fail("Struct size mismatch (#{vs} for #{cs})") unless cs == vs

    # dress components
    array = []
    helper.iterate value, (elm, index) =>
      array.push(@componentTypes[index].dress(elm, helper))
    array

  undress: (value, as) ->
    unless as instanceof StructType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

    unless as.size() == @size()
      $u.undressError("Unable to undress `#{value}` to `#{as}`")

    from = @componentTypes
    to   = as.componentTypes
    $u.map value, (v, i)->
      from[i].undress(v, to[i])

  isSuperTypeOf: (other) ->
    (this is other) or
    (other instanceof StructType and
    $u.size(@componentTypes) == $u.size(other.componentTypes) and
    $u.every $u.zip(@componentTypes, other.componentTypes), (cs)->
      cs[0].isSuperTypeOf(cs[1]))

  equals: (other) ->
    (this is other) or
    (other instanceof StructType and @headingEquals(other)) or
    super

  headingEquals: (other)->
    $u.size(@componentTypes) == $u.size(other.componentTypes) and
    $u.every(@componentTypes, (t, i) -> other.componentTypes[i].equals(t))

module.exports = StructType