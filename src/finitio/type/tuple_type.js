import { TypeType } from '../support/ic';
import $u from '../support/utils';
import Type from '../type';
import Heading from '../support/heading';

const _attributesHash = (heading) => {
  const h = {};
  heading.each(a => h[a.name] = a);
  return h;
};

export default class TupleType extends Type {

  constructor(heading, metadata) {
    super(metadata);

    this.heading = heading;

    if (!(this.heading instanceof Heading)) {
      $u.argumentError('Heading expected, got:', this.heading);
    }
  }

  fetch() {
    return this.heading.fetch.apply(this.heading, arguments);
  }

  _include(value) {
    if (typeof(value) !== 'object') { return false; }
    if (!this.areAttributesValid(value)) { return false; }
    return $u.every(this.heading.attributes, (attribute) => {
      if (value[attribute.name] != null) {
        const attr_val = value[attribute.name];
        return attribute.type.include(attr_val);
      } else {
        return true;
      }
    });
  }

  _mDress(value, Monad) {
    if (!(value instanceof Object)) {
      return Monad.failure(this, ['Invalid Tuple: `${value}`', [value]]);
    }

    const result = {};
    const success = Monad.success(result);

    const callback = (_, attrName) => {
      let m, subm;
      const attr = this.heading.getAttr(attrName) || null;
      const attrValue = value[attrName];

      // Missing required attribute, for instance
      // { name: String, age: Integer }
      // { "name": "Finitio" }
      if ((attrValue === undefined) && (attr != null) && attr.required) {
        m = Monad.failure(attrName, ['Missing attribute `${attrName}`', [attrName]]);
        return m.onFailure((f) => {
          f.location = attrName;
          return m;
        });

      // Extra attribute on a heading that doesn't allow extra, for instance
      // { name: String }
      // { "name": "Finitio", "age": 42 }
      } else if ((attr == null) && !this.heading.allowExtra()) {
        m = Monad.failure(attrName, ['Unrecognized attribute `${attrName}`', [attrName]]);
        return m.onFailure((f) => {
          f.location = attrName;
          return m;
        });

      // Extra attribute on a heading that allows extra, for instance
      // { name: String, ...: Integer }
      // { "name": "Finitio", "age": 42 }
      } else if ((attr == null) && this.heading.allowExtra()) {
        const extraType = this.heading.getExtraType();
        subm = extraType.mDress(attrValue, Monad);
        subm.onFailure((error) => {
          error.location = attrName;
          return subm;
        });
        return subm.onSuccess((val) => {
          result[attrName] = val;
          return success;
        });

      // Required attributes, for instance
      // { name: String }
      // { "name": "Finitio" }
      } else if ((attr != null) && (attrValue !== undefined)) {
        subm = attr.type.mDress(attrValue, Monad);
        subm.onFailure((error) => {
          error.location = attrName;
          return subm;
        });
        return subm.onSuccess((val) => {
          result[attrName] = val;
          return success;
        });

      //
      } else {
        return success;
      }
    };

    const onFailure = function(causes) {
      const params = ['Tuple', value];
      return Monad.failure(this, ['Invalid ${typeName}', params], causes);
    };

    // build all attributes
    let attributes = _attributesHash(this.heading);
    $u.extend(attributes, value);
    attributes = Object.keys(attributes);

    return Monad.refine(success, attributes, callback, onFailure);
  }

  _undress(value, as) {
    if (!(as instanceof TupleType)) {
      $u.undressError(`Tuple cannot undress to \`${as}\` (${as.constructor}).`);
    }

    // Check heading compatibility
    const [s, l, r] = $u.triSplit(_attributesHash(this.heading), _attributesHash(as.heading));

    // left non empty? do we allow projection undressings?
    if ($u.find(l, a => a.required)) {
      $u.undressError(`Tuple undress does not allow projecting ${l}`);
    }

    // right non empty? do we allow missing attributes?
    if (!$u.isEmpty(r)) {
      $u.undressError(`Tuple undress does not support missing ${r}`);
    }

    // Do we allow disagreements on required?
    if (!$u.every(s, pair => pair[0].required === pair[1].required)) {
      $u.undressError('Tuple undress requires optional attributes to agree');
    }

    // let undress each attribute in turn
    const undressed = {};
    this.heading.each((attribute) => {
      const attrName = attribute.name;
      const attrType = attribute.type;
      const attrValue = value[attrName];
      if (attrValue !== undefined) {
        const targType = as.heading.getAttr(attrName).type;
        return undressed[attribute.name] = attrType.undress(attrValue, targType);
      }
    });

    return undressed;
  }

  _isSuperTypeOf(other) {
    return (this === other) ||
    (other instanceof TupleType && this.heading.isSuperHeadingOf(other.heading));
  }

  _equals(other) {
    return (this === other) ||
    (other instanceof TupleType && this.heading.equals(other.heading)) ||
    super._equals(...arguments);
  }

  low() {
    return new TupleType(this.heading.low());
  }

  toString() {
    return `{ ${this.heading.toString()} }`;
  }

  attributeNames() {
    return $u.map(this.heading.attributes, a => a.name);
  }

  requiredAttributeNames() {
    return $u.map(
      $u.values(
        $u.filter(
          this.heading.attributes, a => a.required),
      ), a => a.name);
  }

  extraAttributes(value) {
    return $u.difference($u.keys(value), this.attributeNames());
  }

  missingAttributes(value) {
    return $u.difference(this.requiredAttributeNames(), $u.keys(value));
  }

  areAttributesValid(value) {
    return (this.heading.allowExtra() || $u.isEmpty(this.extraAttributes(value))) &&
      $u.isEmpty(this.missingAttributes(value));
  }

  resolveProxies(system) {
    return this.heading.resolveProxies(system);
  }
}

TypeType(TupleType, 'tuple', ['heading', 'metadata']);
