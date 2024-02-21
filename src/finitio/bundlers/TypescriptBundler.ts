import Builder from '@enspirit/ts-gen-dsl';
import AbstractBundler from './AbstractBundler';
import type { AdTypeAst, BuiltinTypeAst, SeqTypeAst, SetTypeAst, StructTypeAst, SubTypeAst, TupleTypeAst, TypeAst, TypeDefAst, TypeRefTypeAst, UnionTypeAst } from '../parser';
import { Type } from '../parser';

const IGNORE_LIST = ['Date', 'String', 'Boolean'];
export default class TypescriptBundler extends AbstractBundler {

  static TEMPLATE = `
import Finitio from 'finitio';
import type { World, SystemAst } from 'finitio';

TYPEDEFS

const getSystem = (() => {
  const ss: Record<string, SystemAst> = JSONDATA;
  const r = (fallback: (path: string, w: World, options?: unknown) => unknown) => {
    return function(path: string, w: World, options?: { raw: boolean }){
      const s = ss[path];
      if (s) {
        if (options?.raw){
          return [ path, s ];
        } else {
          return w.Finitio.system(s, w);
        }
      } else if (fallback) {
        return fallback(path, w, options);
      } else {
        throw new Error('Unable to resolve: \`' + path + '\`');
      }
    };
  };
  return function(w: World = Finitio.World, options?: any){
    w = w.Finitio.world(w, {
      importResolver: r(w.importResolver)
    });
    return w.importResolver('URL', w, options);
  };
})();

export const System = getSystem();

export default getSystem;
`

  flush(): string {
    return TypescriptBundler.TEMPLATE
      .replace('TYPEDEFS', this.typeDefs())
      .replace(/JSONDATA/, JSON.stringify(this.systems))
      .replace(/URL/, this.world.sourceUrl);
  }

  typeDefs(): string {
    const builder = new Builder({
      exportNamespaces: true,
      exportTypes: true
    });

    const buildTypeDef = (typeDef: TypeDefAst) => {
      const typeDefNameParts = typeDef.name.split('.');
      if (typeDefNameParts.length === 1) {
        builder.addToken(
          builder.typeDef(typeDef.name, buildType(typeDef.type))
        )
      } else {
        // namespacing
        const [typeDefName, ...nsParts] = typeDefNameParts.reverse();
        builder.withinNamespace(nsParts.join('.'), (builder) => {
          builder.addToken(
            builder.typeDef(typeDefName, buildType(typeDef.type))
          )
        })
      }
    }

    const buildType = (type: TypeAst): string => {
      const typeType = Object.keys(type)[0] as Type

      switch (typeType) {
        case Type.Any:
          return 'any'

        case Type.Builtin:
          return builder.type((type as BuiltinTypeAst).builtin.jsType)

        case Type.TypeRef:
          return (type as TypeRefTypeAst).ref.typeName

        case Type.Seq:
          return builder.withGenerics(
            [buildType((type as SeqTypeAst).seq.elmType)],
            'Array'
          )

        case Type.Tuple:
          return builder.object(
            (type as TupleTypeAst).tuple.heading.attributes.map(a => ({
              name: a.name,
              def: buildType(a.type),
              optional: a.required === false
            }))
          )

        case Type.Struct:
          const types = (type as StructTypeAst).struct.componentTypes.map(buildType)
          return builder.tuple(...types)

        case Type.Set:
          return builder.withGenerics(
            [buildType((type as SetTypeAst).set.elmType)],
            'Set'
          )

        case Type.Sub:
          return buildType((type as SubTypeAst).sub.superType)

        case Type.Ad:
          return builder.type((type as AdTypeAst).adt.jsType)

        case Type.Union:
          const options = (type as UnionTypeAst).union
            .candidates.map(buildType);
          return builder.union(...options)

        case Type.TypeDef:
          throw new Error('This should not happen')

        default:
          throw new Error(`Unsupported type: ${type}`)
      }
    }

    for (const system of Object.values(this.systems)) {
      for (const typeDef of system.types) {
        if (IGNORE_LIST.includes(typeDef.name)) {
          continue;
        }

        buildTypeDef(typeDef);
      }
    }

    return builder.flush()
  }

}
