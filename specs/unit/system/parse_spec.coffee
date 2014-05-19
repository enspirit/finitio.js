Finitio = require '../../../src/finitio'
System  = require '../../../src/finitio/system'
Type    = require '../../../src/finitio/type'
should  = require 'should'

describe 'System#parse', ->

  system = Finitio.parse('Num = .Number')

  describe "when the new system does not make cross-references", ->

    subject = system.parse('Str = .String')

    it 'should return another System', ->
      subject.should.be.an.instanceof System
      subject.should.not.equal(system)

    it 'should have the types of the original system', ->
      subject['Num'].should.be.an.instanceof Type

    it 'should have the new types', ->
      subject['Str'].should.be.an.instanceof Type

  describe "when the new system does make cross-references", ->

    subject = system.parse('Int = Num( i | i >= 0 )')

    it 'should return another System', ->
      subject.should.be.an.instanceof System
      subject.should.not.equal(system)

    it 'should have the new types', ->
      subject['Int'].should.be.an.instanceof Type

