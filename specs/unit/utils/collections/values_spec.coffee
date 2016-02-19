$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.collection#values", ->

  subject = $u.values

  it "raises an error when used on a non-Enumerable", ->
    test = (obj) ->
      ->
        subject obj

    should(test(false)).throw(/Enumerable .* expected, got .*/)

  describe "When used on an array", ->

    it 'returns an array', ->
      res = subject ['foo', 'bar']
      res.should.be.an.instanceof(Array)

    it 'returns the array itself', ->
      array = ['a', 2, undefined, null]

      res = subject array
      should(res).eql(array)
      should(res == array).equal(true)

  describe "When used on an object", ->

    it 'returns an array', ->
      res = subject {foo: 'bar'}
      res.should.be.an.instanceof(Array)

    it 'returns all the values of the object', ->
      date     = new Date()
      obj      = {a: 'a', b: 2, c: undefined, d: null, e: date}
      expected = ['a', 2, undefined, null, date]

      res = subject obj
      should(res).eql(expected)

  describe "When used on a String", ->

    it 'returns an array', ->
      res = $u.values "bar"
      res.should.be.an.instanceof(Array)

    it 'returns all the characters of the string', ->
      str      = "foo"
      expected = ['f', 'o', 'o']

      res = subject str
      should(res).eql(expected)
