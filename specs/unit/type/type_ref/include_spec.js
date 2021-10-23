import TypeRef from '../../../../src/finitio/type/type_ref';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#include', () => {

  it('when resolved', () => {
    const type = new TypeRef('Int', null, intType);
    should(type.include(12)).equal(true);
    return should(type.include('foo')).equal(false);
  });

  it('when not resolved', () => {
    const type = new TypeRef('Int');
    return should(() => type.include(12)).throw();
  });
});
