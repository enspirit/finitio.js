import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import _ from 'underscore';
import { stringType, byteType } from '../../../spec_helpers';

describe('TupleType#dress', () => {

  const r = new Attribute('r', byteType);
  const g = new Attribute('g', byteType);
  const maybe_b = new Attribute('b', byteType, false);

  context('when not allowing extra', () => {

    const heading = new Heading([r, g, maybe_b]);
    const type = new TupleType(heading, 'color');

    const dress = arg => type.dress(arg);

    context('with a valid Hash', () => {
      const arg = { 'r': 12, 'g': 13, 'b': 255 };

      it('should coerce to a tuple', () => should(dress(arg)).eql({ r: 12, g: 13, b: 255 }));
    });

    context('with a valid Hash and no optional', () => {
      const arg = { 'r': 12, 'g': 13 };

      it('should coerce to a tuple', () => should(dress(arg)).eql({ r: 12, g: 13 }));
    });

    return context('when raising an error', () => {

      const lambda = function(arg) {
        try {
          return type.dress(arg);
        } catch (e) {
          return e;
        }
      };

      context('with something else than a Hash', () => {
        const subject = lambda('foo');

        it('should raise a TypeError', () => {
          should(subject).be.an.instanceof(TypeError);
          return should(subject.message).equal('Invalid Tuple: `foo`');
        });
      });

      context('with a missing attribute', () => {
        const arg = { 'r': 12, 'b': 13 };
        const subject = lambda(arg);

        it('should raise a TypeError', () => {
          should(subject).be.an.instanceof(TypeError);
          return should(subject.message).equal('Invalid Tuple');
        });

        it('should have expected root cause', () => should(subject.rootCause.message).equal('Missing attribute `g`'));
      });

      context('with a missing attribute (undefined)', () => {
        const arg = { 'r': 12, 'g': undefined, 'b': 13 };
        const subject = lambda(arg);

        it('should raise a TypeError', () => {
          should(subject).be.an.instanceof(TypeError);
          return should(subject.message).equal('Invalid Tuple');
        });

        it('should have expected root cause', () => should(subject.rootCause.message).equal('Missing attribute `g`'));
      });

      context('with an extra attribute', () => {
        const arg = { 'r': 12, 'g': 13, 'extr': 165 };
        const subject = lambda(arg);

        it('should raise a TypeError', () => {
          should(subject).be.an.instanceof(TypeError);
          return should(subject.message).eql('Invalid Tuple');
        });

        it('should have expected root cause', () => should(subject.rootCause.message).equal('Unrecognized attribute `extr`'));
      });

      context('with an invalid attribute', () => {
        const arg = { 'r': 12, 'g': 13, 'b': '255' };
        const subject = lambda(arg);

        it('should raise a TypeError', () => should(subject.rootCause.message).equal('Invalid Number: `255`'));
      });

      return context('with a null attribute', () => {
        const arg = { 'r': 12, 'g': 13, 'b': null };
        const subject = lambda(arg);

        it('should raise a TypeError', () => should(subject.rootCause.message).equal('Invalid Number: `null`'));
      });
    });
  });

  return context('when allowing extra strings', () => {
    const heading = new Heading([r, g, maybe_b], { allowExtra: stringType });
    const type = new TupleType(heading, 'color');

    let subject = arg => type.dress(arg);

    context('with an extra string attribute', () => {
      const arg = { 'r': 12, 'g': 13, 'extr': 'foo' };

      it('should not raise a TypeError', () => should(subject(arg)).not.be.an.instanceof(TypeError));

      it('should keep the attribute unchanged', () => subject(arg).should.eql({ r: 12, g: 13, 'extr': 'foo' }));
    });

    return context('when raising an error', () => {

      const lambda = function(arg) {
        try {
          return type.dress(arg);
        } catch (e) {
          return e;
        }
      };

      return context('with an extra non-string attribute', () => {
        const arg = { 'r': 12, 'g': 13, 'extr': 12 };

        it('should raise a TypeError', () => {
          subject = lambda(arg);
          return should(subject.rootCause.message).equal('Invalid String: `12`');
        });
      });
    });
  });
});
