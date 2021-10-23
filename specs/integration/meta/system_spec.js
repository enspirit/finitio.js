import { Meta, should, intType } from '../helpers';

describe('Meta (System)', () => {

  const info = {
    types: [
      { name: 'Str', type: { builtin: { jsType: String } } },
    ],
    imports: [
      { qualifier: 'js', from: 'finitio/js' },
    ],
  };

  it('dresses as expected', () => {
    const resolver = function(x) {
      should(x).eql('finitio/js');
      return Meta.System.dress({ types: [] });
    };

    const subject = () => Meta.System.dress(info, { importResolver: resolver });

    return should(subject).not.throw();
  });
});
