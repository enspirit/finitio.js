Qjs         = require '../../../src/qjs'
{KeyError}  = require '../../../src/errors'
System      = require '../../../src/system'
Type        = require '../../../src/type'
BuiltinType = require '../../../src/type/builtin_type'

should      = require 'should'

describe 'System#merge', ->

  should_be_a_system = (subject)->
    ->
      subject.should.be.an.instanceof System

  describe "when disjoint", ->
    s1 = Qjs.parse("Str = .String")
    s2 = Qjs.parse("Num = .Number")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should merge the types, by name', ->
      subject['Str'].should.be.an.instanceof Type
      subject['Num'].should.be.an.instanceof Type

  describe "with two mains", ->
    s1 = Qjs.parse(".String")
    s2 = Qjs.parse(".Number")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should give priority to the second one', ->
      subject.main.should.be.an.instanceof BuiltinType
      subject.main.jsType.should.equal(Number)

  describe "with one main at left", ->
    s1 = Qjs.parse(".String")
    s2 = Qjs.parse("Num = .Number")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should use the only main available', ->
      subject.main.should.be.an.instanceof BuiltinType
      subject.main.jsType.should.equal(String)

  describe "with one main at right", ->
    s1 = Qjs.parse("Num = .Number")
    s2 = Qjs.parse(".String")
    subject = s1.merge(s2)

    it 'should be a System', should_be_a_system(subject)

    it 'should use the only main available', ->
      subject.main.should.be.an.instanceof BuiltinType
      subject.main.jsType.should.equal(String)
