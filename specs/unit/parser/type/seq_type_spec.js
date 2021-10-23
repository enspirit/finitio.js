import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#seq_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('[.]');
    const expected = { seq: { elmType: { any: {} } } };
    return should(s).eql(expected);
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ [.]');
    const expected = { seq: {
      elmType: { any: {} },
      metadata: { description: 'Foo' },
    } };
    return should(s).eql(expected);
  });
});
