Constraint  = require '../../../src/finitio/support/constraint'
TypeFactory = require '../../../src/finitio/support/factory'
should      = require 'should'

describe 'TypeFactory#constraint', ->

  factory = new TypeFactory

  describe 'with a callback', ->
    subject = factory.constraint (i)->
      i>0

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Constraint)
      subject.name.should.equal('default')
      subject.accept(12).should.be.true
      subject.accept(-12).should.be.false

  describe 'with only a function', ->
    subject = factory.constraint((i)-> i>0)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Constraint)
      subject.name.should.equal('default')
      subject.accept(12).should.be.true
      subject.accept(-12).should.be.false

  describe 'with a name and a function', ->
    subject = factory.constraint('positive', (i)-> i>0)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Constraint)
      subject.name.should.equal('positive')
      subject.accept(12).should.be.true
      subject.accept(-12).should.be.false

  describe 'with only a regexp', ->
    subject = factory.constraint(/[a-z]+/)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Constraint)
      subject.name.should.equal('default')
      subject.accept("12").should.be.false
      subject.accept("word").should.be.true

  describe 'with a constraint', ->
    c = new Constraint('def', (i)-> i>0)
    subject = factory.constraint(c)

    it 'should work as expected', ->
      subject.should.equal(c)
