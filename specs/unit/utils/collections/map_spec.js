import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#map', () => {

  const subject = $u.map;

  it('raises an error if iterator is missing', () => {
    const lambda = () => subject([1, 2, 3]);

    return should(lambda).throw(/Function expected, got .*/);
  });

  it('behaves like #each', () => {

    const test = function(enumerable, expected) {
      const result = {};
      subject(enumerable, (v, k) => {
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

  describe('When used with an iterator on an Array', () => {

    it('returns an array', () => {
      const res = subject([1, 2, 3], i => true);
      return res.should.be.an.instanceof(Array);
    });

    it('collects the values returned by the iterator', () => {
      const obj = ['a', 'b', 'c'];
      const expected = [1, 2, 3];

      let i = 1;
      const res = subject(obj, v => i++);

      return should(res).eql(expected);
    });
  });

  describe('When used with an iterator on an Object', () => {

    it('returns an array', () => {
      const res = subject({ 1: { 1: { 2: 2, 3: 3 } } }, (v, k) => v * k);
      return res.should.be.an.instanceof(Array);
    });

    it('collects the values returned by the iterator', () => {
      const obj = { 'a': 1, 'b': 2, 'c': 3 };
      const expected = ['a1', 'b2', 'c3'];

      const res = subject(obj, (v, k) => `${k}${v}`);

      return should(res).eql(expected);
    });
  });

  return describe('When a callback throws an exception', () => it('should let it pass', () => {
    const lambda = () => subject([1, 2, 3], (i) => {
      throw new Error('test');
    });

    return should(lambda).throw('test');
  }));
});
