import { Meta, should, intType } from '../../helpers';

describe('Meta (Attribute)', () => {

  context('when required is unspecified', () => {
    const info = {
      name: 'r',
      type: intType,
    };

    it('dresses as expected', () => {
      const subject = () => Meta.Attribute.dress(info);
      should(subject).not.throw();
      return should(subject().required).eql(true);
    });
  });

  return context('when not required', () => {
    const info = {
      name: 'r',
      type: intType,
      required: false,
    };

    it('dresses as expected', () => {
      const subject = () => Meta.Attribute.dress(info);
      should(subject).not.throw();
      return should(subject().required).eql(false);
    });
  });
});
