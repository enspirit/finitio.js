{KeyError}  = require '../../../lib/errors'
System      = require '../../../lib/system'
Type        = require '../../../lib/type'

should      = require 'should'

describe 'System#parse', ->

  system = new System
  system.addType(numType)

  subject = system.parse('Str = .String')

  it 'should return another System', ->
    subject.should.be.an.instanceof System
    subject.should.not.equal(system)

  it 'should have the types of the original system', ->
    subject['numType'].should.be.an.instanceof Type

  it 'should have the new types', ->
    subject['Str'].should.be.an.instanceof Type
