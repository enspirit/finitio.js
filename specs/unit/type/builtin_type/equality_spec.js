import BuiltinType from '../../../../src/finitio/type/builtin_type';
import should from 'should';

describe('BuiltinType#equals', () => {

  const numType = new BuiltinType(Number);
  const numType2 = new BuiltinType(Number);
  const strType = new BuiltinType(String);

  it('should apply structural equality', () => numType.equals(numType2).should.equal(true));

  it('should apply distinguish different types', () => numType.equals(strType).should.equal(false));

  it('should be a total function, with null for non types', () => numType.equals(12).should.equal(false));
});
