import AnyType from '../../../../src/finitio/type/any_type';
import SetType from '../../../../src/finitio/type/set_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SetType#toString', () => {

  const type = new SetType(new AnyType());

  it('works', () => should(type.toString()).equal('{.}'));
});
