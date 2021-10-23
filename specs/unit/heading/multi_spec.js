import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import BuiltinType from '../../../src/finitio/type/builtin_type';
import should from 'should';
import { anyType, intType } from '../../spec_helpers';

describe('Heading#multi', () => {

  const red = new Attribute('red', intType);
  const blue = new Attribute('blue', intType);
  const maybe_blue = new Attribute('blue', intType, false);

  const subject = (attributes, options) => new Heading(attributes, options).multi();

  describe('with no attribute', () => it('should be false', () => subject([]).should.equal(false)));

  describe('with required attributes only', () => it('should be false', () => subject([red, blue]).should.equal(false)));

  describe('with some optional attributes', () => it('should be true', () => subject([red, maybe_blue]).should.equal(true)));

  describe('with allowExtra set to AnyType', () => it('should be true', () => subject([red, blue], { allowExtra: anyType }).should.equal(true)));

  return describe('with allowExtra set a specific Type', () => it('should be true', () => subject([red, blue], { allowExtra: intType }).should.equal(true)));
});
