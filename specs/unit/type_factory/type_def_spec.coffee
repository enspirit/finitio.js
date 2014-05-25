Attribute   = require '../../../src/finitio/support/attribute'
TypeFactory = require '../../../src/finitio/support/factory'
TypeDef   = require '../../../src/finitio/type/type_def'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe 'TypeFactory#typeDef', ->

  factory = new TypeFactory

  it 'creates an TypeDef', ->
    base    = factory.builtin(Number)
    subject = factory.typeDef(base, "foo")
    should(subject).be.an.instanceof(TypeDef)
    should(subject.name).equal('foo')
