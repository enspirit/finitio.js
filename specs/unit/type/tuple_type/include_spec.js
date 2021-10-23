import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import { anyType, intType } from '../../../spec_helpers';
import should from 'should';

describe('TupleType#include', () => {

  const a = new Attribute('a', intType);
  const maybe_b = new Attribute('b', intType, false);

  context('without extra allowed', () => {

    const heading = new Heading([a, maybe_b]);
    const type = new TupleType(heading);

    const subject = arg => type.include(arg);

    context('when a valid hash and both attributes', () => {
      const arg = { a: 12, b: 14 };

      it('should be true', () => subject(arg).should.equal(true));
    });

    context('when a valid hash but no optional attribute', () => {
      const arg = { a: 12 };

      it('should be true', () => subject(arg).should.equal(true));
    });

    context('when an invalid hash (too many attributes)', () => {
      const arg = { a: 12, c: 15 };

      it('should be false', () => subject(arg).should.equal(false));
    });

    context('when an invalid hash (too few attributes)', () => {
      const arg = { b: 12 };

      it('should be false', () => subject(arg).should.equal(false));
    });

    context('when an invalid hash (wrong type)', () => {
      const arg = { a: 12, b: '15' };

      it('should be false', () => subject(arg).should.equal(false));
    });

    return context('when an invalid hash (wrong type II)', () => {
      const arg = { a: false, b: 15 };

      it('should be false', () => subject(arg).should.equal(false));
    });
  });

  return context('with extra allowed', () => {

    const heading = new Heading([a, maybe_b], { allowExtra: anyType });
    const type = new TupleType(heading);

    const subject = arg => type.include(arg);

    return context('when valid hash, yet with extra attributes', () => {
      const arg = { a: 12, c: 15 };

      it('should be true', () => subject(arg).should.equal(true));
    });
  });
});

