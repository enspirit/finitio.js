import { Meta, should, intType } from '../../helpers';

describe('Meta (Contract)', () => {

  const info = {
    name: 'iso',
    infoType: intType,
    explicit: {
      dress() {},
      undress() {},
    },
    metadata: { foo: 'bar' },
  };

  it('dresses as expected', () => {
    const subject = () => Meta.Contract.dress(info);

    should(subject).not.throw();
    return should(subject().metadata).eql({ foo: 'bar' });
  });
});
