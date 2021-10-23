import Type from '../../../../src/finitio/type';
import BuiltinType from '../../../../src/finitio/type/builtin_type';
import AnyType from '../../../../src/finitio/type/any_type';
import SetType from '../../../../src/finitio/type/set_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SetType#low', () => {

  const builtinString = new BuiltinType(String);

  class HighType extends Type {
    low() {
      return builtinString;
    }
  }

  const type = new SetType(new HighType());

  it('works', () => {
    const expected = new SetType(builtinString);
    return should(type.low()).eql(expected);
  });
});
