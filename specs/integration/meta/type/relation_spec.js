import { Meta, should, intType } from '../../helpers';

describe('Meta (Relation)', () => {

  const info = {
    heading: {
      attributes: [],
    },
  };

  it('dresses as expected', () => should(() => Meta.RelationType.dress(info)).not.throw());
});
