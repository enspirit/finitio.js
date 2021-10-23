import BuiltinType from '../../../../src/finitio/type/builtin_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';

describe('BuiltinType#include', () => {

  const type = new BuiltinType(Number);

  const subject = arg => type.include(arg);

  it('when not included', () => subject('12').should.equal(false));

  it('when included', () => subject(12).should.equal(true));
});
