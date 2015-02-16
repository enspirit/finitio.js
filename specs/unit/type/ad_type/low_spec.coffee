Contract  = require '../../../../src/finitio/support/contract'
AdType    = require '../../../../src/finitio/type/ad_type'
should    = require 'should'
BuiltinType = require '../../../../src/finitio/type/builtin_type'

describe "AdType#low", ->

  fn = ()->

  c1Type = new BuiltinType(Number)

  c2Type = new BuiltinType(String)

  iso = Contract.info({
    name: 'iso'
    infoType: c1Type
    explicit: { dress: fn, undress: fn }
  })

  asi = Contract.info({
    name: 'asi'
    infoType: c2Type
    explicit: { dress: fn, undress: fn }
  })

  type = AdType.info({ contracts: [iso, asi] })

  it 'works', ->
    should(type.low()).equal(c1Type.low())
