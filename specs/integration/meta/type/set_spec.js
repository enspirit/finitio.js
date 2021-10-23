import { Meta, should, intType } from '../../helpers';

describe('Meta (Set)', () => {

  const info = {
    elmType: { builtin: { jsType: String } },
  };

  it('dresses as expected', () => should(() => Meta.SetType.dress(info)).not.throw());
});
