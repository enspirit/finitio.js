import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef\'s information contract', () => {

  const info = {
    name: 'Int',
    type: intType,
    metadata: { foo: 'bar' },
  };
  const type = TypeDef.info(info);

  it('dresses as expected', () => {
    should(type).be.an.instanceof(TypeDef);
    should(type.name).equal('Int');
    should(type.type).equal(intType);
    return should(type.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(type.toInfo()).eql(info));
});
