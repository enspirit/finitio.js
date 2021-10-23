import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#integer_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with single-digit positive integer', () => {
    const s = parse('2');
    return should(s).equal(2);
  });

  it('works with multi-digit positive integer', () => {
    const s = parse('12');
    return should(s).equal(12);
  });

  it('works with zero', () => {
    const s = parse('0');
    return should(s).equal(0);
  });

  it('works with negative integers', () => {
    const s = parse('-12');
    return should(s).equal(-12);
  });
});
