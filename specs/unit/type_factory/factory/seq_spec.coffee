TypeFactory = require '../../../../lib/type/factory'
SeqType     = require '../../../../lib/type/seq_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'TypeFactory#seq', ->

  factory = new TypeFactory

  describe 'for sequences of scalars', ->
    expected = new SeqType(numType())
    
    describe 'when used with [Class]', ->
      subject = factory.type([Number])
      
      subject.should.equal(expected)

    describe 'when used with [Class] and a name', ->
      subject = factory.type([Number], "MySeq")
      
      subject.should.equal(expected)

      it 'should have the correct name', ->
        subject.name.should.equal("MySeq")

  describe 'for pseudo-relations', ->
    subject = factory.type([{r: Number}], "MySeq")

    expected = factory.seq(factory.tuple({r: Number}))

    subject.should.equal(expected)

    it 'should have the correct name', ->
      subject.name.should.equal("MySeq")