import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import RelationType from '../../../../src/finitio/type/relation_type';
import { intType } from '../../../spec_helpers';
import should from 'should';

describe('RelationType#equality', () => {

  const r = new Attribute('r', intType);
  const b = new Attribute('b', intType);
  const maybe_b = new Attribute('b', intType, false);

  const h1 = new Heading([r, maybe_b]);
  const h2 = new Heading([maybe_b, r]);
  const h3 = new Heading([b]);
  const h4 = new Heading([b, r]);

  const type1 = new RelationType(h1);
  const type2 = new RelationType(h2);
  const type3 = new RelationType(h3);
  const type4 = new RelationType(h4);

  it('should apply structural equality', () => {
    type1.equals(type2).should.equal(true);
    return type2.equals(type1).should.equal(true);
  });

  it('should apply distinguish different types', () => {
    type1.equals(type3).should.equal(false);
    type2.equals(type3).should.equal(false);
    return type1.equals(type4).should.equal(false);
  });

  it('should be a total function, with false for non types', () => type1.equals(12).should.equal(false));
});
