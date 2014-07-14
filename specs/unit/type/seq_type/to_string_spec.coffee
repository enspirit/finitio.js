AnyType   = require '../../../../src/finitio/type/any_type'
SeqType   = require '../../../../src/finitio/type/seq_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SeqType#toString", ->

  type = new SeqType(new AnyType())

  it 'works', ->
    should(type.toString()).equal('[.]')
