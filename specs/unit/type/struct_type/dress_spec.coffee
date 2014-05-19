StructType  = require '../../../../src/type/struct_type'
{TypeError} = require '../../../../src/errors'
_           = require 'underscore'
should      = require 'should'
{intType,
stringType} = require '../../../spec_helpers'

describe "StructType#dress", ->

  type = new StructType([intType, stringType], "point")

  subject = (arg) ->
    type.dress(arg)

  context 'with a valid Array', ->

    it 'should coerce to an array', ->
      arg = [ 12, 'foo' ]
      subject(arg).should.eql(arg)

  context 'when raising an error', ->

    subject = (arg) ->
      err = try
        type.dress(arg)
      catch e
        e

    context 'with something else than an Array', ->
      arg = "foo"

      it 'should raise a TypeError', ->
        subject(arg).should.be.an.instanceof(TypeError)
        subject(arg).message.should.equal("Invalid value `foo` for point")

      it 'should have no cause', ->
        should(subject(arg).cause).be.null

      it 'should have an empty location', ->
        subject(arg).location.should.equal('')

    context 'with a missing component', ->
      arg = [ 12 ]

      it 'should raise a TypeError', ->
        subject(arg).should.be.an.instanceof(TypeError)
        subject(arg).message.should.equal("Struct size mismatch (1 for 2)")

      it 'should have no cause', ->
        should(subject(arg).cause).be.null

      it 'should have an empty location', ->
        subject(arg).location.should.equal('')

    context 'with an extra attribute', ->
      arg = [ 12, 'foo', "bar" ]

      it 'should raise a TypeError', ->
        subject(arg).should.be.an.instanceof(TypeError)
        subject(arg).message.should.equal("Struct size mismatch (3 for 2)")

      it 'should have no cause', ->
        should(subject(arg).cause).be.null

      it 'should have an empty location', ->
        subject(arg).location.should.equal('')

    context 'with an invalid attribute', ->
      arg = [ 12, 14.2 ]

      it 'should raise a TypeError', ->
        subject(arg).should.be.an.instanceof(TypeError)
        subject(arg).message.should.equal("Invalid value `14.2` for stringType")

      it 'should have no cause', ->
        should(subject(arg).cause).be.null

      it 'should have the correct location', ->
        subject(arg).location.should.equal("1")