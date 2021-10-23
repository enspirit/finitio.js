import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#array_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with empty array', () => {
    const s = parse('[]');
    return should(s).eql([]);
  });

  it('works with empty array with trailing spaces', () => {
    const s = parse('[  ]');
    return should(s).eql([]);
  });

  it('works with singleton', () => {
    const s = parse('[ 12 ]');
    return should(s).eql([12]);
  });

  it('works with non singleton', () => {
    const s = parse('[ 12, 14 ]');
    return should(s).eql([12, 14]);
  });
});
