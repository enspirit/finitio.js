$u      = (require '../../../../lib/support/utils')
should  = require 'should'

describe "Utils.string#isArray", ->

  subject = (obj) -> $u.isArray(obj)

  describe 'for null or undefined', ->
    it 'throws an error', ->
      for i, obj of [null, undefined]
        should(-> subject(obj)).throw(/Object expected, got .*/)

  describe 'for array', ->
    it 'should return true', ->
      subject([]).should.be.true

  describe 'for object', ->
    it 'should return false', ->
      subject({}).should.be.false
