ProxyType = require '../../../../src/finitio/type/proxy_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "ProxyType#defaultName", ->

  it 'when not resolved', ->
    t = new ProxyType("Int")
    should(t.defaultName()).equal('Int')

  it 'when resolved', ->
    t = new ProxyType("Int", intType)
    should(t.defaultName()).equal(intType.defaultName())
