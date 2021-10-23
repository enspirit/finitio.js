import BuiltinType from '../../../../src/finitio/type/builtin_type';
import should from 'should';

describe('BuiltinType#constructor', () => {

  const type = new BuiltinType(Number);

  it('should set instance variables', () => type.jsType.should.equal(Number));
});
