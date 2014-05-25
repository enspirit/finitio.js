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
    should(subject().types[0]).equal(numType)

  it 'should not share internals with the original', ->
    clone = subject()
    clone.addType(stringType)
    should(system.types.length).equal(1)
    should(clone.types.length).equal(2)
