Contract    = require '../../../../src/finitio/support/contract'
AdType      = require '../../../../src/finitio/type/ad_type'
should      = require 'should'
{intType,
stringType} = require '../../../spec_helpers'


describe "AdType#contractNames", ->

  f = (arg)->

  adtype = new AdType(Date, [
    new Contract('timestamp', intType, f, f)
    new Contract('utc',       stringType, f, f)
  ])

  it 'should be as expected', ->
    should(adtype.contractNames()).eql(['timestamp', 'utc'])
