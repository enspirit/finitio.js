
// Everything this file introduces of its own is prefixed Finitio, so that a
// schema stays free to name a type Type, System or World.
import type * as FinitioTypes from 'finitio';
import FinitioRuntime from 'finitio';

export type System0 = {
  Person: FinitioTypes.Type<FinitioInputs._Person, Person>;
  Page: FinitioTypes.Type<FinitioInputs._Page<unknown>, Page<unknown>>;
  Pair: FinitioTypes.Type<FinitioInputs._Pair<unknown, unknown>, Pair<unknown, unknown>>;
  Boxed: FinitioTypes.Type<FinitioInputs._Boxed<unknown>, Boxed<unknown>>;
  Main: FinitioTypes.Type<FinitioInputs._Main, Main>;
};
export type Person = {
  name: FinitioImports.Data.String;
  age?: FinitioImports.Data.Integer;
};
export type Page<T> = {
  items: Array<T>;
  total: FinitioImports.Data.Integer;
};
export type Pair<A, B> = [A, B];
/** The type parameter shadows the stdlib Date */
export type Boxed<Date> = {
  value: Date;
};
export type Main = {
  people: Page<Person>;
  dates: Page<FinitioImports.Data.Date>;
  labelled: Pair<FinitioImports.Data.String, FinitioImports.Data.Integer>;
  boxed: Boxed<FinitioImports.Data.String>;
};
export namespace FinitioInputs {
  export type _Person = {
    name: FinitioImports.Data.FinitioInputs._String;
    age?: FinitioImports.Data.FinitioInputs._Integer;
  };
  export type _Page<T> = {
    items: Array<T>;
    total: FinitioImports.Data.FinitioInputs._Integer;
  };
  export type _Pair<A, B> = [A, B];
  /** The type parameter shadows the stdlib Date */
  export type _Boxed<Date> = {
    value: Date;
  };
  export type _Main = {
    people: FinitioInputs._Page<FinitioInputs._Person>;
    dates: FinitioInputs._Page<FinitioImports.Data.FinitioInputs._Date>;
    labelled: FinitioInputs._Pair<FinitioImports.Data.FinitioInputs._String, FinitioImports.Data.FinitioInputs._Integer>;
    boxed: FinitioInputs._Boxed<FinitioImports.Data.FinitioInputs._String>;
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
  const ss: Record<string, FinitioTypes.SystemAst> = {"file://specs/integration/generators/fixtures/generics.fio":{"types":[{"name":"Person","type":{"tuple":{"heading":{"attributes":[{"name":"name","type":{"ref":{"typeName":"String"}}},{"name":"age","type":{"ref":{"typeName":"Integer"}},"required":false}]}}}},{"name":"Page","type":{"tuple":{"heading":{"attributes":[{"name":"items","type":{"seq":{"elmType":{"ref":{"typeName":"T"}}}}},{"name":"total","type":{"ref":{"typeName":"Integer"}}}]}}},"generics":["T"]},{"name":"Pair","type":{"struct":{"componentTypes":[{"ref":{"typeName":"A"}},{"ref":{"typeName":"B"}}]}},"generics":["A","B"]},{"name":"Boxed","type":{"tuple":{"heading":{"attributes":[{"name":"value","type":{"ref":{"typeName":"Date"}}}]}}},"generics":["Date"],"metadata":{"description":"The type parameter shadows the stdlib Date"}},{"name":"Main","type":{"tuple":{"heading":{"attributes":[{"name":"people","type":{"instantiate":{"typeName":"Page","instantiation":["Person"]}}},{"name":"dates","type":{"instantiate":{"typeName":"Page","instantiation":["Date"]}}},{"name":"labelled","type":{"instantiate":{"typeName":"Pair","instantiation":["String","Integer"]}}},{"name":"boxed","type":{"instantiate":{"typeName":"Boxed","instantiation":["String"]}}}]}}}}],"imports":[{"from":"http://finitio.io/0.4/stdlib/data"}]},"http://finitio.io/0.4/stdlib/data":{"types":[{"name":"Any","type":{"any":{}},"metadata":{"description":"Recognizes everything"}},{"name":"Nil","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v === null"]}]}},"metadata":{"description":"Recognizes JavaScript's null","ts":"null"}},{"name":"Boolean","type":{"builtin":{"jsType":"Boolean"}},"metadata":{"description":"Recognizes true and false"}},{"name":"True","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === true"]}]}},"metadata":{"description":"Only true","ts":"true"}},{"name":"False","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === false"]}]}},"metadata":{"description":"Only false","ts":"false"}},{"name":"Numeric","type":{"builtin":{"jsType":"Number"}},"metadata":{"description":"Recognizes any number"}},{"name":"Real","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","(n===0.0) || !(n % 1 === 0)"]}]}},"metadata":{"description":"Recognizes only real numbers"}},{"name":"Integer","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","n % 1 === 0"]}]}},"metadata":{"description":"Recognizes only integer numbers"}},{"name":"String","type":{"builtin":{"jsType":"String"}},"metadata":{"description":"Recognizes every string"}},{"name":"Date","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Date.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Date.milliseconds"}]}},"metadata":{"description":"Recognizes valid dates"}},{"name":"Time","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Time.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Time.milliseconds"}]}},"metadata":{"description":"Recognizes valid times"}}]}};
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
    return world.importResolver!('file://specs/integration/generators/fixtures/generics.fio', world, options) as unknown as FinitioTypes.System<System0>;
  };
})();
