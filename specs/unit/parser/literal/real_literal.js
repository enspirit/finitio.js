import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#real_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works positive real', () => {
    const s = parse('12.5');
    return should(s).equal(12.5);
  });

  it('works with zero', () => {
    const s = parse('0.0');
    return should(s).equal(0.0);
  });

  it('works with zero II', () => {
    const s = parse('.0');
    return should(s).equal(0.0);
  });

  it('works with zero III', () => {
    const s = parse('0.0000');
    return should(s).equal(0.0);
  });

  it('works with negative reals', () => {
    const s = parse('-12.0');
    return should(s).equal(-12.0);
  });

  it('allows a zero-starting real', () => {
    const s = parse('0.12');
    return should(s).equal(0.12);
  });

  it('allows a negative zero-starting real', () => {
    const s = parse('-0.12');
    return should(s).equal(-0.12);
  });
});
