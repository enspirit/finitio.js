import System from '../../../src/finitio/system';
import should from 'should';

describe('System#resolve', () => {

  const typedef = function(t) {
    t.trueOne = () => t;
    return t;
  };

  const a = typedef({ name: 'A' });
  const b = typedef({ name: 'B' });
  const c = typedef({ name: 'C' });
  const d = typedef({ name: 'D' });
  const e = typedef({ name: 'E' });
  const f = typedef({ name: 'F' });

  const system = new System([
    { system: new System([{ system: new System([], [e]) }], [a]) },
    { system: new System([], [b]) },
    { qualifier: 'x', system: new System([new System([], [f])], [c]) },
  ],
  [d]);

  it('resolves a direct unqualified name correctly', () => should(system.resolve('D')).equal(d));

  it('resolves a indirect unqualified name correctly', () => {
    should(system.resolve('A')).equal(a);
    return should(system.resolve('B')).equal(b);
  });

  it('resolves a qualified name correctly', () => should(system.resolve('x.C')).equal(c));

  it('throws immediately when a qualifier is unknown', () => {
    const l = () => system.resolve('y.C', () => 12);
    return should(l).throw('No such type `y.C`');
  });

  it('does not see qualified when unqualified', () => {
    const l = () => system.resolve('C');
    return should(l).throw('No such type `C`');
  });

  it('does not see imports of imports', () => {
    const l = () => system.resolve('E');
    return should(l).throw('No such type `E`');
  });

  it('does not see imports of uses', () => {
    const l = () => system.resolve('x.F');
    return should(l).throw('No such type `x.F`');
  });
});
