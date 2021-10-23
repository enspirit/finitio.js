import Constraint from '../../../src/finitio/support/constraint';
import should from 'should';

describe('Constraint#accept', () => {

  describe('with a function', () => {
    const constraint = new Constraint.Native('positive', i => i > 0);

    it('accepts positive numbers', () => constraint.accept(12).should.equal(true));

    it('rejects negative numbers', () => constraint.accept(-12).should.equal(false));
  });

  describe('with a regexp', () => {
    const constraint = new Constraint.Regexp('word', /[a-z]+/);

    it('accepts words', () => constraint.accept('abgd').should.equal(true));

    it('rejects numbers', () => constraint.accept('12').should.equal(false));
  });

  describe('with a closed range', () => {
    const constraint = new Constraint.Range('within', { min: 1, max: 10, min_inclusive: true, max_inclusive: true });

    it('accepts valid integers', () => {
      should(constraint.accept(1)).equal(true);
      should(constraint.accept(5)).equal(true);
      return should(constraint.accept(10)).equal(true);
    });

    it('rejects invalid integers', () => {
      should(constraint.accept(-10)).equal(false);
      should(constraint.accept(0)).equal(false);
      return should(constraint.accept(11)).equal(false);
    });
  });

  describe('with an open range', () => {
    const constraint = new Constraint.Range('within', { min: 1, max: 10, min_inclusive: false, max_inclusive: false });

    it('accepts valid integers', () => {
      should(constraint.accept(2)).equal(true);
      should(constraint.accept(5)).equal(true);
      return should(constraint.accept(9)).equal(true);
    });

    it('rejects invalid integers', () => {
      should(constraint.accept(-10)).equal(false);
      should(constraint.accept(1)).equal(false);
      return should(constraint.accept(10)).equal(false);
    });
  });

  describe('with an right-infinite range', () => {
    const constraint = new Constraint.Range('within', { min: 1, min_inclusive: false });

    it('accepts valid integers', () => {
      should(constraint.accept(2)).equal(true);
      should(constraint.accept(5)).equal(true);
      should(constraint.accept(9)).equal(true);
      should(constraint.accept(100)).equal(true);
      return should(constraint.accept(100000)).equal(true);
    });

    it('rejects invalid integers', () => {
      should(constraint.accept(-10)).equal(false);
      return should(constraint.accept(0)).equal(false);
    });
  });

  return describe('with a set constraint', () => {
    const constraint = new Constraint.Set('within', [1, 5, 10]);

    it('accepts valid integers', () => {
      should(constraint.accept(1)).equal(true);
      should(constraint.accept(5)).equal(true);
      return should(constraint.accept(10)).equal(true);
    });

    it('rejects invalid integers', () => {
      should(constraint.accept(-10)).equal(false);
      should(constraint.accept(0)).equal(false);
      return should(constraint.accept(100)).equal(false);
    });
  });
});
