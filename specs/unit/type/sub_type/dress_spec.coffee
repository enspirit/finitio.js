Constraint  = require '../../../../src/finitio/support/constraint'
SubType     = require '../../../../src/finitio/type/sub_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
{numType}   = require '../../../spec_helpers'

describe "SubType#dress", ->

  _default = new Constraint.Native('default', (i) -> i > 0)
  _small   = new Constraint.Native('small', (i) -> i < 255)

  type = new SubType(numType, [_default, _small], "byte")

  factor = (arg) ->
    type.dress(arg)

  it 'with a valid Number', ->
    should(factor(12)).equal(12)

  describe 'when raising an Error', ->

    factor = (arg) ->
      try
        type.dress(arg)
      catch e
        e

    describe 'with a Boolean', ->
      subject = factor(true)

      it 'should raise an Error', ->
        should(subject).be.an.instanceof(TypeError)
        should(subject.message).equal("Invalid value: `true`")

      it "should have the proper root cause", ->
        rc = subject.getRootCause()
        should(rc).be.an.instanceof(TypeError)
        should(rc.message).equal("Invalid Number: `true`")

    describe 'with a negative Number', ->
      subject = factor(-12)

      it 'should raise an Error', ->
        should(subject).be.an.instanceof(TypeError)
        should(subject.message).equal("Invalid value: `-12`")

      it "should have the expected cause", ->
        rc = subject.getRootCause()
        should(rc).be.an.instanceof(TypeError)
        should(rc.message).equal("Constraint `default` violated")

    describe 'with a non small Number', ->
      subject = factor(1000)

      it 'should raise an Error', ->
        should(subject).be.an.instanceof(TypeError)
        should(subject.message).equal "Invalid value: `1000`"
