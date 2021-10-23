import { Meta, should } from '../../helpers';

describe('Meta (Js.Function)', () => {

  it('is based on a valid hypothesis', () => {
    const fn = new Function('i', 'return i>0');
    should(fn).be.an.instanceof(Function);
    should(fn(0)).equal(false);
    return should(fn(1)).equal(true);
  });

  it('dresses a pair as expected', () => {
    const fn = Meta.Js.Function.dress(['i', 'return i>0']);
    return should(fn).be.an.instanceof(Function);
  });

  it('undresses functions as expected', () => {
    const fn = Meta.Js.Function.dress(['i', 'return i>0']);
    const rx = Meta.Js.Function.undress(fn, Meta.Js.FunctionDefn);
    return should(rx).eql(['i', 'return i>0']);
  });

  it('adds the \'return\' if missing', () => {
    const fn = Meta.Js.Function.dress(['i', 'i>0']);
    should(fn(0)).equal(false);
    return should(fn(1)).equal(true);
  });

  it('is able to resolve a function reference on the world', () => {
    const fn = new Function('i', 'return i>0');
    const world = { _: { fn } };
    const dressed = Meta.Js.Function.dress('_.fn', world);
    should(fn(0)).equal(false);
    return should(fn(1)).equal(true);
  });
});
