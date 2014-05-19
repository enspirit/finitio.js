Parser      = require '../../../src/finitio/syntax/parser'
System      = require '../../../src/finitio/system'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#system", ->

  describe 'when a single type', ->
    subject = Parser.parse(".String", startRule: "system")

    it 'should return a System', ->
      subject.should.be.an.instanceof(System)

    it 'should not have any type', ->
      subject.types.should.be.empty

    it 'should have a main type', ->
      subject.main.should.be.an.instanceof(BuiltinType)

  describe 'with some definitions and a main type', ->
    subject = Parser.parse("Str = .String\nStr", startRule: "system")

    it 'should return a System', ->
      subject.should.be.an.instanceof(System)

    it 'should have a type', ->
      subject.getType('Str').should.be.an.instanceof(BuiltinType)
      subject.getType('Str').name.should.equal('Str')

    it 'should have a main type', ->
      subject.main.should.be.an.instanceof(BuiltinType)

  describe 'with some definitions but no main type', ->
    subject = Parser.parse("Str = .String\nInt = .Number", startRule: "system")

    it 'should return a System', ->
      subject.should.be.an.instanceof(System)

    it 'should have the types', ->
      subject.getType('Str').should.be.an.instanceof(BuiltinType)
      subject.getType('Int').should.be.an.instanceof(BuiltinType)

    it 'should have no main type', ->
      should(subject.main).be.null
