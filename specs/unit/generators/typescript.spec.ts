import {expect, default as chai} from 'chai';
import type { SinonSpy } from 'sinon';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Builder from '@enspirit/ts-gen-dsl';
import { buildType, buildTypeCollection, buildTypeDef, buildTypeInput } from '../../../src/finitio/generators/typescript';
import type { SeqTypeAst, TupleTypeAst, TypeAst } from '../../../src/types';
import { adt, collectionTDate, relation, struct, tuple } from './helpers';

chai.use(sinonChai);

describe('TypescriptBundler', () => {

  let builder: Builder;
  let withGenerics: SinonSpy;
  let withinNamespace: SinonSpy;
  let typeDef: SinonSpy;
  let object: SinonSpy;

  beforeEach(() => {
    builder = new Builder();
    withinNamespace = sinon.spy(builder, 'withinNamespace');
    withGenerics = sinon.spy(builder, 'withGenerics');
    typeDef = sinon.spy(builder, 'typeDef');
    object = sinon.spy(builder, 'object');
  })

  describe('buildTypeCollection', () => {

    it('works as expected', () => {
      buildTypeCollection(builder, [
        { name: 'Adt', type: adt },
        { name: 'Collection', type: collectionTDate, generics: ['T'] },
      ]);

      expect(object).to.have.been.calledOnceWith([
        { name: 'Adt', def: 'Type<FinitioInputs._Adt, Adt>' },
        { name: 'Collection', def: 'Type<FinitioInputs._Collection<unknown>, Collection<unknown>>' },
      ])
      expect(typeDef).to.have.been.calledOnceWith('SystemTypes')
    })

    it('accepts a system name', () => {
      buildTypeCollection(builder, [
        { name: 'Adt', type: adt },
        { name: 'Collection', type: collectionTDate, generics: ['T'] },
      ], 'MySystem');

      expect(object).to.have.been.calledOnceWith([
        { name: 'Adt', def: 'Type<FinitioInputs._Adt, Adt>' },
        { name: 'Collection', def: 'Type<FinitioInputs._Collection<unknown>, Collection<unknown>>' },
      ])
      expect(typeDef).to.have.been.calledOnceWith('MySystem')
    })

    it('handles namespaced types properly', () => {
      buildTypeCollection(builder, [
        { name: 'People.Adt', type: adt },
        { name: 'People.Collection', type: collectionTDate, generics: ['T'] },
      ]);

      expect(object).to.have.been.calledOnceWith([
        { name: 'People_Adt', def: 'Type<FinitioInputs.People._Adt, People.Adt>' },
        { name: 'People_Collection', def: 'Type<FinitioInputs.People._Collection<unknown>, People.Collection<unknown>>' },
      ])
      expect(typeDef).to.have.been.calledOnceWith('SystemTypes')
    })

  });

  describe('buildType', () => {

    const test = (ast: TypeAst, expected: string) => {
      expect(buildType(builder, ast)).to.eql(expected);
    }

    it('supports Any', () => {
      test({ any: {} }, 'any')
    })

    it('supports Builtins', () => {
      test({ builtin: { jsType: 'Boolean' } }, 'boolean')
      test({ builtin: { jsType: 'String' } }, 'string')
      test({ builtin: { jsType: 'Date' } }, 'Date')
      test({ builtin: { jsType: 'Number' } }, 'number')
    })

    it('supports Seq', () => {
      test({ seq: { elmType: { any: {} } } }, 'Array<any>')
    })

    it('supports Tuple', () => {
      buildType(builder, tuple)
      expect(object).to.be.calledOnceWith([{
        name: 'foo',
        def: 'any',
        optional: false
      }, {
        name: 'bar',
        def: 'any',
        optional: true
      }])
    })

    it('supports Struct', () => {
      const spy = sinon.spy(builder, 'tuple');

      buildType(builder, struct)
      expect(spy).to.be.calledOnceWith('any', 'string')
    })

    it('supports Sub', () => {
      test({ sub: {
        superType: { builtin: { jsType: 'String' }},
        constraints: [{
          regexp: '/a-zA-Z/'
        }]
      } }, 'string')
    })

    it('supports Ad', () => {
      test(adt, 'Date')
    })

    it('supports Union', () => {
      const spy = sinon.spy(builder, 'union');
      buildType(builder, {
        union: {
          candidates: [
            { builtin: { jsType: 'String' }},
            { builtin: { jsType: 'Number' }}
          ]
        }
      })
      expect(spy).to.have.been.calledOnceWith('string', 'number')
    })

    it('supports TypeInstantiation', () => {
      buildType(builder, {
        instantiate: {
          typeName: 'Collection',
          instantiation: ['String']
        }
      })
      expect(withGenerics).to.have.been.calledOnceWith(['String'], 'Collection')
    })

    it('supports Relation', () => {
      buildType(builder, relation)

      expect(object).to.be.calledOnceWith([{
        name: 'foo',
        def: 'any',
        optional: false
      }, {
        name: 'bar',
        def: 'any',
        optional: true
      }])

      const obj = object.lastCall.returnValue;
      expect(withGenerics).to.have.been.calledOnceWith([obj], 'Array')
    })

  })

  describe('buildTypeInput', () => {

    it('supports Ad', () => {
      expect(buildTypeInput(builder, adt)).to.eql('Date | string | number')
    })

    it('supports Any', () => {
      expect(buildType(builder, { any: {}})).to.eql('any')
    })

    it('supports Builtin', () => {
      expect(buildType(builder, { builtin: { jsType: 'String' }})).to.eql('string')
    })

    it('supports Tuple', () => {
      const tupleWithAdt: TupleTypeAst = {
        tuple: {
          heading: {
            attributes: [{
              name: 'date',
              type: adt,
            }]
          }
        }
      }
      buildTypeInput(builder, tupleWithAdt)
      expect(object).to.have.been.calledOnceWith([{
        name: 'date',
        def: 'Date | string | number',
        optional: false
      }])
    })

    it('supports Seq', () => {
      const seqWithAdt: SeqTypeAst = {
        seq: {
          elmType: adt
        }
      }
      buildTypeInput(builder, seqWithAdt)
      expect(
        buildTypeInput(builder, seqWithAdt)
      ).to.eql('Array<_Date>')
    })

    it('supports Seq within generic', () => {
      const seqWithGenerics: SeqTypeAst = {
        seq: {
          elmType: {
            ref: {
              typeName: 'T'
            }
          }
        }
      }
      buildType(builder, seqWithGenerics)
      expect(withGenerics).to.have.been.calledOnceWith(
        ['T'],
        'Array'
      )
    })

    it('supports complex cases', () => {
      console.log('->', buildTypeInput(builder, collectionTDate, ['T']))
    })
  })

  describe('buildTypeDef', () => {

    it('works on classic type definitions', () => {
      buildTypeDef(builder, {
        name: 'Foo',
        type: {
          builtin: { jsType: 'String' }
        },
      })
      expect(typeDef).to.have.been.calledOnceWith('Foo', 'string')
    });

    it('works on generic definitions', () => {
      buildTypeDef(builder, {
        name: 'Foo',
        type: {
          builtin: { jsType: 'String' }
        },
        generics: ['T']
      })

      expect(withGenerics).to.have.been.calledOnceWith(['T'])
      expect(typeDef).to.have.been.calledOnceWith('Foo<T>', 'string')
    });

    it('detects namespacing and acts accordingly', () => {
      buildTypeDef(builder, {
        name: 'Foo.Bar.Baz',
        type: {
          builtin: { jsType: 'String' }
        },
      })

      expect(withinNamespace).to.have.been.calledOnceWith('Foo.Bar');
      expect(typeDef).to.have.been.calledOnceWith('Baz', 'string');
    })

  })

});
