#
class QJSError extends Error
  
  constructor: (@message) ->
    @name = @constructor.name

#
class ArgumentError extends QJSError
  
  constructor: (msg, arg) ->
    
    if arguments.length == 2
      
      clazz =
        if typeof arg == "undefined"
          "undefined"
        else if arg == null
          "null"
        else 
          arg.constructor.name
      
      msg += " " + clazz
    
    super msg
#
class NotImplementedError extends QJSError
  
  constructor: (clazz, method) ->
    super "Missing #{clazz.constructor.name}##{method}"

module.exports =
  QSJError: QJSError
  ArgumentError: ArgumentError
  NotImplementedError: NotImplementedError