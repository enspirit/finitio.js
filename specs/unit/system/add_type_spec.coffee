{ArgumentError,
Error} = require '../../../lib/errors'
System = require '../../../lib/system'

should = require 'should'

describe "System#addType", ->

  describe 'with a valid type', ->
    system = new System

    res = system.addType(numType)

    it 'should return the created type', ->
      res.should.equal(numType)

    it 'should add the type', ->
      system[numType.name].should.equal(numType)

  describe 'with an invalid type', ->
    system = new System

    lambda = -> system.addType("foo")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof ArgumentError
      err.message.should.equal 'Qjs.Type expected, got String'

  describe 'with a duplicate type name', ->
    system = new System
    system.addType(numType)

    lambda = ->
      system.addType(numType)

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof Error
      err.message.should.equal "Duplicate type name `numType`"
