import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';
import { intType, stringType } from '../../../spec_helpers';

describe('AdType#contractNames', () => {

  const f = function(arg) {};

  const adtype = new AdType(Date, [
    new Contract('timestamp', intType, f, f),
    new Contract('utc', stringType, f, f),
  ]);

  it('should be as expected', () => should(adtype.contractNames()).eql(['timestamp', 'utc']));
});
