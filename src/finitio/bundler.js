import fs from 'fs';

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

  constructor(world) {
    this.world = world;
    this.systems = {};
  }

  flush() {
    return Bundler.TEMPLATE.replace(/^[ ]{4}/, '')
      .replace(/JSONDATA/, JSON.stringify(this.systems))
      .replace(/URL/, this.world.sourceUrl);
  }

  addDirectory(path) {
    throw new Error('Bundling directories is not supported');
  }

  addFile(path) {
    if (fs.lstatSync(path).isDirectory()) {
      this.addDirectory(path);
    } else {
      const src = fs.readFileSync(path).toString();
      this.addSource(src);
    }
    return this;
  }

  addSource(source) {
    // recursively resolve every import
    this._bundle(this.world.Finitio.parse(source), this.world);
    return this;
  }

  _bundle(system, world) {
    // dress the system to catch any error immediately
    if (world.check) { world.Finitio.system(system, world); }

    // save it under url in systems
    this.systems[world.sourceUrl] = system;
    if (!system.imports) { return; }

    // recursively resolve imports
    return (() => {
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

export default Bundler;
