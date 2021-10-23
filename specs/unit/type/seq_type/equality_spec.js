import SeqType from '../../../../src/finitio/type/seq_type';
import _ from 'underscore';
import should from 'should';
import { intType, floatType } from '../../../spec_helpers';

describe('SeqType#equality', () => {

  const type = new SeqType(intType);
  const type2 = new SeqType(intType);
  const type3 = new SeqType(floatType);

  it('should apply structural equality', () => type.equals(type2).should.equal(true));

  it('should apply distinguish different types', () => type.equals(type3).should.equal(false));

  it('should be a total function, with false for non types', () => type.equals(12).should.equal(false));
});
