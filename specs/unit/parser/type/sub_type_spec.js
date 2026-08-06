import Parser from '../../../../src/finitio/parser/parser';
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

  // A comma only separates constraints at the top level. Commas nested inside
  // a native expression (regexp quantifiers, argument lists, ...) belong to
  // that expression and must not split it.
  it('works with a regexp quantifier holding a comma', () => {
    const s = parse('.( s | /^[A-Za-z0-9_-]{1,64}$/.test(s) )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { native: ['s', '/^[A-Za-z0-9_-]{1,64}$/.test(s)'] },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with an open ended regexp quantifier', () => {
    const s = parse('.( s | /^a{2,}$/.test(s) )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { native: ['s', '/^a{2,}$/.test(s)'] },
        ],
      },
    };
    return should(s).eql(expected);
  });

  it('works with a comma inside a function call', () => {
    const s = parse('.( s | s.slice(0,2) === "ab" )');
    const expected = {
      sub: {
        superType: { any: {} },
        constraints: [
          { native: ['s', 's.slice(0,2) === "ab"'] },
        ],
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
