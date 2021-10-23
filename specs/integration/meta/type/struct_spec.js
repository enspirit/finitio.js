import { Meta, should, intType } from '../../helpers';

describe('Meta (Struct)', () => {

  const info = {
    componentTypes: [{ builtin: { jsType: String } }],
  };

  it('dresses as expected', () => should(() => Meta.StructType.dress(info)).not.throw());
});
