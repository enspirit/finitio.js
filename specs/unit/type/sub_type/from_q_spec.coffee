SubType     = require '../../../../lib/type/sub_type'
{TypeError} = require '../../../../lib/errors'
should      = require 'should'

describe "SubType#fromQ", ->
  
  _default = (i) -> i > 0
  _small   = (i) -> i < 255

  type = new SubType(numType, {default: _default, small: _small}, "byte")

  factor = (arg) -> 
    type.fromQ(arg)

  describe 'with a valid Number', ->
    factor(12).should.equal(12)

  describe 'when raising an Error', ->

    factor = (arg) ->
      try
        type.fromQ(arg)
      catch e
        e

    describe 'with a Boolean', ->
      subject = factor(true)

      it 'should raise an Error', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `true` for byte")

      it "should have the proper cause from super type's up", ->
        subject.cause.should.be.an.instanceof(TypeError)
        subject.cause.message.should.equal("Invalid value `true` for numType")

      it "should have an empty location", ->
        subject.location.should.equal('')

    describe 'with a negative Number', ->
      subject = factor(-12)

      it 'should raise an Error', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `-12` for byte")

      it "should have no cause", ->
        subject.cause.should.equal('')
      
      it "should have an empty location", ->
        subject.location.should.equal('')

    describe 'with a non small Number', ->
      subject = factor(1000)

      it 'should raise an Error', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `1000` for byte (not small)")

      it "should have no cause", ->
        subject.cause.should.equal('')

      it "should have an empty location", ->
        subject.location.should.equal('')
