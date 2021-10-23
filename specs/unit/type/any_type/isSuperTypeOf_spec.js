import AnyType from '../../../../src/finitio/type/any_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('AnyType#isSuperTypeOf', () => {

  const type = AnyType.info({});

  it('returns true against itself', () => should(type.isSuperTypeOf(type)).equal(true));

  it('return true againt another type', () => should(type.isSuperTypeOf(intType)).equal(true));
});
