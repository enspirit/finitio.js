import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TypeRef from '../../../../src/finitio/type/type_ref';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#fetch', () => {

  const a = new Attribute('a', intType);
  const heading = new Heading([a]);
  const tuplety = new TupleType(heading);

  it('delegates to the aliased type', () => {
    const type = new TypeRef('tuple', null, tuplety);
    return should(type.fetch('a')).equal(a);
  });
});
