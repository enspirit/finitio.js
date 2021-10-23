import Constraint from '../../../src/finitio/support/constraint';
import should from 'should';

describe('Constraint\'s information contract', () => {

  describe('with a function', () => {
    const fn = i => i > 0;
    const constraint = Constraint.info({ name: 'positive', native: fn });

    it('builds a native constraint', () => {
      should(constraint).be.an.instanceof(Constraint.Native);
      return should(constraint.name).equal('positive');
    });

    it('works as expected', () => {
      should(constraint.accept(2)).equal(true);
      return should(constraint.accept(-2)).equal(false);
    });

    it('toInfo as expected', () => {
      const expected = { name: 'positive', native: fn };
      return should(constraint.toInfo()).eql(expected);
    });
  });

  describe('with a regexp', () => {
    const rx = /[a-z]+/;
    const constraint = Constraint.info({ name: 'word', regexp: rx });

    it('builds a regexp constraint', () => {
      should(constraint).be.an.instanceof(Constraint.Regexp);
      return should(constraint.name).equal('word');
    });

    it('works as expected', () => {
      should(constraint.accept('abgd')).equal(true);
      return should(constraint.accept('12')).equal(false);
    });

    it('toInfo as expected', () => {
      const expected = { name: 'word', regexp: rx };
      return should(constraint.toInfo()).eql(expected);
    });
  });

  describe('with a range', () => {
    const range = { min: 1, min_inclusive: true };
    const constraint = Constraint.info({ name: 'within', range });

    it('builds a range constraint', () => {
      should(constraint).be.an.instanceof(Constraint.Range);
      return should(constraint.name).equal('within');
    });

    it('works as expected', () => {
      should(constraint.accept(10)).equal(true);
      return should(constraint.accept(-1)).equal(false);
    });

    it('toInfo as expected', () => {
      const expected = { name: 'within', range };
      return should(constraint.toInfo()).eql(expected);
    });
  });

  return describe('when not named', () => {
    const fn = i => i > 0;
    const constraint = Constraint.info({ native: fn });

    it('builds a native constraint', () => {
      should(constraint).be.an.instanceof(Constraint.Native);
      return should(constraint.name).equal(undefined);
    });

    it('works as expected', () => {
      should(constraint.accept(2)).equal(true);
      return should(constraint.accept(-2)).equal(false);
    });

    it('toInfo as expected', () => {
      const expected = { native: fn };
      return should(constraint.toInfo()).eql(expected);
    });
  });
});
