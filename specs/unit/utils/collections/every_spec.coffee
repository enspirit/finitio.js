$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.collection#every", ->

  it "raises an error if predicate is missing", ->
    lambda = -> $u.every [1, 2, 3]

    should(lambda).throw(/Function expected, got .*/)

  it 'behaves like #each', ->

    test = (enumerable, expected) ->
      result = {}
      $u.every enumerable, (v, k) ->
        result[k] = v
        true

      should(result).eql(expected)

    #
    test ['a', 'b', 'c'], {0: 'a', 1: 'b', 2: 'c'}
    test {foo: 'bar'}, {foo: 'bar'}
    test "foo", {0: 'f', 1: 'o', 2: 'o'}

  describe "When used with a predicate", ->

    it 'returns a boolean', ->
      res = $u.every [1, 2, 3], (i) -> true
      res.should.be.an.instanceof(Boolean)
      res.should.be.true

    it 'stops iterating as soon as the predicate returns false', ->
      obj      = [1, 2, 3]
      expected = [1, 2]
      copy     = []

      res = $u.every obj, (i) ->
        copy.push(i)
        if i == 2
          false
        else
          true

      should(copy).eql(expected)

  describe "When a callback throws an exception", ->
    it 'should let it pass', ->
      lambda = ->
        $u.every [1, 2, 3], (i) ->
          throw new Error("test")

      should(lambda).throw("test")
