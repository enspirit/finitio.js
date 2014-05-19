$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.string#capitalize", ->

  subject = (str) -> $u.capitalize(str)

  describe 'on an empty string', ->
    it 'returns the expected result', ->
      subject("").should.equal("")
      subject(" ").should.equal(" ")

  describe 'on a single word', ->
    it 'returns the expected result', ->
      subject("foo").should.equal("Foo")

  describe 'on a capitalized word', ->
    it 'returns the expected result', ->
      subject("Foo").should.equal("Foo")

  describe 'on a word containing underscores', ->
    it 'returns the expected result', ->
      subject("foo_bar").should.equal("FooBar")

  describe 'on a word containing spaces', ->
    it 'returns the expected result', ->
      subject("foo bar").should.equal("FooBar")

  describe 'on non strings', ->
    it 'throws an error', ->
      for i, obj of [null, undefined, [], {}, new Date(), /foo.*bar/]
        should(-> subject(obj)).throw(/String expected, got .*/)
