import * as $u from './finitio/support/utils';
import { version } from '../package.json';
import resolver from './finitio/resolver';
import TypeError from './finitio/errors';
import * as Utils from './finitio/support/utils';
import Parser from './finitio/parser';
import Contracts from './finitio/contracts';
import Attribute from './finitio/support/attribute';
import Contract from './finitio/support/contract';
import Heading from './finitio/support/heading';
import Constraint from './finitio/support/constraint';
import System from './finitio/system';
import { TargetLanguage, getBundler } from './finitio/bundlers';
import Type from './finitio/type';
import TypeDef from './finitio/type/type_def';
import TypeRef from './finitio/type/type_ref';
import AdType from './finitio/type/ad_type';
import AnyType from './finitio/type/any_type';
import BuiltinType from './finitio/type/builtin_type';
import RelationType from './finitio/type/relation_type';
import SeqType from './finitio/type/seq_type';
import SetType from './finitio/type/set_type';
import StructType from './finitio/type/struct_type';
import SubType from './finitio/type/sub_type';
import TupleType from './finitio/type/tuple_type';
import UnionType from './finitio/type/union_type';
import Meta from './finitio/support/meta';
import type { SystemAst, World } from './types';
export * from './types';

class Finitio {

  static VERSION = version;

  static CONFORMANCE = '0.4';

  static World: World = {
    'Finitio': Finitio,
    'JsTypes': {
      'Finitio':  Finitio,
      'Number':   Number,
      'String':   String,
      'Boolean':  Boolean,
      'Date':     Date,
      'Function': Function,
      'RegExp':   RegExp,
    },
    'importResolver': resolver,
  };

  static world(...args) {
    const world = $u.clone(Finitio.World);
    for (const arg of args) {
      if (arg) { extendWorld(world, arg); }
    }
    return world;
  }

  static parse(source: string, options = {}) {
    return Parser.parse(source, options);
  }

  static system(source: string|SystemAst, world?: World): System {
    if (typeof(source) === 'string') { source = this.parse(source); }
    return Meta.System.dress(source, this.world(world));
  }

  static bundleFile(path: string, world: World, lang: TargetLanguage = TargetLanguage.Javascript) {
    return (getBundler(lang, this.world(world))).addFile(path).flush();
  }

  static bundleSource(source: string, world: World, lang: TargetLanguage = TargetLanguage.Javascript) {
    return (getBundler(lang, this.world(world))).addSource(source).flush();
  }
}

const extendWorld = (world: World, ext: Record<string, unknown>) => {
  const result = [];
  for (const k in ext) {
    const v = ext[k];
    if (k === 'JsTypes') {
      result.push(world[k] = $u.extend(world[k], v));
    } else {
      result.push(world[k] = v);
    }
  }
  return result;
};

export {
  TypeError,
  Utils,
  Parser,
  Contracts,
  Attribute,
  Contract,
  Heading,
  Constraint,
  System,
  Type,
  TypeDef,
  TypeRef,
  AdType,
  AnyType,
  BuiltinType,
  RelationType,
  SeqType,
  SetType,
  StructType,
  SubType,
  TupleType,
  UnionType,
  Meta,
};

// TODO this should be removed to ensure tree shaking
// techniques work fine and that the finitio class is
// properly typed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
((finitioClass: any) => {
  finitioClass.TypeError = TypeError;
  finitioClass.Utils = Utils;
  finitioClass.Parser = Parser;
  finitioClass.Contracts = Contracts;
  finitioClass.Attribute = Attribute;
  finitioClass.Contract = Contract;
  finitioClass.Heading = Heading;
  finitioClass.Constraint = Constraint;
  finitioClass.System = System;
  finitioClass.Type = Type;
  finitioClass.TypeDef = TypeDef;
  finitioClass.TypeRef = TypeRef;
  finitioClass.AdType = AdType;
  finitioClass.AnyType = AnyType;
  finitioClass.BuiltinType = BuiltinType;
  finitioClass.RelationType = RelationType;
  finitioClass.SeqType = SeqType;
  finitioClass.SetType = SetType;
  finitioClass.StructType = StructType;
  finitioClass.SubType = SubType;
  finitioClass.TupleType = TupleType;
  finitioClass.UnionType = UnionType;
  finitioClass.Meta = Meta;
})(Finitio);


//#
export default Finitio;
