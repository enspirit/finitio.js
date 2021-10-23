import Attribute from '../../../src/finitio/support/attribute';
import BuiltinType from '../../../src/finitio/type/builtin_type';
import should from 'should';

describe('Attribute#equality', () => {

  const attr1 = new Attribute('red', new BuiltinType(Number));
  const attr2 = new Attribute('red', new BuiltinType(Number));
  const attr3 = new Attribute('blue', new BuiltinType(Number));

  it('should apply structural equality', () => {
    attr1.equals(attr2).should.equal(true);
  });

  it('should distinguish different attributes', () => {
    attr1.equals(attr3).should.equal(false);
  });

  it('should false against non Attribute', () => {
    attr1.equals(12).should.equal(false);
  });
});
