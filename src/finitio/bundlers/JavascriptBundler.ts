import AbstractBundler from './AbstractBundler';

export default class JavascriptBundler extends AbstractBundler {

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

  flush() {
    return JavascriptBundler.TEMPLATE.replace(/^[ ]{4}/, '')
      .replace(/JSONDATA/, JSON.stringify(this.systems))
      .replace(/URL/, this.world.sourceUrl);
  }
}
