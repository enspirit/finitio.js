import Attribute from '../../../src/finitio/support/attribute';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Attribute\'s information contract', () => {

  describe('without metadata', () => {
    const info = {
      name: 'r',
      type: intType,
      required: true,
    };
    const attr = Attribute.info(info);

    it('dresses as expected', () => {
      should(attr).be.an.instanceof(Attribute);
      should(attr.name).equal('r');
      should(attr.type).equal(intType);
      should(attr.required).equal(true);
      return should(attr.metadata).equal(undefined);
    });

    it('undresses as expected', () => should(attr.toInfo()).eql(info));
  });

  return describe('with metadata', () => {
    const info = {
      name: 'r',
      type: intType,
      required: false,
      metadata: { foo: 'bar' },
    };
    const attr = Attribute.info(info);

    it('dresses as expected', () => {
      should(attr).be.an.instanceof(Attribute);
      should(attr.name).equal('r');
      should(attr.type).equal(intType);
      should(attr.required).equal(false);
      return should(attr.metadata).eql({ foo: 'bar' });
    });

    it('undresses as expected', () => should(attr.toInfo()).eql(info));
  });
});
