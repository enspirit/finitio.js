import System from '../../../src/finitio/system';
import should from 'should';

describe('System#constructor', () => {

  const subject = new System();

  it('should be a System', () => subject.should.be.an.instanceof(System));
});
