import { Meta, should, intType } from '../../helpers';

describe('Meta (Tuple)', () => {

  const info = {
    heading: {
      attributes: [],
    },
  };

  it('dresses as expected', () => should(() => Meta.TupleType.dress(info)).not.throw());
});
