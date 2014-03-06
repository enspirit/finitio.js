AdType  = require '../../../../lib/type/ad_type'
should  = require 'should'

describe "AdType#defaultName", ->

  type = new AdType(Date, {
    timestamp:  [intType,    Date, Date]
    utc_string: [stringType, Date, Date]})

  type.name.should.equal('Date')
