import System from '../../../src/finitio/system';
import TypeDef from '../../../src/finitio/type/type_def';
import should from 'should';
import { numType, stringType } from '../../spec_helpers';

describe('System#extendWith', () => {

  let system = System.info({
    types: [TypeDef.info({ name: 'Int', type: numType })],
  });

  const subject = () => system.subsystem('\
Person = { age: Int }\
');

  it('should return a System', () => {
    try {
      return should(subject()).be.an.instanceof(System);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  it('should not be the same object', () => should(subject()).not.equal(system));

  it('should have numType', () => should(subject().types[0].type).equal(numType));

  it('should have Person', () => {
    system = subject();
    const type = system.types.find(t => t.name === 'Person');
    return should(type).be.an.instanceof(TypeDef);
  });
});

