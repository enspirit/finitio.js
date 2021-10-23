import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TupleType\'s information contract', () => {

  const info = {
    heading: Heading.info({
      attributes: [
        Attribute.info({
          name: 'r',
          type: intType,
          required: false,
        }),
      ],
      options: { allowExtra: false },
    }),
    metadata: { foo: 'bar' },
  };
  const t = TupleType.info(info);

  it('dresses as expected', () => {
    should(t).be.an.instanceof(TupleType);
    should(t.heading).be.an.instanceof(Heading);
    return should(t.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(t.toInfo()).eql(info));
});
