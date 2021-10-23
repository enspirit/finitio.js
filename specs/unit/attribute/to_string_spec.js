import AnyType from '../../../src/finitio/type/any_type';
import Attribute from '../../../src/finitio/support/attribute';
import should from 'should';

describe('Attribute#toString', () => {

  const anyType = new AnyType();

  describe('when implicitely required', () => {
    const attr = new Attribute('red', anyType);

    it('works', () => should(attr.toString()).equal('red : .'));
  });

  return describe('when not required', () => {
    const attr = new Attribute('red', anyType, false);

    it('works', () => should(attr.toString()).equal('red :? .'));
  });
});
