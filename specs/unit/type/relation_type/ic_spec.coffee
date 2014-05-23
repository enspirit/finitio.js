Attribute = require '../../../../src/finitio/support/attribute'
Heading   = require '../../../../src/finitio/support/heading'
RelationType = require '../../../../src/finitio/type/relation_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "RelationType's information contract", ->

  info = {
    name: 'Foo',
    heading: Heading.info({
      attributes: [
        Attribute.info({
          name: 'r',
          type: intType,
          required: false
        })
      ],
      options: { allowExtra: false }
    }),
    metadata: {foo: 'bar'}
  }
  t = RelationType.info(info)

  it 'dresses as expected', ->
    should(t).be.an.instanceof(RelationType)
    should(t.heading).be.an.instanceof(Heading)
    should(t.metadata).eql({ foo: "bar" })

  it 'undresses as expected', ->
    should(t.toInfo()).eql(info)
