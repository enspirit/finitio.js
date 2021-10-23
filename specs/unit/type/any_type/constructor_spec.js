import AnyType from '../../../../src/finitio/type/any_type';
import should from 'should';

describe('AnyType#constructor', () => {

  const type = new AnyType;

  it('should create an AnyType instance', () => type.should.be.an.instanceof(AnyType));
});
