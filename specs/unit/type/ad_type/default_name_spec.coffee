AdType  = require '../../../../src/finitio/type/ad_type'
should  = require 'should'
{intType,
stringType}    = require '../../../spec_helpers'

describe "AdType#defaultName", ->

  contracts = {
    timestamp:  [intType,    Date, Date]
    utc_string: [stringType, Date, Date]
  }

  it 'when not anonymous', ->
    type = new AdType(Date, contracts)

    type.name.should.equal('Date')

  it 'when anonymous', ->
    type = new AdType(null, contracts)

    type.name.should.equal('Anonymous')
