Finitio     = require '../../src/finitio'
Type        = require '../../src/finitio/type'
SubType     = require '../../src/finitio/type/sub_type'
System      = require '../../src/finitio/system'
{TypeError} = require '../../src/finitio/errors'

should   = require 'should'

describe 'Finitio', ->

  it "should have a version number", ->
    (typeof Finitio.VERSION).should.not.equal('undefined')
    (Finitio.VERSION?).should.be.true

  it 'should have a compile method', ->
    Finitio.compile(".Number").should.be.an.instanceof System
