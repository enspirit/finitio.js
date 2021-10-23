import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import RelationType from '../../../../src/finitio/type/relation_type';
import TypeError from '../../../../src/finitio/errors';
import _ from 'underscore';
import should from 'should';
import { byteType } from '../../../spec_helpers';

describe('RelationType#dress', () => {

  const heading = new Heading([
    new Attribute('r', byteType),
    new Attribute('g', byteType),
    new Attribute('b', byteType, false),
  ]);

  const type = new RelationType(heading, 'colors');

  const dress = arg => type.dress(arg);

  context('with a valid array of Hashes', () => {
    const arg = [
      { 'r': 12, 'g': 13, 'b': 255 },
      { 'r': 12, 'g': 15, 'b': 198 },
    ];

    const expected = [
      { r: 12, g: 13, b: 255 },
      { r: 12, g: 15, b: 198 },
    ];

    it('should coerce to an Array of tuples', () => {
      should(dress(arg)).be.an.instanceof(Array);
      return should(dress(arg)).eql(expected);
    });
  });

  context('with a valid array of Hashes with some optional missing', () => {
    const arg = [
      { 'r': 12, 'g': 13, 'b': 255 },
      { 'r': 12, 'g': 15 },
    ];
    const expected = [
      { r: 12, g: 13, b: 255 },
      { r: 12, g: 15 },
    ];

    it('should coerce to an Array of tuples', () => {
      should(dress(arg)).be.an.instanceof(Array);
      return should(dress(arg)).eql(expected);
    });
  });

  context('with an empty array', () => {
    const arg = [];
    const expected = [];

    it('should coerce to an Array of tuples', () => {
      should(dress(arg)).be.an.instanceof(Array);
      return should(dress(arg)).eql(expected);
    });
  });

  return context('when raising an error', () => {

    const lambda = function(arg) {
      try {
        return type.dress(arg);
      } catch (e) {
        return e;
      }
    };

    context('with something else than an Array', () => {
      const subject = lambda('foo');

      it('should raise a TypeError', () => {
        should(subject).be.an.instanceof(TypeError);
        return should(subject.message).eql('Array expected, got: `foo`');
      });
    });

    context('with Array of non-tuples', () => {
      const subject = lambda(['foo']);

      it('should raise a TypeError', () => {
        should(subject).be.an.instanceof(TypeError);
        return should(subject.message).equal('Invalid Relation');
      });

      it('has expected root cause', () => should(subject.rootCause.message).equal('Invalid Tuple: `foo`'));
    });

    return context('with a duplicate tuple', () => {
      const arg = [
        { 'r': 12, 'g': 13, 'b': 255 },
        { 'r': 12, 'g': 192, 'b': 13 },
        { 'r': 12, 'g': 13, 'b': 255 },
      ];
      const subject = lambda(arg);

      it('should raise a TypeError', () => should(subject).be.an.instanceof(TypeError));

      it('should have the expected root cause', () => should(subject.rootCause.message).eql('Duplicate Tuple: `{"r":12,"g":13,"b":255}`'));
    });
  });
});
