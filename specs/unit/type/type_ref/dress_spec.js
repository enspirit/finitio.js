import TypeRef from '../../../../src/finitio/type/type_ref';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#dress', () => {

  it('when resolved', () => {
    const type = new TypeRef('Int', null, intType);
    return should(type.dress(12)).equal(12);
  });

  it('when not resolved', () => {
    const type = new TypeRef('Int');
    return should(() => type.dress(12)).throw();
  });
});
