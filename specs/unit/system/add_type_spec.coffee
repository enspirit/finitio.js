System    = require '../../../src/finitio/system'
{numType} = require '../../spec_helpers'
TypeDef = require '../../../src/finitio/type/type_def'
should = require 'should'

describe "System#addType", ->

  describe 'with a valid type', ->
    system = new System

    res = system.addType(numType)

    it 'should return the created type', ->
      should(res).equal(numType)

  describe 'with an invalid type', ->
    system = new System

    lambda = -> system.addType("foo")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.message.should.equal 'Finitio.Type expected, got: foo'

  describe 'with a duplicate type name', ->
    system = new System
    system.addType(TypeDef.info({ type: numType, name: 'Int' }))

    lambda = ->
      system.addType(TypeDef.info({ type: numType, name: 'Int' }))

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.message.should.equal "Duplicate type `Int`"
