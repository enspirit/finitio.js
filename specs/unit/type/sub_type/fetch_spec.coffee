Constraint  = require '../../../../src/finitio/support/constraint'
SubType     = require '../../../../src/finitio/type/sub_type'
should      = require 'should'
{numType,
stringType} = require '../../../spec_helpers'

describe "SubType#fetch", ->

  _default = new Constraint.Native('default', (i) -> i > 0)
  _small   = new Constraint.Native('small', (i) -> i < 255)

  t = new SubType(numType, [_default, _small], "byte")

  it 'on works on an existing constraint', ->
    should(t.fetch('default')).equal(_default)
    should(t.fetch('small')).equal(_small)

  it 'yields the block when missing', ->
    got = t.fetch 'none', ()-> 12
    should(got).equal(12)

  it 'throws when no missing handler', ->
    l = ()-> t.fetch 'none'
    should(l).throw("No such constraint `none`")
