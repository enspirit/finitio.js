Qjs    = require '../../lib/qjs'
should = require 'should'

module.exports = ->

  this.Given /^the Realm is$/, (source, callback) =>
    @realm ?= Qjs.parse_realm(source)

    callback()

  this.Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) ->
    type = @realm.fetch(type)
    json = JSON.parse(json)

    try
      @result = types.dress(json)
    catch e
      @result = e

    callback()

  this.Then /^it should be a success$/, (callback) =>
    @result.should.not.be.an.instanceof Error

  this.Then /^the result should be a (.*?) native representation$/, (type, callback) =>
    type = @realm.fetch(type)

    if type instanceof Qjs.TupleType
      @result.constructor.should.equal Object

    else if type instanceof Qjs.RelationType
      @result.constructor.should.equal Array
      @result.forEach (t) ->
        t.constructor.should.equal Object
    else
      throw new Error("Unexpected type `#{type}`")

    callback()

  this.Then /^it should be a TypeError as:$/, (table, callback) ->
    @result.should.be.an.instanceof Qjs.TypeError

    callback.pending()


  this.Then /^the result should be the null representation in the host language$/, (callback) ->
    @result.should.equal(null)
    callback()


  this.Then /^the result should equal (\d+)$/, (expected, callback) ->
    callback.pending()
