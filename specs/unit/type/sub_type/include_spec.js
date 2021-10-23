import Constraint from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('SubType#include', () => {

  const type = new SubType(intType, [
    new Constraint.Native('default', i => i > 0),
    new Constraint.Native('small', i => i < 255),
  ], 'byte');

  const subject = arg => type.include(arg);

  it('when included on int', () => subject(12).should.equal(true));

  it('when not included on int (I)', () => subject(-12).should.equal(false));

  it('when not included on int (II)', () => subject(255).should.equal(false));

  it('when not included', () => subject('12').should.equal(false));
});
