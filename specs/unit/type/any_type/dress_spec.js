import AnyType from '../../../../src/finitio/type/any_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';

describe('AnyType#dress', () => {

  const type = new AnyType('any');

  const subject = arg => type.dress(arg);

  it('with a Number', () => subject(42).should.equal(42));

  it('with a String', () => subject('foo').should.equal('foo'));

  it('with null', () => {
    const res = subject(null);
    return should(res).eql(null);
  });

  it('with undefined', () => {
    const res = subject(undefined);
    return should(res).eql(undefined);
  });
});
