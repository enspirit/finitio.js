AdType         = require '../../../../lib/type/ad_type'
{TypeError,
ArgumentError} = require '../../../../lib/errors'
should         = require 'should'

describe "AdType#contractNames", ->

  adtype = new AdType(Date, {
    timestamp:  [intType,    Date, Date]
    utc_string: [stringType, Date, Date]})

  subject = adtype.contractNames()

  it 'should be as expected', ->
    subject.should.be.an.instanceof(Array)
    subject.length.should.equal(2)
    subject[0].should.equal('timestamp')
    subject[1].should.equal('utc_string')
