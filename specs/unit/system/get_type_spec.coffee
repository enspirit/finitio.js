System    = require '../../../lib/system'
TupleType = require '../../../lib/type/tuple_type'

should = require 'should'

describe "System#[]", ->

  system = new System

  beforeEach ->
    system = new System
    system.addType(numType)
  
  subject = (name) -> system[name]

  describe 'with an existing type name', ->
    name = "numType"

    it 'should return the type', ->
      subject(name).should.equal(numType)

  describe 'with a non existing type name', ->
    name = "noSuchOne"

    it 'should return nil', ->
      should.equal(subject(name), null)