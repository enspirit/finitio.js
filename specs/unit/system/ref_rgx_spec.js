import System from '../../../src/finitio/system';
import should from 'should';

describe('System.REF_RGX', () => {

  it('recognizes unqualified references', () => {
    const x = 'Integer'.match(System.REF_RGX);
    should(x[1]).eql(undefined);
    return should(x[2]).eql('Integer');
  });

  it('recognizes qualified references', () => {
    const x = 'data.Integer'.match(System.REF_RGX);
    should(x[1]).eql('data');
    return should(x[2]).eql('Integer');
  });

  it('recognizes x.B', () => {
    const x = 'x.B'.match(System.REF_RGX);
    should(x[1]).eql('x');
    return should(x[2]).eql('B');
  });
});
