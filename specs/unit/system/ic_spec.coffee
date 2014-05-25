System    = require '../../../src/finitio/system'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "System's information contract", ->

  info = {
    imports: {}
    uses: []
    types: [ intType ]
  }
  s = System.info(info)

  it 'dresses as expected', ->
    should(s).be.an.instanceof(System)
    should(s.types.length).equal(1)

  it 'undresses as expected', ->
    should(s.toInfo()).eql(info)
