import AnyType from '../../../../src/finitio/type/any_type';
import UnionType from '../../../../src/finitio/type/union_type';
import should from 'should';

describe('UnionType#include', () => {

  const type = new UnionType([new AnyType(), new AnyType()]);

  it('works', () => should(type.toString()).equal('.|.'));
});
