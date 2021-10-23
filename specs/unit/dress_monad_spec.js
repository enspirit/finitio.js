import Monad from '../../src/finitio/support/dress_monad';
import should from 'should';

describe('Dressmonad', () => {

  const world = { foo: 'bar' };
  const monad = new Monad(world);

  const success = result => monad.success(result);

  const failure = error => monad.failure({}, error);

  it('is initially successful on sucesss', () => should(success(12).isSuccess()).eql(true));

  it('is not initially successful on failure', () => should(failure('error').isSuccess()).eql(false));

  describe('success', () => it('preserves the world', () => should(success(12).world).equal(world)));

  describe('failure', () => it('preserves the world', () => should(failure('error').world).equal(world)));

  describe('onSuccess', () => {
    it('yields the block and returns its result on success', () => should(success(12).onSuccess(() => 13)).eql(13));

    it('does not yield the block on failure', () => {
      const lambda = () => failure('error').onSuccess(() => {
        throw new Error('foo');
      });
      return should(lambda).not.throw();
    });

    it('returns itself on failure', () => {
      const f = failure('error');
      return should(f.onSuccess(() => {})).equal(f);
    });
  });

  return describe('onFailure', () => {
    it('yields the block and returns its result on failure', () => should(failure('13').onFailure(() => 13)).eql(13));

    it('does not yield the block on success', () => {
      const lambda = () => success(12).onFailure(() => {
        throw new Error('foo');
      });
      return should(lambda).not.throw();
    });

    it('returns itself on success', () => {
      const s = success(12);
      return should(s.onFailure(() => {})).equal(s);
    });
  });
});
