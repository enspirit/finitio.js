import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import _ from 'underscore';
import { anyType, intType } from '../../spec_helpers';

describe('Heading#allowExtra', () => {

  const r = new Attribute('r', intType);

  const heading = (attributes, options) => new Heading(attributes, options);

  it('is false by default', () => {
    const h = heading([r]);
    return h.allowExtra().should.equal(false);
  });

  it('is false by default, given Any', () => {
    const h = heading([r]);
    return h.allowExtra(anyType).should.equal(false);
  });

  it('can be set to a type', () => {
    const h = heading([r], { allowExtra: anyType });
    return h.allowExtra().should.equal(true);
  });

  it('can be set to false explicitely', () => {
    const h = heading([r], { allowExtra: false });
    return h.allowExtra().should.equal(false);
  });

  it('is true if type is set and no type given', () => {
    const h = heading([r], { allowExtra: intType });
    return h.allowExtra().should.equal(true);
  });

  it('is false if type is set and wrong type given', () => {
    const h = heading([r], { allowExtra: intType });
    return h.allowExtra(anyType).should.equal(false);
  });

  it('is true if type is set and correct type given', () => {
    const h = heading([r], { allowExtra: intType });
    return h.allowExtra(intType).should.equal(true);
  });

  it('is true if type is set and subtype given', () => {
    const h = heading([r], { allowExtra: anyType });
    return h.allowExtra(intType).should.equal(true);
  });
});
