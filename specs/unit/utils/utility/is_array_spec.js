import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.utility#isArray', () => {

  const subject = obj => $u.isArray(obj);

  describe('for null or undefined', () => it('returns false', () => (() => {
    const result = [];
    const object = [null, undefined];
    for (const i in object) {
      const obj = object[i];
      result.push(subject(obj).should.equal(false));
    }
    return result;
  })()));

  describe('for array', () => it('should return true', () => subject([]).should.equal(true)));

  return describe('for object', () => it('should return false', () => subject({}).should.equal(false)));
});
