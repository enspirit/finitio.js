Constraint = require '../../../../src/finitio/support/constraint'
SubType    = require '../../../../src/finitio/type/sub_type'
should     = require 'should'
_          = require 'underscore'
{numType}  = require '../../../spec_helpers'

describe "SubType#constructor", ->

  c1 = new Constraint.Native('a', (i) -> i > 0)
  c2 = new Constraint.Native('b', (i) -> i < 255)

  sub = new SubType(numType, [c1, c2])

  it 'sets the variable instances', ->
    sub.superType.should.equal(numType)
    _.isEqual(sub.constraints, [c1, c2]).should.be.true
