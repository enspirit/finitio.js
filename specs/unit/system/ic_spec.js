import System from '../../../src/finitio/system';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('System\'s information contract', () => {

  const info = {
    imports: {},
    types: [intType],
  };
  const s = System.info(info);

  it('dresses as expected', () => {
    should(s).be.an.instanceof(System);
    return should(s.types.length).equal(1);
  });

  it('undresses as expected', () => should(s.toInfo()).eql(info));
});
