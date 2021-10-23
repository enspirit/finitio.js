import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import RelationType from '../../../../src/finitio/type/relation_type';
import { intType } from '../../../spec_helpers';
import should from 'should';

describe('RelationType#include', () => {

  const heading = new Heading([
    new Attribute('a', intType),
    new Attribute('b', intType, false),
  ]);

  const type = new RelationType(heading);

  const subject = arg => type.include(arg);

  context('when a empty set', () => {
    const arg = [];

    it('should be true', () => subject(arg).should.equal(true));
  });

  context('when a valid, non empty set', () => {
    const arg = [];
    arg.push({ a: 12, b: 15 });
    arg.push({ a: 15, b: 16 });

    it('should be true', () => subject(arg).should.equal(true));
  });

  context('when a valid, non empty set but missing optionals', () => {

    const arg = [];
    arg.push({ a: 12 });
    arg.push({ a: 15, b: 16 });

    it('should be true', () => subject(arg).should.equal(true));
  });

  context('when not a set', () => {
    const arg = 'foo';

    it('should be false', () => subject(arg).should.equal(false));
  });

  context('when a set containing invalid tuples', () => {
    const arg = [];

    arg.push({ a: 12.2 });

    it('should be false', () => subject(arg).should.equal(false));
  });

  context('when a set containing tuples with missing required', () => {
    const arg = [];

    arg.push({ b: 12 });

    it('should be false', () => subject(arg).should.equal(false));
  });

  context('when a set containing tuples with extra', () => {
    const arg = [];

    arg.push({ a: 12, b: 12, c: 15 });

    it('should be false', () => subject(arg).should.equal(false));
  });

  return context('when a set containing tuples with invalid optional', () => {
    const arg = [];

    arg.push({ a: 12, b: 12.5 });

    it('should be false', () => subject(arg).should.equal(false));
  });
});

