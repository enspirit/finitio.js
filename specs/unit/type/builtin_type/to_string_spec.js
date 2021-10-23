import BuiltinType from '../../../../src/finitio/type/builtin_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import _ from 'underscore';

describe('BuiltinType#toString', () => {

  const type = new BuiltinType(Number);

  it('equals \'.Number\'', () => should(type.toString()).equal('.Number'));
});
