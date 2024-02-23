import should from 'should';
import { Meta } from '../../helpers';

describe('Meta (GenericDef)', () => {

  it('works with single generic', () => {
    const info = {
      name: 'Collection',
      type: {
        seq: { elmType: { ref: { typeName: 'T' } } }
      },
      generics: ['T']
    };

    should(() => Meta.GenericDef.dress(info)).not.throw();
  })

  it('works with multiple generics', () => {
    const info = {
      name: 'Processor',
      generics: ['I', 'O'],
      type: {
        tuple: {
          heading: {
            attributes: [{
              name: 'input',
              type: {
                ref: {
                  typeName: 'I'
                }
              }
            }, {
              name: 'output',
              type: {
                ref: {
                  typeName: 'O'
                }
              }
            }]
          }
        }
      }
    };

    should(() => Meta.GenericDef.dress(info)).not.throw();
  })

});
