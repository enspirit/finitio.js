import AnyType from '../../../../src/finitio/type/any_type';
import Constraint from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SubType#toString', () => {

  const type = new SubType(new AnyType(), [
    new Constraint.Native('default', i => i > 0),
    new Constraint.Native('small', i => i < 255),
  ]);

  it('works', () => should(type.toString()).equal('.( x | ... )'));
});
