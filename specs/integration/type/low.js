import { Finitio, Fixtures, should } from '../helpers';

describe('Type#low for easy persistence', () => {

  const system = Finitio.system(Fixtures.loadFile('low.fio'));

  const raw = { name: 'Finitio', releasedAt: '2015-02-16' };

  const dressed = () => system.dress(raw);

  const undressed = () => system.undress(dressed());

  it('is properly dressed initially', () => should(dressed().releasedAt.getTime()).equal(1424044800000));

  it('low lets undress easily!', () => should(undressed().releasedAt).equal('2015-02-16'));
});
