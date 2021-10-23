import $u from './finitio/support/utils';
import { version } from '../package.json';
import resolver from './finitio/resolver';
import TypeError from './finitio/errors';
import Utils from './finitio/support/utils';
import Parser from './finitio/parser';
import Contracts from './finitio/contracts';
import Attribute from './finitio/support/attribute';
import Contract from './finitio/support/contract';
import Heading from './finitio/support/heading';
import Constraint from './finitio/support/constraint';
import System from './finitio/system';
import Bundler from './finitio/bundler';
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
class Finitio {

  static VERSION = version;

  static CONFORMANCE = '0.4';

  static World = {
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

  static world() {
    const world = $u.clone(Finitio.World);
    for (const arg of [...arguments]) {
      if (arg) { extendWorld(world, arg); }
    }
    return world;
  }

  static parse(source, options) {
    return Parser.parse(source, options || {});
  }

  static system(source, world) {
    if (typeof(source) === 'string') { source = this.parse(source); }
    return Meta.System.dress(source, this.world(world));
  }

  static bundleFile(path, world) {
    return (new this.Bundler(this.world(world))).addFile(path).flush();
  }

  static bundleSource(source, world) {
    return (new this.Bundler(this.world(world))).addSource(source).flush();
  }
}

const extendWorld = (world, ext) => {
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
  Bundler,
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

Finitio.TypeError = TypeError;
Finitio.Utils = Utils;
Finitio.Parser = Parser;
Finitio.Contracts = Contracts;
Finitio.Attribute = Attribute;
Finitio.Contract = Contract;
Finitio.Heading = Heading;
Finitio.Constraint = Constraint;
Finitio.System = System;
Finitio.Bundler = Bundler;
Finitio.Type = Type;
Finitio.TypeDef = TypeDef;
Finitio.TypeRef = TypeRef;
Finitio.AdType = AdType;
Finitio.AnyType = AnyType;
Finitio.BuiltinType = BuiltinType;
Finitio.RelationType = RelationType;
Finitio.SeqType = SeqType;
Finitio.SetType = SetType;
Finitio.StructType = StructType;
Finitio.SubType = SubType;
Finitio.TupleType = TupleType;
Finitio.UnionType = UnionType;
Finitio.Meta = Meta;

//#
export default Finitio;
