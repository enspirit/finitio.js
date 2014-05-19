Attribute   = require '../../../src/finitio/support/attribute'
TypeFactory = require '../../../src/finitio/support/factory'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe 'TypeFactory#attribute', ->

  factory = new TypeFactory

  describe 'when used with a name and a JS class', ->
    subject = factory.attribute('foo', Number)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Attribute)
      subject.name.should.equal('foo')
      subject.type.should.be.an.instanceof(BuiltinType)
      subject.required.should.be.true

  describe 'when used with a name and a BuiltinType', ->
    subject = factory.attribute('foo', intType)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Attribute)
      subject.name.should.equal('foo')
      subject.type.should.equal(intType)

  describe 'when the required attribute is set to true', ->
    subject = factory.attribute('foo', intType, true)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Attribute)
      subject.name.should.equal('foo')
      subject.type.should.equal(intType)
      subject.required.should.be.true

  describe 'when the required attribute is set to false', ->
    subject = factory.attribute('foo', intType, false)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Attribute)
      subject.name.should.equal('foo')
      subject.type.should.equal(intType)
      subject.required.should.be.false
