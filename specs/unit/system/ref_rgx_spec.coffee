System = require '../../../src/finitio/system'
should = require 'should'

describe "System.REF_RGX", ->

  it 'recognizes unqualified references', ->
    x = "Integer".match(System.REF_RGX)
    should(x[1]).eql(undefined)
    should(x[2]).eql("Integer")

  it 'recognizes qualified references', ->
    x = "data.Integer".match(System.REF_RGX)
    should(x[1]).eql("data")
    should(x[2]).eql("Integer")

  it 'recognizes x.B', ->
    x = "x.B".match(System.REF_RGX)
    should(x[1]).eql("x")
    should(x[2]).eql("B")
