import Monad from '../../../src/finitio/support/dress_monad';
import should from 'should';

describe('Dressmonad.map', () => {

  const monad = new Monad();

  const success = result => monad.success(result);

  it('returns the mapped result on success', () => {
    const m = monad.map([1, 2, 3], (x, i) => success([x, i]));
    should(m.isSuccess()).eql(true);
    return should(m.result).eql([[1,0],[2,1],[3,2]]);
  });

  it('yields the failure block with causes on failure', () => {
    const callback = function(x, i) {
      if ((x === 1) || (x === 3)) {
        return monad.failure(x, `Failed on ${x} and ${i}`);
      } else {
        return success([x, i]);
      }
    };
    const onFailure = causes => monad.failure('foo', 'Failed', causes);
    const m = monad.map([1, 2, 3], callback, onFailure);

    should(m.isSuccess()).eql(false);

    const expected = {
      error: 'Failed',
      children: [
        { error: 'Failed on 1 and 0', location: 0 },
        { error: 'Failed on 3 and 2', location: 2 },
      ],
    };
    return should(m.error).eql(expected);
  });
});

