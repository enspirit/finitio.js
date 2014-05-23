Constraint = require '../../../../src/finitio/support/constraint'
SubType    = require '../../../../src/finitio/type/sub_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "SubType's information contract", ->

  big  = ()->
  bigC = Constraint.info({
    name: 'big',
    native: big
  })
  info = {
    name: 'Foo',
    superType: intType
    constraints: [ bigC ],
    metadata: { foo: 'bar' }
  }
  t = SubType.info(info)

  it 'dresses as expected', ->
    should(t).be.an.instanceof(SubType)
    should(t.name).eql('Foo')
    should(t.constraints).eql([bigC])
    should(t.metadata).eql({ foo: "bar" })

  it 'undresses as expected', ->
    should(t.toInfo()).eql(info)
