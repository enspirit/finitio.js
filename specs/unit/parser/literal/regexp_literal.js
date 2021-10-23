import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#regexp_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with a regexp style', () => {
    const s = parse('/[a-z]+/');
    return should(s.toString()).equal('[a-z]+');
  });
});
