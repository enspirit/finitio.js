import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#union_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('.String|.Integer');
    const expected = { union: {
      candidates: [
        { builtin: { jsType: 'String' } },
        { builtin: { jsType: 'Integer' } },
      ],
    } };
    return should(s).eql(expected);
  });
});
