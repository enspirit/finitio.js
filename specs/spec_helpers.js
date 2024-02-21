import { NativeConstraint } from '../src/finitio/support/constraint';
import AnyType from '../src/finitio/type/any_type';
import BuiltinType from '../src/finitio/type/builtin_type';
import SubType from '../src/finitio/type/sub_type';

const anyType = new AnyType();

// Builtins
const numType = new BuiltinType(Number);
const boolType = new BuiltinType(Boolean);
const stringType = new BuiltinType(String);

// SubType
const intType = new SubType(numType, [
  new NativeConstraint('noDecimal', i => (i % 1) === 0),
  new NativeConstraint('noDot', i => i.toString().indexOf('.') === -1),
]);

const floatType = new SubType(numType, [
  new NativeConstraint('hasDecimal', i => (i % 1) !== 0),
  new NativeConstraint('hasDot', i => i.toString().indexOf('.') !== -1),
]);

const byteType = new SubType(intType, [
  new NativeConstraint('byte', i => (i >= 0) && (i <= 255)),
]);

export {
  anyType,
  numType,
  boolType,
  stringType,
  intType,
  floatType,
  byteType,
};
