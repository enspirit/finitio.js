import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#size', () => {

  it('raises an error when used with a non enumerable', () => {
    const test = obj => () => $u.size(obj);

    should(test(false)).throw(/Enumerable .* expected, got .*/);
    return should(test(/regexp/)).throw(/Enumerable .* expected, got .*/);
  });

  describe('When used on a String', () => it('returns the length', () => {
    const res = $u.size('bar');
    return res.should.eql('bar'.length);
  }));

  describe('When used on an Array', () => it('returns the length', () => {
    const array = ['one', 2, undefined];
    const res = $u.size(array);
    return res.should.eql(array.length);
  }));

  return describe('When used on an Object', () => it('returns the size', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: null,
      d: new Date,
    };
    const res = $u.size(obj);
    return res.should.eql(4);
  }));
});

