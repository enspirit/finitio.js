import Contract from '../../../src/finitio/support/contract';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Contract#dress', () => {

  const world = {
    double(x) { return x * 2; },
  };
  const dresser = (value, world) => world.double(value);

  const contract = function(kind, pair) {
    const info = {
      name: 'iso',
      infoType: intType,
    };
    info[kind] = pair;
    return Contract.info(info);
  };

  return context('when used with a world', () => {

    context('with an explicit', () => {
      const subject = contract('explicit', { dress: dresser });

      it('dresses as expected', () => {
        const got = subject.dress(12, world);
        return should(got).eql(24);
      });
    });

    context('with an external', () => {
      const subject = contract('external', { dress: dresser });

      it('dresses as expected', () => {
        const got = subject.dress(12, world);
        return should(got).eql(24);
      });
    });

    return context('with an internal', () => {
      const subject = contract('internal', { iso: dresser });

      it('dresses as expected', () => {
        const got = subject.dress(12, world);
        return should(got).eql(24);
      });
    });
  });
});

