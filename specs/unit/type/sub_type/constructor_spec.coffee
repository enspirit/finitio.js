SubType = require '../../../../lib/type/sub_type'
should  = require 'should'
_       = require 'underscore'

describe "SubType#constructor", ->

  c1 = (i) -> i > 0
  c2 = (i) -> i < 255

  sub = new SubType(numType, positive: c1, small: c2)

  it 'sets the variable instances', ->
    sub.superType.should.equal(numType)
    _.isEqual(sub.constraints, {positive: c1, small: c2}).should.be.true
