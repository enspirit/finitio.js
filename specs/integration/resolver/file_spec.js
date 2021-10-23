import { Finitio, should, $u } from '../helpers';
const {
  System,
} = Finitio;
import { File } from '../../../src/finitio/resolver';

describe('Resolver.File', () => {

  const tests = function() {
    it('works with existing files', () => {
      const s = File('file://specs/integration/fixtures/test.fio', Finitio.world());
      should(s[0]).equal('file://specs/integration/fixtures/test.fio');
      return should(s[1].types).not.equal(undefined);
    });

    it('supports json files too', () => {
      const s = File('file://specs/integration/fixtures/test.json', Finitio.world());
      should(s[0]).equal('file://specs/integration/fixtures/test.json');
      return should(s[1].types).not.equal(undefined);
    });

    it('allows not specifying the extension', () => {
      const s = File('file://specs/integration/fixtures/test', Finitio.world());
      should(s[0]).equal('file://specs/integration/fixtures/test');
      return should(s[1].types).not.equal(undefined);
    });
  };

  if ($u.isBrowser()) {
    return it.skip('works, but not in the browser', () => {});
  } else {
    it('works provided the file system is available', tests);
  }
});
