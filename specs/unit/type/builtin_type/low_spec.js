import BuiltinType from '../../../../src/finitio/type/builtin_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import _ from 'underscore';

describe('BuiltinType#low', () => {

  const type = new BuiltinType(Number);

  it('equals itself', () => should(type.low()).equal(type));
});
