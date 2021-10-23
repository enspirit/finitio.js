import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Heading\'s information contract', () => {

  const info = {
    attributes: [
      Attribute.info({
        name: 'r',
        type: intType,
        required: false,
      }),
    ],
    options: { allowExtra: { type: { any: { } } } },
  };
  const h = Heading.info(info);

  it('dresses as expected', () => {
    should(h).be.an.instanceof(Heading);
    should(h.attributes.length).equal(1);
    return should(h.options).eql({ allowExtra: { type: { any: { } } } });
  });

  it('undresses as expected', () => should(h.toInfo()).eql(info));
});
