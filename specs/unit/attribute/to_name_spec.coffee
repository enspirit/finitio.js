Attribute = require '../../../src/support/attribute'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Attribute#toName", ->

  subject = new Attribute('red', intType).toName()

  subject.should.equal("red: intType")
