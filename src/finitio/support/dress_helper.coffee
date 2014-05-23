TypeError = require('../errors').TypeError
$u = require './utils'

class DressHelper

  constructor: ->
    @stack = []
    @error = null

  iterate: (value, callback) ->
    $u.each value, (elm, index) =>
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
      @error = err
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
    cause ?= @error || null
    msg = @defaultErrorMessage(type, value)
    $u.dressError(msg, cause, @location())

  fail: (msg, cause) ->
    cause ?= null
    $u.dressError(msg, cause, @location())

  defaultErrorMessage: (type, value) ->
    [ value_s, type_s ] = [ _valueToString(value), _typeToString(type) ]
    "Invalid value `#{value_s}` for #{type_s}"

  location: ->
    @stack.join('/')


# Private methods

_valueToString = (value) ->
  return 'undefined' if value == undefined
  return 'null'      if value == null
  s = value.toString()
  if s == "[object Object]"
    s = JSON.stringify(value)
  if s.length>30
    s = "#{s.substring(0, 30)}..."
  if value instanceof Array
    s = "[#{s}]"
  s

_typeToString = (type) ->
  type.name.toString()

module.exports = DressHelper
