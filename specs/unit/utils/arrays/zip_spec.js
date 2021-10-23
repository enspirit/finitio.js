import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.arrays#zip', () => {

  const subject = $u.zip;

  describe('when invalid call', () => {

    describe('with non-array(s)', () => it('throws an error', () => (() => {
      const result = [];
      const object = [null, undefined, {}];
      for (const i in object) {
        const obj = object[i];
        result.push(should(() => subject(obj)).throw(/Array expected, got .*/));
      }
      return result;
    })()));

    return describe('with arrays of diff size', () => it('throws an error', () => {
      const lambda = () => subject(['foo', 'bar'], [100]);

      return should(lambda).throw(/Arrays must have same size/);
    }));
  });

  return describe('when valid call', () => {
    const lambda = () => subject(['foo', 'bar'], [1, 2], ['a', 'b']);

    it('should return an array', () => {
      const res = lambda();

      return res.should.be.an.instanceof(Array);
    });

    it('should return the zipping', () => {
      const res = lambda();

      return should(res).eql([['foo', 1, 'a'], ['bar', 2, 'b']]);
    });
  });
});

