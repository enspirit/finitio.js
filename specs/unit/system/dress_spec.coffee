Finitio         = require '../../../src/finitio'
{TypeError} = require '../../../src/finitio/errors'
System      = require '../../../src/finitio/system'
should      = require 'should'

describe 'System#dress', ->

  describe "when a main", ->
    system = Finitio.system(".Number")

    it 'delegates to the main', ->
      system.dress(12).should.equal(12)
      try
        system.dress("foo")
      catch e
        error = e
      should(error).be.an.instanceof(TypeError)

  describe "when no main", ->
    system = Finitio.system("Num = .Number")

    it 'throws an Error', ->
      try
        system.dress("foo")
      catch e
        error = e
      should(error).be.an.instanceof(Error)
      should(error.message).equal("No main on System")
