Qjs          = require '../../lib/qjs'
should       = require 'should'
TestSystem   = require '../support/test_system'

# Global variables for steps below
result = null
system = TestSystem
type   = null

module.exports = ->

  this.Given /^the System is$/, (source, callback) ->
    system = TestSystem.parse(source)

    callback()

  @Given /^the type under test is (.*?)$/, (typeName, callback) ->
    type = system.fetch(typeName)

    callback()

  @Given /^I dress JSON's '(.*?)'$/, (jsonValue, callback) ->
    try
      json = JSON.parse(jsonValue)
      result = type.dress(json)
    catch e
      result = e

    callback()

  this.Given /^I dress the following JSON document:$/, (doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.dress(json)
    catch e
      result = e

    callback()

  this.Given /^I dress the following JSON document with (.*?):$/, (type, doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.fetch(type).dress(json)
    catch e
      result = e

    callback()

  this.Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) ->
    type = system.fetch(type)

    try
      json = JSON.parse(json)
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
      callback.fail new Error("#{JSON.stringify(result)} is not a representation for #{type}")
    callback()

  this.Then /^it should be a TypeError as:$/, (table, callback) ->
    unless result instanceof Qjs.TypeError
      callback.fail new Error("#{result} is not a TypeError")

    for k, v of table.hashes()[0]
      unless result[k] == v
        callback.fail new Error("TypeError##{k}: `#{result[k]}` expected, got `#{v}`")

    callback()

  @Then /^the result should be the integer (\d+)$/, (expected, callback) ->
    unless result == parseInt(expected)
      callback.fail new Error("#{result} <> #{expected}")
    callback()

  @Then /^the result should be the Boolean true$/, (callback) ->
    unless result == true
      callback.fail new Error("#{result} <> true")
    callback()

  @Then /^the result should be the Boolean false$/, (callback) ->
    unless result == false
      callback.fail new Error("#{result} <> false")
    callback()

  @Then /^the result should be the real (\d+\.\d+)$/, (expected, callback) ->
    unless result == parseFloat(expected)
      callback.fail new Error("#{result} <> #{expected}")
    callback()

  @Then /^the result should be the string '(.*)'$/, (expected, callback) ->
    unless result == expected
      callback.fail new Error("#{result} <> #{expected}")
    callback()
