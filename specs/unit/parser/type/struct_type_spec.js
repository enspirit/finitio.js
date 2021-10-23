import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#struct_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('<.,.String>');
    return should(s).eql({
      struct: {
        componentTypes: [
          { any: {} },
          { builtin: { jsType: 'String' } },
        ],
      },
    });
  });

  it('works with metadata', () => {
    const s = parse('/- Foo -/ <.,.String>');
    return should(s).eql({
      struct: {
        componentTypes: [
          { any: {} },
          { builtin: { jsType: 'String' } },
        ],
        metadata: { description: 'Foo' },
      },
    });
  });
});
