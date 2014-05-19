Attribute = require '../../../src/finitio/support/attribute'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Attribute#toName", ->

  describe 'when required', ->
    subject = new Attribute('red', intType).toName()

    it 'should set name accordingly', ->
      subject.should.equal("red: intType")

  describe 'when not required', ->
    subject = new Attribute('red', intType, false).toName()

    it 'should set name accordingly', ->
      subject.should.equal("red :? intType")
