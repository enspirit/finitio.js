import TypeDef from '../../../../src/finitio/type/type_def';
import _ from 'underscore';
import should from 'should';
import { intType } from '../../../spec_helpers';

describe('TypeDef#initialize', () => {

  it('creates a valid type', () => {
    const t = new TypeDef(intType, 'Foo');
    return should(t).be.an.instanceOf(TypeDef);
  });

  it('raises without name', () => {
    const l = () => new TypeDef(intType);
    return should(l).throw();
  });
});
