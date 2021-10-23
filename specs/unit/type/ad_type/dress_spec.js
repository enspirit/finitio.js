import Contract from '../../../../src/finitio/support/contract';
import AdType from '../../../../src/finitio/type/ad_type';
import TypeError from '../../../../src/finitio/errors';
import should from 'should';
import { intType, stringType } from '../../../spec_helpers';

describe('AdType#dress', () => {

  const f = function(arg) {};

  const contracts = [
    new Contract.Explicit('timestamp', intType, { dress(i) { return i * 2; }, undress: f }),
    new Contract.Explicit('utc', stringType, { dress(s) { return 'foo'; }, undress: f }),
  ];

  describe('when not bound to a javascript type', () => {
    const type = new AdType(null, contracts);

    it('with a string', () => should(type.dress('bar')).equal('foo'));
  });

  describe('when bound to a javascript type', () => {
    let type = new AdType(Date, contracts);

    it('with a date', () => {
      const d = new Date();
      return should(type.dress(d)).equal(d);
    });

    describe('with an unrecognized', () => {
      const lambda = () => type.dress([]);

      it('should raise an error', () => {
        should(lambda).throw();

        const err = (() => { try {
          return lambda();
        } catch (e) {
          return e;
        } })();

        should(err).be.an.instanceof(TypeError);
        return should(err.message).equal('Invalid Date: `[]`');
      });
    });

    return describe('when the upper raises an error', () => {
      type = new AdType(Date, [
        new Contract.Explicit('foo', intType, { dress(t) { throw new Error; } }),
      ]);

      it('should hide the error', () => {
        const err = (() => { try {
          return type.dress(12);
        } catch (e) {
          return e;
        } })();

        should(err).be.an.instanceof(TypeError);
        return should(err.message).equal('Invalid Date: `12`');
      });
    });
  });

  return describe('when contracts expect the world', () => {
    const type = new AdType(null, [
      Contract.info({
        name: 'worlded',
        infoType: intType,
        explicit: {
          dress(value, world) {
            return world.double(value);
          },
        },
      }),
    ]);

    it('works', () => should(type.dress(12, { double(x) { return x * 2; } })).equal(24));
  });
});
