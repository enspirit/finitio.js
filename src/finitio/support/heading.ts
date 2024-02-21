import { ObjectType } from './ic';
import * as $u from './utils';
import Fetchable from './fetchable';
import Attribute from './attribute';
import AnyType from '../type/any_type';
import type Type from '../type';
import { InformationContract } from '../../types';

//
// Helper class for tuple and relation types.
//
// A heading is a set of attributes, with the constraint that no two
// attributes have the same name.
//
class Heading extends InformationContract {

  static _attributesByName = (self) => {
    const h = {};
    $u.each(self.attributes, a => h[a.name] = a);
    return h;
  };

  static DEFAULT_OPTIONS = {
    allowExtra: false,
  };

  constructor(public attributes: Array<Attribute>, public options: { allowExtra?: Type } = {}) {
    super();

    // Check the attributes
    if (!$u.isArray(this.attributes) ||
            !$u.every(this.attributes, a => a instanceof Attribute)) {
      $u.argumentError('Array of Attribute expected');
    }

    // Check unique names
    const names = {};
    $u.each(this.attributes, attr => {
      if (names[attr.name] != null) {
        $u.argumentError('Attribute names must be unique');
      }
      return names[attr.name] = attr;
    });

    // Check the options
    if (!$u.isObject(this.options)) {
      $u.argumentError('Hash of options expected');
    }
    this.options = $u.extend({}, Heading.DEFAULT_OPTIONS, this.options);
  }

  getAttr(name) {
    return $u.find(this.attributes, a => a.name === name);
  }

  size() {
    return this.attributes.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  allowExtra(type?: unknown) {
    if (!this.options.allowExtra) {
      return false;
    }

    if (type == null) {
      return true;
    }

    return this.getExtraType()._isSuperTypeOf(type);
  }

  allowExtraValue(value) {
    if (!this.allowExtra()) {
      return false;
    }

    if (value == null) {
      return true;
    }

    return this.getExtraType().include(value);
  }

  getExtraType() {
    return this.options.allowExtra;
  }

  multi() {
    return this.allowExtra() || $u.any(this.attributes, a => !a.required);
  }

  each(callback) {
    return $u.each(this.attributes, callback);
  }

  toString() {
    let str = $u.map(this.attributes, a => a.toString()).join(', ');
    if (this.allowExtra()) {
      const extraType = this.options.allowExtra;
      if (!this.isEmpty()) { str += ', '; }
      str += '...';
      if (!(extraType instanceof AnyType)) { str += `: ${extraType.toString()}`; }
    }
    return str;
  }

  names() {
    return $u.map(this.attributes, a => a.name);
  }

  isSuperHeadingOf(other) {
    // Recognises with itself
    if (this === other) { return true; }
    if (!(other instanceof Heading)) { return false; }
    //
    const [s, l, r] = $u.triSplit(
      Heading._attributesByName(this),
      Heading._attributesByName(other));
    // Each field must be of same type or be parent
    if (!$u.every(s, pair => pair[0].isSuperAttributeOf(pair[1]))) { return false; }
    // Each missing field must be optional
    if (!$u.every(l, a => !(a.required))) { return false; }
    // If the other type allows extra attribute
    // this type must too and must allow the other's extra type
    if (other.allowExtra()) {
      if (!this.allowExtra() || !this.allowExtra(other.options.allowExtra)) { return false; }
    }
    // We allow extra, or there are no extra fields
    return this.allowExtra() || $u.isEmpty(r);
  }

  equals(other) {
    return (this === other) ||
    (other instanceof Heading &&
      this.attributesEquals(other) &&
      this.optionsEquals(other));
  }

  attributesEquals(other) {
    return (this.attributes.length === other.attributes.length) &&
    $u.every(this.attributes, attr => attr.equals(other.getAttr(attr.name)));
  }

  optionsEquals(other) {
    return ($u.size(this.options) === $u.size(other.options)) &&
    $u.every(this.options, (opt, name) => opt === other.options[name]);
  }

  low() {
    const reattrs = $u.map(this.attributes, a => a.low());
    const reopts = this.options;
    return new Heading(reattrs, reopts);
  }

  resolveProxies(system) {
    $u.each(this.attributes, a => a.resolveProxies(system));
    if (this.options.allowExtra) { return this.options.allowExtra.resolveProxies(system); }
  }
}

ObjectType(Heading, ['attributes', 'options']);
Fetchable(Heading, 'attributes', 'attribute', function(name) { return this.getAttr(name); });

//
export default Heading;
