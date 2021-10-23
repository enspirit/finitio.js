import { Meta, should, intType } from '../../helpers';

describe('Meta (Any)', () => {

  const info = {
  };

  it('dresses as expected', () => should(() => Meta.AnyType.dress(info)).not.throw());
});
