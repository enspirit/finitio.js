Attribute   = require '../../../src/finitio/support/attribute'
TypeFactory = require '../../../src/finitio/support/factory'
ProxyType   = require '../../../src/finitio/type/proxy_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe 'TypeFactory#proxy', ->

  factory = new TypeFactory

  describe 'when used without name', ->
    subject = factory.proxy("base")

    it 'builds the type', ->
      should(subject).be.an.instanceof(ProxyType)
      should(subject.targetRef).equal('base')
      should(subject.target).equal(null)
