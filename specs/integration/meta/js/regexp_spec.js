import { Meta, should } from '../../helpers';

describe('Meta (Js.RegExp)', () => {

  it('dresses regexp', () => {
    const src = /[a-z]+/;
    const rx = Meta.Js.RegExp.dress(src);
    return should(rx).equal(src);
  });

  it('dresses strings', () => {
    const rx = Meta.Js.RegExp.dress('[a-z]+');
    return should(rx).eql(/[a-z]+/);
  });

  it('undresses regexps as expected', () => {
    const rx = Meta.Js.RegExp.undress(/[a-z]+/, Meta.Js.String);
    return should(rx).eql('[a-z]+');
  });
});
