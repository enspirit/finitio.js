Type            = require '../type'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
$u              = require '../support/utils'

class SeqType extends CollectionType
  generator: 'seq'

  include: (value) ->
    value instanceof Array and $u.every(value, (v) => @elmType.include(v))

  # Apply the element type's `dress` transformation to each element of
  # `value` (expected to respond to `each`). Return converted values in an
  # Array.
  dress: (value, helper) ->
    helper ?= new DressHelper

    helper.failed(this, value) unless value instanceof Array

    array = []
    helper.iterate value, (elm, index) =>
      array.push @elmType.dress(elm, helper)
    array

  undress: (value, as)->
    unless as instanceof SeqType
      $u.undressError("Unable to undress `#{value}` to `#{as}`")
    super

  defaultName: ->
    "[#{@elmType.name}]"

#
module.exports = SeqType
