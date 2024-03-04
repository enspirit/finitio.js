import Builder from '@enspirit/ts-gen-dsl';
import AbstractBundler from './AbstractBundler';
import { buildTypeCollection, buildTypeDef, buildTypeDefInput } from '../generators/typescript';

const IGNORE_LIST = ['Date', 'String', 'Boolean'];
export default class TypescriptBundler extends AbstractBundler {

  namespaces: Record<string, Record<string, boolean>> = {}


  static TEMPLATE = `
import type { World, SystemAst, System, Type } from 'finitio';
import Finitio from 'finitio';
TYPEDEFS

export default (() => {
  const ss: Record<string, SystemAst> = JSONDATA;
  const r = (fallback: (path: string, w: World, options?: unknown) => unknown) => {
    return function(path: string, w: World, options?: { raw: boolean }){
      const s = ss[path];
      if (s) {
        if (options?.raw){
          return [ path, s ];
        } else {
          return Finitio.system(s, w);
        }
      } else if (fallback) {
        return fallback(path, w, options);
      } else {
        throw new Error('Unable to resolve: \`' + path + '\`');
      }
    };
  };
  return (w: World = Finitio.World, options?: unknown): System<System0> => {
    w = Finitio.world(w, {
      importResolver: r(w.importResolver)
    });
    return w.importResolver('URL', w, options);
  };
})();
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

    Object.values(this.systems).forEach((system, i) => {

      buildTypeCollection(builder, system.types, `System${i}`)

      for (const typeDef of system.types) {
        buildTypeDefInput(builder, typeDef);

        if (IGNORE_LIST.includes(typeDef.name)) {
          continue;
        }

        buildTypeDef(builder, typeDef);
      }
    });

    return builder.flush()
  }

}
