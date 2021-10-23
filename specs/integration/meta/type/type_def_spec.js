import { Meta, should, intType } from '../../helpers';

describe('Meta (TypeDef)', () => {

  const info = {
    name: 'String',
    type: { builtin: { jsType: String } },
  };

  it('dresses as expected', () => should(() => Meta.TypeDef.dress(info)).not.throw());
});
