import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';
import { intType, stringType } from '../../../spec_helpers';

describe('AdType#fetch', () => {

  const f = function(arg) {};
  const c1 = new Contract('timestamp', intType, f, f);
  const c2 = new Contract('utc', stringType, f, f);
  const t = new AdType(Date, [c1, c2]);

  it('on works on an existing contract', () => {
    should(t.fetch('timestamp')).equal(c1);
    return should(t.fetch('utc')).equal(c2);
  });

  it('yields the block when missing', () => {
    const got = t.fetch('none', () => 12);
    return should(got).equal(12);
  });

  it('throws when no missing handler', () => {
    const l = () => t.fetch('none');
    return should(l).throw('No such contract `none`');
  });
});
