Parser = require '../../../src/finitio/parser'
should = require 'should'

describe "Parser#import_def", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "import_def" })

  it 'works with an unqualified', ()->
    s = parse('@import foo/bar')
    should(s).eql({
      from: 'foo/bar'
    })

  it 'works with a qualified', ()->
    s = parse('@import foo/bar as baz')
    should(s).eql({
      from: 'foo/bar'
      qualifier: 'baz'
    })
