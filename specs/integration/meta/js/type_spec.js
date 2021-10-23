import { Meta, Finitio, should } from '../../helpers';

describe('Meta (Js.Type)', () => it('dresses from type names when world is specified', () => {
  const subject = () => Meta.Js.Type.dress('Boolean', Finitio.World);
  should(subject).not.throw();
  return should(subject()).eql(Boolean);
}));
