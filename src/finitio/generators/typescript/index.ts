import Builder from '@enspirit/ts-gen-dsl';
import type { SystemAst } from '../../parser';
import type { GeneratorOptions } from './mapper';
import {
  DefaultOptions, buildBrandHelper, buildJsTypesInterface, buildTypeCollection,
  buildTypeDef, buildTypeDefInput,
} from './mapper';
import { scopesOf } from './scope';

export * from './mapper';
export * from './scope';

//
// Generates the TypeScript types of a bundle of systems, keyed by source url,
// the entry system first.
//
// This is the whole of what a `.d.ts` for a schema contains: no loader, no
// inlined AST. `TypescriptBundler` wraps it in the former, and appends the
// latter.
//
export const generateTypes = (
  systems: Record<string, SystemAst>,
  options: Partial<GeneratorOptions> = {}
): string => {
  const builder = new Builder({
    exportNamespaces: true,
    exportTypes: true,
  });

  const jsTypes = new Set<string>();
  const brands = new Set<string>();

  scopesOf(systems, { ...DefaultOptions, ...options }, jsTypes, brands)
    .forEach(({ info, scope }) => {
      // The entry system's collection is what a loader is typed against, and
      // stays at the top level under a stable name.
      buildTypeCollection(
        builder,
        info.ast.types,
        info.index === 0 ? 'System0' : 'SystemTypes',
        scope
      );

      for (const typeDef of info.ast.types) {
        buildTypeDef(builder, typeDef, scope);
        buildTypeDefInput(builder, typeDef, scope);
      }
    });

  return [
    buildBrandHelper(brands),
    buildJsTypesInterface(builder, jsTypes),
    builder.flush(),
  ].filter(s => s.length > 0).join('\n');
};
