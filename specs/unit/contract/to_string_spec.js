import AnyType from '../../../src/finitio/type/any_type';
import Contract from '../../../src/finitio/support/contract';
import should from 'should';

describe('Contract#toString', () => {

  const anyType = new AnyType();

  const dresser = function(value, world) {};

  const contract = function(kind, pair) {
    const info = {
      name: 'iso',
      infoType: anyType,
    };
    info[kind] = pair;
    return Contract.info(info);
  };

  context('with an explicit', () => {
    const cont = contract('explicit', { dress: dresser });

    it('works', () => should(cont.toString()).equal('<iso> .'));
  });

  context('with an external', () => {
    const cont = contract('external', { dress: dresser });

    it('works', () => should(cont.toString()).equal('<iso> .'));
  });

  return context('with an internal', () => {
    const cont = contract('internal', { iso: dresser });

    it('works', () => should(cont.toString()).equal('<iso> .'));
  });
});
