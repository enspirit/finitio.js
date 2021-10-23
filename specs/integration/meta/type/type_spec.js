import { Meta, should, intType } from '../../helpers';

describe('Meta (Type)', () => {

  it('dresses a type as expected', () => {
    const t = Meta.Type.dress(Meta.Js.String);
    return should(t).equal(Meta.Js.String);
  });

  it('dresses an explicit info as expected', () => {
    const t = Meta.Type.dress({ builtin: { jsType: String } });
    return should(t.equals(Meta.Js.String)).equal(true);
  });

  it('allows dressing any', () => {
    const t = Meta.Type.dress({ any: {} });
    return should(t.generator).equal('any');
  });
});
