import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#range_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with a closed range style', () => {
    const s = parse('1..10');
    return should(s).eql({ min: 1, max: 10, min_inclusive: true, max_inclusive: true });
  });

  it('works with a open range style', () => {
    const s = parse('1...10');
    return should(s).eql({ min: 1, max: 10, min_inclusive: true, max_inclusive: false });
  });

  it('works with a min only', () => {
    const s = parse('1..');
    return should(s).eql({ min: 1, min_inclusive: true });
  });
});

