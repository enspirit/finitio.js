import Constraint from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import { numType } from '../../../spec_helpers';

describe('SubType#dress', () => {

  const _default = new Constraint.Native(null, i => i > 0);
  const _small = new Constraint.Native('small', i => i < 255);

  const type = new SubType(numType, [_default, _small], 'byte');

  let factor = arg => type.dress(arg);

  it('with a valid Number', () => should(factor(12)).equal(12));

  return describe('when raising an Error', () => {

    factor = function(arg) {
      try {
        return type.dress(arg);
      } catch (e) {
        return e;
      }
    };

    describe('with a Boolean', () => {
      const subject = factor(true);

      it('should raise an Error', () => {
        should(subject).be.an.instanceof(TypeError);
        return should(subject.message).equal('Invalid Number: `true`');
      });
    });

    describe('with a negative Number', () => {
      const subject = factor(-12);

      it('should raise an Error', () => {
        should(subject).be.an.instanceof(TypeError);
        return should(subject.message).equal('Invalid value: `-12`');
      });
    });

    return describe('with a non small Number', () => {
      const subject = factor(1000);

      it('should raise an Error', () => {
        should(subject).be.an.instanceof(TypeError);
        return should(subject.message).equal('Invalid value (not small): `1000`');
      });
    });
  });
});
