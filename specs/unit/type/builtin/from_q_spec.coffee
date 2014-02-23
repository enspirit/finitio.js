BuiltinType = require '../../../../lib/type/builtin_type'
{TypeError} = require '../../../../lib/errors'

describe "BuiltinType#fromQ", ->

  type = new BuiltinType(Number, 'num')

  subject = (arg) ->
    type.fromQ(arg)

  describe 'with an integer', ->
    subject(12).should.equal(12);

  describe 'with a float', ->
    subject(3.14).should.equal(3.14);

  describe 'with a String', ->

    lambda = ->
      subject("Hello World!")

    it 'should throw an Error', ->
      expect(lambda).toThrow()
    
    it 'should throw a TypeError', ->
      error = null
      try
        lambda()
      catch e
        error = e

      error.should.be.an.instanceof(TypeError)
      error.message.should.equal("Invalid value `Hello World!` for num")
      error.location.should.equal('')
