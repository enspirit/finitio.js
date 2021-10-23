import SetType from '../../../../src/finitio/type/set_type';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SetType#include', () => {

  const type = new SetType(intType);

  const subject = arg => type.include(arg);

  it('when included on empty array', () => subject([]).should.equal(true));

  it('when included on non empty array', () => subject([12]).should.equal(true));

  it('when not an array', () => subject({}).should.equal(false));

  it('when an array with non ints', () => subject([12, 'foo']).should.equal(false));

  it('when an array with duplicates', () => subject([12, 12]).should.equal(false));
});
