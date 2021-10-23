import AnyType from '../../../../src/finitio/type/any_type';
import SeqType from '../../../../src/finitio/type/seq_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SeqType#toString', () => {

  const type = new SeqType(new AnyType());

  it('works', () => should(type.toString()).equal('[.]'));
});
