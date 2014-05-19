SetType     = require '../../../../src/finitio/type/set_type'
{TypeError} = require '../../../../src/finitio/errors'
_           = require 'underscore'
should      = require 'should'
{byteType}  = require '../../../spec_helpers'

describe "SetType#dress", ->

  type = new SetType(byteType)

  it 'with an empty array', ->
    res = type.dress([])
    should(res).eql([])

  it 'with a valid array', ->
    res = type.dress([12, 16])
    should(res).eql([12, 16])

  it 'with something else than array', ->
    lambda = -> type.dress("foo")

    should(lambda).throw()

    try
      lambda()
    catch e
      e.should.be.an.instanceof(TypeError)
      e.message.should.equal("Invalid value `foo` for {Byte}")

  describe 'with an array with non bytes', ->
    subject =
      try
        type.dress([2, 4, -12])
      catch e
        e

    it 'should raise an error', ->
      subject.should.be.an.instanceof(TypeError)
      subject.message.should.equal("Invalid value `-12` for Byte")

    it 'should have correct location', ->
      subject.location.should.equal("2")

  describe 'with an array with duplicates', ->
    subject2 =
      try
        type.dress([2, 4, 2])
      catch e
        e

    it 'should raise an error', ->
      subject2.should.be.an.instanceof(TypeError)
      subject2.message.should.equal("Duplicate value `2`")

    it 'should have correct location', ->
      subject2.location.should.equal("2")
