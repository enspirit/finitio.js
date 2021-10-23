import SeqType from '../../../../src/finitio/type/seq_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SeqType#initialize', () => {

  const subject = new SeqType(intType);

  describe('with valid arguments', () => {
    subject.should.be.an.instanceof(SeqType);

    it('should set the instance variables', () => subject.elmType.should.equal(intType));
  });

  return describe('with invalid arguments', () => {
    const lambda = () => new SeqType('foo');

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
