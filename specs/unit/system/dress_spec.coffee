Qjs         = require '../../../lib/qjs'
{TypeError} = require '../../../lib/errors'
System      = require '../../../lib/system'
should      = require 'should'

describe 'System#dress', ->

  describe "when a main", ->
    system = Qjs.parse(".Number")

    it 'delegates to the main', ->
      system.dress(12).should.equal(12)
      try
        system.dress("foo")
      catch e
        error = e
      error.should.be.an.instanceof(TypeError)

  describe "when no main", ->
    system = Qjs.parse("Num = .Number")

    it 'throws an Error', ->
      try
        system.dress("foo")
      catch e
        error = e
      error.should.be.an.instanceof(Error)
      error.message.should.equal("No main on System")
