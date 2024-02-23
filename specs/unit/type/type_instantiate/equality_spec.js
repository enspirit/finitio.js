import TypeInstantiate from '../../../../src/finitio/type/type_instantiate';
import should from 'should';
import { seqTypeT, seqTypeU } from '../../../spec_helpers';

describe('TypeInstantiate#equals', () => {

  it('works with the aliased type itself', () => {
    const type = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    return should(type.equals(seqTypeT)).equal(true);
  });

  it('works with another alias type', () => {
    const t1 = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    const t2 = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    return should(t1.equals(t2)).equal(true);
  });

  it('works the other way round', () => {
    const t = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    return should(seqTypeT.equals(t)).equal(true);
  });

  it('works indepedently of the alias name (diff name, same target)', () => {
    const t1 = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    const t2 = new TypeInstantiate('Collection', ['PersonAlias'], null, seqTypeT);
    return should(t1.equals(t2)).equal(true);
  });

  it.skip('works indepedently of the alias name (same name, different targets)', () => {
    const t1 = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    const t2 = new TypeInstantiate('Collection', ['Person'], null, seqTypeU);
    return should(t1.equals(t2)).equal(false);
  });

});
