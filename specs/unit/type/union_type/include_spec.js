import UnionType from '../../../../src/finitio/type/union_type';
import should from 'should';
import { intType, floatType } from '../../../spec_helpers';

describe('UnionType#include', () => {

  const type = new UnionType([intType, floatType]);

  const subject = arg => type.include(arg);

  it('when not included', () => subject('12').should.equal(false));

  it('when included on int', () => subject(12).should.equal(true));

  it('when included on float', () => subject(12.0).should.equal(true));
});
