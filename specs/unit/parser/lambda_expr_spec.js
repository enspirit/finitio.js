import Parser from '../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#lambda_expr', () => {

  const parse = source => Parser.parse(source, { startRule: 'lambda_expr' });

  it('works', () => {
    const s = parse('( s | s>0 )');
    return should(s).eql(['s', 's>0']);
  });
});
