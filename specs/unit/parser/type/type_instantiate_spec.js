import Parser from '../../../../src/finitio/parser/parser';
import should from 'should';

describe('Parser#type_instantiate', () => {

  const parse = source => Parser.parse(source, { startRule: 'type_instantiate' });

  it('works with single instantiation', () => {
    const s = parse('Collection<String>');
    return should(s).eql({
      instantiate: {
        typeName: 'Collection',
        instantiation: ['String']
      },
    });
  });

  it('works with qualified instantiation', () => {
    const s = parse('Collection<Type.Person>');
    return should(s).eql({
      instantiate: {
        typeName: 'Collection',
        instantiation: ['Type.Person']
      },
    });
  });

  it('works with multiple instantiation', () => {
    const s = parse('Processor<String, Number>');
    return should(s).eql({
      instantiate: {
        typeName: 'Processor',
        instantiation: ['String', 'Number']
      },
    });
  });

});
