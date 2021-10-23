import SetType from '../../../../src/finitio/type/set_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SetType#initialize', () => {

  const subject = new SetType(intType);

  describe('with valid arguments', () => {
    subject.should.be.an.instanceof(SetType);

    it('should set the instance variables', () => subject.elmType.should.equal(intType));
  });

  return describe('with invalid arguments', () => {
    const lambda = () => new SetType('foo');

    it('should raise an error', () => {
      should(lambda).throw();

      const err = (() => { try {
        return lambda();
      } catch (e) {
        return e;
      } })();

      err.should.be.an.instanceof(Error);
      return err.message.should.equal('Finitio.Type expected, got: foo');
    });
  });
});
