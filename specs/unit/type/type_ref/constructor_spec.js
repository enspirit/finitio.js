import TypeRef from '../../../../src/finitio/type/type_ref';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeRef#initialize', () => {

  it('creates a valid type', () => {
    const t = new TypeRef('int');
    return should(t).be.an.instanceOf(TypeRef);
  });

  it('supports setting the target', () => {
    const t = new TypeRef('int', null, intType);
    return should(t.target).equal(intType);
  });

  it('raises without the proxied name', () => {
    const l = () => new TypeRef(null);
    return should(l).throw();
  });
});
