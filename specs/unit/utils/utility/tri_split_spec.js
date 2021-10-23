import $u from '../../../../src/finitio/support/utils';
import should from 'should';

describe('Utils.utility#triSplit', () => {

  const expShared = { name: ['foo', 'foo'], bar: ['baz', 'baz'] };

  it('recognizes same hashes', () => {
    const x = { name: 'foo', bar: 'baz' };
    const y = { name: 'foo', bar: 'baz' };
    const [shared, left, right] = $u.triSplit(x, y);
    should(shared).eql(expShared);
    should(left).eql({});
    return should(right).eql({});
  });

  it('recognizes extra at left', () => {
    const x = { name: 'foo', bar: 'baz', extra: 'blah' };
    const y = { name: 'foo', bar: 'baz' };
    const [shared, left, right] = $u.triSplit(x, y);
    should(shared).eql(expShared);
    should(left).eql({ extra: 'blah' });
    return should(right).eql({});
  });

  it('recognizes extra at right', () => {
    const x = { name: 'foo', bar: 'baz' };
    const y = { name: 'foo', bar: 'baz', extra: 'blah' };
    const [shared, left, right] = $u.triSplit(x, y);
    should(shared).eql(expShared);
    should(left).eql({});
    return should(right).eql({ extra: 'blah' });
  });
});

