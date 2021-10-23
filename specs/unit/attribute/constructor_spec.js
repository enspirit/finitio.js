import Attribute from '../../../src/finitio/support/attribute';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Attribute#constructor', () => {

  describe('when implicitely required', () => {
    const subject = new Attribute('red', intType);

    it('should correctly set the instance variables', () => {
      subject.name.should.equal('red');
      subject.type.should.equal(intType);
      return subject.required.should.equal(true);
    });
  });

  return describe('when not required', () => {
    const subject = new Attribute('red', intType, false);

    it('should correctly set the instance variables', () => {
      subject.name.should.equal('red');
      subject.type.should.equal(intType);
      return subject.required.should.equal(false);
    });
  });
});
