import should from 'should';
import Funct from '../../../src/finitio/contracts/function';

describe('Function\'s reference contract', () => {

  const isEven = i => (i % 2) === 0;

  const world = { _: { isEven } };

  it('resolves through the world at dressing time', () => {
    const f = Funct.reference.dress('_.isEven', world);

    // we test it like this, since the original function
    // is wrapped for undressing purpose
    should(f(2)).eql(true);
    return should(f(3)).eql(false);
  });

  it('throw an error when not found', () => {
    const lambda = () => Funct.reference.dress('_.hello.world', world);
    return should(lambda).throw('_.hello.world is undefined');
  });

  it('throw an error when not a function', () => {
    const lambda = () => Funct.reference.dress('_', world);
    return should(lambda).throw('_ must resolve to a Function');
  });

  it('keeps the source it comes from, for undressing', () => {
    const f = Funct.reference.dress('_.isEven', world);
    const s = Funct.reference.undress(f);
    return should(s).eql('_.isEven');
  });
});
