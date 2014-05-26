Contract  = require '../../../src/finitio/support/contract'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Contract's information contract", ->

  fromIso = ()->
  toIso = ()->

  Explicit = { dress: fromIso, undress: toIso }
  External = { dress: fromIso, undress: toIso }
  Internal = {}

  context 'with an explicit pair', ->
    info = {
      name: 'iso',
      infoType: intType,
      explicit: Explicit,
      metadata: {foo: 'bar'}
    }
    contract = Contract.info(info)

    it 'dresses as expected', ->
      should(contract).be.an.instanceof(Contract.Explicit)
      should(contract.name).equal('iso')
      should(contract.infoType).equal(intType)
      should(contract.native).equal(Explicit)
      should(contract.metadata).eql({foo: 'bar'})

    it 'undresses as expected', ->
      should(contract.toInfo()).eql(info)

  context 'with an external one', ->
    info = {
      name: 'iso',
      infoType: intType,
      external: External,
      metadata: {foo: 'bar'}
    }
    contract = Contract.info(info)

    it 'dresses as expected', ->
      should(contract).be.an.instanceof(Contract.External)
      should(contract.name).equal('iso')
      should(contract.infoType).equal(intType)
      should(contract.native).equal(External)
      should(contract.metadata).eql({foo: 'bar'})

    it 'undresses as expected', ->
      should(contract.toInfo()).eql(info)

  context 'with an internal one', ->
    info = {
      name: 'iso',
      infoType: intType,
      internal: Internal,
      metadata: {foo: 'bar'}
    }
    contract = Contract.info(info)

    it 'dresses as expected', ->
      should(contract).be.an.instanceof(Contract.Internal)
      should(contract.name).equal('iso')
      should(contract.infoType).equal(intType)
      should(contract.native).equal(Internal)
      should(contract.metadata).eql({foo: 'bar'})

    it 'undresses as expected', ->
      should(contract.toInfo()).eql(info)
