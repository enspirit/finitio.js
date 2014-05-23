Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract's information contract", ->

  fromIso = ()->
  toIso = ()->
  info = {
    name: 'iso',
    infoType: intType,
    dresser: fromIso,
    undresser: toIso,
    metadata: {foo: 'bar'}
  }
  contract = Contract.info(info)

  it 'dresses as expected', ->
    should(contract).be.an.instanceof(Contract)
    should(contract.name).equal('iso')
    should(contract.infoType).equal(intType)
    should(contract.dresser).equal(fromIso)
    should(contract.undresser).equal(toIso)

  it 'undresses as expected', ->
    should(contract.toInfo()).eql(info)
