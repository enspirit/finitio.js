Parser      = require '../../../lib/syntax/parser'
Constraint  = require '../../../lib/support/constraint'
BuiltinType = require '../../../lib/type/builtin_type'
SubType     = require '../../../lib/type/sub_type'
should      = require 'should'

describe "Parser#sub_type", ->

  describe 'with a single constraint', ->
    subject = Parser.parse(".Number( i | i >= 0 )", startRule: "type")

    it 'should return a SubType', ->
      subject.should.be.an.instanceof(SubType)

    it 'should have the correct constraint', ->
      subject.constraints.length.should.equal(1)
      subject.constraints[0].should.be.an.instanceof(Constraint)
      subject.constraints[0].accept(12).should.be.true
      subject.constraints[0].accept(-12).should.be.false

    it 'should dress properly', ->
      subject.dress(12).should.equal(12)
      try
        subject.dress(-1)
        false.should.be.true
      catch e
        e

  describe 'with a constraint on an AnyType', ->
    subject = Parser.parse(".( v | v === null )", startRule: "type")

    it 'should return a SubType', ->
      subject.should.be.an.instanceof(SubType)

    it 'should dress properly', ->
      should.equal(subject.dress(null), null)
      try
        subject.dress(-1)
        false.should.be.true
      catch e
        e

  describe 'with multiple, named constraints', ->
    subject = Parser.parse(".Number( i | positive: i >= 0, small: i <= 255 )", startRule: "type")

    it 'should return a SubType', ->
      subject.should.be.an.instanceof(SubType)

    it 'should dress properly according to positive', ->
      subject.dress(12).should.equal(12)
      try
        subject.dress(-1)
        false.should.be.true
      catch e
        e

    it 'should dress properly according to small', ->
      try
        subject.dress(256)
        false.should.be.true
      catch e
        e

  describe 'with a complex constraint expression', ->
    subject = Parser.parse(".Number( i | noDot: i.toString().indexOf('.') == -1 )", startRule: "type")

    it 'should return a SubType', ->
      subject.should.be.an.instanceof(SubType)
