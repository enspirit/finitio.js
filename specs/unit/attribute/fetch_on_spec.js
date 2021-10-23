import Attribute from '../../../src/finitio/support/attribute';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Attribute#fetchOn', () => {

  const attr = new Attribute('red', intType);

  const subject = (arg, cb) => attr.fetchOn(arg, cb);

  it('with an object that does not support fetch', () => {
    const arg = 12;

    const lambda = () => subject(arg);

    should(lambda).throw();

    try {
      return lambda();
    } catch (e) {
      return e.message.should.equal('Object expected, got: 12');
    }
  });

  it('with a valid object', () => {
    const arg = { 'red': 233 };
    return subject(arg).should.equal(233);
  });

  it('when the key is missing and no callback', () => {
    const arg = { other: 123 };
    const lambda = () => subject(arg);

    should(lambda).throw();

    try {
      return lambda();
    } catch (e) {
      return e.should.be.an.instanceof(Error);
    }
  });

  it('when the key is missing and a callback is present', () => {
    const arg = { other: 123 };

    return subject(arg, () => 'none').should.equal('none');
  });
});
