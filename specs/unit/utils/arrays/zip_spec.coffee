$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.arrays#zip", ->

  subject = $u.zip

  describe 'when invalid call', ->

    describe 'with non-array(s)', ->
      it 'throws an error', ->
        for i, obj of [null, undefined, {}]
          should(-> subject(obj)).throw(/Array expected, got .*/)

    describe 'with arrays of diff size', ->
      it 'throws an error', ->
        lambda = ->
          subject(['foo', 'bar'], [100])

        should(lambda).throw(/Arrays must have same size/)

  describe 'when valid call', ->
    lambda = ->
      subject(['foo', 'bar'], [1, 2], ['a', 'b'])

    it 'should return an array', ->
      res = lambda()

      res.should.be.an.instanceof Array

    it 'should return the zipping', ->
      res = lambda()

      should(res).eql [ ['foo', 1, 'a'], ['bar', 2, 'b'] ]

