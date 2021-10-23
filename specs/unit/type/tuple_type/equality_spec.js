import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TupleType#equality', () => {

  const maybe_r = new Attribute('r', intType, false);
  const b = new Attribute('b', intType);

  const h1 = new Heading([maybe_r, b]);
  const h2 = new Heading([b, maybe_r]);
  const h3 = new Heading([b]);

  const type1 = new TupleType(h1);
  const type2 = new TupleType(h2);
  const type3 = new TupleType(h3);

  it('should apply structural equality', () => {
    type1.equals(type2).should.equal(true);
    return type2.equals(type1).should.equal(true);
  });

  it('should apply distinguish different types', () => {
    type1.equals(type3).should.equal(false);
    return type2.equals(type3).should.equal(false);
  });

  it('should be a total function, with nil for non types', () => type1.equals(12).should.equal(false));
});
