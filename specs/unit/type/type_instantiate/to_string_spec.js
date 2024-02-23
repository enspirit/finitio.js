import TypeInstantiate from '../../../../src/finitio/type/type_instantiate';
import should from 'should';

describe('TypeInstantiate#toString', () => {

  it('works on single instantiation', () => {
    const type = new TypeInstantiate('Collection', ['Person']);
    should(type.toString()).equal('Collection<Person>');
  });

  it('works on multiple instantiation', () => {
    const type = new TypeInstantiate('Processor', ['Person', 'Number']);
    should(type.toString()).equal('Processor<Person, Number>');
  });
});
