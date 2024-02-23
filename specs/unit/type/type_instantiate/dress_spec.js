import TypeInstantiate from '../../../../src/finitio/type/type_instantiate';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeInstantiate#dress', () => {

  it('when resolved', () => {
    const type = new TypeInstantiate('Scalar', ['Number'], null, intType);
    return should(type.dress(12)).equal(12);
  });

  it('when not resolved', () => {
    const type = new TypeInstantiate('Scalar', ['Number'], null);
    return should(() => type.dress(12)).throw();
  });
});
