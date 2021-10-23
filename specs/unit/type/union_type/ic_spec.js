import UnionType from '../../../../src/finitio/type/union_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('UnionType\'s information contract', () => {

  const info = {
    candidates: [intType],
    metadata: { foo: 'bar' },
  };
  const t = UnionType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(UnionType);
    should(t.candidates).eql([intType]);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(t.toInfo()).eql(info));
});
