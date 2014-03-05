TypeFactory = require '../../../../lib/support/factory'
should      = require 'should'

describe 'TypeFactory#jsType', ->

  factory = new TypeFactory

  describe 'when used with a JS class', ->
    subject = factory.jsType(Number)

    it 'should work as expected', ->
      subject.should.equal(Number)

  describe 'when used with a JS class name', ->
    subject = factory.jsType('Number')

    it 'should work as expected', ->
      subject.should.equal(Number)
