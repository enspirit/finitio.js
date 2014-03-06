Qjs          = require '../../lib/qjs'
should       = require 'should'
TestSystem   = require '../support/test_system'

# Global variables for steps below
result = null
system = null

module.exports = ->

  this.Given /^the System is$/, (source, callback) ->
    system ?= TestSystem.parse(source)

    callback()

  this.Given /^I dress the following JSON document:$/, (doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.dress(json)
    catch e
      result = e

    callback()

  this.Given /^I dress the following JSON document with (.*?):$/, (type, doc, callback) ->
    json = JSON.parse(doc)

    try
      result = system.fetch(type).dress(json)
    catch e
      result = e

    callback()

  this.Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) ->
    type = system.fetch(type)
    json = JSON.parse(json)

    try
      result = types.dress(json)
    catch e
      result = e

    callback()

  this.Then /^it should be a success$/, (callback) ->
    if result instanceof Error
      throw result
      callback.fail(Error)
    else
      callback()

  this.Then /^the result should be a Tuple representation$/, (callback) ->
    unless result instanceof Object
      callback.fail new Error("#{result} is not an object")
    callback()

  this.Then /^its '(.*)' attribute should be a Date representation$/, (attr, callback) ->
    unless result[attr] instanceof Date
      callback.fail new Error("attribute is not a Date")
    callback()

  this.Then /^the result should be a representation for Nil$/, (callback) ->
    unless result == null
      callback.fail new Error("#{result} is not a representation for Nil")
    callback()

  this.Then /^the result should be a representation for (.*?)$/, (type,callback) ->
    unless system.fetch(type).include(result)
      callback.fail new Error("#{result} is not a representation for #{type}")
    callback()

  this.Then /^it should be a TypeError as:$/, (table, callback) ->
    unless result instanceof Qjs.TypeError
      throw result
      callback.fail new Error("#{result} is not a TypeError")
    callback()

  this.Then /^the result should equal (\d+)$/, (expected, callback) ->
    callback.pending()
