import TypeRef from '../../../../src/finitio/type/type_ref';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#toString', () => {

  const type = new TypeRef('Int');

  it('works', () => should(type.toString()).equal('Int'));
});
