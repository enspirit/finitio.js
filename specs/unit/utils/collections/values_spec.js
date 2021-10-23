import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#values', () => {

  const subject = $u.values;

  it('raises an error when used on a non-Enumerable', () => {
    const test = obj => () => subject(obj);

    return should(test(false)).throw(/Enumerable .* expected, got .*/);
  });

  describe('When used on an array', () => {

    it('returns an array', () => {
      const res = subject(['foo', 'bar']);
      return res.should.be.an.instanceof(Array);
    });

    it('returns the array itself', () => {
      const array = ['a', 2, undefined, null];

      const res = subject(array);
      should(res).eql(array);
      return should(res === array).equal(true);
    });
  });

  describe('When used on an object', () => {

    it('returns an array', () => {
      const res = subject({ foo: 'bar' });
      return res.should.be.an.instanceof(Array);
    });

    it('returns all the values of the object', () => {
      const date = new Date();
      const obj = { a: 'a', b: 2, c: undefined, d: null, e: date };
      const expected = ['a', 2, undefined, null, date];

      const res = subject(obj);
      return should(res).eql(expected);
    });
  });

  return describe('When used on a String', () => {

    it('returns an array', () => {
      const res = $u.values('bar');
      return res.should.be.an.instanceof(Array);
    });

    it('returns all the characters of the string', () => {
      const str = 'foo';
      const expected = ['f', 'o', 'o'];

      const res = subject(str);
      return should(res).eql(expected);
    });
  });
});
