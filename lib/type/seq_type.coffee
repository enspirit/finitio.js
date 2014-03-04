_               = require 'underscore'
Type            = require '../type'
CollectionType  = require '../support/collection_type'
DressHelper     = require '../support/dress_helper'
{ArgumentError} = require '../errors'

class SeqType extends CollectionType

  include: (value) ->
    value instanceof Array and _.every(value, (v) => @elmType.include(v))

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

  defaultName: ->
    "[#{@elmType.name}]"

#
module.exports = SeqType