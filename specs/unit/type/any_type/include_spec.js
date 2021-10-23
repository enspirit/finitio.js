import AnyType from '../../../../src/finitio/type/any_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import _ from 'underscore';

describe('AnyType#include', () => {

  const type = new AnyType;

  const subject = arg => type.include(arg);

  return describe('in any case', () => {
    const cases = [null, undefined, 42, 3.14, 'foo', false, true, { 'foo':'bar' }, [12]];

    it('should return true', () => {
      const allpass = _.every(cases, val => subject(val).should.equal(true));

      return allpass.should.equal(true);
    });
  });
});
