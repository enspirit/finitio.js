import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';

describe('AdType#include', () => {

  const type = new AdType(Date, []);

  it('when not included', () => type.include('12').should.equal(false));

  it('when included', () => type.include(new Date()).should.equal(true));
});
