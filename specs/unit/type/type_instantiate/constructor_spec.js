import TypeInstantiate from '../../../../src/finitio/type/type_instantiate';
import _ from 'underscore';
import should from 'should';
import { seqTypeT } from '../../../spec_helpers';

describe('TypeInstantiate#initialize', () => {

  it('creates a valid type', () => {
    const t = new TypeInstantiate('Collection', ['Person']);
    return should(t).be.an.instanceOf(TypeInstantiate);
  });

  it('supports setting the target', () => {
    const t = new TypeInstantiate('Collection', ['Person'], null, seqTypeT);
    return should(t.target).equal(seqTypeT);
  });

  it('raises without the proxied name', () => {
    const l = () => new TypeInstantiate(null);
    return should(l).throw();
  });
});
