System      = require '../../../src/finitio/system'
TypeDef   = require '../../../src/finitio/type/type_def'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'System#fetch', ->

  system = new System

  beforeEach ->
    system = new System
    system.addType(numType)
    system.addType(new TypeDef(numType, 'Main'))

  subject = (name) -> system.fetch(name)

  it 'returns Main', ->
    should(subject("Main")).be.an.instanceof(TypeDef)

  it 'throws with a non existing type name and no callback', ->
    lambda = -> subject("noSuchOne")
    should(lambda).throw(/No such type `noSuchOne`/)

  it 'yields the callback otherwise', ->
    lambda = ->
      system.fetch("noSuchOne", -> "bar")
    should(lambda).not.throw()
    should(lambda()).equal("bar")
