Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Heading's information contract", ->

  info = {
    attributes: [
      Attribute.info({
        name: 'r',
        type: intType,
        required: false
      })
    ],
    options: { allowExtra: false }
  }
  h = Heading.info(info)

  it 'dresses as expected', ->
    should(h).be.an.instanceof(Heading)
    should(h.attributes.length).equal(1)
    should(h.options).eql({ allowExtra: false })

  it 'undresses as expected', ->
    should(h.toInfo()).eql(info)
