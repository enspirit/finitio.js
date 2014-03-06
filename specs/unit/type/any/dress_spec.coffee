AnyType     = require '../../../../lib/type/any_type'
{TypeError} = require '../../../../lib/errors'

should = require("should")

describe "AnyType#dress", ->

  type = new AnyType('any')

  subject = (arg) ->
    type.dress(arg)

  describe 'with a Number', ->
    subject(42).should.equal(42)

  describe 'with a String', ->
    subject("foo").should.equal("foo")

  describe 'with a Boolean', ->
    subject(true).should.equal(true)

  describe 'with a Date', ->
    d = new Date()
    subject(d).should.equal(d)

  describe 'with a Regex', ->
    r = /foo.*bar/
    subject(r).should.equal(r)

  describe 'with null', ->
    res = subject(null)
    should(res).eql(null)

  describe 'with undefined', ->
    res = subject(undefined)
    should(res).eql(undefined)

  describe 'with an array', ->
    a = [1, 2, 3]
    subject(a).should.equal(a)

  describe 'with an object', ->
    o = {'foo': 'bar'}
    subject(o).should.equal(o)