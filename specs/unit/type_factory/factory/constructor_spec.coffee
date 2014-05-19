TypeFactory = require '../../../../src/finitio/support/factory'
should      = require 'should'

describe "TypeFactory constructor", ->

  describe 'without argument', ->
    factory = new TypeFactory

    it 'has the expected world', ->
      factory.world['Number'].should.equal(Number)

  describe 'without a world', ->
    factory = new TypeFactory('X': 12)

    it 'has the original world', ->
      factory.world['Number'].should.equal(Number)

    it 'has the new world too', ->
      factory.world['X'].should.equal(12)
