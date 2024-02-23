import Parser from '../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#generic_def', () => {

  const parse = source => Parser.parse(source, { startRule: 'generic_def' });

  it('works with single generics', () => {
    const s = parse('Collection<T> = [T]');
    return should(s).eql({
      name: 'Collection',
      type: {
        seq: { elmType: { ref: { typeName: 'T' } } }
      },
      generics: ['T']
    });
  })

  it('works with multiple generics', () => {
    const s = parse('Processor<I, O> = { input: I, output: O }');
    return should(s).eql({
      name: 'Processor',
      generics: ['I', 'O'],
      type: {
        tuple: {
          heading: {
            attributes: [{
              name: 'input',
              type: {
                ref: {
                  typeName: 'I'
                }
              }
            }, {
              name: 'output',
              type: {
                ref: {
                  typeName: 'O'
                }
              }
            }]
          }
        }
      },
    });
  });
});
