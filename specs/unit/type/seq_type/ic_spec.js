import SeqType from '../../../../src/finitio/type/seq_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SeqType\'s information contract', () => {

  const info = {
    elmType: intType,
    metadata: { foo: 'bar' },
  };

  const t = SeqType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(SeqType);
    should(t.elmType).equal(intType);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(t.toInfo()).eql(info));
});
