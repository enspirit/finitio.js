import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#each', () => {

  it('allows callback to be undefined', () => {
    const lambda = () => $u.each([1, 2, 3]);

    return should(lambda).not.throw();
  });

  it('raises an error if callback is null', () => {
    const lambda = () => $u.each([1, 2, 3], null);

    return should(lambda).throw(/Function expected, got null/);
  });

  describe('for Arrays,', () => {

    describe('on an empty array', () => it('it shouldn\'t call the callback', () => {
      let called = false;
      $u.each([], e => called = true);
      return called.should.not.equal(true);
    }));

    return describe('on an array', () => {
      it('should call the callback for all the elements', () => {
        const copy = [];
        const expected = [1, 2, 3];
        $u.each(expected, e => copy.push(e));
        return should(copy).eql(expected);
      });

      it('should pass the index of the element as second argument', () => {
        const copy = [];
        const expected = [0, 1, 2];
        $u.each(expected, (e, i) => copy.push(i));
        return should(copy).eql(expected);
      });
    });
  });

  describe('for Objects,', () => {

    describe('on an empty object', () => it('it shouldn\'t call the callback', () => {
      let called = false;
      $u.each({}, e => called = true);
      return called.should.not.equal(true);
    }));

    return describe('on an object', () => {
      it('should call the callback for all the elements', () => {
        const object = { foo: 'bar' };
        const copy = [];
        const expected = ['bar'];
        $u.each(object, v => copy.push(v));
        return should(copy).eql(expected);
      });

      it('should pass the object keys as second argument', () => {
        const copy = {};
        const object = { foo: 'bar' };
        $u.each(object, (v, k) => copy[k] = v);
        return should(copy).eql(object);
      });
    });
  });

  describe('for Strings, ', () => {

    describe('on an empty string', () => it('it shouldn\'t call the callback', () => {
      let called = false;
      $u.each('', e => called = true);
      return called.should.not.equal(true);
    }));

    return describe('on an string', () => {
      it('should call the callback for all the letters', () => {
        let copy = '';
        const expected = 'foo bar';
        $u.each(expected, c => copy += c);
        return should(copy).eql(expected);
      });

      it('should pass the letter position as second argument', () => {
        const indexes = [];
        const str = 'foo';
        $u.each(str, (c, i) => indexes.push(i));
        return should(indexes).eql([0, 1, 2]);
      });
    });
  });

  return describe('on other types', () => (() => {
    const result = [];
    const object = [null, undefined, new Date(), /foo.*bar/];
    for (const i in object) {
      const obj = object[i];
      result.push(describe(`like ${obj}`, () => it('throws an error', () => should(() => $u.each(obj)).throw(/Enumerable .* expected/))));
    }
    return result;
  })());
});

