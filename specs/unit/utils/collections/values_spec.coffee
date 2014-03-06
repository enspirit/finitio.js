$u      = require '../../../../lib/support/utils'
should  = require 'should'

describe "Utils.collection#values", ->

  it "raises an error when used with a non object", ->
    test = (obj) ->
      ->
        $u.values obj

    should(test([])).throw(/Object expected, got .*/)
    should(test(false)).throw(/Object expected, got .*/)
    should(test("foo")).throw(/Object expected, got .*/)

  describe "When used on an object", ->

    it 'returns an array', ->
      res = $u.values {foo: 'bar'}
      res.should.be.an.instanceof(Array)

    it 'returns all the values of the object', ->
      date     = new Date()
      obj      = {a: 'a', b: 2, c: undefined, d: null, e: date}
      expected = ['a', 2, undefined, null, date]

      res = $u.values obj
      should(res).eql(expected)
