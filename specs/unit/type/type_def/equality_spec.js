import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#equals', () => {

  it('works with the aliased type itself', () => {
    const type = new TypeDef(intType, 'foo');
    return should(type.equals(intType)).equal(true);
  });

  it('works with another alias type', () => {
    const t1 = new TypeDef(intType, 'foo');
    const t2 = new TypeDef(intType, 'bar');
    return should(t1.equals(t2)).equal(true);
  });

  it('works the other way round', () => {
    const t = new TypeDef(intType, 'foo');
    return should(intType.equals(t)).equal(true);
  });
});
