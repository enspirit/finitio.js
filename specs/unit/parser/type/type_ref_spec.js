import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#type_ref', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works', () => {
    const s = parse('String');
    return should(s).eql({ ref: { typeName: 'String' } });
  });
});
