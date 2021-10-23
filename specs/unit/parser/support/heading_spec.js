import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#heading', () => {

  const parse = source => Parser.parse(source, { startRule: 'heading' });

  it('works', () => {
    const s = parse('name: .');
    return should(s).eql({
      attributes: [
        {
          name: 'name',
          type: { any: {} },
        },
      ],
    });
  });

  it('works with an empty heading', () => {
    const s = parse('');
    return should(s).eql({
      attributes: [
      ],
    });
  });

  it('works with dots only', () => {
    const s = parse('...');
    return should(s).eql({
      attributes: [
      ],
      options: { allowExtra: { any: {} } },
    });
  });

  it('works with both', () => {
    const s = parse('name: ., ...');
    return should(s).eql({
      attributes: [
        {
          name: 'name',
          type: { any: {} },
        },
      ],
      options: { allowExtra: { any: {} } },
    });
  });

  it('works with dots and type only', () => {
    const s = parse('...: .String');
    return should(s).eql({
      attributes: [
      ],
      options: { allowExtra: { builtin: { jsType: 'String' } } },
    });
  });

  it('works with both', () => {
    const s = parse('name: ., ...: .String');
    return should(s).eql({
      attributes: [
        {
          name: 'name',
          type: { any: {} },
        },
      ],
      options: { allowExtra: { builtin: { jsType: 'String' } } },
    });
  });
});
