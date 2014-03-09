Attribute = require '../../../src/support/attribute'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Attribute#constructor", ->

  subject = new Attribute('red', intType)

  it 'should correctly set the instance variables', ->
    subject.name.should.equal('red')
    subject.type.should.equal(intType)
