AnyType     = require '../../../../src/finitio/type/any_type'
{TypeError} = require '../../../../src/finitio/errors'

should = require("should")

describe "AnyType#dress", ->

  type = new AnyType('any')

  subject = (arg) ->
    type.dress(arg)

  describe 'with a Number', ->
    subject(42).should.equal(42)

  describe 'with a String', ->
    subject("foo").should.equal("foo")

  describe 'with null', ->
    res = subject(null)
    should(res).eql(null)

  describe 'with undefined', ->
    res = subject(undefined)
    should(res).eql(undefined)
