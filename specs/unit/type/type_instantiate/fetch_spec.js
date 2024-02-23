import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TypeInstantiate from '../../../../src/finitio/type/type_instantiate';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';
import { seqTypeT } from '../../../spec_helpers';

describe('TypeInstantiate#fetch', () => {
  const a = new Attribute('a', seqTypeT);
  const heading = new Heading([a]);
  const tuplety = new TupleType(heading);

  it('delegates to the aliased type', () => {
    const type = new TypeInstantiate('tuple', ['T'], null, tuplety);
    return should(type.fetch('a')).equal(a);
  });

});
