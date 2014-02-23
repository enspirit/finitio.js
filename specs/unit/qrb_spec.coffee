Qjs      = require '../../lib/qjs'
{errors} = Qjs
should   = require 'should'

describe 'Qrb', ->

  it "should have a version number", ->
    (typeof Qjs.VERSION).should.not.equal('undefined')
    (Qjs.VERSION?).should.be.true

  it 'should have DSL methods', ->
    t = Qjs.type Number, (i) ->
      i >= 0

    t.should.be.a Qjs.SubType
    t.from_q(12).should.equal(12)
    
    lambda = ->
      t.from_q(-12)

    expect(lambda).toThrow()

    try
      lambda()
    catch e
      expect(e).to.be.an.instanceof(errors.TypeError)
    