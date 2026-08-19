import type { SystemAst } from '../../parser';
import type { EmitMode, GeneratorOptions, NameResolver, Scope } from './mapper';
import { InputNamespaceName, joinNames, systemNamespaces, typeNameInput } from './mapper';

// Matches a qualified reference, e.g. `people.Address` for
// `@import ./people as people`. Mirrors `System.REF_RGX`: a qualifier starts
// with a lowercase letter, which is what distinguishes it from a namespaced
// type name such as `People.Address`.
const QUALIFIED_RGX = /^([a-z][a-z0-9]*)\.(.+)$/;

export type SystemInfo = {
  url: string
  index: number
  ast: SystemAst
  // Namespace the system's types are emitted under. The entry system is
  // emitted at the top level, so that consumers can import its types directly.
  nsPrefix: string
  names: Set<string>
}

//
// Describes every system of a bundle: where its types are emitted, and which
// names it defines.
//
// The entry system comes first: `AbstractBundler#_bundle` registers a system
// before recursing on its imports.
//
export const systemInfos = (systems: Record<string, SystemAst>): Array<SystemInfo> => {
  const urls = Object.keys(systems);
  const namespaces = systemNamespaces(urls);

  return urls.map((url, index) => ({
    url,
    index,
    ast: systems[url],
    nsPrefix: namespaces.get(url) as string,
    names: new Set(systems[url].types.map(t => t.name)),
  }));
};

//
// Builds the name resolver of one system, following Finitio's own scoping
// rules (`System#resolve`): own types first, then unqualified imports in
// order; qualified references go straight to the import they name.
//
export const nameResolver = (self: SystemInfo, byUrl: Map<string, SystemInfo>): NameResolver => {
  const tsName = (info: SystemInfo, name: string, mode: EmitMode) =>
    mode === 'dressed'
      ? joinNames(info.nsPrefix, name)
      : joinNames(info.nsPrefix, InputNamespaceName, typeNameInput(name));

  const imports = self.ast.imports || [];

  return (name: string, mode: EmitMode) => {
    const qualified = QUALIFIED_RGX.exec(name);

    if (qualified) {
      const imp = imports.find(i => i.qualifier === qualified[1]);
      const target = imp && byUrl.get(imp.from);
      return target && target.names.has(qualified[2])
        ? tsName(target, qualified[2], mode)
        : undefined;
    }

    const chain = [self].concat(
      imports
        .filter(i => !i.qualifier)
        .map(i => byUrl.get(i.from))
        .filter((i): i is SystemInfo => !!i)
    );

    const found = chain.find(i => i.names.has(name));
    return found ? tsName(found, name, mode) : undefined;
  };
};

// The scope every system's types are generated in.
export const scopesOf = (
  systems: Record<string, SystemAst>,
  options: GeneratorOptions,
  jsTypes: Set<string>,
  brands: Set<string>
): Array<{ info: SystemInfo, scope: Scope }> => {
  const infos = systemInfos(systems);
  const byUrl = new Map(infos.map(i => [i.url, i]));

  return infos.map(info => ({
    info,
    scope: {
      nsPrefix: info.nsPrefix,
      resolveName: nameResolver(info, byUrl),
      jsTypes,
      brands,
      options,
    },
  }));
};
