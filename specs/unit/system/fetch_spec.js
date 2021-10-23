import System from '../../../src/finitio/system';
import TypeDef from '../../../src/finitio/type/type_def';
import { numType } from '../../spec_helpers';
import should from 'should';

describe('System#fetch', () => {

  const system = System.info({
    types: [
      TypeDef.info({ name: 'Int', type: numType }),
      TypeDef.info({ name: 'Main', type: numType }),
    ],
  });

  const subject = name => system.fetch(name);

  it('returns Main', () => should(subject('Main')).be.an.instanceof(TypeDef));

  it('throws with a non existing type name and no callback', () => {
    const lambda = () => subject('noSuchOne');
    return should(lambda).throw(/No such type `noSuchOne`/);
  });

  it('yields the callback otherwise', () => {
    const lambda = () => system.fetch('noSuchOne', () => 'bar');
    should(lambda).not.throw();
    return should(lambda()).equal('bar');
  });
});
