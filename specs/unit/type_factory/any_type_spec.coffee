TypeFactory = require '../../../src/finitio/support/factory'
AnyType     = require '../../../src/finitio/type/any_type'
should      = require 'should'

describe "TypeFactory#any", ->

  factory = new TypeFactory

  expected = new AnyType

  describe 'when called', ->
    subject = factory.any()

    it 'should give expected result', ->
      subject.equals(expected).should.be.true

  describe 'when called with a name', ->
    subject = factory.any("MyAny")

    it 'should give expected result', ->
      subject.equals(expected).should.be.true

    it 'should have the correct name', ->
      subject.name.should.equal("MyAny")

