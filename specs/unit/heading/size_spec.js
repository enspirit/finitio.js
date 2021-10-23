import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Heading#size', () => {

  const r = new Attribute('red', intType);
  const g = new Attribute('green', intType);
  const b = new Attribute('blue', intType);

  it('on an empty heading', () => {
    const heading = new Heading([]);
    return heading.size().should.equal(0);
  });

  it('on an singleton heading', () => {
    const heading = new Heading([r]);
    return heading.size().should.equal(1);
  });

  it('on an big heading', () => {
    const heading = new Heading([r, g, b]);
    return heading.size().should.equal(3);
  });
});
