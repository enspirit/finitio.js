Constraint  = require '../../../../src/finitio/support/constraint'
SubType     = require '../../../../src/finitio/type/sub_type'
should      = require 'should'
{numType,
stringType} = require '../../../spec_helpers'

describe 'SubType#equals', ->

  fn1 = (i) -> i > 0
  fn2 = (i) -> i < 255
  c1 = new Constraint.Native('default', fn1)
  c2 = new Constraint.Native('anothername', fn1)
  c3 = new Constraint.Native('small', fn2)

  type  = new SubType(numType, [c1])
  type2 = new SubType(numType, [c1])
  type3 = new SubType(numType, [c2])
  type4 = new SubType(numType, [c3])
  type5 = new SubType(stringType, [c1])

  it 'should apply structural equivalence', ->
    type.equals(type2).should.be.true
    type.equals(type3).should.be.true

  it 'should apply distinguish different types', ->
    type.equals(type4).should.be.false
    type.equals(type5).should.be.false

  it 'should be a total function, with null for non types', ->
    type.equals(12).should.be.false
