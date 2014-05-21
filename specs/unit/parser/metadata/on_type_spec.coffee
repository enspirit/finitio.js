Factory   = require '../../../../src/finitio/support/factory'
Parser    = require '../../../../src/finitio/parser'
should    = require 'should'

describe "Parser: type metadata", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type", compiler: new Factory() })

  it 'works with any', ()->
    s = parse('/- Type description -/ .')
    should(s.metadata).eql({ description: 'Type description' })

  it 'works with builtin', ()->
    s = parse('/- Type description -/ .String')
    should(s.metadata).eql({ description: 'Type description' })

  it 'works with sub', ()->
    s = parse('/- Type description -/ .( i | i>0 )')
    should(s.metadata).eql({ description: 'Type description' })

  it 'works with set', ()->
    s = parse('/- Type description -/ {.}')
    should(s.metadata).eql({ description: 'Type description' })

  it 'works with seq', ()->
    s = parse('/- Type description -/ [.]')
    should(s.metadata).eql({ description: 'Type description' })

  it 'works with tuple', ()->
    s = parse('/- Type description -/ { name: . }')
    should(s.metadata).eql({ description: 'Type description' })

  it 'works with relation', ()->
    s = parse('/- Type description -/ {{ name: . }}')
    should(s.metadata).eql({ description: 'Type description' })

