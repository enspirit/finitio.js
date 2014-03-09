Attribute   = require '../../../../src/support/attribute'
Heading     = require '../../../../src/support/heading'
TypeFactory = require '../../../../src/support/factory'
BuiltinType = require '../../../../src/type/builtin_type'
should      = require 'should'
_           = require 'underscore'

describe 'TypeFactory#heading', ->

  factory    = new TypeFactory
  foo        = factory.attribute('foo', Number)
  bar        = factory.attribute('bar', String)
  attributes = [foo, bar]
  expected   = new Heading(attributes)

  describe 'when used with an array of attributes', ->
    subject = factory.heading(attributes)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Heading)
      subject.equals(expected).should.be.true

  describe 'when used with an object name => native', ->
    subject = factory.heading(foo: Number, bar: String)

    it 'should work as expected', ->
      subject.should.be.an.instanceof(Heading)
      subject.equals(expected).should.be.true
