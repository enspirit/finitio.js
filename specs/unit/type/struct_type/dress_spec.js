import StructType from '../../../../src/finitio/type/struct_type';
import TypeError from '../../../../src/finitio/errors';
import _ from 'underscore';
import should from 'should';
import { intType, stringType } from '../../../spec_helpers';

describe('StructType#dress', () => {

  const type = new StructType([intType, stringType], 'point');

  let subject = arg => type.dress(arg);

  context('with a valid Array', () => it('should coerce to an array', () => {
    const arg = [12, 'foo'];
    return should(subject(arg)).eql(arg);
  }));

  return context('when raising an error', () => {

    subject = function(arg) {
      let err;
      return err = (() => { try {
        return type.dress(arg);
      } catch (e) {
        return e;
      } })();
    };

    context('with something else than an Array', () => {
      const arg = 'foo';

      it('should raise a TypeError', () => {
        should(subject(arg)).be.an.instanceof(TypeError);
        return should(subject(arg).message).equal('Array expected, got: `foo`');
      });

      it('should have no cause', () => should(subject(arg).cause).eql(undefined));
    });

    context('with a missing component', () => {
      const arg = [12];

      it('should raise a TypeError', () => {
        subject(arg).should.be.an.instanceof(TypeError);
        return subject(arg).message.should.equal('Struct size mismatch: 1 for 2');
      });

      it('should have no cause', () => should(subject(arg).cause).eql(undefined));
    });

    context('with an extra attribute', () => {
      const arg = [12, 'foo', 'bar'];

      it('should raise a TypeError', () => {
        subject(arg).should.be.an.instanceof(TypeError);
        return subject(arg).message.should.equal('Struct size mismatch: 3 for 2');
      });

      it('should have no cause', () => should(subject(arg).cause).eql(undefined));
    });

    return context('with an invalid attribute', () => {
      const arg = [12, 14.2];

      it('should raise a TypeError', () => {
        should(subject(arg)).be.an.instanceof(TypeError);
        return should(subject(arg).message).equal('Invalid Struct: `[12,14.2]`');
      });

      it('should have the expected root cause', () => should(subject(arg).rootCause.message).equal('Invalid String: `14.2`'));
    });
  });
});
