System      = require '../../../lib/system'
should      = require 'should'
{numType,
stringType} = require '../../spec_helpers'

describe "System#clone", ->

  system = new System
  system.addType(numType)

  subject = -> system.clone()

  it 'should return a System', ->
    subject().should.be.an.instanceof System

  it 'should not be the same object', ->
    sys = subject()
    subject().should.not.equal(system)

  it 'should have numType', ->
    subject()['numType'].should.equal(numType)

  it 'should not share internals with the original', ->
    clone = subject()
    clone.addType(stringType)
    clone['stringType'].should.not.be.null
    should.equal(system['stringType'], null)
