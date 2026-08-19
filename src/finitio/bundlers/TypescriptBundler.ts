import AbstractBundler, { fill } from './AbstractBundler';
import type { GeneratorOptions } from '../generators/typescript';
import { generateTypes } from '../generators/typescript';

export default class TypescriptBundler extends AbstractBundler {

  static TEMPLATE = `
// Everything this file introduces of its own is prefixed Finitio, so that a
// schema stays free to name a type Type, System or World.
import type * as FinitioTypes from 'finitio';
import FinitioRuntime from 'finitio';

TYPEDEFS

export default (() => {
  const ss: Record<string, FinitioTypes.SystemAst> = JSONDATA;
  const r = (fallback?: FinitioTypes.World['importResolver']) => {
    return function(path: string, w: FinitioTypes.World, options?: { raw?: boolean }){
      const s = ss[path];
      if (s) {
        if (options?.raw){
          return [ path, s ];
        } else {
          return FinitioRuntime.system(s, w);
        }
      } else if (fallback) {
        return fallback(path, w, options);
      } else {
        throw new Error('Unable to resolve: \`' + path + '\`');
      }
    } as unknown as NonNullable<FinitioTypes.World['importResolver']>;
  };
  return (
    w: FinitioTypes.World = FinitioRuntime.World,
    options?: unknown
  ): FinitioTypes.System<System0> => {
    const world = FinitioRuntime.world(w, {
      importResolver: r(w.importResolver)
    });
    return world.importResolver!('URL', world, options) as unknown as FinitioTypes.System<System0>;
  };
})();
`

  // Generator options travel through the world, which is what every bundler
  // is handed.
  options(): Partial<GeneratorOptions> {
    return (this.world.typescript as Partial<GeneratorOptions>) || {};
  }

  flush(): string {
    return fill(TypescriptBundler.TEMPLATE, {
      TYPEDEFS: this.typeDefs(),
      JSONDATA: JSON.stringify(this.systems),
      URL: this.world.sourceUrl as string,
    });
  }

  typeDefs(): string {
    return generateTypes(this.systems, this.options());
  }

}
