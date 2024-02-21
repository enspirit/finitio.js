import Parser from '../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#metadata', () => {

  const parse = source => Parser.parse(source, { startRule: 'metadata' });

  it('works with text metadata', () => {
    const s = parse('/- Some fooes and bars -/');
    return should(s).eql({ description: 'Some fooes and bars' });
  });

  it('works with structured metadata', () => {
    const s = parse('/- size: 12, descr: "Hello world" -/');
    return should(s).eql({ size: 12, descr: 'Hello world' });
  });
});
