Attribute = require '../../../src/support/attribute'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Attribute#constructor", ->

  describe 'when implicitely required', ->
    subject = new Attribute('red', intType)

    it 'should correctly set the instance variables', ->
      subject.name.should.equal('red')
      subject.type.should.equal(intType)
      subject.required.should.be.true

  describe 'when not required', ->
    subject = new Attribute('red', intType, false)

    it 'should correctly set the instance variables', ->
      subject.name.should.equal('red')
      subject.type.should.equal(intType)
      subject.required.should.be.false
