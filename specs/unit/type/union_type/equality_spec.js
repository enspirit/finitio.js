import UnionType from '../../../../src/finitio/type/union_type';
import should from 'should';
import { intType, floatType, byteType } from '../../../spec_helpers';

describe('UnionType#equality', () => {

  const uType = new UnionType([intType, floatType]);
  const uType2 = new UnionType([floatType, intType]);
  const uType3 = new UnionType([floatType, intType]);
  const uType4 = new UnionType([floatType, floatType]);
  const uType5 = new UnionType([floatType, intType, byteType]);
  const uType6 = new UnionType([intType]);

  it('should apply structural equality', () => {
    uType.equals(uType2).should.equal(true);
    uType.equals(uType3).should.equal(true);
    return uType2.equals(uType3).should.equal(true);
  });

  it('should apply distinguish different types', () => {
    uType.equals(uType4).should.equal(false);
    uType.equals(uType5).should.equal(false);
    uType.equals(uType6).should.equal(false);
    return uType.equals(intType).should.equal(false);
  });

  it('should be a total function, with null for non types', () => uType.equals(12).should.equal(false));
});
