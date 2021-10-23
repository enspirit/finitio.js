import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';
import AnyType from '../../../../src/finitio/type/any_type';

describe('AdType\'s information contract', () => {

  const fn = function() {};
  const anyType = new AnyType();
  const iso = Contract.info({
    name: 'iso',
    infoType: anyType,
    explicit: { dress: fn, undress: fn },
  });
  const asi = Contract.info({
    name: 'asi',
    infoType: anyType,
    explicit: { dress: fn, undress: fn },
  });
  const type = AdType.info({ contracts: [iso, asi] });

  it('works', () => should(type.toString()).equal('<iso> ., <asi> .'));
});
