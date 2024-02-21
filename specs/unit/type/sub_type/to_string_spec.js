import AnyType from '../../../../src/finitio/type/any_type';
import {NativeConstraint} from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SubType#toString', () => {

  const type = new SubType(new AnyType(), [
    new NativeConstraint('default', i => i > 0),
    new NativeConstraint('small', i => i < 255),
  ]);

  it('works', () => should(type.toString()).equal('.( x | ... )'));
});
