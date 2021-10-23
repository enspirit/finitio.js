import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#toString', () => {

  const type = new TypeDef(intType, 'foo');

  it('works', () => should(type.toString()).equal('foo'));
});
