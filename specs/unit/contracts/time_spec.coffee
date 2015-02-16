should = require('should')
TimeC  = require('../../../src/finitio/contracts/time')

describe "Time.milliseconds", ->

  it 'dress works', ->
    got = TimeC.milliseconds.dress(1424041200000)
    should(got).be.an.instanceof(Date)
    should(got.getFullYear()).eql(2015);
    should(got.getTime()).eql(1424041200000);

  it 'undress works', ->
    date = new Date(Date.parse("2015-02-15T23:00:00.000Z"));
    got = TimeC.milliseconds.undress(date)
    should(got).be.an.instanceof(Number)
    should(got).eql(1424041200000);
