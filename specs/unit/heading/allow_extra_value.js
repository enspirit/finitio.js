import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import _ from 'underscore';
import { anyType, intType } from '../../spec_helpers';

describe('Heading#allowExtraValue', () => {

  const r = new Attribute('r', intType);

  const heading = (attributes, options) => new Heading(attributes, options);

  it('is false by default', () => {
    const h = heading([r]);
    return h.allowExtraValue().should.equal(false);
  });

  it('is false by default, given any value', () => {
    const h = heading([r]);
    h.allowExtraValue(12).should.equal(false);
    h.allowExtraValue(12.2).should.equal(false);
    return h.allowExtraValue('12').should.equal(false);
  });

  it('is true if type is set and no value given', () => {
    const h = heading([r], { allowExtra: intType });
    return h.allowExtraValue().should.equal(true);
  });

  it('is false if type is set and wrong value given', () => {
    const h = heading([r], { allowExtra: intType });
    return h.allowExtraValue('foo').should.equal(false);
  });

  it('is true if type is set and correct type given', () => {
    const h = heading([r], { allowExtra: intType });
    return h.allowExtraValue(12).should.equal(true);
  });

  it('is true if type is set and subtype given', () => {
    const h = heading([r], { allowExtra: anyType });
    return h.allowExtraValue(12).should.equal(true);
  });
});
