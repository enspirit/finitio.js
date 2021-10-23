import TypeRef from '../../../../src/finitio/type/type_ref';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#undress', () => {

  it('delegates to the aliased type', () => {
    const type = new TypeRef('int', null, intType);
    return should(type.undress(12, intType)).equal(12);
  });

  it('works even with itself', () => {
    const type = new TypeRef('int', null, intType);
    return should(type.undress(12, type)).equal(12);
  });

  it('works even an equivalent proxy', () => {
    const t1 = new TypeRef('int', null, intType);
    const t2 = new TypeRef('int', null, intType);
    return should(t1.undress(12, t2)).equal(12);
  });
});
