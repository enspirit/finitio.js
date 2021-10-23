import { Meta, should, intType } from '../../helpers';

describe('Meta (Union)', () => {

  const info = {
    candidates: [{ builtin: { jsType: String } }],
  };

  it('dresses as expected', () => should(() => Meta.UnionType.dress(info)).not.throw());
});
