import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#string_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with a doubly-quoted string', () => {
    const s = parse('"Hello"');
    return should(s).equal('Hello');
  });

  it('supports escaping quotes', () => {
    const s = parse('"O\\"Neil"');
    return should(s).equal('O"Neil');
  });
});
