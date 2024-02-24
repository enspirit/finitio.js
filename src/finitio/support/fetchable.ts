import type { TypeCollection } from '../../types';
import type System from '../system';
import type Type from '../type';
import * as $u from './utils';

export default function(clazz, plural, singular, extractor) {
  if (singular == null) {
    singular = plural.slice(0, plural.length - 1);
  }
  if (extractor == null) {
    extractor = (name) => this[plural][name];
  }

  clazz.prototype.fetch = function(this: System<TypeCollection>|Type, name, callback) {
    const extracted = extractor.bind(this)(name);
    if (extracted != null) {
      return extracted;
    } else if (callback != null) {
      return callback(this, name);
    } else {
      throw new Error(`No such ${singular} \`${name}\``);
    }
  };

  return clazz.prototype.fetchPath = function(path, callback) {
    const f = $u.inject(path.split('/'), this, (memo, name) => memo && memo.fetch && memo.fetch(name, () => null));
    if (f != null) {
      return f;
    } else if (callback != null) {
      return callback();
    } else {
      throw new Error(`No such ${singular} \`${path}\``);
    }
  };
};
