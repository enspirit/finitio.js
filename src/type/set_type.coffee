Type            = require '../type'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
{ArgumentError,
TypeError}      = require '../errors'
$u              = require '../support/utils'

class SetType extends CollectionType
  generator: 'set'

  include: (value) ->
    return false unless value instanceof Array
    return false unless $u.every(value, (v) => @elmType.include(v))
    $u.uniq(value).length == value.length

  # Apply the element type's `dress` transformation to each element of
  # `value` (expected to respond to `each`). Return converted values in an
  # Array.
  dress: (value, helper) ->
    helper ?= new DressHelper

    helper.failed(this, value) unless value instanceof Array

    array = []
    helper.iterate value, (elm, index) =>
      dressed = @elmType.dress(elm, helper)
      if $u.include(array, dressed)
        helper.fail("Duplicate value `#{dressed}`")
      else
        array.push dressed
    array

  undress: (value, as)->
    unless as instanceof CollectionType
      throw new TypeError("Unable to undress `#{value}` to `#{as}`")
    super

  defaultName: ->
    "{#{@elmType.name}}"

#
module.exports = SetType
