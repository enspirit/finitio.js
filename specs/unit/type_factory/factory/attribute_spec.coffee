Attribute   = require '../../../../src/support/attribute'
TypeFactory = require '../../../../src/support/factory'
BuiltinType = require '../../../../src/type/builtin_type'
should      = require 'should'
{intType}   = require '../../../spec_helpers'

describe 'TypeFactory#attribute', ->

  factory = new TypeFactory

  describe 'when used with a name and a JS class', ->
    subject = factory.attribute('foo', Number)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Attribute)
      subject.name.should.equal('foo')
      subject.type.should.be.an.instanceof(BuiltinType)

  describe 'when used with a name and a BuiltinType', ->
    subject = factory.attribute('foo', intType)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Attribute)
      subject.name.should.equal('foo')
      subject.type.should.equal(intType)
