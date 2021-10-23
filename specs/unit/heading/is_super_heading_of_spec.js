import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import { anyType, intType, floatType, byteType } from '../../spec_helpers';

describe('Heading#isSuperHeadingOf', () => {

  const a = new Attribute('a', byteType);
  const b = new Attribute('b', byteType);
  const super_a = new Attribute('a', intType);
  const maybe_a = new Attribute('a', byteType, false);

  const heading = (attributes, opts) => new Heading(attributes, opts || {});

  // same and different, no maybe, no super, no extra

  it('recognizes with itself', () => {
    const h1 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h1)).equal(true);
  });

  it('recognizes with equal', () => {
    const h1 = heading([a, b]);
    const h2 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('recognizes with equal in different order', () => {
    const h1 = heading([a, b]);
    const h2 = heading([b, a]);
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('distinguishes with disjoint', () => {
    const h1 = heading([a]);
    const h2 = heading([b]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  it('distinguishes with subset', () => {
    const h1 = heading([a]);
    const h2 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  it('distinguishes with superset', () => {
    const h1 = heading([a, b]);
    const h2 = heading([a]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  // super type

  it('recognizes with super_a', () => {
    const h1 = heading([super_a, b]);
    const h2 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('distinguishes with sub_a', () => {
    const h1 = heading([a, b]);
    const h2 = heading([super_a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  // maybes

  it('recognizes with maybe_a', () => {
    const h1 = heading([maybe_a, b]);
    const h2 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('distinguishes with required_a', () => {
    const h1 = heading([a, b]);
    const h2 = heading([maybe_a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  // missings

  it('recognizes with missing optionals', () => {
    const h1 = heading([maybe_a, b]);
    const h2 = heading([b]);
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('distinguishes with missing weakened', () => {
    const h1 = heading([a, b]);
    const h2 = heading([maybe_a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  // extra

  it('recognizes with right-extra if allow extra (anyType)', () => {
    const h1 = heading([a], { allowExtra: anyType });
    const h2 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('recognizes when sub allows more specific extra than parent', () => {
    const h1 = heading([a], { allowExtra: anyType });
    const h2 = heading([a], { allowExtra: intType });
    return should(h1.isSuperHeadingOf(h2)).equal(true);
  });

  it('distinguishes with right-extra if not allow extra', () => {
    const h1 = heading([a], { allowExtra: null });
    const h2 = heading([a, b]);
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  it('distinguishes when sub allows extra while parent does not', () => {
    const h1 = heading([a]);
    const h2 = heading([a], { allowExtra: anyType });
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });

  it('distinguishes when sub allows extra that is not subtype of parent\'s extra', () => {
    const h1 = heading([a], { allowExtra: intType });
    const h2 = heading([a], { allowExtra: anyType });
    return should(h1.isSuperHeadingOf(h2)).equal(false);
  });
});
