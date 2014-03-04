SeqType         = require '../../../../lib/type/seq_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'

describe "SeqType#dress", ->

  type = new SeqType(byteType)

  subject = (arg) -> type.dress(arg)

  describe 'with an empty array', ->
    res = subject([])
    _.isEqual(res, []).should.be.true

  describe 'with a valid array', ->
    res = subject([12, 16])
    _.isEqual(res, [12, 16]).should.be.true

  describe 'with something else than array', ->
    lambda = -> subject("foo")

    expect(lambda).toThrow()

    try
      lambda()
    catch e
      e.should.be.an.instanceof(TypeError)
      e.message.should.equal("Invalid value `foo` for [Byte]")

  describe 'with an array with non bytes', ->
    arg = [2, 4, -12]

    subject =
      try
        type.dress(arg)
      catch e
        e

    it 'should raise an error', ->
      subject.should.be.an.instanceof(TypeError)
      subject.message.should.equal("Invalid value `-12` for Byte")
    
    it 'should have correct location', ->
      subject.location.should.equal("2")