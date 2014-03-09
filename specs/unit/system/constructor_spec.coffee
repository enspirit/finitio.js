System = require '../../../src/system'
should = require 'should'

describe "System#constructor", ->

  subject = new System()

  it 'should be a System', ->
    subject.should.be.an.instanceof System
