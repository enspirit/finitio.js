const Finitio = require('../../lib/src/finitio').default;
const Parser = require('../../lib/src/finitio/parser/parser');

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

Finitio.World.importResolver.tests = function(path) {
  if (systems[path]) { return [path, systems[path]]; }
};

module.exports = function() {

  this.Before(function(callback) {
    system = (TestSystem = Finitio.system('@import finitio/data'));
    return callback();
  });

  this.Given(/^the World is$/, function(source, callback) {
    try {
      world = new Function('return ' + source + ';');
      world = world();
      return callback();
    } catch (e) {
      return callback.fail(e);
    }
  });

  this.Given(/^the System is$/, function(source, callback) {
    try {
      system = Finitio.system('@import finitio/data\n\n' + source, world);
      if (system.Main) { type = system.Main.trueOne(); }
      return callback();
    } catch (e) {
      error = e;
      console.log(e.explainTree());
      return callback.fail(e);
    }
  });

  this.Given(/^the type under test is (.*?)$/, function(typeName, callback) {
    type = system.resolve(typeName);
    return callback();
  });

  // Language

  this.Then(/^it compiles fine$/, function(callback) {
    if (!(system instanceof System)) {
      callback.fail(`${system} is not an finitio system`);
    }
    return callback();
  });

  this.Then(/^it compiles to a tuple type$/, function(callback) {
    if (!(system instanceof System)) {
      callback.fail(`${system} is not an finitio system`);
    }

    should(type).be.an.instanceOf(Finitio.TupleType);

    return callback();
  });

  this.Then(/^it compiles to a relation type$/, function(callback) {
    if (!(system instanceof System)) {
      callback.fail(`${system} is not an finitio system`);
    }

    should(type).be.an.instanceOf(Finitio.RelationType);

    return callback();
  });

  this.Then(/^it compiles to a sub type of (.*?)$/, function(parent, callback) {
    if (!(system instanceof System)) {
      callback.fail(`${system} is not an finitio system`);
    }

    should(type).be.an.instanceOf(Finitio.SubType);
    should(system.resolve(parent).isSuperTypeOf(type)).equal(true);

    return callback();
  });

  this.Then(/^it includes a type named (.*?)$/, function(name, callback) {
    try {
      should(system.resolve(name)).be.an.instanceof(Finitio.Type);
    } catch (e) {
      error = e;
      callback.fail(e);
    }
    return callback();
  });

  this.Then(/^it does not include a type named (.*?)$/, function(name, callback) {
    try {
      system.resolve(name);
      return callback.fail(new Error('Expected a system fetch failure'));
    } catch (e) {
      error = e;
      return callback();
    }
  });

  this.Then(/^`(.*?)` and `(.*?)` are mandatory$/, function(a1, a2, callback) {
    if (type.heading === undefined) {
      callback.fail(`Heading based type expected, got \`${type}\``);
    } else if (type.heading.getAttr(a1) === undefined) {
      callback.fail(`\`${a1}\` attribute expected, got \`${type.heading.toName()}\``);
    } else if (type.heading.getAttr(a2) === undefined) {
      callback.fail(`\`${a2}\` attribute expected, got \`${type.heading.toName()}\``);
    } else {
      should(type.heading.getAttr(a1).required).be.true;
      should(type.heading.getAttr(a2).required).be.true;
    }
    return callback();
  });

  this.Then(/^`(.*?)` is mandatory, but `(.*?)` is optional$/, function(a1, a2, callback) {
    if (type.heading === undefined) {
      callback.fail(`Heading based type expected, got \`${type}\``);
    } else if (type.heading.getAttr(a1) === undefined) {
      callback.fail(`\`${a1}\` attribute expected, got \`${type.heading.toName()}\``);
    } else if (type.heading.getAttr(a2) === undefined) {
      callback.fail(`\`${a2}\` attribute expected, got \`${type.heading.toName()}\``);
    } else {
      should(type.heading.getAttr(a1).required).be.true;
      should(type.heading.getAttr(a2).required).be.false;
    }
    return callback();
  });

  this.Then(/^`(.*?)` is mandatory$/, function(a1, callback) {
    if (type.heading === undefined) {
      callback.fail(`Heading based type expected, got \`${type}\``);
    } else if (type.heading.getAttr(a1) === undefined) {
      callback.fail(`\`${a1}\` attribute expected, got \`${type.heading.toName()}\``);
    } else {
      should(type.heading.getAttr(a1).required).be.true;
    }
    return callback();
  });

  this.Then(/^it allows extra attributes$/, function(callback) {
    if (type.heading === undefined) {
      callback.fail(`Heading based type expected, got \`${type}\``);
    } else {
      should(type.heading.allowExtra()).be.true;
    }
    return callback();
  });

  this.Then(/^it allows extra attributes of type (.*)$/, function(name, callback) {
    if (type.heading === undefined) {
      callback.fail(`Heading based type expected, got \`${type}\``);
    } else {
      const extraType = system.resolve(name);
      should(type.heading.allowExtra(extraType)).be.true;
    }
    return callback();
  });

  this.Then(/^it does not allow extra attributes$/, function(callback) {
    if (type.heading === undefined) {
      callback.fail(`Heading based type expected, got \`${type}\``);
    } else {
      should(type.heading.allowExtra()).be.false;
    }
    return callback();
  });

  this.Then(/^metadata at (.*) should be as follows$/, function(path, table, callback) {
    should(table.hashes().length).equal(1);
    const expected = table.hashes()[0];
    const victim = system.fetchPath(path);
    if (!_.isEqual(victim.metadata, expected)) {
      return callback.fail(`Expected ${JSON.stringify(expected)}, got ${victim.metadata}`);
    } else {
      return callback();
    }
  });

  // Hierarchy

  this.Then(/^(.*?) is (not )?a super type of (.*?)$/, function(source, neg, target, callback) {
    try {
      let left;
      const s = system.resolve(source);
      const t = system.resolve(target);
      neg = ((left = (neg != null)) != null ? left : { true : false });
      const isIt = s.isSuperTypeOf(t);
      if (isIt === neg) {
        callback.fail(`Expected ${source}${(neg ? ' not' : '')} to be a super type of ${target}`);
      }
    } catch (e) {
      error = e;
      callback.fail(e);
    }
    return callback();
  });

  // Dressing

  this.Given(/^I dress JSON's '(.*?)'$/, function(jsonValue, callback) {
    try {
      error = null;
      const json = JSON.parse(jsonValue);
      result = type.dress(json);
    } catch (e) {
      error = e;
      result = e;
    }

    return callback();
  });

  this.Given(/^I dress JSON's '(.*?)' with (.*?)$/, function(jsonValue, typename, callback) {
    try {
      error = null;
      const json = JSON.parse(jsonValue);
      result = system.resolve(typename).dress(json);
    } catch (e) {
      error = e;
      result = e;
    }

    return callback();
  });

  this.Given(/^I dress the following JSON document:$/, function(doc, callback) {
    try {
      error = null;
      const json = JSON.parse(doc);
      result = system.dress(json);
    } catch (e) {
      error = e;
      result = e;
    }

    return callback();
  });

  this.Given(/^I dress the following JSON document with (.*?):$/, function(type, doc, callback) {
    try {
      error = null;
      const json = JSON.parse(doc);
      result = system.resolve(type).dress(json);
    } catch (e) {
      error = e;
      result = e;
    }

    return callback();
  });

  this.Given(/^I validate the following JSON data against (.*?)$/, function(type, json, callback) {
    type = system.resolve(type);

    try {
      error = null;
      json = JSON.parse(json);
      result = types.dress(json);
    } catch (e) {
      error = e;
      result = e;
    }

    return callback();
  });

  // Undressing

  this.Given(/^I undress JSON's '(.*?)' from (.*?) to (.*?)$/, function(json, from, to, callback) {
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

    return callback();
  });

  this.When(/^I undress the result from (.*?) to (.*?)$/, function(from, to, callback) {
    try {
      error = null;
      from = system.resolve(from);
      to = system.resolve(to);
      result = from.undress(result, to);
    } catch (e) {
      error = e;
      result = e;
    }

    return callback();
  });

  // Result

  this.Then(/^it should be a success$/, function(callback) {
    if (error != null) { callback.fail(error); }
    return callback();
  });

  this.Then(/^the result should be a Tuple representation$/, function(callback) {
    if (error != null) { callback.fail(error); }

    if (!(result instanceof Object)) {
      callback.fail(`${result} is not an object`);
    }
    return callback();
  });

  this.Then(/^its '(.*)' attribute should be a String representation$/, function(attr, callback) {
    if (error != null) { callback.fail(error); }

    if (typeof(result[attr]) !== 'string') {
      callback.fail(`attribute is not a String, got ${result[attr]}`);
    }
    return callback();
  });

  this.Then(/^its '(.*)' attribute should be a Date representation$/, function(attr, callback) {
    if (error != null) { callback.fail(error); }

    if (!(result[attr] instanceof Date)) {
      callback.fail(`attribute is not a Date, got ${result[attr]}`);
    }
    return callback();
  });

  this.Then(/^its '(.*)' attribute should be a Time representation$/, function(attr, callback) {
    if (error != null) { callback.fail(error); }

    if (!(result[attr] instanceof Date)) {
      callback.fail(`attribute is not a Time, got ${result[attr]}`);
    }
    return callback();
  });

  this.Then(/^the result should be a representation for Nil$/, function(callback) {
    if (error != null) {
      return callback.fail(error);
    } else {
      if (result !== null) {
        callback.fail(`${result} is not a representation for Nil`);
      }
      return callback();
    }
  });

  this.Then(/^the result should be a representation for (.*?)$/, function(type,callback) {
    if (error != null) {
      return callback.fail(error);
    } else {
      if (!system.resolve(type).include(result)) {
        callback.fail(`${result} is not a representation for ${type}`);
      }
      return callback();
    }
  });

  this.Then(/^it should be a TypeError$/, function(callback) {
    if (!(result instanceof TypeError)) {
      callback.fail(`TypeError expected, got \`${result}\` (${result.constructor.name})`);
    }
    return callback();
  });

  this.Then(/^it should be a UndressError$/, function(callback) {
    if (!(result instanceof Error)) {
      callback.fail(`UndressError expected, got \`${result}\` (${result.constructor.name})`);
    }
    return callback();
  });

  this.Then(/^it should be a TypeError as:$/, function(table, callback) {
    if (!(result instanceof TypeError)) {
      callback.fail(result);
    }

    const object = table.hashes()[0];
    for (const k in object) {
      const v = object[k];
      if (result[k] !== v) {
        callback.fail(`TypeError#${k}: \`${v}\` expected, got \`${result[k]}\``);
      }
    }

    return callback();
  });

  this.Then(/^its root cause should be:$/, function(table, callback) {
    if (result instanceof TypeError) {
      const rc = result.rootCause;
      const object = table.hashes()[0];
      for (const k in object) {
        const v = object[k];
        if (rc[k] !== v) {
          callback.fail(`TypeError#${k}: \`${v}\` expected, got \`${rc[k]}\``);
          return;
        }
      }
      return callback();
    } else {
      return callback.fail(new Error('Type error expected'));
    }
  });

  this.Then(/^the result should be the integer (\d+)$/, function(expected, callback) {
    if (result !== parseInt(expected)) {
      callback.fail(`${result} <> ${expected}`);
    }
    return callback();
  });

  this.Then(/^the result should be the Boolean true$/, function(callback) {
    if (result !== true) {
      callback.fail(`${result} <> true`);
    }
    return callback();
  });

  this.Then(/^the result should be the Boolean false$/, function(callback) {
    if (result !== false) {
      callback.fail(`${result} <> false`);
    }
    return callback();
  });

  this.Then(/^the result should be the real (\d+\.\d+)$/, function(expected, callback) {
    if (result !== parseFloat(expected)) {
      callback.fail(`${result} <> ${expected}`);
    }
    return callback();
  });

  this.Then(/^the result should be the string '(.*)'$/, function(expected, callback) {
    if (result !== expected) {
      callback.fail(`${result} <> ${expected}`);
    }
    return callback();
  });

  this.Then(/^the result should be the 13st of March 2014$/, function(callback) {
    const expected = new Date('2014-03-13');
    if ((!(result instanceof Date)) || (result.toISOString() !== expected.toISOString())) {
      callback.fail(`${result} <> 13st of March 2014`);
    }
    return callback();
  });

  this.Then(/^the result should be the 13st of March 2014 at 08:30$/, function(callback) {
    const expected = new Date('2014-03-13T08:30:00');
    if ((!(result instanceof Date)) || (result.toISOString() !== expected.toISOString())) {
      callback.fail(`${result} <> 13st of March 2014 at 08:30`);
    }
    return callback();
  });

  this.Then(/^the result should not have a '(.*?)' attribute$/, function(name, callback) {
    if (error != null) {
      callback.fail(error);
    }
    if (result[name] != null) {
      callback.fail(`Unexpected attribute \`${name}\`, got it.`);
    }
    return callback();
  });

  // Grammar rules

  this.Given(/^the grammar rule is (.*?)$/, function(rulename, callback) {
    this.grammarRule = rulename;
    return callback();
  });

  this.Given(/^the source is$/, function(src, callback) {
    this.parsing_source = src;
    return callback();
  });

  this.Then(/^it evaluates to a (.*)$/, function(type, callback) {

    const t = system.resolve(type);
    const r = Parser.parse(this.parsing_source, { startRule: this.grammarRule });
    if (!t.include(r)) {
      callback.fail(`Expected ${this.parsing_source} to evaluate to ${type}`);
    }
    return callback();
  });

  // Import

  return this.Given(/^the following system is known as '(.*)'$/, function(name, src, callback) {
    try {
      systems[name] = Finitio.parse(src);
      return callback();
    } catch (e) {
      error = e;
      return callback.fail(e);
    }
  });
};
