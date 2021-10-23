import SetType from '../../../../src/finitio/type/set_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SetType\'s information contract', () => {

  const info = {
    elmType: intType,
    metadata: { foo: 'bar' },
  };
  const t = SetType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(SetType);
    should(t.elmType).equal(intType);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => {
    should(t.toInfo()).eql(info);
  });
});
