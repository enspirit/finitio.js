SeqType         = require '../../../../lib/type/seq_type'
_               = require 'underscore'
should          = require 'should'

describe "SeqType#name", ->

  describe 'when not specified', ->
    type = new SeqType(intType)
    
    type.name.should.equal('[intType]')
  
  describe 'when specified', ->
    type = new SeqType(intType, "foo")
    
    type.name.should.equal('foo')
