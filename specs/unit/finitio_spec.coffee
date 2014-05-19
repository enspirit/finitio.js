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

  it 'should have DSL methods', ->
    t = Finitio.type Number, (i) ->
      i >= 0

    t.should.be.an.instanceof SubType
    t.dress(12).should.equal(12)

    lambda = ->
      t.dress(-12)

    should(lambda).throw()

    try
      lambda()
    catch e
      e.should.be.an.instanceof(TypeError)

  it 'should have a parse method', ->
    Finitio.parse(".Number").should.be.an.instanceof System
