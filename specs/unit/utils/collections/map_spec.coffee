$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.collection#map", ->

  subject = $u.map

  it "raises an error if iterator is missing", ->
    lambda = -> subject [1, 2, 3]

    should(lambda).throw(/Function expected, got .*/)

  it 'behaves like #each', ->

    test = (enumerable, expected) ->
      result = {}
      subject enumerable, (v, k) ->
        result[k] = v
        true

      should(result).eql(expected)

    #
    test ['a', 'b', 'c'], {0: 'a', 1: 'b', 2: 'c'}
    test {foo: 'bar'}, {foo: 'bar'}
    test "foo", {0: 'f', 1: 'o', 2: 'o'}

  describe "When used with an iterator on an Array", ->

    it 'returns an array', ->
      res = subject [1, 2, 3], (i) -> true
      res.should.be.an.instanceof(Array)

    it 'collects the values returned by the iterator', ->
      obj      = ['a', 'b', 'c']
      expected = [1, 2, 3]

      i = 1
      res = subject obj, (v) ->
        i++

      should(res).eql(expected)

  describe "When used with an iterator on an Object", ->

    it 'returns an array', ->
      res = subject {1: 1: 2, 2, 3: 3}, (v, k) -> v * k
      res.should.be.an.instanceof(Array)

    it 'collects the values returned by the iterator', ->
      obj      = {'a': 1, 'b': 2, 'c': 3}
      expected = ['a1', 'b2', 'c3']

      res = subject obj, (v, k) ->
        "#{k}#{v}"

      should(res).eql(expected)

  describe "When a callback throws an exception", ->
    it 'should let it pass', ->
      lambda = ->
        subject [1, 2, 3], (i) ->
          throw new Error("test")

      should(lambda).throw("test")
