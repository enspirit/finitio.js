$u      = require '../../../../lib/support/utils'
should  = require 'should'

describe "Utils.collection#size", ->

  it "raises an error when used with a non enumerable", ->
    test = (obj) ->
      ->
        $u.size obj

    should(test(false)).throw(/Enumerable .* expected, got .*/)
    should(test(/regexp/)).throw(/Enumerable .* expected, got .*/)

  describe "When used on a String", ->

    it 'returns the length', ->
      res = $u.size "bar"
      res.should.eql("bar".length)

  describe "When used on an Array", ->

    it 'returns the length', ->
      array = ["one", 2, undefined]
      res = $u.size array
      res.should.eql(array.length)

  describe "When used on an Object", ->

    it 'returns the size', ->
      obj =
        a: 1
        b: undefined
        c: null
        d: new Date
      res = $u.size obj
      res.should.eql(4)

