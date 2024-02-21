import Type from '../../../../src/finitio/type';
import BuiltinType from '../../../../src/finitio/type/builtin_type';
import AnyType from '../../../../src/finitio/type/any_type';
import {NativeConstraint} from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SubType#low', () => {

  const builtinString = new BuiltinType(String);

  class HighType extends Type {
    low() {
      return builtinString;
    }
  }

  const type = new SubType(new HighType(), [
    new NativeConstraint('default', i => i > 0),
    new NativeConstraint('small', i => i < 255),
  ]);

  it('works', () => should(type.low()).eql(builtinString));
});
