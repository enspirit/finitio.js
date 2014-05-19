Constraint  = require '../../../../src/finitio/support/constraint'
SubType     = require '../../../../src/finitio/type/sub_type'
should      = require 'should'
{numType}   = require '../../../spec_helpers'

describe "SubType#name", ->

  get = (type) -> type.name

  describe 'when provided', ->
    subject = get(new SubType(numType, [ new Constraint("default", (i)-> true) ], "Foo"))

    it 'uses the specified one', ->
      subject.should.equal("Foo")

  describe 'when not provided', ->
    subject = get(new SubType(numType, [new Constraint('byte', (i)->)]))

    it 'uses the first constraint name', ->
      subject.should.equal("Byte")
