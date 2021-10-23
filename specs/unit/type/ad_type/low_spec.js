import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';
import BuiltinType from '../../../../src/finitio/type/builtin_type';

describe('AdType#low', () => {

  const fn = function() {};

  const c1Type = new BuiltinType(Number);

  const c2Type = new BuiltinType(String);

  const iso = Contract.info({
    name: 'iso',
    infoType: c1Type,
    explicit: { dress: fn, undress: fn },
  });

  const asi = Contract.info({
    name: 'asi',
    infoType: c2Type,
    explicit: { dress: fn, undress: fn },
  });

  const type = AdType.info({ contracts: [iso, asi] });

  it('works', () => should(type.low()).equal(c1Type.low()));
});
