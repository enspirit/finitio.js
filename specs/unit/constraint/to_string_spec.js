import Constraint from '../../../src/finitio/support/constraint';
import should from 'should';

describe('Constraint#toString', () => {

  describe('with a function', () => {
    const constraint = new Constraint.Native('positive', i => i > 0);

    it('works', () => should(constraint.toString()).equal('positive: ...'));
  });

  describe('with a regexp', () => {
    const constraint = new Constraint.Regexp('word', /[a-z]+/);

    it('works', () => should(constraint.toString()).equal('word: /[a-z]+/'));
  });

  describe('with a range', () => {

    it('works with a closed range', () => {
      const constraint = new Constraint.Range('closed', { min: 1, max: 10, min_inclusive: true, max_inclusive: true });
      return should(constraint.toString()).equal('closed: 1..10');
    });

    it('works with a open range', () => {
      const constraint = new Constraint.Range('open', { min: 1, max: 10, min_inclusive: true, max_inclusive: false });
      return should(constraint.toString()).equal('open: 1...10');
    });

    it('works with an infinite range', () => {
      const constraint = new Constraint.Range('open', { min: 1, min_inclusive: true });
      return should(constraint.toString()).equal('open: 1..');
    });
  });

  return describe('with a set function', () => {
    const constraint = new Constraint.Set('among', [1, 2, 3]);

    it('works', () => should(constraint.toString()).equal('among: { 1 2 3 }'));
  });
});
