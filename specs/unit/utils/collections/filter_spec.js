import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#filter', () => {

  const subject = $u.filter;

  it('raises an error if predicate is missing', () => {
    const lambda = () => subject([1, 2, 3]);

    return should(lambda).throw(/Function expected, got .*/);
  });

  describe('When used with a predicate', () => {

    it('returns something', () => {
      const res = subject([1, 2, 3], i => true);
      return should(res).not.be.null;
    });

    it('doesn\'t stop iterating when the predicate returns false', () => {
      const obj = [1, 2, 3];
      const copy = [];

      const res = subject(obj, (i) => {
        copy.push(i);
        if (i === 2) {
          return false;
        } else {
          return true;
        }
      });

      return should(copy).eql(obj);
    });

    it('returns the elements that pass a truth test', () => {
      const obj = ['a', 1, 'b', null, 'c'];
      const expected = ['a', 'b', 'c'];

      const res = subject(obj, v => typeof(v) === 'string');

      return should(res).eql(expected);
    });

    it('returns an array even if nothing matches', () => {
      const obj = ['a', null, 1];

      const res = subject(obj, v => v instanceof Date);

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
