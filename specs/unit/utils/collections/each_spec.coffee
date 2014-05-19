$u      = require '../../../../src/finitio/support/utils'
should  = require 'should'

describe "Utils.collection#each", ->

  it "allows callback to be undefined", ->
    lambda = -> $u.each [1, 2, 3]

    should(lambda).not.throw()

  it "raises an error if callback is null", ->
    lambda = -> $u.each [1, 2, 3], null

    should(lambda).throw(/Function expected, got null/)

  describe 'for Arrays,', ->

    describe 'on an empty array', ->
      it "it shouldn't call the callback", ->
        called = false
        $u.each [], (e) -> called = true
        called.should.not.be.true

    describe 'on an array', ->
      it 'should call the callback for all the elements', ->
        copy = []
        expected = [1, 2, 3]
        $u.each expected, (e) -> copy.push(e)
        should(copy).eql(expected)

      it 'should pass the index of the element as second argument', ->
        copy = []
        expected = [0, 1, 2]
        $u.each expected, (e, i) -> copy.push(i)
        should(copy).eql(expected)

  describe 'for Objects,', ->

    describe 'on an empty object', ->
      it "it shouldn't call the callback", ->
        called = false
        $u.each {}, (e) -> called = true
        called.should.not.be.true

    describe 'on an object', ->
      it 'should call the callback for all the elements', ->
        object   = {foo: 'bar'}
        copy     = []
        expected = ['bar']
        $u.each object, (v) -> copy.push(v)
        should(copy).eql(expected)

      it 'should pass the object keys as second argument', ->
        copy     = {}
        object   = {foo: 'bar'}
        $u.each object, (v,k) -> copy[k] = v
        should(copy).eql(object)

  describe 'for Strings, ', ->

    describe 'on an empty string', ->
      it "it shouldn't call the callback", ->
        called = false
        $u.each "", (e) -> called = true
        called.should.not.be.true

    describe 'on an string', ->
      it 'should call the callback for all the letters', ->
        copy     = ""
        expected = "foo bar"
        $u.each expected, (c) -> copy += c
        should(copy).eql(expected)

      it 'should pass the letter position as second argument', ->
        indexes  = []
        str      = "foo"
        $u.each str, (c,i) -> indexes.push(i)
        should(indexes).eql([0, 1, 2])

  describe 'on other types', ->
    for i, obj of [null, undefined, new Date(), /foo.*bar/]
      describe "like #{obj}", ->
        it 'throws an error', ->
          should(-> $u.each(obj)).throw(/Enumerable .* expected/)

