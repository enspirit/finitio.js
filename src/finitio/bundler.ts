import { lstatSync, readFileSync } from 'fs';
import type { SystemAst, World } from '../types';
import Finitio from '../finitio';

type WorldWithSource = World & Required<Pick<World, 'sourceUrl'>>

class Bundler {

  static TEMPLATE = `
  /* eslint-disable */
  module.exports = (() => {
    const ss = JSONDATA;
    const r = (fallback) => {
      return function(path, w, options){
        const s = ss[path];
        if (s) {
          if (options && options.raw){
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
    return function(w, options){
      if (!w) { w = require('finit' + 'io').World; }
      w = w.Finitio.world(w, {
        importResolver: r(w.importResolver)
      });
      return w.importResolver('URL', w, options);
    };
  })();
  `;

  systems: Record<string, SystemAst> = {}

  constructor(public world: WorldWithSource) {
    this.world = world;
  }

  flush() {
    return Bundler.TEMPLATE.replace(/^[ ]{4}/, '')
      .replace(/JSONDATA/, JSON.stringify(this.systems))
      .replace(/URL/, this.world.sourceUrl);
  }

  addDirectory(_path: string) {
    throw new Error('Bundling directories is not supported');
  }

  addFile(path) {
    if (lstatSync(path).isDirectory()) {
      this.addDirectory(path);
    } else {
      const src = readFileSync(path).toString();
      this.addSource(src);
    }
    return this;
  }

  addSource(source) {
    // recursively resolve every import
    this._bundle(Finitio.parse(source), this.world);
    return this;
  }

  _bundle(system: SystemAst, world: WorldWithSource) {
    // dress the system to catch any error immediately
    if (world.check) { Finitio.system(system, world); }

    // save it under url in systems
    this.systems[world.sourceUrl] = system;
    if (!system.imports) { return; }

    // recursively resolve imports
    return (() => {
      const result: Array<[string, SystemAst]|unknown> = [];
      for (const imp of [...system.imports]) {
      // resolve in raw mode
        const pair = world.importResolver?.(imp.from, world, { raw: true });
        // set the resolved URL, dress the system for catching errors
        imp.from = pair![0];
        // recurse on sub-imports
        const newWorld = Finitio.world(world, { sourceUrl: pair![0] });
        result.push(this._bundle(pair![1], newWorld as WorldWithSource));
      }
      return result;
    })();
  }
}

export default Bundler;
