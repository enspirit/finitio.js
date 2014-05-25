TypeFactory = require '../../../src/finitio/support/factory'
should      = require 'should'
{numType}   = require '../../spec_helpers'

describe 'TypeFactory#builtin', ->

  factory = new TypeFactory

  describe 'when used with a JS class', ->
    subject = factory.type(Number)

    it 'should work as expected', ->
      subject.equals(numType).should.be.true
