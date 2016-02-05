$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.collection#reduce", ->

  subject = $u.reduce

  it "raises an error if iterator is missing", ->
    lambda = -> subject [1, 2, 3]

    should(lambda).throw(/Function expected, got .*/)

  describe "When used with a summing callback on an array", ->

    it 'returns the sum', ->
      res = subject [1, 2, 3], 0, (acc, i) -> acc + i
      res.should.eql(6)

  describe "When used with a summing callback on an object", ->

    it 'returns the sum', ->
      res = subject { one: 1, two: 2, three: 3 }, 0, (acc, i) -> acc + i
      res.should.eql(6)

  describe "When a callback throws an exception", ->
    it 'should let it pass', ->
      lambda = ->
        subject [1, 2, 3], 0, (i) ->
          throw new Error("test")

      should(lambda).throw("test")
