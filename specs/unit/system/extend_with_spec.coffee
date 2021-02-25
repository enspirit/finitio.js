System      = require '../../../src/finitio/system'
TypeDef     = require '../../../src/finitio/type/type_def'
should      = require 'should'
{numType,
stringType} = require '../../spec_helpers'

describe "System#extendWith", ->

  system = System.info({
    types: [ TypeDef.info({ name: "Int", type: numType }) ]
  })

  subject = -> system.subsystem("
    Person = { age: Int }
  ")

  it 'should return a System', ->
    try
      should(subject()).be.an.instanceof(System)
    catch e
      console.error(e)
      throw e

  it 'should not be the same object', ->
    should(subject()).not.equal(system)

  it 'should have numType', ->
    should(subject().types[0].type).equal(numType)

  it 'should have Person', ->
    system = subject()
    type = system.types.find((t) -> t.name == "Person")
    should(type).be.an.instanceof(TypeDef)

