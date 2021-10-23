import { Meta, should } from '../../helpers';

describe('Meta (Js.String)', () => {

  it('dresses javascript strings', () => should(Meta.Js.String.dress('abc')).eql('abc'));

  it('rejects anything else', () => should(() => Meta.Js.String.dress(12)).throw());
});
