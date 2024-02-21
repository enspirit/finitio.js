import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#builtin_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('.String');
    return should(s).eql({ builtin: { jsType: 'String' } });
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ .String');
    return should(s).eql({ builtin: {
      jsType: 'String',
      metadata: { description: 'Foo' },
    } });
  });
});
