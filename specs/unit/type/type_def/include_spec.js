import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#include', () => it('delegates to the aliased type', () => {
  const type = new TypeDef(intType, 'foo');
  should(type.include(12)).equal(true);
  return should(type.include('12')).equal(false);
}));
