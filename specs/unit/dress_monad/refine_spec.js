import Monad from '../../../src/finitio/support/dress_monad';
import should from 'should';

describe('Dressmonad.refine', () => {

  let monad = new Monad();

  const success = result => monad.success(result);

  const failure = function(error) {
    return monad.failure(this, error);
  };

  it('returns the refined result on success', () => {
    const result = [];
    const base = success(result);
    const m = monad.refine(base, [1, 2, 3], (_, x, i) => {
      should(_).equal(base);
      result.push([x, i]);
      return _;
    });
    should(m.isSuccess()).eql(true);
    return should(m.result).eql([[1,0],[2,1],[3,2]]);
  });

  it('does not refine on failure', () => {
    const base = failure('error');
    const callback = function() {
      throw new Error('Not here');
    };
    const onFailure = causes => {
      should(causes[0].error).eql('error');
      return 13;
    };
    const res = monad.refine(base, [1, 2, 3], callback, onFailure);
    return should(res).equal(13);
  });

  it('yields the failure block with causes on failure', () => {
    const callback = function(_, x, i) {
      if ((x === 1) || (x === 3)) {
        return monad.failure(x, `Failed on ${x} and ${i}`);
      } else {
        return _;
      }
    };
    const onFailure = causes => monad.failure('foo', 'Failed', causes);
    const m = monad.refine(success([]), [1, 2, 3], callback, onFailure);

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

  it('stop on first failure when failfast is used', () => {
    monad = new Monad({ failfast: true });

    const callback = function(_, x, i) {
      if ((x === 1) || (x === 3)) {
        return monad.failure(x, `Failed on ${x} and ${i}`);
      } else {
        return _;
      }
    };
    const onFailure = causes => monad.failure('foo', 'Failed', causes);
    const m = monad.refine(success([]), [1, 2, 3], callback, onFailure);

    should(m.isSuccess()).eql(false);

    const expected = {
      error: 'Failed',
      children: [
        { error: 'Failed on 1 and 0', location: 0 },
      ],
    };
    return should(m.error).eql(expected);
  });
});

