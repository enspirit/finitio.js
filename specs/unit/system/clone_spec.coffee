System      = require '../../../src/finitio/system'
TypeDef     = require '../../../src/finitio/type/type_def'
should      = require 'should'
{numType,
stringType} = require '../../spec_helpers'

describe "System#clone", ->

  system = System.info({
    types: [ TypeDef.info({ name: "Int", type: numType }) ]
  })

  subject = -> system.clone()

  it 'should return a System', ->
    should(subject()).be.an.instanceof(System)

  it 'should not be the same object', ->
    should(subject()).not.equal(system)

  it 'should have numType', ->
    should(subject().types[0].type).equal(numType)

