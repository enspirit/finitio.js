import { Meta, should, intType } from '../../helpers';

describe('Meta (TypeRef)', () => {

  const info = {
    typeName: 'String',
  };

  it('dresses as expected', () => should(() => Meta.TypeRef.dress(info)).not.throw());
});
