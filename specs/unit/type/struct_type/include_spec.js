import StructType from '../../../../src/finitio/type/struct_type';
import _ from 'underscore';
import should from 'should';
import { intType, floatType } from '../../../spec_helpers';

describe('StructType#include', () => {

  const type = new StructType([intType, floatType]);

  const subject = arg => type.include(arg);

  describe('when a valid array', () => {
    const arg = [12, 14.1];

    it('should be true', () => subject(arg).should.equal(true));
  });

  describe('when not an array', () => {
    const arg = 'bar';

    it('should be false', () => subject(arg).should.equal(false));
  });

  describe('when an invalid array (too few attributes)', () => {
    const arg = [12];

    it('should be false', () => subject(arg).should.equal(false));
  });

  context('when an invalid array (too many attributes)', () => {
    const arg = [12, 14.1, 'foo'];

    it('should be false', () => subject(arg).should.equal(false));
  });

  return describe('when an invalid array (wrong type)', () => {
    const arg = [12, 'bar'];

    it('should be false', () => subject(arg).should.equal(false));
  });
});

