Constraint = require '../../../../lib/support/constraint'
SubType    = require '../../../../lib/type/sub_type'
should     = require 'should'
_          = require 'underscore'

describe "SubType#constructor", ->

  c1 = new Constraint('a', (i) -> i > 0)
  c2 = new Constraint('b', (i) -> i < 255)

  sub = new SubType(numType, [c1, c2])

  it 'sets the variable instances', ->
    sub.superType.should.equal(numType)
    _.isEqual(sub.constraints, [c1, c2]).should.be.true
