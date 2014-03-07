$u      = (require '../../../../lib/support/utils')
should  = require 'should'

describe "Utils.utility#deepClone", ->

  subject = (obj) -> $u.deepClone(obj)

  describe 'for null or undefined', ->
    it 'throws an error', ->
      for i, obj of [null, undefined]
        should(-> subject(obj)).throw(/Object expected, got .*/)

  describe 'for array', ->
    it 'should return an array', ->
      subject([]).should.be.an.instanceof Array

    it 'should return a different instance', ->
      original = [1, 2, 3]
      clone = subject(original)

      original.push(4)

      $u.size(original).should.equal(4)
      $u.size(clone).should.equal(3)

    it 'should clone correctly', ->
      original = [null, undefined, 3, '4', /.*/]
      clone = subject(original)

      should(clone).eql(original)

  describe 'for Function', ->
    it 'should return a Function', ->
      subject(Date).should.equal(Date)

  describe 'for object', ->
    it 'should return an object', ->
      subject({}).should.be.an.instanceof Object

    it 'should return a different instance', ->
      original = {foo: 'bar', array: [1, 2, 33]}
      clone = subject(original)

      #
      original.foo = 'BAR'

      original.foo.should.eql("BAR")
      clone.foo.should.eql("bar")

      #
      original.array.push(100)
      original.array[3].should.eql(100)
      original.array.length.should.eql(4)
      clone.array.length.should.eql(3)

  describe 'for string', ->
    it 'should return a string', ->
      subject("foo").should.be.an.instanceof String

    it 'should return a copy', ->
      original = "hello world"
      clone = subject(original)

      clone.should.equal("hello world")
