import AnyType from '../../../../src/finitio/type/any_type';
import should from 'should';

describe('AnyType#equals', () => {

  const anyType1 = new AnyType();
  const anyType2 = new AnyType();

  it('should apply structural equality', () => anyType1.equals(anyType2).should.equal(true));

  it('should be a total function, with null for non types', () => anyType1.equals(12).should.equal(false));
});
