import StructType from '../../../../src/finitio/type/struct_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('StructType#constructor', () => {

  describe('with valid components', () => {
    const subject = new StructType([intType]);

    it('should be a StructType', () => subject.should.be.an.instanceof(StructType));
  });

  return describe('with invalid components', () => {
    const subject = () => new StructType('foo');

    it('should raise an error', () => {
      should(subject).throw();

      const err = (() => { try {
        return subject();
      } catch (e) {
        return e;
      } })();

      return err.message.should.equal('[Finitio::Type] expected, got: foo');
    });
  });
});
