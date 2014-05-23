System      = require '../../../src/finitio/system'
should      = require 'should'
{numType,
stringType} = require '../../spec_helpers'

describe "System#clone", ->

  system = new System
  system.addType(numType)

  subject = -> system.clone()

  it 'should return a System', ->
    should(subject()).be.an.instanceof(System)

  it 'should not be the same object', ->
    should(subject()).not.equal(system)

  it 'should have numType', ->
    should(subject().numType).equal(numType)

  it 'should not share internals with the original', ->
    clone = subject()
    clone.addType(stringType)
    should(clone.stringType).not.equal(null)
    should(clone.stringType).not.equal(undefined)
    should(system.stringType).equal(undefined)
