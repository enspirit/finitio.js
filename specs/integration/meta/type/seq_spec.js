import { Meta, should, intType } from '../../helpers';

describe('Meta (Seq)', () => {

  const info = {
    elmType: { builtin: { jsType: String } },
  };

  it('dresses as expected', () => should(() => Meta.SeqType.dress(info)).not.throw());
});
