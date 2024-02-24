import type Builder from '@enspirit/ts-gen-dsl';
import type {
  AdTypeAst, BuiltinTypeAst, SeqTypeAst, SetTypeAst, StructTypeAst,
  SubTypeAst, TupleTypeAst, TypeAst, TypeDefAst, TypeRefTypeAst, UnionTypeAst,
  TypeInstantiationAst,
  RelationTypeAst
} from '../parser';
import { Type } from '../parser';

const InputNamespaceName = 'FinitioInputs'

export const typeNameInput = (n: string) => {
  const parts = n.split('.').reverse();
  parts[0] = `_${parts[0]}`;
  return parts.reverse().join('.');
}

export const _nsWhenNecessary = (builder: Builder, name: string, cb: (b: Builder, n: string) => void) => {
  const typeDefNameParts = name.split('.');
  if (typeDefNameParts.length === 1) {
    cb(builder, name)
  } else {
    // namespacing
    const [typeDefName, ...nsParts] = [...typeDefNameParts].reverse();
    builder.withinNamespace(nsParts.reverse().join('.'), (builder) => {
      cb(builder, typeDefName)
    })
  }
}

export const buildTypeDef = (builder: Builder, typeDef: TypeDefAst) => {
  const go = (b: Builder, name: string) => {
    if (typeDef.generics) {
      name = b.withGenerics(typeDef.generics, name)
    }

    b.addToken(
      builder.typeDef(name, buildType(builder, typeDef.type))
    )
  }

  _nsWhenNecessary(builder, typeDef.name, go)
}

export const buildTypeDefInput = (builder: Builder, typeDef: TypeDefAst) => {
  const fqTypeName = `${InputNamespaceName}.${typeNameInput(typeDef.name)}`;

  _nsWhenNecessary(builder, fqTypeName, (builder, name) => {
    const type: string = buildTypeInput(builder, typeDef.type, typeDef.generics) || typeDef.name;
    if (typeDef.generics) {
      name = builder.withGenerics(typeDef.generics, name)
    }

    builder.addToken(builder.typeDef(name, type));
  })
}

export const buildTypeInput = (builder: Builder, type: TypeAst, withinGenerics?: Array<string>): string|undefined => {
  const typeType = Object.keys(type)[0] as Type

  switch (typeType) {
    case Type.Ad:
      const adtType = (type as AdTypeAst);
      const union: UnionTypeAst = {
        union: {
          candidates: [
            adtType,
            ...adtType.adt.contracts.map(c => {
              return c.infoType
            })
          ]
        }
      };
      return buildType(builder, union, withinGenerics, buildType, typeNameInput);

    case Type.Seq:
      return builder.withGenerics(
        [buildType(builder, (type as SeqTypeAst).seq.elmType, withinGenerics, buildType, typeNameInput)],
        'Array'
        )

    case Type.TypeRef:
      const typeName = (type as TypeRefTypeAst).ref.typeName;
      return withinGenerics?.includes(typeName)
        ? typeName
        : `${InputNamespaceName}.${typeNameInput(typeName)}`

    case Type.TypeInstantiation:
      const ti = (type as TypeInstantiationAst).instantiate;
      return builder.withGenerics(
        ti.instantiation.map(n => `${InputNamespaceName}.${typeNameInput(n)}`),
        `${InputNamespaceName}.${typeNameInput(ti.typeName)}`
      )

    case Type.Sub:
      return buildType(builder, (type as SubTypeAst).sub.superType, withinGenerics, buildTypeInput)

    case Type.Builtin:
    case Type.Any:
    case Type.Tuple:
    case Type.Relation:
    case Type.Set:
    case Type.Struct:
    case Type.Union:
      return buildType(builder, type, withinGenerics, buildTypeInput)
  }
}

export type NamerFunc = (s: string) => string

export const buildType = (builder: Builder, type: TypeAst, withinGenerics?: Array<string>, buildTypeFn = buildType, namer: NamerFunc = (s) => s): string => {
  const typeType = Object.keys(type)[0] as Type

  switch (typeType) {
    case Type.Any:
      return namer('any')

    case Type.Builtin:
      return builder.type(
        namer((type as BuiltinTypeAst).builtin.jsType)
      )

    case Type.TypeRef:
      return namer((type as TypeRefTypeAst).ref.typeName)

    case Type.Seq:
      return builder.withGenerics(
        [buildTypeFn(builder, (type as SeqTypeAst).seq.elmType, withinGenerics, buildTypeFn)],
        'Array'
      )

    case Type.Tuple:
      return builder.object(
        (type as TupleTypeAst).tuple.heading.attributes.map(a => ({
          name: a.name,
          def: buildTypeFn(builder, a.type, withinGenerics, buildTypeFn),
          optional: a.required === false
        }))
      )

    case Type.Struct:
      const types = (type as StructTypeAst).struct.componentTypes.map((t) => {
        return buildTypeFn(builder, t, withinGenerics, buildTypeFn)
      })
      return builder.tuple(...types)

    case Type.Set:
      return builder.withGenerics(
        [buildTypeFn(builder, (type as SetTypeAst).set.elmType, withinGenerics, buildTypeFn)],
        'Set'
      )

    case Type.Sub:
      return buildTypeFn(builder, (type as SubTypeAst).sub.superType, withinGenerics, buildTypeFn)

    case Type.Ad:
      return builder.type(
        namer((type as AdTypeAst).adt.jsType)
      )

    case Type.Union:
      const options = (type as UnionTypeAst).union
        .candidates.map(c => buildTypeFn(builder, c, withinGenerics, buildTypeFn));
      return builder.union(...options)

    case Type.TypeInstantiation:
      const ti = (type as TypeInstantiationAst).instantiate;
      return builder.withGenerics(
        ti.instantiation,
        namer(ti.typeName)
      )

    case Type.Relation:
      return builder.withGenerics(
        [builder.object(
          (type as RelationTypeAst).relation.heading.attributes.map(a => ({
            name: a.name,
            def: buildTypeFn(builder, a.type, withinGenerics, buildTypeFn),
            optional: a.required === false
          }))
        )],
        'Array'
      )
  }
}

export const buildTypeCollection = (builder: Builder, types: Array<TypeDefAst>, systemName: string = 'SystemTypes') => {
  const collection = builder.typeDef(systemName, builder.object(types.map(t => {

    // instantiate generics with unknown
    const generics = t.generics ? t.generics.map(() => 'unknown') : undefined;

    const dressedName = generics
      ? builder.withGenerics(generics, t.name)
      : t.name;

    const inputName = generics
      ? builder.withGenerics(generics, `${InputNamespaceName}.${typeNameInput(t.name)}`)
      : `${InputNamespaceName}.${typeNameInput(t.name)}`

    return {
      name: t.name.replace(/\W/g, '_'),
      def: `Type<${inputName}, ${dressedName}>`
    }
  })));

  return builder.addToken(collection)
}
