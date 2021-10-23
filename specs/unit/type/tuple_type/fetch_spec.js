import Attribute from '../../../../src/finitio/support/attribute';
import Heading from '../../../../src/finitio/support/heading';
import TupleType from '../../../../src/finitio/type/tuple_type';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TupleType#fetch', () => {

  const r = new Attribute('red', intType);
  const g = new Attribute('green', intType);
  const b = new Attribute('blue', intType);
  const h = new Heading([r, g, b]);
  const t = new TupleType(h);

  it('on works on an existing attribute', () => should(h.fetch('red')).equal(r));

  it('yields the block when missing', () => {
    const got = h.fetch('none', () => 12);
    return should(got).equal(12);
  });

  it('throws when no missing handler', () => {
    const l = () => h.fetch('r');
    return should(l).throw('No such attribute `r`');
  });
});
