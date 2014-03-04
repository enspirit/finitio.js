{TypeError} = require '../errors'
_           = require 'underscore'

class DressHelper

  constructor: ->
    @stack = []
  
  iterate: (value, callback) ->
    _.each value, (elm, index) =>
      @deeper index, ->
        callback(elm, index)

  deeper: (location, callback) ->
    _err = null
    try
      @stack.push(location.toString())
      res = callback()
    catch err
      _err = err
    finally
      @stack.pop()
      if _err == null
        res
      else
        throw _err

  justTry: (rescueOn, callback) ->
    unless callback?
      [callback, rescueOn] = [rescueOn, callback]

    rescueOn = TypeError unless rescueOn?

    try
      return [true, callback()]
    catch err
      if err instanceof rescueOn
        return [false, null] 
      else
        throw err

  try: (type, value, callback) ->
    try
      callback()
    catch err
      if err instanceof TypeError
        @failed(type, value, err)
      else
        throw err

  failed: (type, value, cause) ->
    cause ?= null
    msg = @defaultErrorMessage(type, value)
    throw new TypeError(msg, cause, @location())
  
  fail: (msg, cause) ->
    cause ?= null 
    throw new TypeError(msg, cause, @location())
  
  defaultErrorMessage: (type, value) ->
    [ value_s, type_s ] = [ _valueToString(value), _typeToString(type) ]
    "Invalid value `#{value_s}` for #{type_s}"

  location: ->
    @stack.join('/')
  

# "private methods" 
# (= utility functions only visible in the scope of this module)

_valueToString = (value) ->
  return 'null' if value == null
  s = value.toString()
  s = "#{s.substring(0, 25)}..." if s.length>25
  s = "[#{s}]" if value instanceof Array
  s

_typeToString = (type) ->
  type.name.toString()

module.exports = DressHelper