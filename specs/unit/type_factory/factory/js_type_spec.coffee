TypeFactory     = require '../../../../src/support/factory'
{TypeError, ArgumentError} = require '../../../../src/errors'
should          = require 'should'

describe 'TypeFactory#jsType', ->

  factory = new TypeFactory(X: { Y: { z: ( ()-> 12 ) } })

  describe 'when used with a JS class', ->
    subject = factory.jsType(Number)

    it 'should work as expected', ->
      subject.should.equal(Number)

  describe 'when used with a JS class name', ->
    subject = factory.jsType('Number')

    it 'should work as expected', ->
      subject.should.equal(Number)

  describe 'when used with an existing qualified name', ->
    subject = factory.jsType('X.Y.z')

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Function)
      subject().should.equal(12)

  describe 'when used with a non existing qualified name', ->
    subject = ->
      factory.jsType('X.Z')

    it 'should raise an error', ->
      should(subject).throw(new ArgumentError("Unknown type X.Z"))
