Type    = require '../type'
Handler = require '../support/from_q_helper'

class BuiltinType extends Type

  constructor: (@jsType, @name) ->
    super(@name)

  from_q: (value, handler) ->
    throw new Errors.NotImplementedError(this, "from_q")

module.exports = BuiltinType