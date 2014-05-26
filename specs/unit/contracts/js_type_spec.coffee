should = require('should')
JsType = require('../../../src/finitio/contracts/js_type').name

describe "JsType#dress", ->

  it 'resolves standard constants without a world', ->
    should(JsType.dress("Boolean")).eql(Boolean)

  it 'restricts to the world if provided', ->
    should(JsType.dress("Boolean", { 'Boolean': String })).eql(String)
