import AnyType from '../../../../src/finitio/type/any_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import _ from 'underscore';

describe('AnyType#low', () => {

  const type = new AnyType;

  it('equals itself', () => should(type.low()).equal(type));
});
