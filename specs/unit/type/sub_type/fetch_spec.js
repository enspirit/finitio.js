import {NativeConstraint} from '../../../../src/finitio/support/constraint';
import SubType from '../../../../src/finitio/type/sub_type';
import should from 'should';
import { numType, stringType } from '../../../spec_helpers';

describe('SubType#fetch', () => {

  const _default = new NativeConstraint('default', i => i > 0);
  const _small = new NativeConstraint('small', i => i < 255);

  const t = new SubType(numType, [_default, _small], 'byte');

  it('on works on an existing constraint', () => {
    should(t.fetch('default')).equal(_default);
    return should(t.fetch('small')).equal(_small);
  });

  it('yields the block when missing', () => {
    const got = t.fetch('none', () => 12);
    return should(got).equal(12);
  });

  it('throws when no missing handler', () => {
    const l = () => t.fetch('none');
    return should(l).throw('No such constraint `none`');
  });
});
