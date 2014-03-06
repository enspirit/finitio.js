$u      = require '../../../../lib/support/utils'
should  = require 'should'

describe "Utils.collection#find", ->

  it "raises an error if predicate is missing", ->
    lambda = -> $u.find [1, 2, 3]

    should(lambda).throw(/Function expected, got .*/)

  it 'behaves like #each', ->

      test = (enumerable, expected) ->
        result = {}
        $u.find enumerable, (v, k) ->
          result[k] = v
          false

        should(result).eql(expected)

      #
      test ['a', 'b', 'c'], {0: 'a', 1: 'b', 2: 'c'}
      test {foo: 'bar'}, {foo: 'bar'}
      test "foo", {0: 'f', 1: 'o', 2: 'o'}

  describe "When used with a predicate", ->

    it 'returns something', ->
      res = $u.find [1, 2, 3], (i) -> true
      should(res).not.be.null

    it 'stops iterating as soon as the predicate returns true', ->
      obj      = [1, 2, 3]
      expected = [1, 2]
      copy     = []

      res = $u.find obj, (i) ->
        copy.push(i)
        if i == 2
          true
        else
          false

      should(copy).eql(expected)

    it 'returns the first element that passes a truth test', ->
      date     = new Date
      obj      = ['a', null, date]

      res = $u.find obj, (v) ->
        return v instanceof Date

      should(res).eql(date)

    it 'returns null if not found', ->
      obj      = ['a', null, 1]

      res = $u.find obj, (v) ->
        return v instanceof Date

      should(res).be.null

  describe "When a callback throws an exception", ->
    it 'should let it pass', ->
      lambda = ->
        $u.find [1, 2, 3], (i) ->
          throw new Error("test")

      should(lambda).throw("test")