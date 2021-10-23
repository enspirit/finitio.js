import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#relation_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('{{ name: . }}');
    const expected = {
      relation: {
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
    const s = parse('/- Foo -/ {{ name: . }}');
    const expected = {
      relation: {
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
