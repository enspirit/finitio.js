Contract    = require '../../../../src/finitio/support/contract'
AdType      = require '../../../../src/finitio/type/ad_type'
should  = require 'should'
{intType,
stringType}    = require '../../../spec_helpers'

describe "AdType#defaultName", ->

  f = (arg)->

  contracts = [
    new Contract('timestamp', intType, f, f)
    new Contract('utc',       stringType, f, f)
  ]

  it 'when not anonymous', ->
    type = new AdType(Date, contracts)

    type.name.should.equal('Date')

  it 'when anonymous', ->
    type = new AdType(null, contracts)

    type.name.should.equal('Anonymous')
