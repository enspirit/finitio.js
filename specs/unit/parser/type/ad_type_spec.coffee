Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#ad_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works with an identity contract', ()->
    s = parse('<iso> .String')
    expected = { adt: {
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          identity: {}
        }
      ]
    }}
    should(s).eql(expected)

  it 'works with an internal contract', ()->
    s = parse('.Number <iso> .String')
    expected = { adt: {
      jsType: 'Number'
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          internal: 'Number'
        }
      ]
    }}
    should(s).eql(expected)

  it 'works with an external contract', ()->
    s = parse('.Number <iso> .String .Foo.Bar.Baz')
    expected = { adt: {
      jsType: 'Number'
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          external: 'Foo.Bar.Baz'
        }
      ]
    }}
    should(s).eql(expected)

  it 'works with an explicit contract', ()->
    s = parse('.Number <iso> .String \\( d | foo(d) ) \\( u | bar(u) )')
    expected = { adt: {
      jsType: 'Number'
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          explicit: {
            dress: ['d', 'foo(d)']
            undress: ['u', 'bar(u)']
          }
        }
      ]
    }}
    should(s).eql(expected)

  it 'works with identity + metadata', ()->
    s = parse('/- Foo -/ <iso> .String')
    expected = { adt: {
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          identity: {}
          metadata: { description: 'Foo' }
        }
      ]
    }}
    should(s).eql(expected)

  it 'works with internal + metadata', ()->
    s = parse('/- Foo -/ .Bar <iso> .String')
    expected = { adt: {
      jsType: 'Bar'
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          internal: 'Bar'
        }
      ],
      metadata: { description: 'Foo' }
    }}
    should(s).eql(expected)

  it 'works with contract metadata', ()->
    s = parse('.Bar /- Foo -/ <iso> .String')
    expected = { adt: {
      jsType: 'Bar'
      contracts: [
        {
          name: 'iso'
          infoType: { builtin: { jsType: 'String' } }
          internal: 'Bar'
          metadata: { description: 'Foo' }
        }
      ]
    }}
    should(s).eql(expected)

