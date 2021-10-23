import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('AdType\'s information contract', () => {

  const fromIso = function() {};
  const toIso = function() {};
  const contract = Contract.info({
    name: 'iso',
    infoType: intType,
    explicit: { dress: fromIso, undress: toIso },
    metadata: { foo: 'bar' },
  });
  const info = {
    contracts: [contract],
    metadata: { foo: 'bar' },
  };
  const type = AdType.info(info);

  it('dresses as expected', () => {
    should(type).be.an.instanceof(AdType);
    should(type.contracts).eql([contract]);
    return should(type.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(type.toInfo()).eql(info));
});
