import AnyType from '../../../../src/finitio/type/any_type';
import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';

describe('TupleType#toString', () => {

  const anyType = new AnyType();
  const a = new Attribute('a', anyType);
  const maybe_b = new Attribute('b', anyType, false);

  context('without extra allowed', () => {

    const heading = new Heading([a, maybe_b]);
    const type = new TupleType(heading);

    it('works', () => should(type.toString()).equal('{ a : ., b :? . }'));
  });

  return context('with extra allowed', () => {

    const heading = new Heading([a, maybe_b], { allowExtra: anyType });
    const type = new TupleType(heading);

    it('works', () => should(type.toString()).equal('{ a : ., b :? ., ... }'));
  });
});
