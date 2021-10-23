import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import BuiltinType from '../../../src/finitio/type/builtin_type';
import should from 'should';
import { anyType, intType } from '../../spec_helpers';

describe('Heading#equality', () => {

  const r = new Attribute('r', intType);
  const g = new Attribute('g', intType);
  const b = new Attribute('b', intType);
  const a = new Attribute('a', intType);

  const h1 = new Heading([r, g, b]);
  const h2 = new Heading([r, b, g]);
  const h3 = new Heading([r, b]);
  const h4 = new Heading([r, b, a]);

  it('should apply structural equality', () => {
    h1.equals(h2).should.equal(true);
    return h2.equals(h1).should.equal(true);
  });

  it('should distinguish different types', () => {
    h1.equals(h3).should.equal(false);
    return h1.equals(h4).should.equal(false);
  });

  it('should be a total function, with null for non types', () => h1.equals(12).should.equal(false));

  it('should distinguish between extra allowance', () => {
    const no_extra = new Heading([r], { allowExtra: null });
    const extra = new Heading([r], { allowExtra: intType });
    return extra.equals(no_extra).should.equal(false);
  });

  it('should distinguish between different extra allowance', () => {
    const no_extra = new Heading([r], { allowExtra: anyType });
    const extra = new Heading([r], { allowExtra: intType });
    return extra.equals(no_extra).should.equal(false);
  });
});

