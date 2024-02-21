import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#any_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('.');
    return should(s).eql({ any: {} });
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ .');
    return should(s).eql({ any: {
      metadata: { description: 'Foo' },
    } });
  });
});
