import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#funcref_literal', () => {

  const parse = source => Parser.parse(source, { startRule: 'literal' });

  it('works with a global function style', () => {
    const s = parse('&functionName');
    return should(s).eql('functionName');
  });

  it('works with a dotted function style', () => {
    const s = parse('&object.functionName');
    return should(s).eql('object.functionName');
  });
});
