import { Fixtures, Finitio, should } from '../helpers';

describe('Maximum call stack exceeded on recursive types', () => {

  let system = null;

  class Field {

    constructor(_raw) {
      this._raw = _raw;
    }

    static raw(raw) {
      return new Field(raw);
    }

    toRaw() {
      return this._raw;
    }
  }

  beforeEach(() => {
    try {
      const src = Fixtures.loadFile('recursive.fio');
      const world = { JsTypes: { Field } };
      return system = Finitio.system(src, world);
    } catch (e) {
      return console.log(e);
    }
  });

  it('lets dress a logical field', () => {
    const d = system.Logical.dress({ id: 'foo' });
    return should(d).be.an.instanceof(Field);
  });

  it('lets dress a logical field with children', () => {
    const d = system.Logical.dress({ id: 'foo', children: [{ id: 'bar' }] });
    should(d).be.an.instanceof(Field);
    return should(d._raw.children[0]).be.an.instanceof(Field);
  });

  it('lets undress to a physical field', () => {
    const d = system.Logical.dress({ id: 'foo' });
    return system.Logical.undress(d, system.Physical);
  });

  it('lets undress to a physical field with children', () => {
    const d = system.Logical.dress({ id: 'foo', children: [{ id: 'bar' }] });
    return system.Logical.undress(d, system.Physical);
  });
});
