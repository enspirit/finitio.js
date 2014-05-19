Constraint  = require '../../../../src/finitio/support/constraint'
SubType     = require '../../../../src/finitio/type/sub_type'
should      = require 'should'
{numType}   = require '../../../spec_helpers'

describe "SubType#name", ->

  get = (type) -> type.name

  describe 'when provided', ->
    c = new Constraint("default", (i)-> true)
    subject = get(new SubType(numType, [ c ], "Foo"))

    it 'uses the specified one', ->
      subject.should.equal("Foo")

  describe 'when not provided', ->
    c = new Constraint('byte', (i)->)
    subject = get(new SubType(numType, [c]))

    it 'uses the first constraint name', ->
      subject.should.equal("Byte")
