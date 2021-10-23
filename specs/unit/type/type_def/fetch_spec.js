import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TypeDef from '../../../../src/finitio/type/type_def';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#fetch', () => {

  const a = new Attribute('a', intType);
  const heading = new Heading([a]);
  const tuplety = new TupleType(heading);

  it('delegates to the aliased type', () => {
    const type = new TypeDef(tuplety, 'foo');
    return should(type.fetch('a')).equal(a);
  });
});
