SetType         = require '../../../../src/type/set_type'
_               = require 'underscore'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "SetType#name", ->

  describe 'when not specified', ->
    type = new SetType(intType)

    type.name.should.equal('{intType}')

  describe 'when specified', ->
    type = new SetType(intType, "foo")

    type.name.should.equal('foo')
