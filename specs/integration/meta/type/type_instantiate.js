import should from 'should';
import { Meta } from '../../helpers';

describe('Meta (TypeInstantiate)', () => {

  it('works with single generic', () => {
    const info = {
      typeName: 'Collection',
      instantiation: ['T']
    }
    should(() => Meta.TypeInstantiate.dress(info)).not.throw();
  })

  it('works with multiple generics', () => {
    const info = {
      typeName: 'Processor',
      instantiation: ['I', 'O']
    }
    should(() => Meta.TypeInstantiate.dress(info)).not.throw();
  })

  it('complains when not provided with instantiation', () => {
    should(() => Meta.TypeInstantiate.dress({ typeName: 'Collection' }))
      .throw(/Invalid TypeInstantiate/)

    should(() => Meta.TypeInstantiate.dress({
      typeName: 'Collection',
      instantiation: []
     })).throw(/Invalid TypeInstantiate/)
  })

});
