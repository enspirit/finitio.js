import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import should from 'should';
import { intType, stringType } from '../../../spec_helpers';

describe('AdType#constructor', () => {

  const f = function(arg) {};

  const subject = new AdType(Date, [
    new Contract('timestamp', intType, f, f),
    new Contract('utc', stringType, f, f),
  ]);

  describe('with valid arguments', () => {

    it('builds an AdType', () => should(subject).be.an.instanceof(AdType));

    it('should set the instance variables', () => {
      should(subject.jsType).be.equal(Date);
      return should(subject.contracts).be.an.instanceof(Array);
    });
  });

  describe('with invalid arguments (I)', () => {
    const lambda = () => new AdType('foo');

    it('should raise an error', () => {
      should(lambda).throw();

      const err = (() => { try {
        return lambda();
      } catch (e) {
        return e;
      } })();

      return err.message.should.equal('Constructor (function) expected, got: foo');
    });
  });

  return describe('with invalid arguments (II)', () => {
    const lambda = () => new AdType(Date, 'bar');

    it('should raise an error', () => {
      should(lambda).throw();

      const err = (() => { try {
        return lambda();
      } catch (e) {
        return e;
      } })();

      return err.message.should.equal('[Contract] expected, got: bar');
    });
  });
});
