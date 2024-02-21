import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#boolean_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with true', () => {
    const s = parse('true');
    return should(s).equal(true);
  });

  it('works with false', () => {
    const s = parse('false');
    return should(s).equal(false);
  });
});
