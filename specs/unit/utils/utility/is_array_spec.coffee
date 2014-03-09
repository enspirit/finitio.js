$u      = (require '../../../../src/support/utils')
should  = require 'should'

describe "Utils.utility#isArray", ->

  subject = (obj) -> $u.isArray(obj)

  describe 'for null or undefined', ->
    it 'returns false', ->
      for i, obj of [null, undefined]
        subject(obj).should.be.false

  describe 'for array', ->
    it 'should return true', ->
      subject([]).should.be.true

  describe 'for object', ->
    it 'should return false', ->
      subject({}).should.be.false
