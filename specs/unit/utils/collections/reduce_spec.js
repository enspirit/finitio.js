import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#reduce', () => {

  const subject = $u.reduce;

  it('raises an error if iterator is missing', () => {
    const lambda = () => subject([1, 2, 3]);

    return should(lambda).throw(/Function expected, got .*/);
  });

  describe('When used with a summing callback on an array', () => it('returns the sum', () => {
    const res = subject([1, 2, 3], 0, (acc, i) => acc + i);
    return res.should.eql(6);
  }));

  describe('When used with a summing callback on an object', () => it('returns the sum', () => {
    const res = subject({ one: 1, two: 2, three: 3 }, 0, (acc, i) => acc + i);
    return res.should.eql(6);
  }));

  return describe('When a callback throws an exception', () => it('should let it pass', () => {
    const lambda = () => subject([1, 2, 3], 0, (i) => {
      throw new Error('test');
    });

    return should(lambda).throw('test');
  }));
});
