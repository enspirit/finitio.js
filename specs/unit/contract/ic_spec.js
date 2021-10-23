import Contract from '../../../src/finitio/support/contract';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Contract\'s information contract', () => {

  const fromIso = function() {};
  const toIso = function() {};

  const Explicit = { dress: fromIso, undress: toIso };
  const External = { dress: fromIso, undress: toIso };
  const Internal = {};

  context('with an explicit pair', () => {
    const info = {
      name: 'iso',
      infoType: intType,
      explicit: Explicit,
      metadata: { foo: 'bar' },
    };
    const contract = Contract.info(info);

    it('dresses as expected', () => {
      should(contract).be.an.instanceof(Contract.Explicit);
      should(contract.name).equal('iso');
      should(contract.infoType).equal(intType);
      should(contract.native).equal(Explicit);
      return should(contract.metadata).eql({ foo: 'bar' });
    });

    it('undresses as expected', () => should(contract.toInfo()).eql(info));
  });

  context('with an external one', () => {
    const info = {
      name: 'iso',
      infoType: intType,
      external: External,
      metadata: { foo: 'bar' },
    };
    const contract = Contract.info(info);

    it('dresses as expected', () => {
      should(contract).be.an.instanceof(Contract.External);
      should(contract.name).equal('iso');
      should(contract.infoType).equal(intType);
      should(contract.native).equal(External);
      return should(contract.metadata).eql({ foo: 'bar' });
    });

    it('undresses as expected', () => should(contract.toInfo()).eql(info));
  });

  return context('with an internal one', () => {
    const info = {
      name: 'iso',
      infoType: intType,
      internal: Internal,
      metadata: { foo: 'bar' },
    };
    const contract = Contract.info(info);

    it('dresses as expected', () => {
      should(contract).be.an.instanceof(Contract.Internal);
      should(contract.name).equal('iso');
      should(contract.infoType).equal(intType);
      should(contract.native).equal(Internal);
      return should(contract.metadata).eql({ foo: 'bar' });
    });

    it('undresses as expected', () => should(contract.toInfo()).eql(info));
  });
});
