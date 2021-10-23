import System from '../../../src/finitio/system';
import TypeDef from '../../../src/finitio/type/type_def';
import should from 'should';
import { numType, stringType } from '../../spec_helpers';

describe('System#clone', () => {

  const system = System.info({
    types: [TypeDef.info({ name: 'Int', type: numType })],
  });

  const subject = () => system.clone();

  it('should return a System', () => should(subject()).be.an.instanceof(System));

  it('should not be the same object', () => should(subject()).not.equal(system));

  it('should have numType', () => should(subject().types[0].type).equal(numType));
});

