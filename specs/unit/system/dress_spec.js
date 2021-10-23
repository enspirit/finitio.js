import Finitio from '../../../src/finitio';
import TypeError from '../../../src/finitio/errors';
import System from '../../../src/finitio/system';
import should from 'should';

describe('System#dress', () => {

  describe('when a main', () => {
    const system = Finitio.system('.Number');

    it('delegates to the main', () => {
      let error;
      system.dress(12).should.equal(12);
      try {
        system.dress('foo');
      } catch (e) {
        error = e;
      }
      return should(error).be.an.instanceof(TypeError);
    });
  });

  return describe('when no main', () => {
    const system = Finitio.system('Num = .Number');

    it('throws an Error', () => {
      let error;
      try {
        system.dress('foo');
      } catch (e) {
        error = e;
      }
      should(error).be.an.instanceof(Error);
      return should(error.message).equal('No main on System');
    });
  });
});
