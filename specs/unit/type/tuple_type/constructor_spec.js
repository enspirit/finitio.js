import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import { intType } from '../../../spec_helpers';
import should from 'should';

describe('TupleType#constructor', () => {

  const heading = new Heading([new Attribute('a', intType)]);

  context('with a valid heading', () => {
    const subject = new TupleType(heading);

    it('should be a TupleType', () => subject.should.be.an.instanceof(TupleType));

    it('correctly sets the instance variable', () => subject.heading.should.equal(heading));
  });

  return context('with an invalid heading', () => {
    const subject = (() => { try {
      return new TupleType('foo');
    } catch (e) {
      return e;
    } })();

    it('should raise an error', () => subject.message.should.equal('Heading expected, got: foo'));
  });
});
