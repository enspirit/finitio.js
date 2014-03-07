_          = require 'underscore'
DataType   = require '../../../lib/data_type'
should     = require 'should'
{byteType} = require '../../spec_helpers'

describe "Using Q's abstract data types in JavaScript", ->

  class MyColor

    constructor: (@r, @g, @b) ->

    toRgb: ->
      { r: @r, g: @g, b: @b }

    @rgb: (tuple) ->
      new MyColor(tuple.r, tuple.g, tuple.b)

  _.extend MyColor, DataType

  MyColor.contract 'rgb', {r: byteType, g: byteType, b: byteType}

  ####

  describe 'The example class', ->
    it 'should be a class', ->
      MyColor.should.be.an.instanceof(Function)

  describe 'the dress method, when valid', ->

    subject = MyColor.dress(r: 12, g: 13, b: 28)

    it 'should be an instance of the example class', ->
      subject.should.be.an.instanceof MyColor

    it 'should set the instance variables correctly', ->
      subject.r.should.equal(12)
      subject.g.should.equal(13)
      subject.b.should.equal(28)

  describe 'the up method, when already a color', ->
    value = new MyColor(12, 13, 28)

    subject = MyColor.dress(value)

    it 'should remain the same', ->
      subject.should.equal(value)
