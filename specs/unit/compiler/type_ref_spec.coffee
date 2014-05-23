Contract  = require '../../../src/finitio/support/contract'
System    = require '../../../src/finitio/system'
Compiler  = require '../../../src/finitio/compiler'
AdType    = require '../../../src/finitio/type/ad_type'
ProxyType = require '../../../src/finitio/type/proxy_type'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Compiler#typeRef", ->

  id = ()->

  system = new System
  system.addType(intType)
  system.addType(new AdType(Date, [
    new Contract('timestamp', intType, id, id)
  ], 'Date'))

  compiler = new Compiler({ system: system })

  it 'creates a proxy if the type exists', ->
    should(compiler.typeRef(intType.name)).be.an.instanceof(ProxyType)

  it 'creates a proxy if type does not exists', ->
    should(compiler.typeRef('nosuchone')).be.an.instanceof(ProxyType)

  it 'supports denoting types through information contracts', ->
    should(compiler.typeRef('Date/timestamp')).be.an.instanceof(ProxyType)
