import Constraint from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SubType\'s information contract', () => {

  const big = function() {};
  const bigC = Constraint.info({
    name: 'big',
    native: big,
  });
  const info = {
    superType: intType,
    constraints: [bigC],
    metadata: { foo: 'bar' },
  };
  const t = SubType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(SubType);
    should(t.constraints).eql([bigC]);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(t.toInfo()).eql(info));
});
