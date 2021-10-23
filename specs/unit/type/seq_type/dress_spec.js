import SeqType from '../../../../src/finitio/type/seq_type';
import TypeError from '../../../../src/finitio/errors';
import _ from 'underscore';
import should from 'should';
import { byteType } from '../../../spec_helpers';

describe('SeqType#dress', () => {

  const type = new SeqType(byteType);

  const subject = arg => type.dress(arg);

  it('with an empty array', () => {
    const res = subject([]);
    return should(res).eql([]);
  });

  it('with a valid array', () => {
    const res = subject([12, 16]);
    return should(res).eql([12, 16]);
  });

  it('with something else than array', () => {
    const lambda = () => subject('foo');

    should(lambda).throw();

    try {
      return lambda();
    } catch (e) {
      should(e).be.an.instanceof(TypeError);
      return should(e.message).equal('Array expected, got: `foo`');
    }
  });

  it('with an array with non bytes', () => {
    const lambda = () => subject([2, 4, -12]);

    should(lambda).throw();

    try {
      return lambda();
    } catch (e) {
      should(e).be.an.instanceof(TypeError);
      should(e.message).equal('Invalid Sequence');
      return should(e.rootCause.message).eql('Invalid value (not byte): `-12`');
    }
  });
});
