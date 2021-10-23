import { Meta, should, anyType, intType } from '../../helpers';
import TypeRef from '../../../../src/finitio/type/type_ref';

describe('Meta (Heading)', () => {

  it('coerces allowExtra:true to AnyType', () => {
    const info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false,
      }],
      options: { allowExtra: true },
    };
    should(() => Meta.Heading.dress(info)).not.throw();
    return should(Meta.Heading.dress(info).options.allowExtra).eql(anyType);
  });

  it('leaves the allowExtra:false option unchanged', () => {
    const info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false,
      }],
      options: { allowExtra: false },
    };
    should(() => Meta.Heading.dress(info)).not.throw();
    return should(Meta.Heading.dress(info).options.allowExtra).eql(false);
  });

  it('dresses any type given for the allowExtra option', () => {
    const info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false,
      }],
      options: { allowExtra: { ref: { typeName: '.' } } },
    };
    should(() => Meta.Heading.dress(info)).not.throw();
    return should(Meta.Heading.dress(info).options.allowExtra).be.an.instanceof(TypeRef);
  });

  it('supports not passing options', () => {
    const info = {
      attributes: [{
        name: 'r',
        type: intType,
        required: false,
      }],
    };
    return should(() => Meta.Heading.dress(info)).not.throw();
  });
});
