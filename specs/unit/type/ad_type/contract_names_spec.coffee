AdType         = require '../../../../src/type/ad_type'
{TypeError,
ArgumentError} = require '../../../../src/errors'
should         = require 'should'
{intType,
stringType}    = require '../../../spec_helpers'


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
