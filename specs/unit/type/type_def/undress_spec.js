import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#undress', () => {

  it('delegates to the aliased type', () => {
    const type = new TypeDef(intType, 'foo');
    return should(type.undress(12, intType)).equal(12);
  });

  it('works even with itself', () => {
    const type = new TypeDef(intType, 'foo');
    return should(type.undress(12, type)).equal(12);
  });

  it('works even an equivalent alias', () => {
    const t1 = new TypeDef(intType, 'foo');
    const t2 = new TypeDef(intType, 'bar');
    return should(t1.undress(12, t2)).equal(12);
  });
});
