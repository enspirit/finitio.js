import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#tuple_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('{ name: . }');
    const expected = {
      tuple: {
        heading: {
          attributes: [
            {
              name: 'name',
              type: { any: {} },
            },
          ],
        },
      },
    };
    return should(s).eql(expected);
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ { name: . }');
    const expected = {
      tuple: {
        heading: {
          attributes: [
            {
              name: 'name',
              type: { any: {} },
            },
          ],
        },
        metadata: { description: 'Foo' },
      },
    };
    return should(s).eql(expected);
  });
});
