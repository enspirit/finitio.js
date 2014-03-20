Finitio         = require '../../../src/finitio'
{TypeError} = require '../../../src/errors'
System      = require '../../../src/system'
should      = require 'should'

describe 'System#dress', ->

  describe "when a main", ->
    system = Finitio.parse(".Number")

    it 'delegates to the main', ->
      system.dress(12).should.equal(12)
      try
        system.dress("foo")
      catch e
        error = e
      error.should.be.an.instanceof(TypeError)

  describe "when no main", ->
    system = Finitio.parse("Num = .Number")

    it 'throws an Error', ->
      try
        system.dress("foo")
      catch e
        error = e
      error.should.be.an.instanceof(Error)
      error.message.should.equal("No main on System")
