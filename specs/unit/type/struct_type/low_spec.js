import Type from '../../../../src/finitio/type';
import BuiltinType from '../../../../src/finitio/type/builtin_type';
import AnyType from '../../../../src/finitio/type/any_type';
import StructType from '../../../../src/finitio/type/struct_type';
import _ from 'underscore';
import should from 'should';
import { intType, floatType } from '../../../spec_helpers';

describe('StructType#low', () => {

  const builtinString = new BuiltinType(String);

  class HighType extends Type {
    low() {
      return builtinString;
    }
  }

  const type = new StructType([new HighType(), new HighType()]);

  it('works', () => {
    const expected = new StructType([builtinString, builtinString]);
    return should(type.low()).eql(expected);
  });
});
