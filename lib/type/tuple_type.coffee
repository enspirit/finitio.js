Type           = require '../type'
Handler        = require '../support/from_q_helper'

class TupleType extends Type
  
  constructor: ->
    throw new Errors.NotImplementedError(this, "constructor")

  from_q: (value, handler) ->
    throw new Errors.NotImplementedError(this, "from_q")

module.exports = TupleType