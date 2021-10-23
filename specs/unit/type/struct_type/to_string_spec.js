import AnyType from '../../../../src/finitio/type/any_type';
import StructType from '../../../../src/finitio/type/struct_type';
import _ from 'underscore';
import should from 'should';
import { intType, floatType } from '../../../spec_helpers';

describe('StructType#include', () => {

  const type = new StructType([new AnyType(), new AnyType()]);

  it('works', () => should(type.toString()).equal('<.,.>'));
});
