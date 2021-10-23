import Finitio from '../../src/finitio';
import Type from '../../src/finitio/type';
import SubType from '../../src/finitio/type/sub_type';
import System from '../../src/finitio/system';
import TypeError from '../../src/finitio/errors';
import should from 'should';

describe('Finitio', () => {

  it('has a version number', () => {
    (typeof Finitio.VERSION).should.not.equal('undefined');
    return (Finitio.VERSION != null).should.equal(true);
  });

  it('has a dress method', () => Finitio.system('.Number').should.be.an.instanceof(System));

  it('has a world utility', () => {
    const w = Finitio.world({ foo: 'bar' });
    should(w.foo).eql('bar');
    return should(w.Finitio).equal(Finitio);
  });

  it('has a world utility that merges JsTypes', () => {
    const w = Finitio.world({ JsTypes: { foo: 'bar' } });
    should(w.JsTypes.foo).eql('bar');
    return should(w.JsTypes.String).equal(String);
  });
});
