Finitio     = require '../../../src/finitio'
Parser      = require '../../../src/finitio/parser'
System      = require '../../../src/finitio/system'
BuiltinType = require '../../../src/finitio/type/builtin_type'
TypeDef   = require '../../../src/finitio/type/type_def'
TypeRef   = require '../../../src/finitio/type/type_ref'
should      = require 'should'

describe "Parser#system", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  describe 'when a single type', ->
    subject = compile(".String", startRule: "system")

    it 'should return a System', ->
      should(subject).be.an.instanceof(System)

    it 'should have a main type', ->
      should(subject.Main).be.an.instanceof(TypeDef)

  describe 'with some definitions and a main type', ->
    subject = compile("Str = .String\nStr", startRule: "system")

    it 'should return a System', ->
      should(subject).be.an.instanceof(System)

    it 'should have a type', ->
      should(subject.fetch('Str')).be.an.instanceof(TypeDef)
      should(subject.fetch('Str').name).equal('Str')

    it 'should have a main type', ->
      should(subject.Main).be.an.instanceof(TypeDef)

  describe 'with some definitions but no main type', ->
    subject = compile("Str = .String\nInt = .Number", startRule: "system")

    it 'should return a System', ->
      should(subject).be.an.instanceof(System)

    it 'should have the types', ->
      should(subject.fetch('Str')).be.an.instanceof(TypeDef)
      should(subject.fetch('Int')).be.an.instanceof(TypeDef)

    it 'should have no main type', ->
      should(subject.Main).equal(undefined)
