{ArgumentError} = require '../../../../lib/errors'
UnionType       = require '../../../../lib/type/union_type'
should          = require 'should'
_               = require 'underscore'
{intType,
floatType}      = require '../../../spec_helpers'

describe "UnionType#constructor", ->

  describe 'with valid candidates', ->
    # Let's reinvent JS' Number
    union = new UnionType([intType, floatType])

    it 'sets the variable instances', ->
      _.isEqual(union.candidates, [intType, floatType]).should.be.true

  describe 'with invalid candidates', ->
    lambda = ->
      union = new UnionType(["bar"])

    it 'should throw an error', ->
      should(lambda).throw()

    it 'should throw an ArgumentError', ->
      try
        lambda()
      catch e
        e.should.be.an.instanceof(ArgumentError)
        e.message.should.equal('Qjs.Type expected, got String')
