Attribute   = require '../../../../lib/support/attribute'
TypeFactory = require '../../../../lib/support/factory'
BuiltinType = require '../../../../lib/type/builtin_type'
should      = require 'should'

describe 'TypeFactory#attribute', ->

  factory = new TypeFactory

  describe 'when used with a name and a JS class', ->
    subject = factory.attribute('foo', Number)

    subject.should.be.an.instanceof(Attribute)
    subject.name.should.equal('foo')
    subject.type.should.be.an.instanceof(BuiltinType)

  describe 'when used with a name and a BuiltinType', ->
    subject = factory.attribute('foo', intType)

    subject.should.be.an.instanceof(Attribute)
    subject.name.should.equal('foo')
    subject.type.should.equal(intType)
