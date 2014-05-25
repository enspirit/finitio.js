Contract  = require '../../../src/finitio/support/contract'
System    = require '../../../src/finitio/system'
Compiler  = require '../../../src/finitio/compiler'
AdType    = require '../../../src/finitio/type/ad_type'
ProxyType = require '../../../src/finitio/type/proxy_type'
AnyType   = require '../../../src/finitio/type/any_type'
TypeDef = require '../../../src/finitio/type/type_def'
should    = require 'should'

describe "Compiler#typeRef", ->

  id = ()->

  adtype = AdType.info({
    jsType: Date
    contracts: [
      Contract.info({
        name: 'timestamp',
        infoType: AnyType.info({}),
        dresser: id,
        undresser: id
      })
    ]
  })

  alias = new TypeDef(adtype, 'Date')
  
  system = new System
  system.addType(adtype)
  system.addType(alias)

  compiler = new Compiler({ system: system })

  it 'creates a proxy if the type exists', ->
    should(compiler.typeRef('Date')).be.an.instanceof(ProxyType)

  it 'creates a proxy if type does not exists', ->
    should(compiler.typeRef('nosuchone')).be.an.instanceof(ProxyType)

  it 'supports denoting types through information contracts', ->
    should(compiler.typeRef('Date/timestamp')).be.an.instanceof(ProxyType)
