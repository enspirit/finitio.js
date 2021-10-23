import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#every', () => {

  it('raises an error if predicate is missing', () => {
    const lambda = () => $u.every([1, 2, 3]);

    return should(lambda).throw(/Function expected, got .*/);
  });

  it('behaves like #each', () => {

    const test = function(enumerable, expected) {
      const result = {};
      $u.every(enumerable, (v, k) => {
        result[k] = v;
        return true;
      });

      return should(result).eql(expected);
    };

    //
    test(['a', 'b', 'c'], { 0: 'a', 1: 'b', 2: 'c' });
    test({ foo: 'bar' }, { foo: 'bar' });
    return test('foo', { 0: 'f', 1: 'o', 2: 'o' });
  });

  describe('When used with a predicate', () => {

    it('returns a boolean', () => {
      const res = $u.every([1, 2, 3], i => true);
      res.should.be.an.instanceof(Boolean);
      return res.should.equal(true);
    });

    it('stops iterating as soon as the predicate returns false', () => {
      const obj = [1, 2, 3];
      const expected = [1, 2];
      const copy = [];

      const res = $u.every(obj, (i) => {
        copy.push(i);
        if (i === 2) {
          return false;
        } else {
          return true;
        }
      });

      return should(copy).eql(expected);
    });
  });

  return describe('When a callback throws an exception', () => it('should let it pass', () => {
    const lambda = () => $u.every([1, 2, 3], (i) => {
      throw new Error('test');
    });

    return should(lambda).throw('test');
  }));
});
