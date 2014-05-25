Attribute   = require '../../../src/finitio/support/attribute'
TypeFactory = require '../../../src/finitio/support/factory'
TypeRef     = require '../../../src/finitio/type/type_ref'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe 'TypeFactory#typeRef', ->

  factory = new TypeFactory

  describe 'when used without name', ->
    subject = factory.typeRef("base")

    it 'builds the type', ->
      should(subject).be.an.instanceof(TypeRef)
      should(subject.targetRef).equal('base')
      should(subject.target).equal(null)
