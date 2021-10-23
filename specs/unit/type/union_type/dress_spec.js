import TypeError from '../../../../src/finitio/errors';
import UnionType from '../../../../src/finitio/type/union_type';
import should from 'should';
import { intType, floatType } from '../../../spec_helpers';

describe('UnionType#dress', () => {

  // Let's reinvent JS' Number, shall we?
  const type = new UnionType([intType, floatType], 'union');

  it('with an Integer', () => {
    const subject = type.dress(12);
    return should(subject).equal(12);
  });

  it('with a Float', () => {
    const subject = type.dress(3.14);
    return should(subject).equal(3.14);
  });

  return describe('with a String', () => {
    let subject;
    try {
      type.dress('foo');
    } catch (e) {
      subject = e;
    }

    it('should raise an Error', () => {
      should(subject).be.an.instanceof(TypeError);
      return should(subject.message).equal('Invalid value: `foo`');
    });

    it('has the expected root cause', () => {
      should(subject.rootCause.message).equal('Invalid Number: `foo`');
    });
  });
});
