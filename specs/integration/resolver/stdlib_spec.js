import should from 'should';
import { Finitio } from '../helpers';
const {
  System,
} = Finitio;
import Resolver from '../../../src/finitio/resolver';

describe('Resolver.StdLib', () => {

  it('works with existing schemas', () => {
    const s = Resolver.StdLib('finitio/data', Finitio.World);
    should(s[0]).equal(`http://finitio.io/${Finitio.CONFORMANCE}/stdlib/data`);
    should(s[1]).not.be.an.instanceof(System);
    return should(s[1].types).not.equal(undefined);
  });

  it('ignores non stdlib', () => {
    const s = Resolver.StdLib('hello/world', Finitio.World);
    return should(s).eql(null);
  });

  it('raises on unexisting stdlib', () => {
    const lambda = () => Resolver.StdLib('finitio/no-such-one', Finitio.World);
    return should(lambda).throw('No such stdlib system: `finitio/no-such-one`');
  });

  it.skip('it works fine when stdlibPath is set')
});
