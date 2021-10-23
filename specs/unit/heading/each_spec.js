import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import _ from 'underscore';
import { intType } from '../../spec_helpers';

describe('Heading#each', () => {

  const a = new Attribute('a', intType);
  const b = new Attribute('b', intType);
  const h = new Heading([a, b]);

  describe('without a block', () => it('should be a function', () => h.each.should.be.a.function));

  return describe('with a callback', () => it('should call with each attribute in turn', () => {
    const seen = [];
    h.each(attr => seen.push(attr));
    return _.isEqual(seen, [a, b]).should.equal(true);
  }));
});
