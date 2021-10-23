import TypeError from '../../../../src/finitio/errors';
import TypeDef from '../../../../src/finitio/type/type_def';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#dress', () => {

  it('delegates to the aliased type', () => {
    const type = new TypeDef(intType, 'Foo');
    return should(type.dress(12)).equal(12);
  });

  it('rephrases the error', () => {
    const type = new TypeDef(intType, 'Foo');

    const err = (() => { try {
      return type.dress('bar');
    } catch (e) {
      return e;
    } })();

    should(err).be.an.instanceof(TypeError);
    return should(err.message).eql('Invalid Foo: `bar`');
  });
});
