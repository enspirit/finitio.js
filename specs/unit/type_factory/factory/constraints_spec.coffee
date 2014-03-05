Constraint  = require '../../../../lib/support/constraint'
TypeFactory = require '../../../../lib/support/factory'
should      = require 'should'

describe 'TypeFactory#constraints', ->

  factory = new TypeFactory

  describe 'with a callback', ->
    subject = factory.constraints (i)->
      i>0

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Array)
      subject.length.should.equal(1)
      subject[0].should.be.an.instanceof(Constraint)

  #
  describe 'with a regexp', ->
    regexp  = /[a-z]/
    subject = factory.constraints regexp

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Array)
      subject.length.should.equal(1)
      subject[0].should.be.an.instanceof(Constraint)
