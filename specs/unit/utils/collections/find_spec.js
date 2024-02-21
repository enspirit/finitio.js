import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#find', () => {

  it('raises an error if predicate is missing', () => {
    const lambda = () => $u.find([1, 2, 3]);

    return should(lambda).throw(/Function expected, got .*/);
  });

  it('behaves like #each', () => {

    const test = function(enumerable, expected) {
      const result = {};
      $u.find(enumerable, (v, k) => {
        result[k] = v;
        return false;
      });

      return should(result).eql(expected);
    };

    //
    test(['a', 'b', 'c'], { 0: 'a', 1: 'b', 2: 'c' });
    test({ foo: 'bar' }, { foo: 'bar' });
    return test('foo', { 0: 'f', 1: 'o', 2: 'o' });
  });

  describe('When used with a predicate', () => {

    it('returns something', () => {
      const res = $u.find([1, 2, 3], i => true);
      return should(res).not.be.null;
    });

    it('stops iterating as soon as the predicate returns true', () => {
      const obj = [1, 2, 3];
      const expected = [1, 2];
      const copy = [];

      const res = $u.find(obj, (i) => {
        copy.push(i);
        if (i === 2) {
          return true;
        } else {
          return false;
        }
      });

      return should(copy).eql(expected);
    });

    it('returns the first element that passes a truth test', () => {
      const date = new Date;
      const obj = ['a', null, date];

      const res = $u.find(obj, v => v instanceof Date);

      return should(res).eql(date);
    });

    it('returns null if not found', () => {
      const obj = ['a', null, 1];

      const res = $u.find(obj, v => v instanceof Date);

      return should(res).be.null;
    });
  });

  return describe('When a callback throws an exception', () => it('should let it pass', () => {
    const lambda = () => $u.find([1, 2, 3], (i) => {
      throw new Error('test');
    });

    return should(lambda).throw('test');
  }));
});
