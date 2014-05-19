ProxyType = require '../../../../src/finitio/type/proxy_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "ProxyType#initialize", ->

  it 'creates a valid type', ->
    t = new ProxyType("int")
    should(t).be.an.instanceOf(ProxyType)

  it 'supports setting the target', ->
    t = new ProxyType("int", intType)
    should(t.target).equal(intType)

  it 'raises without the proxied name', ->
    l = ()-> new ProxyType(null)
    should(l).throw()
