import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#sub_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works with a single unnamed constraint', () => {
    const s = parse('.( i | i>0 )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { native: ['i', 'i>0'] },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with a single named constraint', () => {
    const s = parse('.( i | positive: i>0 )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { name: 'positive', native: ['i', 'i>0'] },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with multiple named constraints', () => {
    const s = parse('.( i | positive: i>0, negative: i<0 )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { name: 'positive', native: ['i', 'i>0'] },
          { name: 'negative', native: ['i', 'i<0'] },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ .( i | i>0 )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { native: ['i', 'i>0'] },
        ],
        metadata: { description: 'Foo' },
      },
    };
    return should(s).eql(expected);
  });

  it('works with a regexp constraint shortcut', () => {
    const s = parse('. :: /[a-z]+/');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { regexp: '[a-z]+' },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with a range constraint shortcut', () => {
    const s = parse('. :: 1..10');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { range: { min: 1, max: 10, min_inclusive: true, max_inclusive: true } },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with a set constraint shortcut', () => {
    const s = parse('. :: { 1 2 3 }');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { set: [1, 2, 3] },
        ],
      },
    };
    return should(s).eql(expected);
  });
});
