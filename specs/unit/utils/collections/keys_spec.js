import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#keys', () => {

  const subject = $u.keys;

  it('raises an error when used with a non-Enumerable', () => {
    const test = obj => () => subject(obj);

    return should(test(false)).throw(/Enumerable .* expected, got .*/);
  });

  describe('When used on an object', () => {

    it('returns an array', () => {
      const res = subject({ foo: 'bar' });
      return res.should.be.an.instanceof(Array);
    });

    it('returns all the keys of the object', () => {
      const obj = { a: 1, 'b': 2, c: 3 };
      obj[undefined] = 4;
      obj[null] = 5;
      const expected = ['a', 'b', 'c', 'undefined', 'null'];

      const res = subject(obj);
      return should(res).eql(expected);
    });
  });

  describe('When used on an Array', () => {

    it('returns an array', () => {
      const res = subject([1, 2, 3]);
      return res.should.be.an.instanceof(Array);
    });

    it('returns all the indices of the array', () => {
      const obj = ['a', 'b', null];
      const expected = [0, 1, 2];

      const res = subject(obj);
      return should(res).eql(expected);
    });
  });

  return describe('When used on a String', () => {

    it('returns an array', () => {
      const res = subject('bar');
      return res.should.be.an.instanceof(Array);
    });

    it('returns all the characters positions of the string', () => {
      const str = 'foo';
      const expected = [0, 1, 2];

      const res = subject(str);
      return should(res).eql(expected);
    });
  });
});
