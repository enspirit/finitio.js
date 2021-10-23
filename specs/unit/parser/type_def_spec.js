import Parser from '../../../src/finitio/parser';
import should from 'should';

describe('Parser#type_def', () => {

  const parse = source => Parser.parse(source, { startRule: 'type_def' });

  it('works', () => {
    const s = parse('String = .String');
    return should(s).eql({
      name: 'String',
      type: { builtin: { jsType: 'String' } },
    });
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ String = .String');
    return should(s).eql({
      name: 'String',
      type: { builtin: { jsType: 'String' } },
      metadata: { description: 'Foo' },
    });
  });
});
