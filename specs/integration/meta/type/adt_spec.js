import { Meta, should, intType } from '../../helpers';

describe('Meta (Adt)', () => {

  const info = {
    jsType: String,
    contracts: [],
  };

  it('dresses as expected', () => should(() => Meta.AdType.dress(info)).not.throw());
});
