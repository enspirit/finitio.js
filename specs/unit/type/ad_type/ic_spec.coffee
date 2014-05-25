Contract  = require '../../../../src/finitio/support/contract'
AdType    = require '../../../../src/finitio/type/ad_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "AdType's information contract", ->

  fromIso = ()->
  toIso = ()->
  contract = Contract.info({
    name: 'iso',
    infoType: intType,
    dresser: fromIso,
    undresser: toIso,
    metadata: {foo: 'bar'}
  })
  info = {
    contracts: [contract],
    metadata: {foo: 'bar'}
  }
  type = AdType.info(info)

  it 'dresses as expected', ->
    should(type).be.an.instanceof(AdType)
    should(type.contracts).eql([contract])
    should(type.metadata).eql({foo: 'bar'})

  it 'undresses as expected', ->
    should(type.toInfo()).eql(info)
