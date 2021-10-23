import Constraint from '../../../src/finitio/support/constraint';
import should from 'should';

describe('Constraint#equals', () => {

  describe('On a native constraint', () => {
    const fn1 = i => i > 0;
    const fn2 = i => i > 100;
    const c1 = new Constraint.Native('positive', fn1);
    const c2 = new Constraint.Native('othername', fn1);
    const c3 = new Constraint.Native('positive', fn2);

    it('applies structural equivalence', () => c1.equals(c2).should.equal(true));

    it('distinguishes different functions', () => c1.equals(c3).should.equal(false));
  });

  describe('On a regexp constraint', () => {
    const r1 = /[a-z]+/;
    const r2 = /[a-z]+/;
    const c1 = new Constraint.Regexp('word', r1);
    const c2 = new Constraint.Regexp('sameword', r1);
    const c3 = new Constraint.Regexp('other', r2);

    it('applies structural equivalence', () => c1.equals(c2).should.equal(true));

    it('distinguishes different constraints', () => c1.equals(c3).should.equal(false));
  });

  describe('On a range constraint', () => {
    const r1 = { min: 1, max: 10, min_inclusive: true, max_inclusive: true };
    const r2 = { min: 1, max: 10, min_inclusive: true, max_inclusive: true };
    const r3 = { min: 1, max: 10, min_inclusive: true, max_inclusive: false };
    const r4 = { min: 1, min_inclusive: true };
    const r5 = { min: 1, min_inclusive: true };
    const r6 = { min: 1, min_inclusive: false };
    const c1 = new Constraint.Range('r1', r1);
    const c2 = new Constraint.Range('r2', r2);
    const c3 = new Constraint.Range('r3', r3);
    const c4 = new Constraint.Range('r4', r4);
    const c5 = new Constraint.Range('r5', r5);
    const c6 = new Constraint.Range('r6', r6);

    it('recognizes same ranges', () => {
      should(c1.equals(c2)).equal(true);
      return should(c4.equals(c5)).equal(true);
    });

    it('distinguishes different ones', () => {
      should(c1.equals(c3)).equal(false);
      should(c1.equals(c4)).equal(false);
      return should(c4.equals(c6)).equal(false);
    });
  });

  return describe('On a set constraint', () => {
    const r1 = [1, 2, 4];
    const r2 = [1, 4, 2];
    const r3 = [1, 2];
    const r4 = [1, 2, 4, 5];
    const c1 = new Constraint.Set('r1', r1);
    const c2 = new Constraint.Set('r2', r2);
    const c3 = new Constraint.Set('r3', r3);
    const c4 = new Constraint.Set('r4', r4);

    it('recognizes same sets', () => should(c1.equals(c2)).equal(true));

    it('distinguishes different ones', () => {
      should(c1.equals(c3)).equal(false);
      should(c1.equals(c4)).equal(false);
      should(c3.equals(c1)).equal(false);
      return should(c4.equals(c1)).equal(false);
    });
  });
});
