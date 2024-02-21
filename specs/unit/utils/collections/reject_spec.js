import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#reject', () => {

  const subject = $u.reject;

  it('raises an error if predicate is missing', () => {
    const lambda = () => subject([1, 2, 3]);

    return should(lambda).throw(/Function expected, got .*/);
  });

  describe('When used with a predicate', () => {

    it('returns something', () => {
      const res = subject([1, 2, 3], i => false);
      return should(res).not.be.null;
    });

    it('doesn\'t stop iterating when the predicate returns true', () => {
      const obj = [1, 2, 3];
      const copy = [];

      const res = subject(obj, (i) => {
        copy.push(i);
        if (i === 2) {
          return true;
        } else {
          return false;
        }
      });

      return should(copy).eql(obj);
    });

    it('returns the elements that don\'t pass the truth test', () => {
      const obj = ['a', 1, 'b', null, 'c'];
      const expected = [1, null];

      const res = subject(obj, v => typeof(v) === 'string');

      return should(res).eql(expected);
    });

    it('returns an array even if nothing matches', () => {
      const obj = ['a', 'b', 'c'];

      const res = subject(obj, v => typeof(v) === 'string');

      res.should.be.an.instanceof(Array);
      return should(res).eql([]);
    });
  });

  return describe('When a callback throws an exception', () => it('should let it pass', () => {
    const lambda = () => subject([1, 2, 3], (i) => {
      throw new Error('test');
    });

    return should(lambda).throw('test');
  }));
});
