import should from 'should';
import TimeC from '../../../src/finitio/contracts/time';

describe('Time.milliseconds', () => {

  it('dress works', () => {
    const got = TimeC.milliseconds.dress(1424041200000);
    should(got).be.an.instanceof(Date);
    should(got.getFullYear()).eql(2015);
    return should(got.getTime()).eql(1424041200000);
  });

  it('undress works', () => {
    const date = new Date(Date.parse('2015-02-15T23:00:00.000Z'));
    const got = TimeC.milliseconds.undress(date);
    should(got).be.an.instanceof(Number);
    return should(got).eql(1424041200000);
  });
});
