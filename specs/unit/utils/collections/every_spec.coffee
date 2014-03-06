$u      = require '../../../../lib/support/utils'
should  = require 'should'

describe "Utils.collection#every", ->

  describe 'for Arrays,', ->

    describe 'on an empty array', ->
      it "it shouldn't call the callback", ->
        called = false
        $u.every [], (e) -> called = true
        called.should.not.be.true

    describe 'on an array', ->
      it 'should call the callback for all the elements', ->
        copy = []
        expected = [1, 2, 3]
        $u.every expected, (e) -> copy.push(e)
        should(copy).eql(expected)

      it 'should pass the index of the element as second argument', ->
        copy = []
        expected = [0, 1, 2]
        $u.every expected, (e, i) -> copy.push(i)
        should(copy).eql(expected)

  describe 'for Objects,', ->

    describe 'on an empty object', ->
      it "it shouldn't call the callback", ->
        called = false
        $u.every {}, (e) -> called = true
        called.should.not.be.true

    describe 'on an object', ->
      it 'should call the callback for all the elements', ->
        object   = {foo: 'bar'}
        copy     = []
        expected = ['bar']
        $u.every object, (v) -> copy.push(v)
        should(copy).eql(expected)

      it 'should pass the object keys as second argument', ->
        copy     = {}
        object   = {foo: 'bar'}
        $u.every object, (v,k) -> copy[k] = v
        should(copy).eql(object)

  describe 'for Strings, ', ->

    describe 'on an empty string', ->
      it "it shouldn't call the callback", ->
        called = false
        $u.every "", (e) -> called = true
        called.should.not.be.true

    describe 'on an string', ->
      it 'should call the callback for all the letters', ->
        copy     = ""
        expected = "foo bar"
        $u.every expected, (c) -> copy += c
        should(copy).eql(expected)

      it 'should pass the letter position as second argument', ->
        indexes  = []
        str      = "foo"
        $u.every str, (c,i) -> indexes.push(i)
        should(indexes).eql([0, 1, 2])

  describe 'on other types', ->
    for i, obj of [null, undefined, new Date(), /foo.*bar/]
      describe "like #{obj}", ->
        it 'throws an error', ->
          should(-> $u.every(obj)).throw(/Enumerable .* expected/)

