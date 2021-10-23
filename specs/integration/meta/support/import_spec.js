import { Meta, Finitio, should, intType } from '../../helpers';

describe('Meta (Import)', () => it('works when unqualified', () => {
  const info = {
    from: 'finitio/data',
  };

  const resolver = function(x) {
    should(x).eql('finitio/data');
    return Meta.System.dress({ types: [] });
  };

  const subject = () => Meta.Import.dress(info, { importResolver: resolver });

  should(subject).not.throw();
  return should(subject().system).be.an.instanceof(Finitio.System);
}));
