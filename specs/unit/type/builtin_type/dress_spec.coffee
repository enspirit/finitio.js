BuiltinType = require '../../../../src/finitio/type/builtin_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'

describe "BuiltinType#dress", ->

  type = new BuiltinType(Number, 'num')

  subject = (arg) ->
    type.dress(arg)

  it 'is robust enough', ->
    should(-> type.dress(null)).throw(new TypeError("Invalid value `null` for num"))
    should(-> type.dress()).throw(new TypeError("Invalid value `undefined` for num"))

  describe 'with an integer', ->
    subject(12).should.equal(12)

  describe 'with a float', ->
    subject(3.14).should.equal(3.14)

  describe 'with a String', ->

    lambda = ->
      subject("Hello World!")

    it 'should throw an Error', ->
      should(lambda).throw()

    it 'should throw a TypeError', ->
      error = null
      try
        lambda()
      catch e
        error = e

      error.should.be.an.instanceof(TypeError)
      error.message.should.equal("Invalid value `Hello World!` for num")
      error.location.should.equal('')
