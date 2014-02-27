Type           = require '../type'
DressHelper    = require '../support/dress_helper'
CollectionType = require './collection_type'

class SeqType extends CollectionType

  dress: (value, helper) ->
    throw new Errors.NotImplementedError(this, "dress")

module.exports = SeqType