Finitio     = require '../../lib/finitio'
System      = require '../../lib/system'
should      = require 'should'

# Global variables for steps below
TestSystem     = null
result         = null
system         = null
type           = null

module.exports = ->

  @Before (callback)->
    TestSystem = require '../support/test_system'
    system = TestSystem
    callback()

  @Given /^the System is$/, (source, callback) ->
    try
      system = TestSystem.parse(source)
      type   = system.main if system.main
    catch e
      callback.fail(e)

    callback()

  @Given /^the type under test is (.*?)$/, (typeName, callback) ->
    type = system.fetch(typeName)
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

  @Then /^`(.*?)` and `(.*?)` are mandatory$/, (a1, a2, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else if type.heading.attributes[a1] == undefined
      callback.fail("`#{a1}` attribute expected, got `#{type.heading.toName()}`")
    else if type.heading.attributes[a2] == undefined
      callback.fail("`#{a2}` attribute expected, got `#{type.heading.toName()}`")
    else
      should(type.heading.attributes[a1].required).be.true
      should(type.heading.attributes[a2].required).be.true
    callback()

  @Then /^`(.*?)` is mandatory, but `(.*?)` is optional$/, (a1, a2, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else if type.heading.attributes[a1] == undefined
      callback.fail("`#{a1}` attribute expected, got `#{type.heading.toName()}`")
    else if type.heading.attributes[a2] == undefined
      callback.fail("`#{a2}` attribute expected, got `#{type.heading.toName()}`")
    else
      should(type.heading.attributes[a1].required).be.true
      should(type.heading.attributes[a2].required).be.false
    callback()

  @Then /^`(.*?)` is mandatory$/, (a1, callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else if type.heading.attributes[a1] == undefined
      callback.fail("`#{a1}` attribute expected, got `#{type.heading.toName()}`")
    else
      should(type.heading.attributes[a1].required).be.true
    callback()

  @Then /^it allows extra attributes$/, (callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else
      should(type.heading.allowExtra()).be.true
    callback()

  @Then /^it does not allow extra attributes$/, (callback) ->
    if type.heading == undefined
      callback.fail("Heading based type expected, got `#{type}`")
    else
      should(type.heading.allowExtra()).be.false
    callback()

  # Hierarchy

  @Then /^(.*?) is (not )?a super type of (.*?)$/, (source, neg, target, callback) ->
    try
      s    = system.fetch(source)
      t    = system.fetch(target)
      neg  = ((neg == undefined) ? false : true)
      isIt = s.isSuperTypeOf(t)
      unless isIt == neg
        callback.fail("Expected #{source} #{(if neg then 'not' else '')} to be a super type of #{target}")
    catch e
      callback.fail(e)
    callback()

  # Dressing

  @Given /^I dress JSON's '(.*?)'$/, (jsonValue, callback) ->
    try
      json = JSON.parse(jsonValue)
      result = type.dress(json)
    catch e
      result = e

    callback()

  @Given /^I dress JSON's '(.*?)' with (.*?)$/, (jsonValue, typename, callback) ->
    try
      json = JSON.parse(jsonValue)
      result = system.fetch(typename).dress(json)
    catch e
      result = e

    callback()

  @Given /^I dress the following JSON document:$/, (doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.dress(json)
    catch e
      result = e

    callback()

  @Given /^I dress the following JSON document with (.*?):$/, (type, doc, callback) ->
    try
      json = JSON.parse(doc)
      result = system.fetch(type).dress(json)
    catch e
      result = e

    callback()

  @Given /^I validate the following JSON data against (.*?)$/, (type, json, callback) ->
    type = system.fetch(type)

    try
      json = JSON.parse(json)
      result = types.dress(json)
    catch e
      result = e

    callback()

  # Undressing

  @Given /^I undress JSON's '(.*?)' from (.*?) to (.*?)$/, (json, from, to, callback) ->
    try
      from  = system.fetch(from)
      to    = system.fetch(to)
      json  = JSON.parse(json)
      value = from.dress(json)
      result = from.undress(value, to)
    catch e
      result = e

    callback()

  # Result

  @Then /^it should be a success$/, (callback) ->
    if result instanceof Error
      throw result
      callback.fail(Error)
    else
      callback()

  @Then /^the result should be a Tuple representation$/, (callback) ->
    unless result instanceof Object
      callback.fail "#{result} is not an object"
    callback()

  @Then /^its '(.*)' attribute should be a Date representation$/, (attr, callback) ->
    unless result[attr] instanceof Date
      callback.fail "attribute is not a Date, got #{result[attr]}"
    callback()

  @Then /^the result should be a representation for Nil$/, (callback) ->
    unless result == null
      callback.fail "#{result} is not a representation for Nil"
    callback()

  @Then /^the result should be a representation for (.*?)$/, (type,callback) ->
    unless system.fetch(type).include(result)
      callback.fail "#{JSON.stringify(result)} is not a representation for #{type}"
    callback()

  @Then /^it should be a TypeError$/, (callback) ->
    unless result instanceof Finitio.TypeError
      callback.fail "TypeError expected, got `#{result}`"
    callback()

  @Then /^it should be a TypeError as:$/, (table, callback) ->
    unless result instanceof Finitio.TypeError
      callback.fail result

    for k, v of table.hashes()[0]
      unless result[k] == v
        callback.fail "TypeError##{k}: `#{v}` expected, got `#{result[k]}`"

    callback()

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
