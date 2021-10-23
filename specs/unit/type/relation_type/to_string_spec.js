import AnyType from '../../../../src/finitio/type/any_type';
import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import RelationType from '../../../../src/finitio/type/relation_type';
import should from 'should';

describe('RelationType#toString', () => {

  const heading = new Heading([
    new Attribute('a', new AnyType),
  ]);

  const type = new RelationType(heading);

  it('works', () => should(type.toString()).equal('{{ a : . }}'));
});
