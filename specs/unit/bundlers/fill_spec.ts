import { expect } from 'chai';
import { fill } from '../../../src/finitio/bundlers/AbstractBundler';

//
// Filling a bundle template used to be a chain of `replace` calls, which is
// wrong twice over: a later call scans what an earlier one injected, and a
// replacement *string* reads `$&` and friends as directives.
//
describe('bundlers/fill', () => {

  it('substitutes every placeholder', () => {
    expect(fill('a=A b=B', { A: '1', B: '2' })).to.eql('a=1 b=2');
  });

  it('leaves a template alone when it names no placeholder', () => {
    expect(fill('nothing here', { A: '1' })).to.eql('nothing here');
  });

  it('substitutes every occurrence of a placeholder', () => {
    expect(fill('A and A', { A: '1' })).to.eql('1 and 1');
  });

  //
  // The one that bit: a schema naming a type `URL` -- or merely describing one
  // -- had its own text substituted, and left the loader pointing at the
  // placeholder.
  //
  it('does not substitute inside what it just injected', () => {
    const filled = fill('TYPEDEFS then URL', {
      TYPEDEFS: '/** A URL */ export type URL = string;',
      URL: 'file://real.fio',
    });

    expect(filled).to.eql('/** A URL */ export type URL = string; then file://real.fio');
  });

  it('does not substitute inside a value, whichever order the keys come in', () => {
    const filled = fill('URL then TYPEDEFS', {
      URL: 'file://real.fio',
      TYPEDEFS: 'export type URL = string;',
    });

    expect(filled).to.eql('file://real.fio then export type URL = string;');
  });

  //
  // `$$`, `$&`, `` $` `` and `$'` are directives to `String#replace` when the
  // replacement is a string. A `ts:` override of `` `$${number}` `` came out as
  // `` `${number}` ``.
  //
  it('keeps a dollar sign literal', () => {
    expect(fill('T', { T: 'type P = `$${number}`;' })).to.eql('type P = `$${number}`;');
    expect(fill('T', { T: '$& $` $\' $1' })).to.eql('$& $` $\' $1');
  });

  //
  // Placeholders are whole words, so that a template can mention a longer
  // identifier that merely starts with one.
  //
  it('matches a placeholder as a whole word only', () => {
    expect(fill('URLS URL_X MYURL URL', { URL: 'x' })).to.eql('URLS URL_X MYURL x');
  });

  it('takes a placeholder literally, metacharacters included', () => {
    expect(fill('a.b and axb', { 'a.b': 'x' })).to.eql('x and axb');
  });


  it('leaves a template alone when there is nothing to fill', () => {
    // An empty alternation matches the empty string at every word boundary.
    expect(fill('abc', {})).to.eql('abc');
    expect(fill('', {})).to.eql('');
  });

});
