
  /* eslint-disable */
  module.exports = (() => {
    const ss = {"http://finitio.io/0.4/stdlib/data":{"types":[{"name":"Any","type":{"any":{}},"metadata":{"description":"Recognizes everything"}},{"name":"Nil","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v === null"]}]}},"metadata":{"description":"Recognizes JavaScript's null"}},{"name":"Boolean","type":{"builtin":{"jsType":"Boolean"}},"metadata":{"description":"Recognizes true and false"}},{"name":"True","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === true"]}]}},"metadata":{"description":"Only true"}},{"name":"False","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === false"]}]}},"metadata":{"description":"Only false"}},{"name":"Numeric","type":{"builtin":{"jsType":"Number"}},"metadata":{"description":"Recognizes any number"}},{"name":"Real","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","(n===0.0) || !(n % 1 === 0)"]}]}},"metadata":{"description":"Recognizes only real numbers"}},{"name":"Integer","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","n % 1 === 0"]}]}},"metadata":{"description":"Recognizes only integer numbers"}},{"name":"String","type":{"builtin":{"jsType":"String"}},"metadata":{"description":"Recognizes every string"}},{"name":"Date","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Date.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Date.milliseconds"}]}},"metadata":{"description":"Recognizes valid dates"}},{"name":"Time","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Time.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Time.milliseconds"}]}},"metadata":{"description":"Recognizes valid times"}}]}};
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
          throw new Error('Unable to resolve: `' + path + '`');
        }
      };
    };
    return function(w, options){
      if (!w) { w = require('finit' + 'io').World; }
      w = w.Finitio.world(w, {
        importResolver: r(w.importResolver)
      });
      return w.importResolver('http://finitio.io/0.4/stdlib/data', w, options);
    };
  })();
  
