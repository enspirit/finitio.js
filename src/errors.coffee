#
class FinitioError extends Error

  constructor: (@message, @cause) ->
    super(@message)

#
class TypeError extends FinitioError
  constructor: (@message, @cause, @location) ->
    super(@message, @cause)
    @location ?= ""

module.exports =
  Error: Error
  TypeError: TypeError
