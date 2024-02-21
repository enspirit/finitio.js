import {NativeConstraint} from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { numType, stringType } from '../../../spec_helpers';

describe('SubType#equals', () => {

  const fn1 = i => i > 0;
  const fn2 = i => i < 255;
  const c1 = new NativeConstraint('default', fn1);
  const c2 = new NativeConstraint('anothername', fn1);
  const c3 = new NativeConstraint('small', fn2);

  const type = new SubType(numType, [c1]);
  const type2 = new SubType(numType, [c1]);
  const type3 = new SubType(numType, [c2]);
  const type4 = new SubType(numType, [c3]);
  const type5 = new SubType(stringType, [c1]);

  it('should apply structural equivalence', () => {
    type.equals(type2).should.equal(true);
    type.equals(type3).should.equal(true);
  });

  it('should apply distinguish different types', () => {
    type.equals(type4).should.equal(false);
    type.equals(type5).should.equal(false);
  });

  it('should be a total function, with null for non types', () => type.equals(12).should.equal(false));
});
