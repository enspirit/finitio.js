import Type from '../../../../src/finitio/type';
import BuiltinType from '../../../../src/finitio/type/builtin_type';
import AnyType from '../../../../src/finitio/type/any_type';
import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import RelationType from '../../../../src/finitio/type/relation_type';
import should from 'should';

describe('RelationType#toString', () => {

  const builtinString = new BuiltinType(String);

  class HighType extends Type {
    low() {
      return builtinString;
    }
  }

  const a = new Attribute('a', new HighType());
  const a_low = new Attribute('a', builtinString);

  const heading = new Heading([a]);
  const heading_low = new Heading([a_low]);

  const type = new RelationType(heading);
  const type_low = new RelationType(heading_low);

  it('works', () => should(type.low()).eql(type_low));
});
