$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.collection#filter", ->

  subject = $u.filter

  it "raises an error if predicate is missing", ->
    lambda = -> subject [1, 2, 3]

    should(lambda).throw(/Function expected, got .*/)

  describe "When used with a predicate", ->

    it 'returns something', ->
      res = subject [1, 2, 3], (i) -> true
      should(res).not.be.null

    it "doesn't stop iterating when the predicate returns false", ->
      obj      = [1, 2, 3]
      copy     = []

      res = subject obj, (i) ->
        copy.push(i)
        if i == 2
          false
        else
          true

      should(copy).eql(obj)

    it 'returns the elements that pass a truth test', ->
      obj      = ['a', 1, "b", null, 'c']
      expected = ['a', 'b', 'c']

      res = subject obj, (v) ->
        return typeof(v) == "string"

      should(res).eql(expected)

    it 'returns an array even if nothing matches', ->
      obj      = ['a', null, 1]

      res = subject obj, (v) ->
        return v instanceof Date

      res.should.be.an.instanceof Array
      should(res).eql([])

  describe "When a callback throws an exception", ->
    it 'should let it pass', ->
      lambda = ->
        subject [1, 2, 3], (i) ->
          throw new Error("test")

      should(lambda).throw("test")
