import UnionType from '../../../../src/finitio/type/union_type';
import should from 'should';
import _ from 'underscore';
import { intType, floatType } from '../../../spec_helpers';

describe('UnionType#constructor', () => {

  describe('with valid candidates', () => {
    // Let's reinvent JS' Number
    const union = new UnionType([intType, floatType]);

    it('sets the variable instances', () => _.isEqual(union.candidates, [intType, floatType]).should.equal(true));
  });

  return describe('with invalid candidates', () => {
    const lambda = function() {
      let union;
      return union = new UnionType(['bar']);
    };

    it('should throw an error', () => should(lambda).throw());

    it('should throw an error', () => {
      try {
        return lambda();
      } catch (e) {
        return e.message.should.equal('Finitio.Type expected, got: bar');
      }
    });
  });
});
