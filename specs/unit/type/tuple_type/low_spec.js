import Type from '../../../../src/finitio/type';
import BuiltinType from '../../../../src/finitio/type/builtin_type';
import AnyType from '../../../../src/finitio/type/any_type';
import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';

describe('TupleType#toString', () => {

  const builtinString = new BuiltinType(String);

  class HighType extends Type {
    low() {
      return builtinString;
    }
  }

  const a = new Attribute('a', new HighType());
  const a_low = new Attribute('a', builtinString);

  const maybe_b = new Attribute('b', new HighType(), false);
  const maybe_b_low = new Attribute('b', builtinString, false);

  context('without extra allowed', () => {

    const heading = new Heading([a, maybe_b]);
    const heading_low = new Heading([a_low, maybe_b_low]);

    const type = new TupleType(heading);
    const type_low = new TupleType(heading_low);

    it('works', () => should(type.low()).eql(type_low));
  });

  return context('with extra allowed', () => {

    const heading = new Heading([a, maybe_b], { allowExtra: true });
    const heading_low = new Heading([a_low, maybe_b_low], { allowExtra: true });

    const type = new TupleType(heading);
    const type_low = new TupleType(heading_low);

    it('works', () => should(type.low()).eql(type_low));
  });
});
