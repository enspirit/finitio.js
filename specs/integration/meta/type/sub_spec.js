import { Meta, should, intType } from '../../helpers';

describe('Meta (Sub)', () => {

  const typedef = constraint => ({
    superType: { builtin: { jsType: String } },
    constraints: [constraint],
  });

  it('dresses as expected on a native constraint', () => {
    const info = typedef({ name: 'min', native() {} });
    return should(() => Meta.SubType.dress(info)).not.throw();
  });

  it('dresses as expected on a function reference native constraint', () => {
    const info = typedef({ name: 'even', native: '_.isEven' });
    const world = { _: { isEven(s) { return (s % 2) === 0; } } };
    return should(() => Meta.SubType.dress(info, world)).not.throw();
  });

  it('dresses as expected on a regexp constraint', () => {
    const info = typedef({ name: 'matches', regexp: '[a-z]+' });
    return should(() => Meta.SubType.dress(info)).not.throw();
  });

  it('dresses as expected on a range constraint', () => {
    const info = typedef({ name: 'within', range: { min: 1, max: 10, min_inclusive: true, max_inclusive: true } });
    return should(() => Meta.SubType.dress(info)).not.throw();
  });

  it('dresses as expected on a open range constraint', () => {
    const info = typedef({ name: 'within', range: { min: 1, min_inclusive: true } });
    return should(() => Meta.SubType.dress(info)).not.throw();
  });

  it('dresses as expected on a set constraint', () => {
    const info = typedef({ name: 'set', set: [1, 2, 3] });
    return should(() => Meta.SubType.dress(info)).not.throw();
  });
});
