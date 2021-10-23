import AnyType from '../../../../src/finitio/type/any_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('AnyType\'s information contract', () => context('unnamed', () => {
  const info = {
    metadata: { foo: 'bar' },
  };
  const t = AnyType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(AnyType);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(t.toInfo()).eql(info));
}));
