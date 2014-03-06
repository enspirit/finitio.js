Attribute = require '../../../lib/support/attribute'
should    = require 'should'

describe "Attribute#toName", ->

  subject = new Attribute('red', intType).toName()

  subject.should.equal("red: intType")
