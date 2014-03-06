TypeFactory = require '../../../../lib/support/factory'
should      = require 'should'

describe 'TypeFactory#builtin', ->

  factory = new TypeFactory

  describe 'when used with a JS class', ->
    subject = factory.type(Number)

    it 'should work as expected', ->
      subject.equals(numType).should.be.true

  describe 'when used with a JS class and a name', ->
    subject = factory.type(Number, 'Num')
    subject.equals(numType).should.be.true

    it 'should have the correct name', ->
      subject.name.should.equal("Num")
