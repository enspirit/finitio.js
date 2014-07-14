Contract  = require '../../../../src/finitio/support/contract'
AdType    = require '../../../../src/finitio/type/ad_type'
should    = require 'should'
AnyType   = require '../../../../src/finitio/type/any_type'

describe "AdType's information contract", ->

  fn = ()->
  anyType = new AnyType()
  iso = Contract.info({
    name: 'iso'
    infoType: anyType
    explicit: { dress: fn, undress: fn }
  })
  asi = Contract.info({
    name: 'asi'
    infoType: anyType
    explicit: { dress: fn, undress: fn }
  })
  type = AdType.info({ contracts: [iso, asi] })

  it 'works', ->
    should(type.toString()).equal("<iso> ., <asi> .")
