Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
should     = require 'should'
{intType,
floatType} = require '../../spec_helpers'

describe "Heading#toName", ->

  subject = (attributes) -> new Heading(attributes).toName()

  it 'with no attribute', ->
    subject([]).should.equal('')

  it 'with one attribute', ->
    attributes = [ new Attribute('red', intType) ]
    subject(attributes).should.equal('red: intType')

  it 'with multiple attributes', ->
    attributes = [
        new Attribute('red', intType),
        new Attribute('blue', floatType)
      ]

    subject(attributes).should.equal('red: intType, blue: floatType')
