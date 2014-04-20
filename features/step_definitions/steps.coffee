Finitio     = require '../../lib/finitio'
should      = require 'should'

# Global variables for steps below
TestSystem  = null
result      = null
system      = null
type        = null

module.exports = ->

  @Before (callback)->
    TestSystem ?= require '../support/test_system'
    system = TestSystem
    callback()

  @Given /^the System is$/, (source, callback) ->
    try
      system = TestSystem.parse(source)
    catch e
      callback.fail(e)

    callback()

  @Given /^the type under test is (.*?)$/, (typeName, callback) ->
    type = system.fetch(typeName)

    callback()

  # Dressing

  @Given /^I dress JSON's '(.*?)'$/, (jsonValue, callback) ->
    try
      json = JSON.parse(jsonValue)
      result = type.dress(json)
    catch e
      result = e

    callback()

  @Given /^I dress JSON's '(.*?)' with (.*?)$/, (jsonValue, typename, callback) ->
    try
      json = JSON.parse(jsonValue)
      result = system.fetch(typename).dress(json)
    catch e
      result = e

    callback()

  @Given /^I dress the following JSON document:$/, (doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.dress(json)
    catch e
      result = e

    callback()

  @Given /^I dress the following JSON document with (.*?):$/, (type, doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.fetch(type).dress(json)
    catch e
      result = e

    callback()

  @Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) ->
    type = system.fetch(type)

    try
      json = JSON.parse(json)
      result = types.dress(json)
    catch e
      result = e

    callback()

  # Result

  @Then /^it should be a success$/, (callback) ->
    if result instanceof Error
      throw result
      callback.fail(Error)
    else
      callback()

  @Then /^the result should be a Tuple representation$/, (callback) ->
    unless result instanceof Object
      callback.fail new Error("#{result} is not an object")
    callback()

  @Then /^its '(.*)' attribute should be a Date representation$/, (attr, callback) ->
    unless result[attr] instanceof Date
      callback.fail new Error("attribute is not a Date, got #{result[attr]}")
    callback()

  @Then /^the result should be a representation for Nil$/, (callback) ->
    unless result == null
      callback.fail new Error("#{result} is not a representation for Nil")
    callback()

  @Then /^the result should be a representation for (.*?)$/, (type,callback) ->
    unless system.fetch(type).include(result)
      callback.fail new Error("#{JSON.stringify(result)} is not a representation for #{type}")
    callback()

  @Then /^it should be a TypeError as:$/, (table, callback) ->
    unless result instanceof Finitio.TypeError
      callback.fail result

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

  @Then /^the result should be the 13st of March 2014$/, (callback) ->
    expected = new Date("2014-03-13");
    unless (result instanceof Date) and (result.toISOString() == expected.toISOString())
      callback.fail new Error("#{result} <> 13st of March 2014")
    callback()

  @Then /^the result should be the 13st of March 2014 at 08:30$/, (callback) ->
    expected = new Date("2014-03-13T08:30:00");
    unless (result instanceof Date) and (result.toISOString() == expected.toISOString())
      callback.fail new Error("#{result} <> 13st of March 2014 at 08:30")
    callback()

  #### Parser

  @Given /^the grammar rule is expr$/, (callback) ->
    callback.pending()

  @Given /^the source is$/, (string, callback) ->
    callback.pending()

  @Then /^evaluating it should yield (\d+)$/, (arg1, callback) ->
    callback.pending()

  @Then /^evaluating it with x=(.*) should yield (.*)$/, (x, expected, callback) ->
    callback.pending()

  @Given /^the grammar rule is literal$/, (callback) ->
    callback.pending()

  @Then /^it should compile to a (.*)$/, (type, callback) ->
    callback.pending()

  @Given /^the System source is$/, (string, callback) ->
    callback.pending()

  @Then /^it should compile fine$/, (callback) ->
    callback.pending()
