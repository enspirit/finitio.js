import { Finitio, should, $u } from '../helpers';
const {
  System,
} = Finitio;
import { StdLib } from '../../../src/finitio/resolver';

describe('Resolver.StdLib', () => {

  it('works with existing schemas', () => {
    const s = StdLib('finitio/data', Finitio.World);
    should(s[0]).equal(`http://finitio.io/${Finitio.CONFORMANCE}/stdlib/data`);
    should(s[1]).not.be.an.instanceof(System);
    return should(s[1].types).not.equal(undefined);
  });

  it('ignores non stdlib', () => {
    const s = StdLib('hello/world', Finitio.World);
    return should(s).eql(null);
  });

  it('raises on unexisting stdlib', () => {
    const lambda = () => StdLib('finitio/no-such-one', Finitio.World);
    return should(lambda).throw('No such stdlib system: `finitio/no-such-one`');
  });
});
