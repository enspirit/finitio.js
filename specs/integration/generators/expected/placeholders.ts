
// Everything this file introduces of its own is prefixed Finitio, so that a
// schema stays free to name a type Type, System or World.
import type * as FinitioTypes from 'finitio';
import FinitioRuntime from 'finitio';

export type System0 = {
  Doc: FinitioTypes.Type<FinitioInputs._Doc, Doc>;
  URL: FinitioTypes.Type<FinitioInputs._URL, URL>;
  Price: FinitioTypes.Type<FinitioInputs._Price, Price>;
  Main: FinitioTypes.Type<FinitioInputs._Main, Main>;
};
/**
 * A schema is free to use the words a bundle template happens to reserve.
 * `TYPEDEFS`, `JSONDATA` and `URL` are placeholders of that template, and
 * used to be substituted here -- in the schema's own text -- leaving the
 * loader itself pointing at a placeholder.
 */
export type Doc = FinitioImports.Data.String;
/** A type may be named after a placeholder too. */
export type URL = FinitioImports.Data.String;
/** A `$` is literal, where a replacement string reads `$$` and `$&` as directives */
export type Price = `$${number}`;
export type Main = {
  doc: Doc;
  home: URL;
  price: Price;
};
export namespace FinitioInputs {
  /**
   * A schema is free to use the words a bundle template happens to reserve.
   * `TYPEDEFS`, `JSONDATA` and `URL` are placeholders of that template, and
   * used to be substituted here -- in the schema's own text -- leaving the
   * loader itself pointing at a placeholder.
   */
  export type _Doc = FinitioImports.Data.FinitioInputs._String;
  /** A type may be named after a placeholder too. */
  export type _URL = FinitioImports.Data.FinitioInputs._String;
  /** A `$` is literal, where a replacement string reads `$$` and `$&` as directives */
  export type _Price = `$${number}`;
  export type _Main = {
    doc: FinitioInputs._Doc;
    home: FinitioInputs._URL;
    price: FinitioInputs._Price;
  };
}
export namespace FinitioImports.Data {
  export type SystemTypes = {
    Any: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Any, FinitioImports.Data.Any>;
    Nil: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Nil, FinitioImports.Data.Nil>;
    Boolean: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Boolean, FinitioImports.Data.Boolean>;
    True: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._True, FinitioImports.Data.True>;
    False: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._False, FinitioImports.Data.False>;
    Numeric: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Numeric, FinitioImports.Data.Numeric>;
    Real: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Real, FinitioImports.Data.Real>;
    Integer: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Integer, FinitioImports.Data.Integer>;
    String: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._String, FinitioImports.Data.String>;
    Date: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Date, FinitioImports.Data.Date>;
    Time: FinitioTypes.Type<FinitioImports.Data.FinitioInputs._Time, FinitioImports.Data.Time>;
  };
  /** Recognizes everything */
  export type Any = any;
  /** Recognizes JavaScript's null */
  export type Nil = null;
  /** Recognizes true and false */
  export type Boolean = boolean;
  /** Only true */
  export type True = true;
  /** Only false */
  export type False = false;
  /** Recognizes any number */
  export type Numeric = number;
  /** Recognizes only real numbers */
  export type Real = number;
  /** Recognizes only integer numbers */
  export type Integer = number;
  /** Recognizes every string */
  export type String = string;
  /** Recognizes valid dates */
  export type Date = globalThis.Date;
  /** Recognizes valid times */
  export type Time = globalThis.Date;
}
export namespace FinitioImports.Data.FinitioInputs {
  /** Recognizes everything */
  export type _Any = any;
  /** Recognizes JavaScript's null */
  export type _Nil = null;
  /** Recognizes true and false */
  export type _Boolean = boolean;
  /** Only true */
  export type _True = true;
  /** Only false */
  export type _False = false;
  /** Recognizes any number */
  export type _Numeric = number;
  /** Recognizes only real numbers */
  export type _Real = number;
  /** Recognizes only integer numbers */
  export type _Integer = number;
  /** Recognizes every string */
  export type _String = string;
  /** Recognizes valid dates */
  export type _Date = globalThis.Date | string | number;
  /** Recognizes valid times */
  export type _Time = globalThis.Date | string | number;
}

export default (() => {
  const ss: Record<string, FinitioTypes.SystemAst> = {"file://specs/integration/generators/fixtures/placeholders.fio":{"types":[{"name":"Doc","type":{"ref":{"typeName":"String"}},"metadata":{"description":"A schema is free to use the words a bundle template happens to reserve.\n   `TYPEDEFS`, `JSONDATA` and `URL` are placeholders of that template, and\n   used to be substituted here -- in the schema's own text -- leaving the\n   loader itself pointing at a placeholder."}},{"name":"URL","type":{"ref":{"typeName":"String"}},"metadata":{"description":"A type may be named after a placeholder too."}},{"name":"Price","type":{"sub":{"superType":{"ref":{"typeName":"String"}},"constraints":[{"regexp":"^[0-9]+$"}]}},"metadata":{"description":"A `$` is literal, where a replacement string reads `$$` and `$&` as directives","ts":"`$${number}`"}},{"name":"Main","type":{"tuple":{"heading":{"attributes":[{"name":"doc","type":{"ref":{"typeName":"Doc"}}},{"name":"home","type":{"ref":{"typeName":"URL"}}},{"name":"price","type":{"ref":{"typeName":"Price"}}}]}}}}],"imports":[{"from":"http://finitio.io/0.4/stdlib/data"}]},"http://finitio.io/0.4/stdlib/data":{"types":[{"name":"Any","type":{"any":{}},"metadata":{"description":"Recognizes everything"}},{"name":"Nil","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v === null"]}]}},"metadata":{"description":"Recognizes JavaScript's null","ts":"null"}},{"name":"Boolean","type":{"builtin":{"jsType":"Boolean"}},"metadata":{"description":"Recognizes true and false"}},{"name":"True","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === true"]}]}},"metadata":{"description":"Only true","ts":"true"}},{"name":"False","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === false"]}]}},"metadata":{"description":"Only false","ts":"false"}},{"name":"Numeric","type":{"builtin":{"jsType":"Number"}},"metadata":{"description":"Recognizes any number"}},{"name":"Real","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","(n===0.0) || !(n % 1 === 0)"]}]}},"metadata":{"description":"Recognizes only real numbers"}},{"name":"Integer","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","n % 1 === 0"]}]}},"metadata":{"description":"Recognizes only integer numbers"}},{"name":"String","type":{"builtin":{"jsType":"String"}},"metadata":{"description":"Recognizes every string"}},{"name":"Date","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Date.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Date.milliseconds"}]}},"metadata":{"description":"Recognizes valid dates"}},{"name":"Time","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Time.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Time.milliseconds"}]}},"metadata":{"description":"Recognizes valid times"}}]}};
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
        throw new Error('Unable to resolve: `' + path + '`');
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
    return world.importResolver!('file://specs/integration/generators/fixtures/placeholders.fio', world, options) as unknown as FinitioTypes.System<System0>;
  };
})();
