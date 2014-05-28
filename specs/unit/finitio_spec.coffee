Finitio     = require '../../src/finitio'
Type        = require '../../src/finitio/type'
SubType     = require '../../src/finitio/type/sub_type'
System      = require '../../src/finitio/system'
{TypeError} = require '../../src/finitio/errors'

should   = require 'should'

describe 'Finitio', ->

  it "has a version number", ->
    (typeof Finitio.VERSION).should.not.equal('undefined')
    (Finitio.VERSION?).should.be.true

  it 'has a dress method', ->
    Finitio.system(".Number").should.be.an.instanceof System

  it 'has a world utility', ->
    w = Finitio.world(foo: 'bar')
    should(w.foo).eql('bar')
    should(w.Finitio).equal(Finitio)

  it 'has a world utility that merges JsTypes', ->
    w = Finitio.world(JsTypes: { foo: 'bar' })
    should(w.JsTypes.foo).eql('bar')
    should(w.JsTypes.String).equal(String)
