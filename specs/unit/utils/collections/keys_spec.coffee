$u      = require '../../../../src/support/utils'
should  = require 'should'

describe "Utils.collection#keys", ->

  subject = $u.keys

  it "raises an error when used with a non-Enumerable", ->
    test = (obj) ->
      ->
        subject obj

    should(test(false)).throw(/Enumerable .* expected, got .*/)

  describe "When used on an object", ->

    it 'returns an array', ->
      res = subject {foo: 'bar'}
      res.should.be.an.instanceof(Array)

    it 'returns all the keys of the object', ->
      obj      = {a: 1, 'b': 2, c: 3}
      obj[undefined] = 4
      obj[null] = 5
      expected = ['a', 'b', 'c', 'undefined', 'null']

      res = subject obj
      should(res).eql(expected)

  describe "When used on an Array", ->

    it 'returns an array', ->
      res = subject [1, 2, 3]
      res.should.be.an.instanceof(Array)

    it 'returns all the indices of the array', ->
      obj      = ['a', 'b', null]
      expected = ['0', '1', '2']

      res = subject obj
      should(res).eql(expected)

  describe "When used on a String", ->

    it 'returns an array', ->
      res = subject "bar"
      res.should.be.an.instanceof(Array)

    it 'returns all the characters positions of the string', ->
      str      = "foo"
      expected = ['0', '1', '2']

      res = subject str
      should(res).eql(expected)
