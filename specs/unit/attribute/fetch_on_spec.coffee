Attribute = require '../../../src/finitio/support/attribute'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Attribute#fetchOn", ->

  attr = new Attribute('red', intType)

  subject = (arg, cb) -> attr.fetchOn(arg, cb)

  it 'with an object that does not support fetch', ->
    arg = 12

    lambda = -> subject(arg)

    should(lambda).throw()

    try
      lambda()
    catch e
      e.message.should.equal("Object expected, got: 12")

  it 'with a valid object', ->
    arg = "red": 233
    subject(arg).should.equal(233)

  it 'when the key is missing and no callback', ->
    arg = { other: 123 }
    lambda = -> subject(arg)

    should(lambda).throw()

    try
      lambda()
    catch e
      e.should.be.an.instanceof(Error)

  it 'when the key is missing and a callback is present', ->
    arg = other: 123

    subject(arg, -> "none").should.equal("none")
