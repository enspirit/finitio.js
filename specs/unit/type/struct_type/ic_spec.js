import StructType from '../../../../src/finitio/type/struct_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('StructType\'s information contract', () => {

  const info = {
    componentTypes: [intType],
    metadata: { foo: 'bar' },
  };
  const t = StructType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(StructType);
    should(t.componentTypes).eql([intType]);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(t.toInfo()).eql(info));
});
