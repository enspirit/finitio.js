TypeFactory = require '../../../../lib/type/factory'
{TypeError} = require '../../../../lib/errors'
BuiltinType = require '../../../../lib/type/builtin_type'
SubType     = require '../../../../lib/type/sub_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'TypeFactory#sub_type', ->

  factory = new TypeFactory

  describe 'when used with a JS class and a block', ->
    subject = factory.type Number, (i) ->
      i >= 0 && i <= 10

    it 'shoudl have the BuiltinType(Number) super type', ->
      subject.superType.should.be.an.instanceof(BuiltinType)
      subject.superType.ruby_type.should.be.an.instanceof(Number)

    it 'should have the correct constraint', ->
      subject.fromQ(10).should.equal(10)

      lambda = (i) ->
        ->
          subject.fromQ(i)

      expect(lambda(12)).toThrow()
      expect(lambda(-1)).toThrow()

      try 
        lambda(12)
      catch e
        expect(e).to.be.an.instanceof(TypeError)
      
  describe 'when used with a regexp', ->
    subject = factory.type /[a-z]+/

    subject.should.be.an.instanceof(SubType)

    it 'should have the correct constraint', ->
      subject.fromQ('abc').should.equal('abc')

      lambda = ->
        subject.fromQ('123')

      expect(lambda).toTrow()

      try 
        lambda()
      catch e
        expect(e).to.be.an.instanceof(TypeError)