import Parser from '../../../src/finitio/parser';
import should from 'should';

describe('Parser#import_def', () => {

  const parse = source => Parser.parse(source, { startRule: 'import_def' });

  it('works with an unqualified', () => {
    const s = parse('@import foo/bar');
    return should(s).eql({
      from: 'foo/bar',
    });
  });

  it('works with a qualified', () => {
    const s = parse('@import foo/bar as baz');
    return should(s).eql({
      from: 'foo/bar',
      qualifier: 'baz',
    });
  });
});
