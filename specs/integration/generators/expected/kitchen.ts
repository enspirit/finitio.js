
// Everything this file introduces of its own is prefixed Finitio, so that a
// schema stays free to name a type Type, System or World.
import type * as FinitioTypes from 'finitio';
import FinitioRuntime from 'finitio';

/**
 * JavaScript types this schema refers to, that finitio cannot name on its
 * own. Refine them through declaration merging on this interface.
 */
export interface FinitioJsTypes {
  Field: unknown;
}
export type System0 = {
  Person: FinitioTypes.Type<FinitioInputs._Person, Person>;
  Color: FinitioTypes.Type<FinitioInputs._Color, Color>;
  Score: FinitioTypes.Type<FinitioInputs._Score, Score>;
  Point: FinitioTypes.Type<FinitioInputs._Point, Point>;
  Team: FinitioTypes.Type<FinitioInputs._Team, Team>;
  Node: FinitioTypes.Type<FinitioInputs._Node, Node>;
  Main: FinitioTypes.Type<FinitioInputs._Main, Main>;
};
export type Person = {
  name: FinitioImports.Data.String;
  age?: FinitioImports.Data.Integer;
  tags: Array<FinitioImports.Data.String>;
  nick: FinitioImports.Data.String | FinitioImports.Data.Nil;
};
export type Color = "red" | "blue";
export type Score = FinitioImports.Data.Integer;
export type Point = [number, number];
export type Team = Array<{
  name: FinitioImports.Data.String;
  lead: FinitioImports.Data.String;
}>;
export type Node = FinitioJsTypes['Field'];
export type Main = {
  person: Person;
  colors: Array<Color>;
  score: Score;
  point: Point;
  team: Team;
  root: Node;
};
export namespace FinitioInputs {
  export type _Person = {
    name: FinitioImports.Data.FinitioInputs._String;
    age?: FinitioImports.Data.FinitioInputs._Integer;
    tags: Array<FinitioImports.Data.FinitioInputs._String>;
    nick: FinitioImports.Data.FinitioInputs._String | FinitioImports.Data.FinitioInputs._Nil;
  };
  export type _Color = "red" | "blue";
  export type _Score = FinitioImports.Data.FinitioInputs._Integer;
  export type _Point = [number, number];
  export type _Team = Array<{
    name: FinitioImports.Data.FinitioInputs._String;
    lead: FinitioImports.Data.FinitioInputs._String;
  }>;
  export type _Node = FinitioJsTypes['Field'] | {
    id: FinitioImports.Data.FinitioInputs._String;
    children?: Array<FinitioInputs._Node>;
  };
  export type _Main = {
    person: FinitioInputs._Person;
    colors: Array<FinitioInputs._Color>;
    score: FinitioInputs._Score;
    point: FinitioInputs._Point;
    team: FinitioInputs._Team;
    root: FinitioInputs._Node;
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
  const ss: Record<string, FinitioTypes.SystemAst> = {"file://specs/integration/generators/fixtures/kitchen.fio":{"types":[{"name":"Person","type":{"tuple":{"heading":{"attributes":[{"name":"name","type":{"ref":{"typeName":"String"}}},{"name":"age","type":{"ref":{"typeName":"Integer"}},"required":false},{"name":"tags","type":{"set":{"elmType":{"ref":{"typeName":"String"}}}}},{"name":"nick","type":{"union":{"candidates":[{"ref":{"typeName":"String"}},{"ref":{"typeName":"Nil"}}]}}}]}}}},{"name":"Color","type":{"sub":{"superType":{"ref":{"typeName":"String"}},"constraints":[{"set":["red","blue"]}]}}},{"name":"Score","type":{"sub":{"superType":{"ref":{"typeName":"Integer"}},"constraints":[{"range":{"min":0,"min_inclusive":true,"max":100,"max_inclusive":true}}]}}},{"name":"Point","type":{"struct":{"componentTypes":[{"builtin":{"jsType":"Number"}},{"builtin":{"jsType":"Number"}}]}}},{"name":"Team","type":{"relation":{"heading":{"attributes":[{"name":"name","type":{"ref":{"typeName":"String"}}},{"name":"lead","type":{"ref":{"typeName":"String"}}}]}}}},{"name":"Node","type":{"adt":{"jsType":"Field","contracts":[{"name":"raw","infoType":{"tuple":{"heading":{"attributes":[{"name":"id","type":{"ref":{"typeName":"String"}}},{"name":"children","type":{"seq":{"elmType":{"ref":{"typeName":"Node"}}}},"required":false}]}}},"internal":"Field"}]}}},{"name":"Main","type":{"tuple":{"heading":{"attributes":[{"name":"person","type":{"ref":{"typeName":"Person"}}},{"name":"colors","type":{"seq":{"elmType":{"ref":{"typeName":"Color"}}}}},{"name":"score","type":{"ref":{"typeName":"Score"}}},{"name":"point","type":{"ref":{"typeName":"Point"}}},{"name":"team","type":{"ref":{"typeName":"Team"}}},{"name":"root","type":{"ref":{"typeName":"Node"}}}]}}}}],"imports":[{"from":"http://finitio.io/0.4/stdlib/data"}]},"http://finitio.io/0.4/stdlib/data":{"types":[{"name":"Any","type":{"any":{}},"metadata":{"description":"Recognizes everything"}},{"name":"Nil","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v === null"]}]}},"metadata":{"description":"Recognizes JavaScript's null","ts":"null"}},{"name":"Boolean","type":{"builtin":{"jsType":"Boolean"}},"metadata":{"description":"Recognizes true and false"}},{"name":"True","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === true"]}]}},"metadata":{"description":"Only true","ts":"true"}},{"name":"False","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === false"]}]}},"metadata":{"description":"Only false","ts":"false"}},{"name":"Numeric","type":{"builtin":{"jsType":"Number"}},"metadata":{"description":"Recognizes any number"}},{"name":"Real","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","(n===0.0) || !(n % 1 === 0)"]}]}},"metadata":{"description":"Recognizes only real numbers"}},{"name":"Integer","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","n % 1 === 0"]}]}},"metadata":{"description":"Recognizes only integer numbers"}},{"name":"String","type":{"builtin":{"jsType":"String"}},"metadata":{"description":"Recognizes every string"}},{"name":"Date","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Date.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Date.milliseconds"}]}},"metadata":{"description":"Recognizes valid dates"}},{"name":"Time","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Time.iso8601"},{"name":"milliseconds","infoType":{"builtin":{"jsType":"Number"}},"external":"Finitio.Contracts.Time.milliseconds"}]}},"metadata":{"description":"Recognizes valid times"}}]}};
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
    return world.importResolver!('file://specs/integration/generators/fixtures/kitchen.fio', world, options) as unknown as FinitioTypes.System<System0>;
  };
})();
