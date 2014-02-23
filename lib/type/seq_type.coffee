Type           = require '../type'
Handler        = require '../support/from_q_helper'
CollectionType = require './collection_type'

class SeqType extends CollectionType

  from_q: (value, handler) ->
    throw new Errors.NotImplementedError(this, "from_q")

module.exports = SeqType