import BuiltinType from '../../../../src/finitio/type/builtin_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';

describe('BuiltinType#dress', () => {

  const type = new BuiltinType(Number, 'num');

  const subject = arg => type.dress(arg);

  it('is robust enough', () => should(() => type.dress(null)).throw());

  it('is robust enough II', () => should(() => type.dress()).throw());

  it('with an integer', () => subject(12).should.equal(12));

  it('with a float', () => subject(3.14).should.equal(3.14));

  return describe('with a String', () => {

    const lambda = () => subject('Hello World!');

    it('should throw an Error', () => should(lambda).throw());

    it('should have correct information', () => {
      let error = null;
      try {
        lambda();
      } catch (e) {
        error = e;
      }

      error.should.be.an.instanceof(TypeError);
      return error.message.should.equal('Invalid Number: `Hello World!`');
    });
  });
});
