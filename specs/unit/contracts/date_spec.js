import should from 'should';
import DateC from '../../../src/finitio/contracts/date';

describe('Date.milliseconds', () => {

  it('dress works', () => {
    const got = DateC.milliseconds.dress(1424041200000);
    should(got).be.an.instanceof(Date);
    should(got.getFullYear()).eql(2015);
    return should(got.getTime()).eql(1424041200000);
  });

  it('undress works', () => {
    const date = new Date(Date.parse('2015-02-15T23:00:00.000Z'));
    const got = DateC.milliseconds.undress(date);
    should(got).be.an.instanceof(Number);
    return should(got).eql(1424041200000);
  });
});
