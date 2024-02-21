import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.string#capitalize', () => {

  const subject = str => $u.capitalize(str);

  describe('on an empty string', () => it('returns the expected result', () => {
    subject('').should.equal('');
    return subject(' ').should.equal(' ');
  }));

  describe('on a single word', () => it('returns the expected result', () => subject('foo').should.equal('Foo')));

  describe('on a capitalized word', () => it('returns the expected result', () => subject('Foo').should.equal('Foo')));

  describe('on a word containing underscores', () => it('returns the expected result', () => subject('foo_bar').should.equal('FooBar')));

  describe('on a word containing spaces', () => it('returns the expected result', () => subject('foo bar').should.equal('FooBar')));

  return describe('on non strings', () => it('throws an error', () => (() => {
    const result = [];
    const object = [null, undefined, [], {}, new Date(), /foo.*bar/];
    for (const i in object) {
      const obj = object[i];
      result.push(should(() => subject(obj)).throw(/String expected, got .*/));
    }
    return result;
  })()));
});
