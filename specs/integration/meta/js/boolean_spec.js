import { Meta, should } from '../../helpers';

describe('Meta (Js.Boolean)', () => {

  it('dresses javascript bools', () => {
    should(Meta.Js.Boolean.dress(true)).equal(true);
    return should(Meta.Js.Boolean.dress(false)).equal(false);
  });

  it('rejects anything else', () => should(() => Meta.Js.Boolean.dress(12)).throw());
});
