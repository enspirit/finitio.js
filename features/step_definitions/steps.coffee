Finitio   = require '../../src/finitio'
Parser    = require '../../src/finitio/parser'
TypeError = Finitio.TypeError
System    = Finitio.System
should    = require 'should'
_         = require 'underscore'

# Global variables for steps below
TestSystem = null
result     = null
system     = null
type       = null
error      = null
systems    = {}

Finitio.World.importResolver.tests = (path)->
  [path, systems[path]] if systems[path]

module.exports = ->

  @Before (callback)->
    system = TestSystem = Finitio.system("@import finitio/data")
    callback()

  @Given /^the System is$/, (source, callback) ->
    try
      system = Finitio.system("@import finitio/data\n\n" + source)
      type   = system.Main.trueOne() if system.Main
      callback()
    catch e
      error = e
      console.log(e.explainTree())
      callback.fail(e)

  @Given /^the type under test is (.*?)$/, (typeName, callback) ->
    type = system.resolve(typeName)
    callback()

  # Language

  @Then /^it compiles fine$/, (callback) ->
    unless system instanceof System
      callback.fail "#{system} is not an finitio system"
    callback()

  @Then /^it compiles to a tuple type$/, (callback) ->
    unless system instanceof System
      callback.fail "#{system} is not an finitio system"

    should(type).be.an.instanceOf(Finitio.TupleType)

    callback()

  @Then /^it compiles to a relation type$/, (callback) ->
    unless system instanceof System
      callback.fail "#{system} is not an finitio system"

    should(type).be.an.instanceOf(Finitio.RelationType)

    callback()

  @Then /^it includes a type named (.*?)$/, (name, callback) ->
    try
      should(system.resolve(name)).be.an.instanceof(Finitio.Type)
    catch e
      error = e
      callback.fail(e)
    callback()

  @Then /^it does not include a type named (.*?)$/, (name, callback) ->
    try
      system.resolve(name)
      callback.fail(new Error('Expected a system fetch failure'))
    catch e
      error = e
      callback()

  @Then /^`(.*?)` and `(.*?)` are mandatory$/, (a1, a2, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else if type.heading.getAttr(a1) == undefined
      callback.fail("`#{a1}` attribute expected, got `#{type.heading.toName()}`")
    else if type.heading.getAttr(a2) == undefined
      callback.fail("`#{a2}` attribute expected, got `#{type.heading.toName()}`")
    else
      should(type.heading.getAttr(a1).required).be.true
      should(type.heading.getAttr(a2).required).be.true
    callback()

  @Then /^`(.*?)` is mandatory, but `(.*?)` is optional$/, (a1, a2, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else if type.heading.getAttr(a1) == undefined
      callback.fail("`#{a1}` attribute expected, got `#{type.heading.toName()}`")
    else if type.heading.getAttr(a2) == undefined
      callback.fail("`#{a2}` attribute expected, got `#{type.heading.toName()}`")
    else
      should(type.heading.getAttr(a1).required).be.true
      should(type.heading.getAttr(a2).required).be.false
    callback()

  @Then /^`(.*?)` is mandatory$/, (a1, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else if type.heading.getAttr(a1) == undefined
      callback.fail("`#{a1}` attribute expected, got `#{type.heading.toName()}`")
    else
      should(type.heading.getAttr(a1).required).be.true
    callback()

  @Then /^it allows extra attributes$/, (callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else
      should(type.heading.allowExtra()).be.true
    callback()

  @Then /^it allows extra attributes of type (.*)$/, (name, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else
      extraType = system.resolve(name)
      should(type.heading.allowExtra(extraType)).be.true
    callback()

  @Then /^it does not allow extra attributes$/, (callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else
      should(type.heading.allowExtra()).be.false
    callback()

  @Then /^metadata at (.*) should be as follows$/, (path, table, callback) ->
    should(table.hashes().length).equal(1)
    expected = table.hashes()[0]
    victim  = system.fetchPath(path)
    unless _.isEqual(victim.metadata, expected)
      callback.fail("Expected #{JSON.stringify expected}, got #{victim.metadata}")
    else
      callback()

  # Hierarchy

  @Then /^(.*?) is (not )?a super type of (.*?)$/, (source, neg, target, callback) ->
    try
      s    = system.resolve(source)
      t    = system.resolve(target)
      neg  = (neg? ? true : false)
      isIt = s.isSuperTypeOf(t)
      unless isIt != neg
        callback.fail("Expected #{source}#{(if neg then ' not' else '')} to be a super type of #{target}")
    catch e
      error = e
      callback.fail(e)
    callback()

  # Dressing

  @Given /^I dress JSON's '(.*?)'$/, (jsonValue, callback) ->
    try
      error = null
      json = JSON.parse(jsonValue)
      result = type.dress(json)
    catch e
      error = e
      result = e

    callback()

  @Given /^I dress JSON's '(.*?)' with (.*?)$/, (jsonValue, typename, callback) ->
    try
      error = null
      json = JSON.parse(jsonValue)
      result = system.resolve(typename).dress(json)
    catch e
      error = e
      result = e

    callback()

  @Given /^I dress the following JSON document:$/, (doc, callback) ->
    try
      error = null
      json = JSON.parse(doc)
      result = system.dress(json)
    catch e
      error = e
      result = e

    callback()

  @Given /^I dress the following JSON document with (.*?):$/, (type, doc, callback) ->
    try
      error = null
      json = JSON.parse(doc)
      result = system.resolve(type).dress(json)
    catch e
      error = e
      result = e

    callback()

  @Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) ->
    type = system.resolve(type)

    try
      error = null
      json = JSON.parse(json)
      result = types.dress(json)
    catch e
      error = e
      result = e

    callback()

  # Undressing

  @Given /^I undress JSON's '(.*?)' from (.*?) to (.*?)$/, (json, from, to, callback) ->
    try
      error = null
      from  = system.resolve(from)
      to    = system.resolve(to)
      json  = JSON.parse(json)
      value = from.dress(json)
      result = from.undress(value, to)
    catch e
      error = e
      result = e

    callback()

  @When /^I undress the result from (.*?) to (.*?)$/, (from, to, callback) ->
    try
      error = null
      from  = system.resolve(from)
      to    = system.resolve(to)
      result = from.undress(result, to)
    catch e
      error = e
      result = e

    callback()

  # Result

  @Then /^it should be a success$/, (callback) ->
    callback.fail(error) if error?
    callback()

  @Then /^the result should be a Tuple representation$/, (callback) ->
    callback.fail(error) if error?

    unless result instanceof Object
      callback.fail "#{result} is not an object"
    callback()

  @Then /^its '(.*)' attribute should be a String representation$/, (attr, callback) ->
    callback.fail(error) if error?

    unless typeof(result[attr]) == 'string'
      callback.fail "attribute is not a String, got #{result[attr]}"
    callback()

  @Then /^its '(.*)' attribute should be a Date representation$/, (attr, callback) ->
    callback.fail(error) if error?

    unless result[attr] instanceof Date
      callback.fail "attribute is not a Date, got #{result[attr]}"
    callback()

  @Then /^its '(.*)' attribute should be a Time representation$/, (attr, callback) ->
    callback.fail(error) if error?

    unless result[attr] instanceof Date
      callback.fail "attribute is not a Time, got #{result[attr]}"
    callback()

  @Then /^the result should be a representation for Nil$/, (callback) ->
    if error?
      callback.fail(error)
    else
      unless result == null
        callback.fail "#{result} is not a representation for Nil"
      callback()

  @Then /^the result should be a representation for (.*?)$/, (type,callback) ->
    if error?
      console.log(system.resolve('Info').type.heading.attributes)
      console.log(error)
      callback.fail(error)
    else
      unless system.resolve(type).include(result)
        callback.fail "#{result} is not a representation for #{type}"
      callback()

  @Then /^it should be a TypeError$/, (callback) ->
    unless result instanceof TypeError
      callback.fail "TypeError expected, got `#{result}` (#{result.constructor.name})"
    callback()

  @Then /^it should be a UndressError$/, (callback) ->
    unless result instanceof Error
      callback.fail "UndressError expected, got `#{result}` (#{result.constructor.name})"
    callback()

  @Then /^it should be a TypeError as:$/, (table, callback) ->
    unless result instanceof TypeError
      callback.fail result

    for k, v of table.hashes()[0]
      unless result[k] == v
        callback.fail "TypeError##{k}: `#{v}` expected, got `#{result[k]}`"

    callback()

  @Then /^its root cause should be:$/, (table, callback) ->
    if result instanceof TypeError
      rc = result.rootCause
      for k, v of table.hashes()[0]
        unless rc[k] == v
          callback.fail "TypeError##{k}: `#{v}` expected, got `#{rc[k]}`"
          return
      callback()
    else
      callback.fail new Error("Type error expected")

  @Then /^the result should be the integer (\d+)$/, (expected, callback) ->
    unless result == parseInt(expected)
      callback.fail "#{result} <> #{expected}"
    callback()

  @Then /^the result should be the Boolean true$/, (callback) ->
    unless result == true
      callback.fail "#{result} <> true"
    callback()

  @Then /^the result should be the Boolean false$/, (callback) ->
    unless result == false
      callback.fail "#{result} <> false"
    callback()

  @Then /^the result should be the real (\d+\.\d+)$/, (expected, callback) ->
    unless result == parseFloat(expected)
      callback.fail "#{result} <> #{expected}"
    callback()

  @Then /^the result should be the string '(.*)'$/, (expected, callback) ->
    unless result == expected
      callback.fail "#{result} <> #{expected}"
    callback()

  @Then /^the result should be the 13st of March 2014$/, (callback) ->
    expected = new Date("2014-03-13");
    unless (result instanceof Date) and (result.toISOString() == expected.toISOString())
      callback.fail "#{result} <> 13st of March 2014"
    callback()

  @Then /^the result should be the 13st of March 2014 at 08:30$/, (callback) ->
    expected = new Date("2014-03-13T08:30:00");
    unless (result instanceof Date) and (result.toISOString() == expected.toISOString())
      callback.fail "#{result} <> 13st of March 2014 at 08:30"
    callback()

  @Then /^the result should not have a '(.*?)' attribute$/, (name, callback) ->
    if error?
      callback.fail(error)
    if result[name]?
      callback.fail "Unexpected attribute `#{name}`, got it."
    callback()

  # Grammar rules

  @Given /^the grammar rule is (.*?)$/, (rulename, callback)->
    @grammarRule = rulename
    callback()

  @Given /^the source is$/, (src, callback)->
    @parsing_source = src
    callback()

  @Then /^it evaluates to a (.*)$/, (type, callback)->
    t = system.resolve(type)
    r = Parser.parse(@parsing_source, { startRule: @grammarRule })
    unless t.include(r)
      callback.fail("Expected #{@parsing_source} to evaluate to #{type}")
    callback()

  # Import

  @Given /^the following system is known as '(.*)'$/, (name, src, callback) ->
    try
      systems[name] = Finitio.parse(src)
      callback()
    catch e
      error = e
      callback.fail(e)
