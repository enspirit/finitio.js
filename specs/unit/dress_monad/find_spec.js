import Monad from '../../../src/finitio/support/dress_monad';
import should from 'should';

describe('Dressmonad.find', () => {

  const monad = new Monad();

  const success = result => monad.success(result);

  const failure = function(error) {
    return monad.failure(this, error);
  };

  it('finds the first successful monad', () => {
    const m = monad.find([1, 2, 3], (x, i) => {
      if ((x === 2) && (i === 1)) {
        return success(12);
      } else {
        return failure('Not 2 and 1');
      }
    });
    should(m.isSuccess()).eql(true);
    return should(m.result).eql(12);
  });

  it('yields the failure block with all causes if no success', () => {
    const callback = (x, i) => monad.failure(x, `Failed on ${x} and ${i}`);
    const onFailure = causes => monad.failure('foo', 'Failed', causes);
    const m = monad.find([1, 2, 3], callback, onFailure);

    should(m.isSuccess()).eql(false);

    const expected = {
      error: 'Failed',
      children: [
        { error: 'Failed on 1 and 0', location: 0 },
        { error: 'Failed on 2 and 1', location: 1 },
        { error: 'Failed on 3 and 2', location: 2 },
      ],
    };
    return should(m.error).eql(expected);
  });
});

