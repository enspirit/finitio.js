import * as $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.collection#inject', () => {

  it('raises an error when used with a non Array', () => {
    const test = obj => () => $u.inject(obj, '');

    should(test(false)).throw(/Array expected, got .*/);
    return should(test(/regexp/)).throw(/Array expected, got .*/);
  });

  return describe('When used on an Array', () => it('works as expected', () => {
    const array = ['one', 'two', 'three'];
    const res = $u.inject(array, '', (memo, part) => `${memo},${part}`);
    return res.should.equal(',one,two,three');
  }));
});
