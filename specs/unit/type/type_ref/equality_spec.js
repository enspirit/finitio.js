import TypeRef from '../../../../src/finitio/type/type_ref';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#equals', () => {

  it('works with the aliased type itself', () => {
    const type = new TypeRef('int', null, intType);
    return should(type.equals(intType)).equal(true);
  });

  it('works with another alias type', () => {
    const t1 = new TypeRef('int', null, intType);
    const t2 = new TypeRef('int', null, intType);
    return should(t1.equals(t2)).equal(true);
  });

  it('works the other way round', () => {
    const t = new TypeRef('int', null, intType);
    return should(intType.equals(t)).equal(true);
  });
});
