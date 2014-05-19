Attribute   = require '../../../src/finitio/support/attribute'
TypeFactory = require '../../../src/finitio/support/factory'
AliasType   = require '../../../src/finitio/type/alias_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe 'TypeFactory#alias', ->

  factory = new TypeFactory

  describe 'when used with an unnamed type', ->
    base    = factory.builtin(Number)
    subject = factory.alias(base, "foo")

    it 'sets the name on the type', ->
      should(subject).be.an.instanceof(BuiltinType)
      should(subject.name).equal('foo')

  describe 'when used with a named type', ->
    subject = factory.alias(intType, "foo")

    it 'creates an AliasType', ->
      should(subject).be.an.instanceof(AliasType)
      should(subject.name).equal('foo')
