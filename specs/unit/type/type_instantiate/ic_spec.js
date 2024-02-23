import TypeInstantiate from '../../../../src/finitio/type/type_instantiate';
import should from 'should';

describe('TypeInstantiate\'s information contract', () => {

  const info = {
    typeName: 'Collection',
    instantiation: ['Person'],
    metadata: { foo: 'bar' },
  };
  const type = TypeInstantiate.info(info);

  it('dresses as expected', () => {
    should(type).be.an.instanceof(TypeInstantiate);
    should(type.typeName).equal('Collection');
    should(type.instantiation).deepEqual(['Person']);
    return should(type.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(type.toInfo()).eql(info));
});
