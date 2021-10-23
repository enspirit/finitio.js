import SetType from '../../../../src/finitio/type/set_type';
import TypeError from '../../../../src/finitio/errors';
import _ from 'underscore';
import should from 'should';
import { byteType } from '../../../spec_helpers';

describe('SetType#dress', () => {

  const type = new SetType(byteType);

  it('with an empty array', () => {
    const res = type.dress([]);
    return should(res).eql([]);
  });

  it('with a valid array', () => {
    const res = type.dress([12, 16]);
    return should(res).eql([12, 16]);
  });

  it('with something else than array', () => {
    const lambda = () => type.dress('foo');

    should(lambda).throw();

    try {
      return lambda();
    } catch (e) {
      should(e).be.an.instanceof(TypeError);
      return should(e.message).equal('Array expected, got: `foo`');
    }
  });

  describe('with an array with non bytes', () => {
    const subject =
      (() => { try {
        return type.dress([2, 4, -12]);
      } catch (e) {
        return e;
      } })();

    it('should raise an error', () => should(subject).be.an.instanceof(TypeError));

    it('has the expected root cause', () => should(subject.rootCause.message).eql('Invalid value (not byte): `-12`'));
  });

  return describe('with an array with duplicates', () => {
    const subject =
      (() => { try {
        return type.dress([2, 4, 2]);
      } catch (e) {
        return e;
      } })();

    it('raises an error', () => {
      should(subject).be.an.instanceof(TypeError);
      return should(subject.message).equal('Invalid Set');
    });

    it('should raise an error', () => should(subject.rootCause.message).equal('Duplicate value: `2`'));
  });
});
