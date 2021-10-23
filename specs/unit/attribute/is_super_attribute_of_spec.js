import Attribute from '../../../src/finitio/support/attribute';
import should from 'should';
import { intType, floatType, byteType } from '../../spec_helpers';

describe('Attribute#isSuperAttributeOf', () => {

  it('recognizes if same', () => {
    const x = new Attribute('red', intType);
    const y = new Attribute('red', intType);
    return should(x.isSuperAttributeOf(y)).equal(true);
  });

  it('recognizes if subtype', () => {
    const x = new Attribute('red', intType);
    const y = new Attribute('red', byteType);
    return should(x.isSuperAttributeOf(y)).equal(true);
  });

  it('distinguishes if supertype', () => {
    const x = new Attribute('red', byteType);
    const y = new Attribute('red', intType);
    return should(x.isSuperAttributeOf(y)).equal(false);
  });

  it('distinguishes by name', () => {
    const x = new Attribute('red', intType);
    const y = new Attribute('blue', intType);
    return should(x.isSuperAttributeOf(y)).equal(false);
  });

  it('recognizes optional over required', () => {
    const x = new Attribute('red', intType, false);
    const y = new Attribute('red', intType, true);
    return should(x.isSuperAttributeOf(y)).equal(true);
  });

  it('distinguishes required over optional', () => {
    const x = new Attribute('red', intType, true);
    const y = new Attribute('red', intType, false);
    return should(x.isSuperAttributeOf(y)).equal(false);
  });
});
