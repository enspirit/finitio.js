#
class FinitioError extends Error

  constructor: (@message, @cause) ->
    super(@message)

#
class KeyError extends FinitioError
  constructor: (@message) ->
    super(@message)

#
class ArgumentError extends FinitioError

  constructor: (@message, @arg) ->

    if arguments.length == 2

      clazz =
        if typeof @arg == "undefined"
          "undefined"
        else if @arg == null
          "null"
        else
          @arg.constructor.name

      @message += " " + clazz

    super(@message)

#
class TypeError extends FinitioError
  constructor: (@message, @cause, @location) ->
    super(@message, @cause)
    @location ?= ""

#
class NotImplementedError extends FinitioError

  constructor: (clazz, method) ->
    super "Missing #{clazz.constructor.name}##{method}"

module.exports =
  Error: Error
  ArgumentError: ArgumentError
  NotImplementedError: NotImplementedError
  TypeError: TypeError
  KeyError: KeyError
