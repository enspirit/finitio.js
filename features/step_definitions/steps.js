const { Before, Given, When, Then } = require('@cucumber/cucumber');

const Finitio = require('../../dist/finitio').default;
const Parser = require('../../dist/finitio').Parser;

const {
  TypeError
} = Finitio;

const {
  System
} = Finitio;
const should = require('should');
const _ = require('underscore');

// Global variables for steps below
let TestSystem = null;
let result = null;
let world = null;
let system = null;
let type = null;
let error = null;
const systems = {};

// Replaces cucumber 0.x's `callback.fail`: fails the current step immediately.
const fail = function(reason) {
  throw (reason instanceof Error) ? reason : new Error(reason);
};

Finitio.World.importResolver.tests = function(path) {
  if (systems[path]) { return [path, systems[path]]; }
};

Before(function() {
  system = (TestSystem = Finitio.system('@import finitio/data'));
});

Given(/^the World is$/, function(source) {
  world = new Function('return ' + source + ';');
  world = world();
});

Given(/^the System is$/, function(source) {
  try {
    system = Finitio.system('@import finitio/data\n\n' + source, world);
    if (system.Main) { type = system.Main.trueOne(); }
  } catch (e) {
    error = e;
    fail(e);
  }
});

Given(/^the type under test is (.*?)$/, function(typeName) {
  type = system.resolve(typeName);
});

// Language

Then(/^it compiles fine$/, function() {
  if (!(system instanceof System)) {
    fail(`${system} is not an finitio system`);
  }
});

Then(/^it compiles to a tuple type$/, function() {
  if (!(system instanceof System)) {
    fail(`${system} is not an finitio system`);
  }

  should(type).be.an.instanceOf(Finitio.TupleType);
});

Then(/^it compiles to a relation type$/, function() {
  if (!(system instanceof System)) {
    fail(`${system} is not an finitio system`);
  }

  should(type).be.an.instanceOf(Finitio.RelationType);
});

Then(/^it compiles to a sub type of (.*?)$/, function(parent) {
  if (!(system instanceof System)) {
    fail(`${system} is not an finitio system`);
  }

  should(type).be.an.instanceOf(Finitio.SubType);
  should(system.resolve(parent).isSuperTypeOf(type)).equal(true);
});

Then(/^it includes a type named (.*?)$/, function(name) {
  try {
    should(system.resolve(name)).be.an.instanceof(Finitio.Type);
  } catch (e) {
    error = e;
    fail(e);
  }
});

Then(/^it does not include a type named (.*?)$/, function(name) {
  try {
    system.resolve(name);
  } catch (e) {
    error = e;
    return;
  }
  fail(new Error('Expected a system fetch failure'));
});

Then(/^`(.*?)` and `(.*?)` are mandatory$/, function(a1, a2) {
  if (type.heading === undefined) {
    fail(`Heading based type expected, got \`${type}\``);
  } else if (type.heading.getAttr(a1) === undefined) {
    fail(`\`${a1}\` attribute expected, got \`${type.heading.toName()}\``);
  } else if (type.heading.getAttr(a2) === undefined) {
    fail(`\`${a2}\` attribute expected, got \`${type.heading.toName()}\``);
  } else {
    should(type.heading.getAttr(a1).required).be.true;
    should(type.heading.getAttr(a2).required).be.true;
  }
});

Then(/^`(.*?)` is mandatory, but `(.*?)` is optional$/, function(a1, a2) {
  if (type.heading === undefined) {
    fail(`Heading based type expected, got \`${type}\``);
  } else if (type.heading.getAttr(a1) === undefined) {
    fail(`\`${a1}\` attribute expected, got \`${type.heading.toName()}\``);
  } else if (type.heading.getAttr(a2) === undefined) {
    fail(`\`${a2}\` attribute expected, got \`${type.heading.toName()}\``);
  } else {
    should(type.heading.getAttr(a1).required).be.true;
    should(type.heading.getAttr(a2).required).be.false;
  }
});

Then(/^`(.*?)` is mandatory$/, function(a1) {
  if (type.heading === undefined) {
    fail(`Heading based type expected, got \`${type}\``);
  } else if (type.heading.getAttr(a1) === undefined) {
    fail(`\`${a1}\` attribute expected, got \`${type.heading.toName()}\``);
  } else {
    should(type.heading.getAttr(a1).required).be.true;
  }
});

Then(/^it allows extra attributes$/, function() {
  if (type.heading === undefined) {
    fail(`Heading based type expected, got \`${type}\``);
  } else {
    should(type.heading.allowExtra()).be.true;
  }
});

Then(/^it allows extra attributes of type (.*)$/, function(name) {
  if (type.heading === undefined) {
    fail(`Heading based type expected, got \`${type}\``);
  } else {
    const extraType = system.resolve(name);
    should(type.heading.allowExtra(extraType)).be.true;
  }
});

Then(/^it does not allow extra attributes$/, function() {
  if (type.heading === undefined) {
    fail(`Heading based type expected, got \`${type}\``);
  } else {
    should(type.heading.allowExtra()).be.false;
  }
});

Then(/^metadata at (.*) should be as follows$/, function(path, table) {
  should(table.hashes().length).equal(1);
  const expected = table.hashes()[0];
  const victim = system.fetchPath(path);
  if (!_.isEqual(victim.metadata, expected)) {
    fail(`Expected ${JSON.stringify(expected)}, got ${victim.metadata}`);
  }
});

// Hierarchy

Then(/^(.*?) is (not )?a super type of (.*?)$/, function(source, neg, target) {
  try {
    let left;
    const s = system.resolve(source);
    const t = system.resolve(target);
    neg = ((left = (neg != null)) != null ? left : { true : false });
    const isIt = s.isSuperTypeOf(t);
    if (isIt === neg) {
      fail(`Expected ${source}${(neg ? ' not' : '')} to be a super type of ${target}`);
    }
  } catch (e) {
    error = e;
    fail(e);
  }
});

// Dressing

Given(/^I dress JSON's '(.*?)'$/, function(jsonValue) {
  try {
    error = null;
    const json = JSON.parse(jsonValue);
    result = type.dress(json);
  } catch (e) {
    error = e;
    result = e;
  }
});

Given(/^I dress JSON's '(.*?)' with (.*?)$/, function(jsonValue, typename) {
  try {
    error = null;
    const json = JSON.parse(jsonValue);
    result = system.resolve(typename).dress(json);
  } catch (e) {
    error = e;
    result = e;
  }
});

Given(/^I dress the following JSON document:$/, function(doc) {
  try {
    error = null;
    const json = JSON.parse(doc);
    result = system.dress(json);
  } catch (e) {
    error = e;
    result = e;
  }
});

Given(/^I dress the following JSON document with (.*?):$/, function(type, doc) {
  try {
    error = null;
    const json = JSON.parse(doc);
    result = system.resolve(type).dress(json);
  } catch (e) {
    error = e;
    result = e;
  }
});

Given(/^I validate the following JSON data against (.*?)$/, function(type, json) {
  type = system.resolve(type);

  try {
    error = null;
    json = JSON.parse(json);
    result = types.dress(json);
  } catch (e) {
    error = e;
    result = e;
  }
});

// Undressing

Given(/^I undress JSON's '(.*?)' from (.*?) to (.*?)$/, function(json, from, to) {
  try {
    error = null;
    from = system.resolve(from);
    to = system.resolve(to);
    json = JSON.parse(json);
    const value = from.dress(json);
    result = from.undress(value, to);
  } catch (e) {
    error = e;
    result = e;
  }
});

When(/^I undress the result from (.*?) to (.*?)$/, function(from, to) {
  try {
    error = null;
    from = system.resolve(from);
    to = system.resolve(to);
    result = from.undress(result, to);
  } catch (e) {
    error = e;
    result = e;
  }
});

// Result

Then(/^it should be a success$/, function() {
  if (error != null) { fail(error); }
});

Then(/^the result should be a Tuple representation$/, function() {
  if (error != null) { fail(error); }

  if (!(result instanceof Object)) {
    fail(`${result} is not an object`);
  }
});

// Asserts the dressed value exactly, which `be a representation for X` cannot:
// a value that dropped attributes is still a valid representation of its type.
Then(/^the result should equal JSON's '(.*)'$/, function(json) {
  if (error != null) { fail(error); }

  should(result).eql(JSON.parse(json));
});

Then(/^its '(.*)' attribute should be a String representation$/, function(attr) {
  if (error != null) { fail(error); }

  if (typeof(result[attr]) !== 'string') {
    fail(`attribute is not a String, got ${result[attr]}`);
  }
});

Then(/^its '(.*)' attribute should be a Date representation$/, function(attr) {
  if (error != null) { fail(error); }

  if (!(result[attr] instanceof Date)) {
    fail(`attribute is not a Date, got ${result[attr]}`);
  }
});

Then(/^its '(.*)' attribute should be a Time representation$/, function(attr) {
  if (error != null) { fail(error); }

  if (!(result[attr] instanceof Date)) {
    fail(`attribute is not a Time, got ${result[attr]}`);
  }
});

Then(/^the result should be a representation for Nil$/, function() {
  if (error != null) {
    fail(error);
  } else {
    if (result !== null) {
      fail(`${result} is not a representation for Nil`);
    }
  }
});

// The `Nil` case is handled by the more specific step above; cucumber requires
// this one to explicitly not match it rather than relying on definition order.
Then(/^the result should be a representation for (?!Nil$)(.*?)$/, function(type) {
  if (error != null) {
    fail(error);
  } else {
    if (!system.resolve(type).include(result)) {
      fail(`${result} is not a representation for ${type}`);
    }
  }
});

Then(/^it should be a TypeError$/, function() {
  if (!(result instanceof TypeError)) {
    fail(`TypeError expected, got \`${result}\` (${result.constructor.name})`);
  }
});

Then(/^it should be a UndressError$/, function() {
  if (!(result instanceof Error)) {
    fail(`UndressError expected, got \`${result}\` (${result.constructor.name})`);
  }
});

Then(/^it should be a TypeError as:$/, function(table) {
  if (!(result instanceof TypeError)) {
    fail(result);
  }

  const object = table.hashes()[0];
  for (const k in object) {
    const v = object[k];
    if (result[k] !== v) {
      fail(`TypeError#${k}: \`${v}\` expected, got \`${result[k]}\``);
    }
  }
});

Then(/^its root cause should be:$/, function(table) {
  if (result instanceof TypeError) {
    const rc = result.rootCause;
    const object = table.hashes()[0];
    for (const k in object) {
      const v = object[k];
      if (rc[k] !== v) {
        fail(`TypeError#${k}: \`${v}\` expected, got \`${rc[k]}\``);
      }
    }
  } else {
    fail(new Error('Type error expected'));
  }
});

Then(/^the result should be the integer (\d+)$/, function(expected) {
  if (result !== parseInt(expected)) {
    fail(`${result} <> ${expected}`);
  }
});

Then(/^the result should be the Boolean true$/, function() {
  if (result !== true) {
    fail(`${result} <> true`);
  }
});

Then(/^the result should be the Boolean false$/, function() {
  if (result !== false) {
    fail(`${result} <> false`);
  }
});

Then(/^the result should be the real (\d+\.\d+)$/, function(expected) {
  if (result !== parseFloat(expected)) {
    fail(`${result} <> ${expected}`);
  }
});

Then(/^the result should be the string '(.*)'$/, function(expected) {
  if (result !== expected) {
    fail(`${result} <> ${expected}`);
  }
});

Then(/^the result should be the 13st of March 2014$/, function() {
  const expected = new Date('2014-03-13');
  if ((!(result instanceof Date)) || (result.toISOString() !== expected.toISOString())) {
    fail(`${result} <> 13st of March 2014`);
  }
});

Then(/^the result should be the 13st of March 2014 at 08:30$/, function() {
  const expected = new Date('2014-03-13T08:30:00');
  if ((!(result instanceof Date)) || (result.toISOString() !== expected.toISOString())) {
    fail(`${result} <> 13st of March 2014 at 08:30`);
  }
});

Then(/^the result should not have a '(.*?)' attribute$/, function(name) {
  if (error != null) {
    fail(error);
  }
  if (result[name] != null) {
    fail(`Unexpected attribute \`${name}\`, got it.`);
  }
});

// Grammar rules

Given(/^the grammar rule is (.*?)$/, function(rulename) {
  this.grammarRule = rulename;
});

Given(/^the source is$/, function(src) {
  this.parsing_source = src;
});

Then(/^it evaluates to a (.*)$/, function(type) {
  const t = system.resolve(type);
  const r = Parser.parse(this.parsing_source, { startRule: this.grammarRule });
  if (!t.include(r)) {
    fail(`Expected ${this.parsing_source} to evaluate to ${type}`);
  }
});

// Import

Given(/^the following system is known as '(.*)'$/, function(name, src) {
  try {
    systems[name] = Finitio.parse(src);
  } catch (e) {
    error = e;
    fail(e);
  }
});
