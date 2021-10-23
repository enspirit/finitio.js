import Constraint from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import _ from 'underscore';
import { numType } from '../../../spec_helpers';

describe('SubType#constructor', () => {

  const c1 = new Constraint.Native('a', i => i > 0);
  const c2 = new Constraint.Native('b', i => i < 255);

  const sub = new SubType(numType, [c1, c2]);

  it('sets the variable instances', () => {
    sub.superType.should.equal(numType);
    return _.isEqual(sub.constraints, [c1, c2]).should.equal(true);
  });
});
