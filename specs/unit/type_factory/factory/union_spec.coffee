TypeFactory = require '../../../../lib/support/factory'
{TypeError} = require '../../../../lib/errors'
BuiltinType = require '../../../../lib/type/builtin_type'
UnionType   = require '../../../../lib/type/union_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'TypeFactory#union', ->

  factory = new TypeFactory

  describe 'when used with an array of types', ->
    subject = factory.union [factory.builtin(Number), factory.builtin(String)]

    it 'should be a UnionType', ->
      subject.should.be.an.instanceof(UnionType)
