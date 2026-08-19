import Finitio from '../../finitio';
import { lstatSync, readFileSync } from 'fs';
import type { World } from '../../types';
import type { SystemAst } from '../parser';

//
// Fills the placeholders of a bundle template, in one pass.
//
// One pass matters twice over. A second `replace` would scan what the first
// one injected, so a schema naming a type `URL` -- or merely describing one --
// used to have its own text substituted and leave the loader pointing at a
// placeholder. And a replacer function keeps `$` literal, where a replacement
// *string* reads `$&` and `$$` as directives and eats them.
//
export const fill = (template: string, values: Record<string, string>): string => {
  const names = Object.keys(values);
  // An empty alternation matches the empty string at every word boundary, and
  // would splice `undefined` in at both ends.
  if (names.length === 0) { return template; }

  const keys = names.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const rgx = new RegExp(`\\b(?:${keys.join('|')})\\b`, 'g');

  return template.replace(rgx, m => values[m]);
};

export default abstract class AbstractBundler {

  // To be implemented
  abstract flush(): string

  // base implem
  systems: Record<string, SystemAst> = {}

  constructor(public world: World) {
    this.world = world;
  }

  addDirectory(_path: string) {
    throw new Error('Bundling directories is not supported');
  }

  addFile(path: string) {
    if (lstatSync(path).isDirectory()) {
      this.addDirectory(path);
    } else {
      const src = readFileSync(path).toString();
      this.addSource(src);
    }
    return this;
  }

  addSource(source: string) {
    // recursively resolve every import
    this._bundle(Finitio.parse(source), this.world);
    return this;
  }

  _bundle(system: SystemAst, world) {
    // dress the system to catch any error immediately
    if (world.check) { world.Finitio.system(system, world); }

    // save it under url in systems
    this.systems[world.sourceUrl] = system;
    if (!system.imports) { return; }

    // recursively resolve imports
    (() => {
      const result = [];
      for (const imp of [...system.imports]) {
      // resolve in raw mode
        const pair = world.importResolver(imp.from, world, { raw: true });
        // set the resolved URL, dress the system for catching errors
        imp.from = pair[0];
        // recurse on sub-imports
        const newWorld = world.Finitio.world(world, { sourceUrl: pair[0] });
        result.push(this._bundle(pair[1], newWorld));
      }
      return result;
    })();
  }
}
