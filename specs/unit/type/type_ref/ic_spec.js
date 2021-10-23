import TypeRef from '../../../../src/finitio/type/type_ref';
import should from 'should';

describe('TypeRef\'s information contract', () => {

  const info = {
    typeName: 'Int',
    metadata: { foo: 'bar' },
  };
  const type = TypeRef.info(info);

  it('dresses as expected', () => {
    should(type).be.an.instanceof(TypeRef);
    should(type.typeName).equal('Int');
    return should(type.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(type.toInfo()).eql(info));
});
