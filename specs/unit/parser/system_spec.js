import Parser from '../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#system', () => {

  const parse = source => Parser.parse(source, { startRule: 'system' });

  it('works with a single type', () => {
    const s = parse('.');
    const expected = {
      types: [
        { name: 'Main', type: { any: {} } },
      ],
    };
    return should(s).eql(expected);
  });

  it('works with a type def', () => {
    const s = parse('Any = .');
    const expected = {
      types: [
        { name: 'Any', type: { any: {} } },
      ],
    };
    return should(s).eql(expected);
  });

  it('works with a type instantiation', () => {
    const s = parse('People = Collection<Person>');
    const expected = {
      types: [
        {
          name: 'People',
          type: {
            instantiate: {
              typeName: 'Collection',
              instantiation: ['Person']
            }
          }
        }
      ],
    };
    return should(s).eql(expected);
  });

  it('works with a generic definition', () => {
    const s = parse('Collection<T> = [T]');
    const expected = {
      types: [
        {
          name: 'Collection',
          generics: ['T'],
          type: {
            seq: {
              elmType: {
                ref: { typeName: 'T' }
              }
            }
          }
        }
      ],
    };
    return should(s).eql(expected);
  });

  it('works with an import and a ref', () => {
    const s = parse('@import finitio/data as f\nf.String');
    const expected = {
      imports: [
        { qualifier: 'f', from: 'finitio/data' },
      ],
      types: [
        { name: 'Main', type: { ref: { typeName: 'f.String' } } },
      ],
    };
    return should(s).eql(expected);
  });

  it('works with an import and a main tuple type', () => {
    const s = parse('@import finitio/data\n\n{ name: . }');
    const expected = {
      imports: [
        { from: 'finitio/data' },
      ],
      types: [
        { name: 'Main', type: { tuple: { heading: {
          attributes: [{ name: 'name', type: { any: {} } }],
        } } } },
      ],
    };
    return should(s).eql(expected);
  });

});
