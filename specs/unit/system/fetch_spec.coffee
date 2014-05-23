System      = require '../../../src/finitio/system'
AliasType   = require '../../../src/finitio/type/alias_type'
{numType}   = require '../../spec_helpers'
should      = require 'should'

describe 'System#fetch', ->

  system = new System

  beforeEach ->
    system = new System
    system.addType(numType)
    system.addType(new AliasType(numType, 'Main'))

  subject = (name) -> system.fetch(name)

  it 'returns a type by name', ->
    should(subject("numType")).equal(numType)

  it 'returns Main as well', ->
    should(subject("Main")).be.an.instanceof(AliasType)

  it 'throws with a non existing type name and no callback', ->
    lambda = -> subject("noSuchOne")
    should(lambda).throw(/No such type `noSuchOne`/)

  it 'yields the callback otherwise', ->
    lambda = ->
      system.fetch("noSuchOne", -> "bar")
    should(lambda).not.throw()
    should(lambda()).equal("bar")
