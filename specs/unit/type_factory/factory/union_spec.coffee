TypeFactory = require '../../../../src/finitio/support/factory'
{TypeError} = require '../../../../src/finitio/errors'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
UnionType   = require '../../../../src/finitio/type/union_type'
should      = require 'should'

describe 'TypeFactory#union', ->

  factory = new TypeFactory

  describe 'when used with an array of types', ->
    subject = factory.union [factory.builtin(Number), factory.builtin(String)]

    it 'should be a UnionType', ->
      subject.should.be.an.instanceof(UnionType)
