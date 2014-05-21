Contract    = require '../../../../src/finitio/support/contract'
AdType      = require '../../../../src/finitio/type/ad_type'
should      = require 'should'
{intType,
stringType} = require '../../../spec_helpers'

describe "AdType#fetch", ->

  f  = (arg)->
  c1 = new Contract('timestamp', intType,    f, f)
  c2 = new Contract('utc',       stringType, f, f)
  t  = new AdType(Date, [c1, c2])

  it 'on works on an existing contract', ->
    should(t.fetch('timestamp')).equal(c1)
    should(t.fetch('utc')).equal(c2)

  it 'yields the block when missing', ->
    got = t.fetch 'none', ()-> 12
    should(got).equal(12)

  it 'throws when no missing handler', ->
    l = ()-> t.fetch 'none'
    should(l).throw("No such contract `none`")
