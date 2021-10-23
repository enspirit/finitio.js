import { should, Finitio, Fixtures, Meta, Parser } from '../helpers';

describe('Meta', () => {

  const subject = function() {
    let e, parsed;
    const src = Fixtures.loadFile('test.fio');
    try {
      parsed = Parser.parse(src);
    } catch (error) {
      e = error;
      console.log(e);
      should(false).eql(true);
    }

    try {
      return Meta.System.dress(parsed, Finitio.World);
    } catch (error1) {
      e = error1;
      console.log(e.explainTree());
      return should(false).eql(true);
    }
  };

  it('supports dressing from the result of the parser', () => should(subject()).be.an.instanceof(Finitio.System));

  it('resolves proxies and properly binds contracts', () => {
    const info = {
      name: 'Finitio.js',
      version: '0.2',
      releasedAt: '2014-05-26',
    };
    const dressed = subject().dress(info);
    return should(dressed.releasedAt).be.an.instanceof(Date);
  });
});
