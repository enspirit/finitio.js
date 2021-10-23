import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType, byteType } from '../../../spec_helpers';

describe('TypeDef#isSuperTypeOf', () => {

  it('works against itself', () => {
    const type = new TypeDef(intType, 'sup');
    return should(type.isSuperTypeOf(type)).equal(true);
  });

  it('works against a real type', () => {
    const type = new TypeDef(intType, 'sup');
    return should(type.isSuperTypeOf(byteType)).equal(true);
  });

  it('works against the other way round too', () => {
    const type = new TypeDef(byteType, 'sup');
    return should(intType.isSuperTypeOf(type)).equal(true);
  });

  it('works against another alias type', () => {
    const t1 = new TypeDef(intType, 'sup');
    const t2 = new TypeDef(byteType, 'sup');
    return should(t1.isSuperTypeOf(t2)).equal(true);
  });
});
