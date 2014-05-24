$u = require('./support/utils')

#
class FinitioError extends Error

  constructor: (@message, @cause) ->
    super(@message)

#
class TypeError extends FinitioError

  constructor: (info) ->
    $u.extend(this, info)
    super(@getMessage(), @getCause())

  getMessage: ()->
    msg = @error
    if msg instanceof Array
      [msg, data] = msg
      msg.replace /\$(\d+)/g, (match)->
        $u.toString(data[parseInt(match[1])-1])
    else
      msg

  getCause: ()->
    cause = @causes && @causes[@causes.length - 1]
    cause = new TypeError(cause) if cause
    cause

  getRootCause: ()->
    current = this
    while current.cause
      current = current.cause
    current

module.exports =
  Error: Error
  TypeError: TypeError
