should = require('should')
DateC  = require('../../../src/finitio/contracts/date')

describe "Date.milliseconds", ->

  it 'dress works', ->
    got = DateC.milliseconds.dress(1424041200000)
    should(got).be.an.instanceof(Date)
    should(got.getFullYear()).eql(2015);
    should(got.getTime()).eql(1424041200000);

  it 'undress works', ->
    date = new Date(Date.parse("2015-02-15T23:00:00.000Z"));
    got = DateC.milliseconds.undress(date)
    should(got).be.an.instanceof(Number)
    should(got).eql(1424041200000);
