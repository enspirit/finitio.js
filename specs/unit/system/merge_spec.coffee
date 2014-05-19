Finitio     = require '../../../src/finitio'
System      = require '../../../src/finitio/system'
Type        = require '../../../src/finitio/type'
BuiltinType = require '../../../src/finitio/type/builtin_type'

should      = require 'should'

describe 'System#merge', ->

  should_be_a_system = (subject)->
    ->
      subject.should.be.an.instanceof System

  describe "when disjoint", ->
    s1 = Finitio.parse("Str = .String")
    s2 = Finitio.parse("Num = .Number")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should merge the types, by name', ->
      subject['Str'].should.be.an.instanceof Type
      subject['Num'].should.be.an.instanceof Type

  describe "with two mains", ->
    s1 = Finitio.parse(".String")
    s2 = Finitio.parse(".Number")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should give priority to the second one', ->
      subject.main.should.be.an.instanceof BuiltinType
      subject.main.jsType.should.equal(Number)

  describe "with one main at left", ->
    s1 = Finitio.parse(".String")
    s2 = Finitio.parse("Num = .Number")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should use the only main available', ->
      subject.main.should.be.an.instanceof BuiltinType
      subject.main.jsType.should.equal(String)

  describe "with one main at right", ->
    s1 = Finitio.parse("Num = .Number")
    s2 = Finitio.parse(".String")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should use the only main available', ->
      subject.main.should.be.an.instanceof BuiltinType
      subject.main.jsType.should.equal(String)
