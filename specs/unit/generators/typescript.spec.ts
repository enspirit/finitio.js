import { expect } from 'chai';
import Builder from '@enspirit/ts-gen-dsl';
import type { NameResolver, Scope } from '../../../src/finitio/generators/typescript';
import {
  buildBrandHelper, buildDoc, buildJsTypesInterface, buildLiteralUnion, buildRef,
  buildType, buildTypeCollection, buildTypeDef, buildTypeDefInput, createCtx,
  emptyScope, joinNames, metadataOf, systemNamespaces, systemSlug, tsOverride,
  typeNameInput, urlDigest, withNamespace,
} from '../../../src/finitio/generators/typescript';
import type { ConstraintAst, TypeAst } from '../../../src/types';
import { adt, collectionTDate, opaqueAdt, relation, seqOfGeneric, struct, tuple } from './helpers';

//
// A resolver standing for a system that knows `Date` and `Person`, and emits
// its types at the top level.
//
const resolver: NameResolver = (name, mode) => {
  if (!['Date', 'Person', 'Collection'].includes(name)) { return undefined; }
  return mode === 'dressed' ? name : `FinitioInputs.${typeNameInput(name)}`;
};

const scope = (overrides: Partial<Scope> = {}): Scope =>
  emptyScope({ resolveName: resolver, ...overrides });

describe('generators/typescript', () => {

  let builder: Builder;

  beforeEach(() => {
    builder = new Builder({ exportTypes: true, exportNamespaces: true });
  });

  describe('typeNameInput', () => {

    it('prefixes a plain name', () => {
      expect(typeNameInput('Person')).to.eql('_Person');
    });

    it('prefixes the last part of a namespaced name only', () => {
      expect(typeNameInput('People.Contact.Adult')).to.eql('People.Contact._Adult');
    });

  });

  describe('joinNames', () => {

    it('skips the empty parts', () => {
      expect(joinNames('', 'FinitioInputs', '_Main')).to.eql('FinitioInputs._Main');
      expect(joinNames(undefined, 'Main')).to.eql('Main');
      expect(joinNames('FinitioSystem1', 'People._Adult')).to.eql('FinitioSystem1.People._Adult');
    });

  });

  describe('withNamespace', () => {

    it('yields the builder itself on a plain name', () => {
      withNamespace(builder, 'Main', (b, name) => {
        expect(b).to.equal(builder);
        expect(name).to.eql('Main');
      });
    });

    it('yields a namespace builder on a dotted name', () => {
      withNamespace(builder, 'A.B.Main', (b, name) => {
        expect(b).not.to.equal(builder);
        expect(name).to.eql('Main');
        b.addToken(b.typeDef(name, 'string'));
      });

      expect(builder.flush()).to.eql([
        'export namespace A.B {',
        '  export type Main = string;',
        '}',
      ].join('\n'));
    });

  });

  describe('buildRef', () => {

    it('leaves a type parameter in scope untouched', () => {
      const ctx = createCtx(builder, { generics: new Set(['T']), resolveName: resolver });
      expect(buildRef(ctx, 'T')).to.eql('T');
    });

    it('leaves it untouched in input mode too', () => {
      const ctx = createCtx(builder, {
        mode: 'input', generics: new Set(['T']), resolveName: resolver,
      });
      expect(buildRef(ctx, 'T')).to.eql('T');
    });

    it('delegates to the resolver', () => {
      expect(buildRef(createCtx(builder, { resolveName: resolver }), 'Person'))
        .to.eql('Person');
      expect(buildRef(createCtx(builder, { mode: 'input', resolveName: resolver }), 'Person'))
        .to.eql('FinitioInputs._Person');
    });

    it('falls back on the name itself when unknown', () => {
      expect(buildRef(createCtx(builder, { resolveName: resolver }), 'Nope'))
        .to.eql('Nope');
    });

  });

  describe('buildType, dressed', () => {

    const test = (ast: TypeAst, expected: string, generics: Array<string> = []) => {
      const ctx = createCtx(builder, {
        resolveName: resolver,
        generics: new Set(generics),
      });
      expect(buildType(ctx, ast)).to.eql(expected);
    };

    it('supports Any', () => {
      test({ any: {} }, 'any');
    });

    it('supports Builtins', () => {
      test({ builtin: { jsType: 'Boolean' } }, 'boolean');
      test({ builtin: { jsType: 'String' } }, 'string');
      test({ builtin: { jsType: 'Number' } }, 'number');
    });

    it('qualifies global js types, which a schema may well shadow', () => {
      test({ builtin: { jsType: 'Date' } }, 'globalThis.Date');
      test({ builtin: { jsType: 'RegExp' } }, 'globalThis.RegExp');
    });

    it('supports Seq', () => {
      test({ seq: { elmType: { any: {} } } }, 'Array<any>');
    });

    it('supports Set, which dresses to an Array', () => {
      test({ set: { elmType: { builtin: { jsType: 'String' } } } }, 'Array<string>');
    });

    it('supports Tuple', () => {
      test(tuple, '{\n  foo: any;\n  bar?: any;\n}');
    });

    it('supports Relation', () => {
      test(relation, 'Array<{\n  foo: any;\n  bar?: any;\n}>');
    });

    it('supports Struct', () => {
      test(struct, '[any, string]');
    });

    it('supports Sub, which is its super type', () => {
      test({ sub: {
        superType: { builtin: { jsType: 'String' } },
        constraints: [{ regexp: '/a-zA-Z/' }],
      } }, 'string');
    });

    it('supports Union', () => {
      test({ union: { candidates: [
        { builtin: { jsType: 'String' } },
        { builtin: { jsType: 'Number' } },
      ] } }, 'string | number');
    });

    it('supports Ad, which dresses to its js type', () => {
      test(adt, 'globalThis.Date');
    });

    it('supports TypeInstantiation', () => {
      test({ instantiate: { typeName: 'Collection', instantiation: ['Person'] } },
        'Collection<Person>');
    });

    it('does not rename the type parameters in scope', () => {
      test(seqOfGeneric, 'Array<T>', ['T']);
    });

    it('resolves a reference that is not a type parameter', () => {
      test({ seq: { elmType: { ref: { typeName: 'Person' } } } }, 'Array<Person>');
    });

  });

  describe('buildType, input', () => {

    const test = (ast: TypeAst, expected: string, generics: Array<string> = []) => {
      const ctx = createCtx(builder, {
        mode: 'input',
        resolveName: resolver,
        generics: new Set(generics),
      });
      expect(buildType(ctx, ast)).to.eql(expected);
    };

    it('supports Ad, as a union with its contracts information types', () => {
      test(adt, 'globalThis.Date | string | number');
    });

    it('stays on the input side through a Sub', () => {
      test({ sub: {
        superType: { ref: { typeName: 'Person' } },
        constraints: [{ native: ['p', 'p.age > 18'] }],
      } }, 'FinitioInputs._Person');
    });

    it('stays on the input side through a Seq', () => {
      test({ seq: { elmType: { ref: { typeName: 'Person' } } } },
        'Array<FinitioInputs._Person>');
    });

    it('stays on the input side through a Tuple', () => {
      test({ tuple: { heading: { attributes: [
        { name: 'date', type: { ref: { typeName: 'Date' } } },
      ] } } }, '{\n  date: FinitioInputs._Date;\n}');
    });

    it('stays on the input side through a TypeInstantiation', () => {
      test({ instantiate: { typeName: 'Collection', instantiation: ['Person'] } },
        'FinitioInputs._Collection<FinitioInputs._Person>');
    });

    it('does not rename the type parameters in scope', () => {
      test(collectionTDate,
        '{\n  items: Array<T>;\n  lastUpdate: FinitioInputs._Date;\n}',
        ['T']);
    });

  });

  describe('buildJsType', () => {

    it('routes an unknown js type through the FinitioJsTypes interface', () => {
      const jsTypes = new Set<string>();
      const ctx = createCtx(builder, { jsTypes });

      expect(buildType(ctx, opaqueAdt)).to.eql("FinitioJsTypes['Field']");
      expect([...jsTypes]).to.eql(['Field']);
    });

    it('does not collect the ones it can name', () => {
      const jsTypes = new Set<string>();
      buildType(createCtx(builder, { jsTypes }), adt);

      expect([...jsTypes]).to.eql([]);
    });

  });

  describe('buildTypeDef', () => {

    it('works on plain definitions', () => {
      buildTypeDef(builder, { name: 'Foo', type: { builtin: { jsType: 'String' } } }, scope());

      expect(builder.flush()).to.eql('export type Foo = string;');
    });

    it('works on generic definitions', () => {
      buildTypeDef(builder, {
        name: 'Foo',
        type: seqOfGeneric,
        generics: ['T'],
      }, scope());

      expect(builder.flush()).to.eql('export type Foo<T> = Array<T>;');
    });

    it('detects namespacing and acts accordingly', () => {
      buildTypeDef(builder, {
        name: 'Foo.Bar.Baz',
        type: { builtin: { jsType: 'String' } },
      }, scope());

      expect(builder.flush()).to.eql([
        'export namespace Foo.Bar {',
        '  export type Baz = string;',
        '}',
      ].join('\n'));
    });

    it('honours the scope namespace prefix', () => {
      buildTypeDef(builder, {
        name: 'Foo',
        type: { builtin: { jsType: 'String' } },
      }, scope({ nsPrefix: 'FinitioSystem1' }));

      expect(builder.flush()).to.eql([
        'export namespace FinitioSystem1 {',
        '  export type Foo = string;',
        '}',
      ].join('\n'));
    });

  });

  describe('buildTypeDefInput', () => {

    it('emits under the inputs namespace', () => {
      buildTypeDefInput(builder, { name: 'Foo', type: adt }, scope());

      expect(builder.flush()).to.eql([
        'export namespace FinitioInputs {',
        '  export type _Foo = globalThis.Date | string | number;',
        '}',
      ].join('\n'));
    });

    it('keeps namespacing under the inputs namespace', () => {
      buildTypeDefInput(builder, {
        name: 'People.Adult',
        type: { ref: { typeName: 'Person' } },
      }, scope());

      expect(builder.flush()).to.eql([
        'export namespace FinitioInputs.People {',
        '  export type _Adult = FinitioInputs._Person;',
        '}',
      ].join('\n'));
    });

    it('honours the scope namespace prefix', () => {
      buildTypeDefInput(builder, {
        name: 'Foo',
        type: { builtin: { jsType: 'String' } },
      }, scope({ nsPrefix: 'FinitioSystem1' }));

      expect(builder.flush()).to.eql([
        'export namespace FinitioSystem1.FinitioInputs {',
        '  export type _Foo = string;',
        '}',
      ].join('\n'));
    });

  });

  describe('buildTypeCollection', () => {

    it('pairs the input and dressed type of every definition', () => {
      buildTypeCollection(builder, [
        { name: 'Person', type: tuple },
      ], 'System0', scope());

      expect(builder.flush()).to.eql([
        'export type System0 = {',
        '  Person: FinitioTypes.Type<FinitioInputs._Person, Person>;',
        '};',
      ].join('\n'));
    });

    it('accepts a system name', () => {
      buildTypeCollection(builder, [{ name: 'Person', type: tuple }], 'MySystem', scope());

      expect(builder.flush()).to.contain('export type MySystem = {');
    });

    it('quotes a namespaced name, which is how the system indexes it', () => {
      buildTypeCollection(builder, [
        { name: 'People.Adult', type: tuple },
      ], 'System0', scope());

      expect(builder.flush()).to.eql([
        'export type System0 = {',
        "  'People.Adult': FinitioTypes.Type<FinitioInputs.People._Adult, People.Adult>;",
        '};',
      ].join('\n'));
    });

    it('instantiates generics with unknown', () => {
      buildTypeCollection(builder, [
        { name: 'Collection', type: collectionTDate, generics: ['T'] },
      ], 'System0', scope());

      expect(builder.flush()).to.eql([
        'export type System0 = {',
        '  Collection: FinitioTypes.Type<FinitioInputs._Collection<unknown>, Collection<unknown>>;',
        '};',
      ].join('\n'));
    });

    it('is emitted inside the scope namespace, like the types it collects', () => {
      buildTypeCollection(builder, [
        { name: 'Person', type: tuple },
      ], 'SystemTypes', scope({
        nsPrefix: 'FinitioImports.People',
        resolveName: (name, mode) => mode === 'dressed'
          ? `FinitioImports.People.${name}`
          : `FinitioImports.People.FinitioInputs.${typeNameInput(name)}`,
      }));

      expect(builder.flush()).to.eql([
        'export namespace FinitioImports.People {',
        '  export type SystemTypes = {',
        '    Person: FinitioTypes.Type<FinitioImports.People.FinitioInputs._Person, FinitioImports.People.Person>;',
        '  };',
        '}',
      ].join('\n'));
    });

  });

  describe('buildJsTypesInterface', () => {

    it('is empty when the schema names no opaque js type', () => {
      expect(buildJsTypesInterface(builder, new Set())).to.eql('');
    });

    it('declares one unknown member per js type, sorted', () => {
      expect(buildJsTypesInterface(builder, new Set(['Zeta', 'Field']))).to.contain(
        'interface FinitioJsTypes {\n  Field: unknown;\n  Zeta: unknown;\n}'
      );
    });

  });


  describe('buildDoc', () => {

    it('is undefined without a description', () => {
      expect(buildDoc(builder, undefined)).to.eql(undefined);
      expect(buildDoc(builder, { ts: 'string' })).to.eql(undefined);
    });

    it('renders a description as TSDoc', () => {
      expect(buildDoc(builder, { description: 'A person' })).to.eql('/** A person */');
    });

    it('keeps a multi-line description on several lines', () => {
      expect(buildDoc(builder, { description: 'A person\nin the system' }))
        .to.eql('/**\n * A person\n * in the system\n */');
    });

    it('does not let a description close the comment', () => {
      expect(buildDoc(builder, { description: 'ends */ here' }))
        .to.eql('/** ends *\\/ here */');
    });

  });

  describe('metadataOf / tsOverride', () => {

    it('reads the metadata a type carries', () => {
      expect(metadataOf({ any: { metadata: { ts: 'null' } } })).to.eql({ ts: 'null' });
      expect(metadataOf({ any: {} })).to.eql(undefined);
      expect(metadataOf({ ref: { typeName: 'T' } })).to.eql(undefined);
    });

    it('lets a schema name its own typescript type', () => {
      const ctx = createCtx(builder);
      expect(tsOverride(ctx, { ts: 'null' })).to.eql('null');
      expect(tsOverride(ctx, { description: 'nope' })).to.eql(undefined);
    });

    it('takes tsInput over ts on the input side only', () => {
      const meta = { ts: 'Date', tsInput: 'string' };
      expect(tsOverride(createCtx(builder), meta)).to.eql('Date');
      expect(tsOverride(createCtx(builder, { mode: 'input' }), meta)).to.eql('string');
    });

    it('is honoured by buildType', () => {
      const ctx = createCtx(builder);
      expect(buildType(ctx, { any: { metadata: { ts: 'null' } } })).to.eql('null');
    });

  });

  describe('buildLiteralUnion', () => {

    const union = (constraints: Array<ConstraintAst>) =>
      buildLiteralUnion(createCtx(builder), constraints);

    it('is undefined without a set constraint', () => {
      expect(union([{ regexp: '/a/' }])).to.eql(undefined);
      expect(union([])).to.eql(undefined);
    });

    it('renders a set of scalars as a literal union', () => {
      expect(union([{ set: ['red', 'blue'] }])).to.eql('"red" | "blue"');
      expect(union([{ set: [1, 2] }])).to.eql('1 | 2');
      expect(union([{ set: [true] }])).to.eql('true');
    });

    it('keeps falsy members', () => {
      expect(union([{ set: [0, false, ''] }])).to.eql('0 | false | ""');
    });

    it('gives up on a set of non scalars', () => {
      expect(union([{ set: [[1, 2]] }])).to.eql(undefined);
      expect(union([{ set: [] }])).to.eql(undefined);
    });

    it('is what buildType uses for a sub type', () => {
      const ctx = createCtx(builder);
      expect(buildType(ctx, { sub: {
        superType: { builtin: { jsType: 'String' } },
        constraints: [{ set: ['a'] }],
      } })).to.eql('"a"');
    });

  });

  describe('allowExtra', () => {

    const heading = (allowExtra?: TypeAst) => ({
      tuple: {
        heading: {
          attributes: [{ name: 'name', type: { builtin: { jsType: 'String' } } }],
          ...(allowExtra ? { options: { allowExtra } } : {}),
        },
      },
    } as TypeAst);

    it('adds an index signature for a typed `...`', () => {
      // It has to admit the declared attributes too, or nothing inhabits the
      // type: `{ name: string } & { [k: string]: number }` rejects
      // `{ name: 'a', age: 42 }`, which finitio dresses happily.
      const expected = '{\n  name: string;\n  [k: string]: number | string;\n}';
      expect(buildType(createCtx(builder), heading({ builtin: { jsType: 'Number' } })))
        .to.eql(expected);
      expect(buildType(createCtx(builder, { mode: 'input' }), heading({ builtin: { jsType: 'Number' } })))
        .to.eql(expected);
    });

    it('drops the extras of a bare `...` when dressing', () => {
      expect(buildType(createCtx(builder), heading({ any: {} })))
        .to.eql('{\n  name: string;\n}');
    });

    it('still accepts them as input', () => {
      expect(buildType(createCtx(builder, { mode: 'input' }), heading({ any: {} })))
        .to.eql('{\n  name: string;\n  [k: string]: unknown;\n}');
    });

    it('adds none without a `...`', () => {
      expect(buildType(createCtx(builder), heading())).to.eql('{\n  name: string;\n}');
    });

  });

  describe('anyAs', () => {

    it('maps Any onto any by default', () => {
      expect(buildType(createCtx(builder), { any: {} })).to.eql('any');
    });

    it('maps it onto unknown on demand', () => {
      const ctx = createCtx(builder, { options: { brands: false, anyAs: 'unknown' } });
      expect(buildType(ctx, { any: {} })).to.eql('unknown');
    });

  });

  describe('brands', () => {

    const branded = (overrides = {}) =>
      scope({ options: { brands: true, anyAs: 'any' }, ...overrides });

    const sub: TypeAst = {
      sub: {
        superType: { builtin: { jsType: 'Number' } },
        constraints: [{ native: ['i', 'i > 0'] }],
      },
    };

    it('makes a constrained sub type nominal', () => {
      const s = branded();
      buildTypeDef(builder, { name: 'Positive', type: sub }, s);

      expect(builder.flush()).to.eql('export type Positive = FinitioBrand<number, "Positive">;');
      expect([...s.brands]).to.eql(['Positive']);
    });

    it('leaves the input side alone', () => {
      buildTypeDefInput(builder, { name: 'Positive', type: sub }, branded());

      expect(builder.flush()).to.contain('export type _Positive = number;');
    });

    it('does not brand a set constraint, which is precise already', () => {
      const s = branded();
      buildTypeDef(builder, { name: 'Colour', type: {
        sub: {
          superType: { builtin: { jsType: 'String' } },
          constraints: [{ set: ['red'] }],
        },
      } }, s);

      expect(builder.flush()).to.eql('export type Colour = "red";');
      expect([...s.brands]).to.eql([]);
    });

    it('does not brand what constrains nothing', () => {
      const s = branded();
      buildTypeDef(builder, { name: 'Name', type: { builtin: { jsType: 'String' } } }, s);

      expect(builder.flush()).to.eql('export type Name = string;');
      expect([...s.brands]).to.eql([]);
    });

    it('brands nothing when off', () => {
      const s = scope();
      buildTypeDef(builder, { name: 'Positive', type: sub }, s);

      expect(builder.flush()).to.eql('export type Positive = number;');
      expect([...s.brands]).to.eql([]);
    });

    //
    // `ts:` is the schema stating its TypeScript type outright. A brand is an
    // intersection, and there is no telling that the stated type can carry
    // one: the stdlib's `Nil` is `ts: "null"`, and `null & {...}` is `never`,
    // which drops the type out of every union it sits in.
    //
    it('does not brand what the schema typed itself', () => {
      const s = branded();
      buildTypeDef(builder, {
        name: 'Nil',
        type: { sub: { superType: { any: {} }, constraints: [{ native: ['v', 'v === null'] }] } },
        metadata: { ts: 'null' },
      }, s);

      expect(builder.flush()).to.eql('export type Nil = null;');
      expect([...s.brands]).to.eql([]);
    });

    it('does not brand a sub type of Any, where the intersection collapses', () => {
      const s = branded();
      buildTypeDef(builder, {
        name: 'Whatever',
        type: { sub: { superType: { any: {} }, constraints: [{ native: ['v', 'v !== undefined'] }] } },
      }, s);

      expect(builder.flush()).to.eql('export type Whatever = any;');
      expect([...s.brands]).to.eql([]);
    });

    it('follows a chain of sub types down to its foot', () => {
      const s = branded();
      buildTypeDef(builder, {
        name: 'Narrower',
        type: {
          sub: {
            superType: { sub: { superType: { any: {} }, constraints: [{ native: ['v', 'v'] }] } },
            constraints: [{ native: ['v', 'v !== null'] }],
          },
        },
      }, s);

      expect(builder.flush()).to.eql('export type Narrower = any;');
      expect([...s.brands]).to.eql([]);
    });

    //
    // Two systems of a bundle may well both define a `Positive`. An
    // unqualified brand would make them the same nominal type, which is the
    // very confusion brands exist to deny.
    //
    it('qualifies the brand with the namespace the definition is emitted under', () => {
      const s = branded({ nsPrefix: 'FinitioImports.Data' });
      buildTypeDef(builder, { name: 'Positive', type: sub }, s);

      expect(builder.flush()).to.contain(
        'export type Positive = FinitioBrand<number, "FinitioImports.Data.Positive">;'
      );
      expect([...s.brands]).to.eql(['FinitioImports.Data.Positive']);
    });

  });

  describe('buildBrandHelper', () => {

    it('is empty when nothing got branded', () => {
      expect(buildBrandHelper(new Set())).to.eql('');
    });

    it('declares a brand that composes', () => {
      expect(buildBrandHelper(new Set(['Positive']))).to.contain(
        'export type FinitioBrand<T, N extends string> =\n' +
        '  unknown extends T ? T\n' +
        '  : T extends null|undefined ? T\n' +
        '  : T & { readonly __finitio: { [K in N]: true } };'
      );
    });

    // A brand is an intersection, and `null & {...}` is `never` -- which would
    // not merely lose the brand but drop the type out of every union it sits
    // in. The helper is conditional so that such a type passes through.
    it('passes a type that cannot carry a brand through untouched', () => {
      expect(buildBrandHelper(new Set(['Positive']))).to.contain('T extends null|undefined ? T');
    });

  });


  describe('systemSlug', () => {

    it('derives a namespace from the last url segment', () => {
      expect(systemSlug('http://finitio.io/0.4/stdlib/data')).to.eql('Data');
      expect(systemSlug('file://specs/fixtures/people.fio')).to.eql('People');
    });

    it('pascal cases what is not one word', () => {
      expect(systemSlug('file://a/my-little-schema.fio')).to.eql('MyLittleSchema');
      expect(systemSlug('file://a/order_lines.fio')).to.eql('OrderLines');
    });

    it('always yields something that can start an identifier', () => {
      expect(systemSlug('file://a/404.fio')).to.eql('S404');
    });

    it('copes with a trailing slash', () => {
      expect(systemSlug('http://example.org/schemas/')).to.eql('Schemas');
    });

  });

  describe('systemNamespaces', () => {

    const data = 'http://finitio.io/0.4/stdlib/data';
    const people = 'file://a/people.fio';
    const other = 'file://b/people.fio';

    it('leaves the entry system at the top level', () => {
      expect(systemNamespaces(['file://a/main.fio', data]).get('file://a/main.fio'))
        .to.eql('');
    });

    it('namespaces the imported ones', () => {
      const ns = systemNamespaces(['file://a/main.fio', data, people]);
      expect(ns.get(data)).to.eql('FinitioImports.Data');
      expect(ns.get(people)).to.eql('FinitioImports.People');
    });

    it('does not depend on the order the imports are reached in', () => {
      const one = systemNamespaces(['file://a/main.fio', data, people]);
      const two = systemNamespaces(['file://a/main.fio', people, data]);

      expect(one.get(data)).to.eql(two.get(data));
      expect(one.get(people)).to.eql(two.get(people));
    });

    it('disambiguates two systems whose urls end the same, by digest', () => {
      const ns = systemNamespaces(['file://a/main.fio', people, other]);

      expect(ns.get(people)).to.eql(`FinitioImports.People_${urlDigest(people)}`);
      expect(ns.get(other)).to.eql(`FinitioImports.People_${urlDigest(other)}`);
      expect(ns.get(people)).not.to.eql(ns.get(other));
    });

    it('so that adding a third never renames the first two', () => {
      const two = systemNamespaces(['file://a/main.fio', people, other]);
      const three = systemNamespaces(['file://a/main.fio', people, other, 'file://c/people.fio']);

      expect(three.get(people)).to.eql(two.get(people));
      expect(three.get(other)).to.eql(two.get(other));
    });

  });


  describe('Array, which the generator emits itself', () => {

    const seq: TypeAst = { seq: { elmType: { builtin: { jsType: 'String' } } } };

    it('is the global when nothing shadows it', () => {
      expect(buildType(createCtx(builder), seq)).to.eql('Array<string>');
    });

    it('is qualified when the schema defines a type of that name', () => {
      const ctx = createCtx(builder, {
        resolveName: (name) => name === 'Array' ? 'Array' : undefined,
      });
      expect(buildType(ctx, seq)).to.eql('globalThis.Array<string>');
    });

    it('is qualified when a type parameter takes that name', () => {
      const ctx = createCtx(builder, { generics: new Set(['Array']) });
      expect(buildType(ctx, seq)).to.eql('globalThis.Array<string>');
    });

    it('covers sets and relations too', () => {
      const ctx = createCtx(builder, { generics: new Set(['Array']) });
      expect(buildType(ctx, { set: { elmType: { any: {} } } }))
        .to.eql('globalThis.Array<any>');
      expect(buildType(ctx, relation)).to.contain('globalThis.Array<{');
    });

  });

  describe('an ADT without a `.JsType` preamble', () => {

    // The parser makes every contract of such an ADT an identity, and leaves
    // `jsType` undefined. It used to reach `buildJsType`, which emitted
    // `FinitioJsTypes['undefined']` and an interface member with no name.
    const identity: TypeAst = {
      adt: {
        contracts: [
          { name: 'pair', identity: {}, infoType: { builtin: { jsType: 'String' } } },
        ],
      },
    };

    it('is its information type, on both sides', () => {
      expect(buildType(createCtx(builder), identity)).to.eql('string');
      expect(buildType(createCtx(builder, { mode: 'input' }), identity)).to.eql('string');
    });

    it('unions several of them', () => {
      const two: TypeAst = {
        adt: {
          contracts: [
            { name: 'text', identity: {}, infoType: { builtin: { jsType: 'String' } } },
            { name: 'num', identity: {}, infoType: { builtin: { jsType: 'Number' } } },
          ],
        },
      };
      expect(buildType(createCtx(builder), two)).to.eql('string | number');
    });

    it('names no js type', () => {
      const jsTypes = new Set<string>();
      buildType(createCtx(builder, { jsTypes }), identity);
      expect([...jsTypes]).to.eql([]);
    });

  });

});
