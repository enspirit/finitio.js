Constraint = require '../../../../lib/support/constraint'
SubType    = require '../../../../lib/type/sub_type'
should     = require 'should'

describe 'SubType#defaultName', ->

  type = new SubType(numType, [ new Constraint('posint', (i)->) ])

  it 'uses the first constraint name', ->
    type.defaultName().should.equal("Posint")
