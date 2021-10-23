import { Finitio, should, $u } from '../helpers';
const {
  System,
} = Finitio;
import { Relative } from '../../../src/finitio/resolver';

describe('Resolver.Relative', () => {

  const world = Finitio.world({ sourceUrl: 'file://specs/integration/fixtures/foo' });

  const tests = function() {
    it('works with existing schemas', () => {
      const s = Relative('./test', world);
      should(s[0]).equal('file://specs/integration/fixtures/test');
      should(s[1]).not.be.an.instanceof(System);
      return should(s[1].types).not.equal(undefined);
    });

    it('raises on unexisting file', () => {
      const lambda = () => Relative('./no-such-one', world);
      return should(lambda).throw('No such file: `specs/integration/fixtures/no-such-one`');
    });
  };

  if ($u.isBrowser()) {
    return it.skip('works, but not in the browser', () => {});
  } else {
    it('works provided the file system is available', tests);
  }
});
