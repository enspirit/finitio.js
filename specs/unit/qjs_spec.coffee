Qjs         = require '../../src/qjs'
Type        = require '../../src/type'
SubType     = require '../../src/type/sub_type'
System      = require '../../src/system'
{TypeError} = require '../../src/errors'

should   = require 'should'

describe 'Qjs', ->

  it "should have a version number", ->
    (typeof Qjs.VERSION).should.not.equal('undefined')
    (Qjs.VERSION?).should.be.true

  it 'should have DSL methods', ->
    t = Qjs.type Number, (i) ->
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
    Qjs.parse(".Number").should.be.an.instanceof System
