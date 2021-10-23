import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#attribute', () => {

  const parse = source => Parser.parse(source, { startRule: 'attribute' });

  it('works', () => {
    const s = parse('name: .');
    return should(s).eql({
      name: 'name',
      type: { any: {} },
    });
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ name: .');
    return should(s).eql({
      name: 'name',
      type: { any: {} },
      metadata: { description: 'Foo' },
    });
  });
});
