import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#set_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with empty set', () => {
    const s = parse('{}');
    return should(s).eql([]);
  });

  it('works with empty sey with trailing spaces', () => {
    const s = parse('{   }');
    return should(s).eql([]);
  });

  it('works with a singleton', () => {
    const s = parse('{ 12 }');
    return should(s).eql([12]);
  });

  it('works with non singleton', () => {
    const s = parse('{ 12, 14 }');
    return should(s).eql([12, 14]);
  });
});

// Not sure it is wise for the parser to remove duplicates.
// Javascript...
// it 'works by removing duplicates', ()->
//     s = parse('{ 12, 14, 12 }')
//     should(s).eql([ 12, 14 ])
