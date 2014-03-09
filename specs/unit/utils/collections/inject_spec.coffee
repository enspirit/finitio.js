$u      = require '../../../../src/support/utils'
should  = require 'should'

describe "Utils.collection#inject", ->

  it "raises an error when used with a non Array", ->
    test = (obj) ->
      ->
        $u.inject obj, ""

    should(test(false)).throw(/Array expected, got .*/)
    should(test(/regexp/)).throw(/Array expected, got .*/)

  describe "When used on an Array", ->

    it 'works as expected', ->
      array = ['one', 'two', 'three']
      res = $u.inject array, "", (memo, part)->
        memo + "," + part
      res.should.equal(',one,two,three')
