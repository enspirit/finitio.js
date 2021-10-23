import TypeRef from '../../../../src/finitio/type/type_ref';
import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType, byteType } from '../../../spec_helpers';

describe('TypeRef#isSuperTypeOf', () => {

  it('works against itself', () => {
    const type = new TypeRef('int', null, intType);
    return should(type.isSuperTypeOf(type)).equal(true);
  });

  it('works against a real type', () => {
    const type = new TypeRef('int', null, intType);
    return should(type.isSuperTypeOf(byteType)).equal(true);
  });

  it('works against the other way round too', () => {
    const type = new TypeRef('int', null, byteType);
    return should(intType.isSuperTypeOf(type)).equal(true);
  });

  it('works against another proxy type', () => {
    const t1 = new TypeRef('int', null, intType);
    const t2 = new TypeRef('byte', null, byteType);
    return should(t1.isSuperTypeOf(t2)).equal(true);
  });

  it('works with an alias type', () => {
    const t1 = new TypeRef('int', null, intType);
    const t2 = new TypeDef(byteType, 'byte');
    return should(t1.isSuperTypeOf(t2)).equal(true);
  });

  it('works against an alias type', () => {
    const t1 = new TypeDef(intType, 'int');
    const t2 = new TypeRef('byte', null, byteType);
    return should(t1.isSuperTypeOf(t2)).equal(true);
  });
});
