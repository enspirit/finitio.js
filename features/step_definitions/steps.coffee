Qjs          = require '../../lib/qjs'
should       = require 'should'
TestSystem   = require '../support/test_system'

module.exports = ->

  this.Given /^the System is$/, (source, callback) =>
    @system ?= TestSystem.parse(source)

    callback()

  this.Given /^I dress the following JSON document:$/, (doc, callback) =>
    json = JSON.parse(doc)

    try
      @result = @system.dress(json)
    catch e
      @result = e

    callback()

  this.Given /^I dress the following JSON document with (.*?):$/, (type, doc, callback) =>
    json = JSON.parse(doc)

    try
      @result = @system.fetch(type).dress(json)
    catch e
      @result = e

    callback()

  this.Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) =>
    type = @system.fetch(type)
    json = JSON.parse(json)

    try
      @result = types.dress(json)
    catch e
      @result = e

    callback()

  this.Then /^it should be a success$/, (callback) =>
    @result.should.not.be.an.instanceof Error

  this.Then /^the result should be a Tuple representation$/, (callback) =>
    @result.constructor.should.equal Object

  this.Then /^its '(.*)' attribute should be a Date representation$/, (attr, callback) =>
    @result[attr].constructor.should.equal Date

  this.Then /^the result should be a representation for Nil$/, (callback) =>
    @result.should.be.null

  this.Then /^the result should be a representation for (.*?)$/, (type,callback) =>
    @system.fetch(type).include(@result).should.be.true

  this.Then /^it should be a TypeError as:$/, (table, callback) ->
    @result.should.be.an.instanceof Qjs.TypeError

    callback.pending()

  this.Then /^the result should equal (\d+)$/, (expected, callback) ->
    callback.pending()
