
// Everything this file introduces of its own is prefixed Finitio, so that a
// schema stays free to name a type Type, System or World.
import type * as FinitioTypes from 'finitio';
import FinitioRuntime from 'finitio';

// Makes constrained sub types nominal: values of these types can only be
// obtained by dressing, not written by hand.
export type FinitioBrand<T, N extends string> =
  unknown extends T ? T
  : T extends null|undefined ? T
  : T & { readonly __finitio: { [K in N]: true } };
export type System0 = {
  Positive: FinitioTypes.Type<FinitioInputs._Positive, Positive>;
  Small: FinitioTypes.Type<FinitioInputs._Small, Small>;
  Colour: FinitioTypes.Type<FinitioInputs._Colour, Colour>;
  Whatever: FinitioTypes.Type<FinitioInputs._Whatever, Whatever>;
  Defined: FinitioTypes.Type<FinitioInputs._Defined, Defined>;
  Plain: FinitioTypes.Type<FinitioInputs._Plain, Plain>;
  Main: FinitioTypes.Type<FinitioInputs._Main, Main>;
};
/** Only strictly positive */
export type Positive = FinitioBrand<FinitioImports.Data.Integer, "Positive">;
/** A brand composes with the one it refines */
export type Small = FinitioBrand<Positive, "Small">;
/** A set constraint is precise already, and is not branded */
export type Colour = "red" | "blue";
/**
 * A sub type of Any is not branded: the intersection would collapse the other
 * way round and let any object through
 */
export type Whatever = unknown;
/**
 * Reached through a reference rather than inline, which the mapper cannot
 * follow: the brand helper has to decline it on its own
 */
export type Defined = FinitioBrand<FinitioImports.Data.Any, "Defined">;
export type Plain = {
  name: FinitioImports.Data.String;
};
export type Main = {
  positive: Positive;
  small: Small;
  colour: Colour;
  whatever: Whatever;
  defined: Defined;
  plain: Plain;
  /**
   * Nil states its own TypeScript type, and is not branded: `null` cannot
   * carry a brand, and a branded null would drop out of this union
   */
  nick: FinitioImports.Data.String | FinitioImports.Data.Nil;
};
export namespace FinitioInputs {
  /** Only strictly positive */
  export type _Positive = FinitioImports.Data.FinitioInputs._Integer;
  /** A brand composes with the one it refines */
  export type _Small = FinitioInputs._Positive;
  /** A set constraint is precise already, and is not branded */
  export type _Colour = "red" | "blue";
  /**
   * A sub type of Any is not branded: the intersection would collapse the other
   * way round and let any object through
   */
  export type _Whatever = unknown;
  /**
   * Reached through a reference rather than inline, which the mapper cannot
   * follow: the brand helper has to decline it on its own
   */
  export type _Defined = FinitioImports.Data.FinitioInputs._Any;
  export type _Plain = {
    name: FinitioImports.Data.FinitioInputs._String;
  };
  export type _Main = {
    positive: FinitioInputs._Positive;
    small: FinitioInputs._Small;
    colour: FinitioInputs._Colour;
    whatever: FinitioInputs._Whatever;
    defined: FinitioInputs._Defined;
    plain: FinitioInputs._Plain;
    /**
     * Nil states its own TypeScript type, and is not branded: `null` cannot
     * carry a brand, and a branded null would drop out of this union
     */
    nick: FinitioImports.Data.FinitioInputs._String | FinitioImports.Data.FinitioInputs._Nil;
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
  export type Any = unknown;
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
  export type Real = FinitioBrand<number, "FinitioImports.Data.Real">;
  /** Recognizes only integer numbers */
  export type Integer = FinitioBrand<number, "FinitioImports.Data.Integer">;
  /** Recognizes every string */
  export type String = string;
  /** Recognizes valid dates */
  export type Date = globalThis.Date;
  /** Recognizes valid times */
  export type Time = globalThis.Date;
}
export namespace FinitioImports.Data.FinitioInputs {
  /** Recognizes everything */
  export type _Any = unknown;
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
  const ss: Record<string, FinitioTypes.SystemAst> = {"file://specs/integration/generators/fixtures/brands.fio":{"types":[{"name":"Positive","type":{"sub":{"superType":{"ref":{"typeName":"Integer"}},"constraints":[{"native":["i","i > 0"]}]}},"metadata":{"description":"Only strictly positive"}},{"name":"Small","type":{"sub":{"superType":{"ref":{"typeName":"Positive"}},"constraints":[{"native":["i","i < 10"]}]}},"metadata":{"description":"A brand composes with the one it refines"}},{"name":"Colour","type":{"sub":{"superType":{"ref":{"typeName":"String"}},"constraints":[{"set":["red","blue"]}]}},"metadata":{"description":"A set constraint is precise already, and is not branded"}},{"name":"Whatever","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v !== undefined"]}]}},"metadata":{"description":"A sub type of Any is not branded: the intersection would collapse the other\n   way round and let any object through"}},{"name":"Defined","type":{"sub":{"superType":{"ref":{"typeName":"Any"}},"constraints":[{"native":["v","v !== undefined"]}]}},"metadata":{"description":"Reached through a reference rather than inline, which the mapper cannot\n   follow: the brand helper has to decline it on its own"}},{"name":"Plain","type":{"tuple":{"heading":{"attributes":[{"name":"name","type":{"ref":{"typeName":"String"}}}]}}}},{"name":"Main","type":{"tuple":{"heading":{"attributes":[{"name":"positive","type":{"ref":{"typeName":"Positive"}}},{"name":"small","type":{"ref":{"typeName":"Small"}}},{"name":"colour","type":{"ref":{"typeName":"Colour"}}},{"name":"whatever","type":{"ref":{"typeName":"Whatever"}}},{"name":"defined","type":{"ref":{"typeName":"Defined"}}},{"name":"plain","type":{"ref":{"typeName":"Plain"}}},{"name":"nick","type":{"union":{"candidates":[{"ref":{"typeName":"String"}},{"ref":{"typeName":"Nil"}}]}},"metadata":{"description":"Nil states its own TypeScript type, and is not branded: `null` cannot\n     carry a brand, and a branded null would drop out of this union"}}]}}}}],"imports":[{"from":"http://finitio.io/0.4/stdlib/data"}]},"http://finitio.io/0.4/stdlib/data":{"types":[{"name":"Any","type":{"any":{}},"metadata":{"description":"Recognizes everything"}},{"name":"Nil","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v === null"]}]}},"metadata":{"description":"Recognizes JavaScript's null","ts":"null"}},{"name":"Boolean","type":{"builtin":{"jsType":"Boolean"}},"metadata":{"description":"Recognizes true and false"}},{"name":"True","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === true"]}]}},"metadata":{"description":"Only true","ts":"true"}},{"name":"False","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === false"]}]}},"metadata":{"description":"Only false","ts":"false"}},{"name":"Numeric","type":{"builtin":{"jsType":"Number"}},"metadata":{"description":"Recognizes any number"}},{"name":"Real","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","(n===0.0) || !(n % 1 === 0)"]}]}},"metadata":{"description":"Recognizes only real numbers"}},{"name":"Integer","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","n % 1 === 0"]}]}},"metadata":{"description":"Recognizes only integer numbers"}},{"name":"String","type":{"builtin":{"jsType":"String"}},"metadata":{"description":"Recognizes every string"}},{"name":"Date","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Date.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Date.milliseconds"}]}},"metadata":{"description":"Recognizes valid dates"}},{"name":"Time","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Time.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Time.milliseconds"}]}},"metadata":{"description":"Recognizes valid times"}}]}};
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
    return world.importResolver!('file://specs/integration/generators/fixtures/brands.fio', world, options) as unknown as FinitioTypes.System<System0>;
  };
})();
