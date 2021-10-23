import { Meta, should, intType } from '../../helpers';

describe('Meta (Builtin)', () => {

  const info = {
    jsType: String,
  };

  it('dresses as expected', () => should(() => Meta.BuiltinType.dress(info)).not.throw());
});
