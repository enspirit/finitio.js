import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.utility#deepClone', () => {

  const subject = obj => $u.deepClone(obj);

  describe('for null or undefined', () => it('throws an error', () => (() => {
    const result = [];
    const object = [null, undefined];
    for (const i in object) {
      const obj = object[i];
      result.push(should(() => subject(obj)).throw(/Object expected, got .*/));
    }
    return result;
  })()));

  describe('for array', () => {
    it('should return an array', () => subject([]).should.be.an.instanceof(Array));

    it('should return a different instance', () => {
      const original = [1, 2, 3];
      const clone = subject(original);

      original.push(4);

      $u.size(original).should.equal(4);
      return $u.size(clone).should.equal(3);
    });

    it('should clone correctly', () => {
      const original = [null, undefined, 3, '4', /.*/];
      const clone = subject(original);

      return should(clone).eql(original);
    });
  });

  describe('for Function', () => it('should return a Function', () => subject(Date).should.equal(Date)));

  describe('for object', () => {
    it('should return an object', () => subject({}).should.be.an.instanceof(Object));

    it('should return a different instance', () => {
      const original = { foo: 'bar', array: [1, 2, 33] };
      const clone = subject(original);

      //
      original.foo = 'BAR';

      original.foo.should.eql('BAR');
      clone.foo.should.eql('bar');

      //
      original.array.push(100);
      original.array[3].should.eql(100);
      original.array.length.should.eql(4);
      return clone.array.length.should.eql(3);
    });
  });

  return describe('for string', () => {
    it('should return a string', () => subject('foo').should.be.an.instanceof(String));

    it('should return a copy', () => {
      const original = 'hello world';
      const clone = subject(original);

      return clone.should.equal('hello world');
    });
  });
});
