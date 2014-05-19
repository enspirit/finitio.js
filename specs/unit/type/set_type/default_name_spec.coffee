SetType         = require '../../../../src/finitio/type/set_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "SetType#defaultName", ->

  it 'works', ->
    type = new SetType(intType, "foo")
    subject = type.defaultName()
    subject.should.equal('{intType}')
