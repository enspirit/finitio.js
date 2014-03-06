TypeFactory = require '../../../../lib/support/factory'
Constraint  = require '../../../../lib/support/constraint'
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

    it 'should have the BuiltinType(Number) super type', ->
      subject.superType.should.be.an.instanceof(BuiltinType)
      subject.superType.jsType.should.equal(Number)

    it 'should have the correct constraint', ->
      subject.dress(10).should.equal(10)

      lambda = (i) ->
        ->
          subject.dress(i)

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
      subject.dress('abc').should.equal('abc')

      lambda = ->
        subject.dress('123')

      expect(lambda).toThrow()

      try
        lambda()
      catch e
        e.should.be.an.instanceof(TypeError)

  describe 'when used with a super type and an array of constraints', ->
    subject = factory.sub_type numType, [ new Constraint('foo', (i)-> i>0) ]

    it 'should be a subtype', ->
      subject.should.be.an.instanceof(SubType)

    it 'should have the correct constraints', ->
      subject.constraints.length.should.equal(1)
      subject.constraints[0].should.be.an.instanceof(Constraint)
      subject.constraints[0].accept(12).should.be.true
      subject.constraints[0].accept(-12).should.be.false

  describe 'when used with a super type and an hash of constraints', ->
    subject = factory.sub_type numType, {
        first: (i) -> i > 0,
        second: (i) => i < 100
      }

    it 'should be a subtype', ->
      subject.should.be.an.instanceof(SubType)

    it 'should have the correct constraints', ->
      subject.constraints.length.should.equal(2)

      for i, constraint of subject.constraints
        constraint.should.be.an.instanceof Constraint

    it "constraints' name should be set accordingly", ->
      subject.constraints[0].name.should.equal("first")
      subject.constraints[1].name.should.equal("second")