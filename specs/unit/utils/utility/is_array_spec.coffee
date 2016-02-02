$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.utility#isArray", ->

  subject = (obj) -> $u.isArray(obj)

  describe 'for null or undefined', ->
    it 'returns false', ->
      for i, obj of [null, undefined]
        subject(obj).should.equal(false)

  describe 'for array', ->
    it 'should return true', ->
      subject([]).should.equal(true)

  describe 'for object', ->
    it 'should return false', ->
      subject({}).should.equal(false)
