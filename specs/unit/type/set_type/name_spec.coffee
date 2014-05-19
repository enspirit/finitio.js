SetType   = require '../../../../src/finitio/type/set_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SetType#name", ->

  it 'when not specified', ->
    type = new SetType(intType)

    type.name.should.equal('{intType}')

  it 'when specified', ->
    type = new SetType(intType, "foo")

    type.name.should.equal('foo')
