{TypeError} = require '../../../../lib/errors'
UnionType   = require '../../../../lib/type/union_type'
should      = require 'should'

describe "UnionType#fromQ", ->

  # Let's reinvent JS' Number, shall we?
  type = new UnionType([intType, floatType], "union")

  describe 'with an Integer', ->
    subject = type.fromQ(12)
    subject.should.equal(12)

  describe 'with a Float', ->
    subject = type.fromQ(3.14)
    subject.should.equal(3.14)

  describe 'with a String', ->
    subject = try
      type.fromQ("foo")
    catch e
      e
    
    it 'should raise an Error', ->
      subject.should.be.an.instanceof(TypeError)
      subject.message.should.equal("Invalid value `foo` for union")

    it 'should have no cause', ->
      subject.cause.should.equal('')

    it 'should have an empty location', ->
      subject.location.should.equal('')
