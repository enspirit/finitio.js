import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import RelationType from '../../../../src/finitio/type/relation_type';
import { intType } from '../../../spec_helpers';
import should from 'should';

describe('RelationType#constructor', () => {

  const heading = new Heading([
    new Attribute('a', intType),
    new Attribute('b', intType, false),
  ]);

  context('with a valid heading', () => {
    const subject = new RelationType(heading);

    it('should be a RelationType', () => subject.should.be.an.instanceof(RelationType));
  });

  return context('with an invalid heading', () => {
    const lambda = function() {
      try {
        return new RelationType('foo', 'bar');
      } catch (e) {
        return e;
      }
    };

    it('should raise an error', () => {
      const e = lambda();
      return e.message.should.equal('Heading expected, got: foo');
    });
  });
});
