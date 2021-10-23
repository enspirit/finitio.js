import Type from '../../../../src/finitio/type';
import BuiltinType from '../../../../src/finitio/type/builtin_type';
import AnyType from '../../../../src/finitio/type/any_type';
import SeqType from '../../../../src/finitio/type/seq_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SeqType#low', () => {

  const builtinString = new BuiltinType(String);

  class HighType extends Type {
    low() {
      return builtinString;
    }
  }

  const type = new SeqType(new HighType());

  it('works', () => {
    const expected = new SeqType(builtinString);
    return should(type.low()).eql(expected);
  });
});
