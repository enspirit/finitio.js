Attribute = require '../../../lib/support/attribute'
should    = require 'should'

describe "Attribute#constructor", ->

  subject = new Attribute('red', intType)

  it 'should correctly set the instance variables', ->
    subject.name.should.equal('red')
    subject.type.should.equal(intType)
