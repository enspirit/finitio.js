TypeFactory = require '../../../../src/support/factory'
{TypeError} = require '../../../../src/errors'
BuiltinType = require '../../../../src/type/builtin_type'
UnionType   = require '../../../../src/type/union_type'
should      = require 'should'

describe 'TypeFactory#union', ->

  factory = new TypeFactory

  describe 'when used with an array of types', ->
    subject = factory.union [factory.builtin(Number), factory.builtin(String)]

    it 'should be a UnionType', ->
      subject.should.be.an.instanceof(UnionType)
