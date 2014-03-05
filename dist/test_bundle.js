(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ArgumentError, KeyError, NotImplementedError, QJSError, TypeError,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

QJSError = (function(_super) {
  __extends(QJSError, _super);

  function QJSError(message, cause) {
    this.message = message;
    this.cause = cause;
    QJSError.__super__.constructor.call(this, this.message);
  }

  return QJSError;

})(Error);

KeyError = (function(_super) {
  __extends(KeyError, _super);

  function KeyError(message) {
    this.message = message;
    KeyError.__super__.constructor.call(this, this.message);
  }

  return KeyError;

})(QJSError);

ArgumentError = (function(_super) {
  __extends(ArgumentError, _super);

  function ArgumentError(message, arg) {
    var clazz;
    this.message = message;
    this.arg = arg;
    if (arguments.length === 2) {
      clazz = typeof this.arg === "undefined" ? "undefined" : this.arg === null ? "null" : this.arg.constructor.name;
      this.message += " " + clazz;
    }
    ArgumentError.__super__.constructor.call(this, this.message);
  }

  return ArgumentError;

})(QJSError);

TypeError = (function(_super) {
  __extends(TypeError, _super);

  function TypeError(message, cause, location) {
    this.message = message;
    this.cause = cause;
    this.location = location;
    TypeError.__super__.constructor.call(this, this.message, this.cause);
    if (this.location == null) {
      this.location = "";
    }
  }

  return TypeError;

})(QJSError);

NotImplementedError = (function(_super) {
  __extends(NotImplementedError, _super);

  function NotImplementedError(clazz, method) {
    NotImplementedError.__super__.constructor.call(this, "Missing " + clazz.constructor.name + "#" + method);
  }

  return NotImplementedError;

})(QJSError);

module.exports = {
  Error: Error,
  ArgumentError: ArgumentError,
  NotImplementedError: NotImplementedError,
  TypeError: TypeError,
  KeyError: KeyError
};


},{}],2:[function(require,module,exports){
var Qjs, TypeFactory, method, _, _i, _len, _ref;

_ = require('underscore');

TypeFactory = require('./support/factory');

Qjs = (function() {
  function Qjs() {}

  Qjs.VERSION = "0.0.1";

  Qjs.DSL_METHODS = ['attribute', 'heading', 'constraints', 'builtin', 'adt', 'subtype', 'union', 'seq', 'set', 'tuple', 'relation', 'type'];

  Qjs.DEFAULT_FACTORY = new TypeFactory;

  return Qjs;

})();

_ref = Qjs.DSL_METHODS;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  method = _ref[_i];
  Qjs[method] = Qjs.DEFAULT_FACTORY[method].bind(Qjs.DEFAULT_FACTORY);
}

module.exports = Qjs;


},{"./support/factory":6,"underscore":18}],3:[function(require,module,exports){
var ArgumentError, Attribute, KeyError, Type, TypeError, _, _ref;

Type = require('../type');

_ref = require('../errors'), KeyError = _ref.KeyError, ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

Attribute = (function() {
  function Attribute(name, type) {
    this.name = name;
    this.type = type;
    if (typeof this.name !== "string") {
      throw new ArgumentError("String expected for attribute name, got", this.name);
    }
    if (!(this.type instanceof Type)) {
      throw new ArgumentError("Type expected for attribute domain, got", this.type);
    }
  }

  Attribute.prototype.fetchOn = function(arg, callback) {
    if (typeof arg !== "object") {
      throw new ArgumentError("Object expected, got", arg);
    }
    if (arg[this.name] == null) {
      if (callback != null) {
        return callback();
      } else {
        throw new KeyError("Key `" + this.name + "` not found");
      }
    }
    return arg[this.name];
  };

  Attribute.prototype.toName = function() {
    return "" + this.name + ": " + this.type;
  };

  Attribute.prototype.equals = function(other) {
    if (!(other instanceof Attribute)) {
      return null;
    }
    return this.name === other.name && this.type.equals(other.type);
  };

  return Attribute;

})();

module.exports = Attribute;


},{"../errors":1,"../type":9,"underscore":18}],4:[function(require,module,exports){
var ArgumentError, CollectionType, Type,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Type = require('../type');

ArgumentError = require('../errors').ArgumentError;

CollectionType = (function(_super) {
  __extends(CollectionType, _super);

  function CollectionType(elmType, name) {
    this.elmType = elmType;
    this.name = name;
    if (!(this.elmType instanceof Type)) {
      throw new ArgumentError("Qjs.Type expected, got", this.elmType);
    }
    CollectionType.__super__.constructor.call(this, this.name);
  }

  CollectionType.prototype.equals = function(other) {
    if (!(other instanceof this.constructor)) {
      return false;
    }
    return this.elmType.equals(other.elmType);
  };

  return CollectionType;

})(Type);

module.exports = CollectionType;


},{"../errors":1,"../type":9}],5:[function(require,module,exports){
var DressHelper, TypeError, _, _typeToString, _valueToString;

TypeError = require('../errors').TypeError;

_ = require('underscore');

DressHelper = (function() {
  function DressHelper() {
    this.stack = [];
  }

  DressHelper.prototype.iterate = function(value, callback) {
    return _.each(value, (function(_this) {
      return function(elm, index) {
        return _this.deeper(index, function() {
          return callback(elm, index);
        });
      };
    })(this));
  };

  DressHelper.prototype.deeper = function(location, callback) {
    var err, res, _err;
    _err = null;
    try {
      this.stack.push(location.toString());
      return res = callback();
    } catch (_error) {
      err = _error;
      return _err = err;
    } finally {
      this.stack.pop();
      if (_err === null) {
        res;
      } else {
        throw _err;
      }
    }
  };

  DressHelper.prototype.justTry = function(rescueOn, callback) {
    var err, _ref;
    if (callback == null) {
      _ref = [rescueOn, callback], callback = _ref[0], rescueOn = _ref[1];
    }
    if (rescueOn == null) {
      rescueOn = TypeError;
    }
    try {
      return [true, callback()];
    } catch (_error) {
      err = _error;
      if (err instanceof rescueOn) {
        return [false, null];
      } else {
        throw err;
      }
    }
  };

  DressHelper.prototype["try"] = function(type, value, callback) {
    var err;
    try {
      return callback();
    } catch (_error) {
      err = _error;
      if (err instanceof TypeError) {
        return this.failed(type, value, err);
      } else {
        throw err;
      }
    }
  };

  DressHelper.prototype.failed = function(type, value, cause) {
    var msg;
    if (cause == null) {
      cause = null;
    }
    msg = this.defaultErrorMessage(type, value);
    throw new TypeError(msg, cause, this.location());
  };

  DressHelper.prototype.fail = function(msg, cause) {
    if (cause == null) {
      cause = null;
    }
    throw new TypeError(msg, cause, this.location());
  };

  DressHelper.prototype.defaultErrorMessage = function(type, value) {
    var type_s, value_s, _ref;
    _ref = [_valueToString(value), _typeToString(type)], value_s = _ref[0], type_s = _ref[1];
    return "Invalid value `" + value_s + "` for " + type_s;
  };

  DressHelper.prototype.location = function() {
    return this.stack.join('/');
  };

  return DressHelper;

})();

_valueToString = function(value) {
  var s;
  if (value === null) {
    return 'null';
  }
  s = value.toString();
  if (s.length > 25) {
    s = "" + (s.substring(0, 25)) + "...";
  }
  if (value instanceof Array) {
    s = "[" + s + "]";
  }
  return s;
};

_typeToString = function(type) {
  return type.name.toString();
};

module.exports = DressHelper;


},{"../errors":1,"underscore":18}],6:[function(require,module,exports){
var ArgumentError, Attribute, BuiltinType, Heading, NotImplementedError, RelationType, SeqType, SetType, SubType, TupleType, Type, TypeFactory, UnionType, fail, isNativeType, isRegexp, _, _ref,
  __slice = [].slice;

Type = require('../type');

_ = require('underscore');

Attribute = require('./attribute');

Heading = require('./heading');

BuiltinType = require('../type/builtin_type');

SeqType = require('../type/seq_type');

SetType = require('../type/set_type');

SubType = require('../type/sub_type');

TupleType = require('../type/tuple_type');

UnionType = require('../type/union_type');

RelationType = require('../type/relation_type');

_ref = require('../errors'), NotImplementedError = _ref.NotImplementedError, ArgumentError = _ref.ArgumentError;

TypeFactory = (function() {
  function TypeFactory() {}

  TypeFactory.prototype.type = function(t, name, callback) {
    var _ref1;
    if (callback == null) {
      if (typeof name === "function") {
        _ref1 = [name, callback], callback = _ref1[0], name = _ref1[1];
      }
    }
    if (callback != null) {
      return this.subtype(this.type(t, name), callback);
    }
    if (t instanceof Type) {
      return t;
    } else if (isNativeType(t)) {
      return new BuiltinType(t, name || t.constructor.name);
    } else if (isRegexp(t)) {
      return this.subtype(String, t);
    } else if (t instanceof Array) {
      if (t.length !== 1) {
        fail("Array of arity 1 expected, got", t);
      }
      return this.seq(t[0], name);
    } else if (typeof t === "object") {
      return this.tuple(t, name);
    } else {
      return fail("Unable to factor a Qjs.Type from `" + t + "`");
    }
  };

  TypeFactory.prototype.jsType = function(t) {
    if (!isNativeType(t)) {
      fail("JS primitive expected, got `" + t + "`");
    }
    return t;
  };

  TypeFactory.prototype.name = function(name) {
    if (!(!(name != null) || ((name.constructor === String) && name.trim().length > 1))) {
      fail("Wrong type name `" + name + "`");
    }
    if (name != null) {
      return name.trim();
    } else {
      return null;
    }
  };

  TypeFactory.prototype.constraints = function(constraints, callback) {
    var constrs;
    constrs = {};
    if (callback != null) {
      constrs['predicate'] = callback;
    }
    if ((constraints != null) && constraints.constructor === RegExp) {
      constrs['predicate'] = constraints;
    } else if (constraints != null) {
      if (!_.isObject(constraints)) {
        constrs['predicate'] = constraints;
      }
    }
    if (_.isObject(constraints)) {
      _.extend(constrs, constraints);
    }
    return constrs;
  };

  TypeFactory.prototype.attribute = function(name, type) {
    return new Attribute(name, this.type(type));
  };

  TypeFactory.prototype.attributes = function(attributes) {
    var attr;
    if (typeof attributes !== "object") {
      fail("Hash expected, got ", attributes);
    }
    attr = [];
    _.each(attributes, (function(_this) {
      return function(type, name) {
        return attr.push(_this.attribute(name, type));
      };
    })(this));
    return attr;
  };

  TypeFactory.prototype.heading = function(heading) {
    if (heading instanceof Heading) {
      return heading;
    }
    if (heading.heading != null) {
      return heading.heading;
    }
    if (typeof heading === "object") {
      return new Heading(this.attributes(heading));
    } else {
      return fail("Heading expected, got", heading);
    }
  };

  TypeFactory.prototype.contracts = function(contracts) {
    var invalid;
    if (typeof contracts !== "object") {
      fail("Hash expected, got", contracts);
    }
    invalid = _.keys(contracts, function(k) {
      return k instanceof String;
    });
    if (invalid.length > 0) {
      fail("Invalid contract names `" + invalid + "`");
    }
    return contracts;
  };

  TypeFactory.prototype.builtin = function(primitive, _name) {
    if (_name == null) {
      _name = null;
    }
    primitive = this.jsType(primitive);
    _name = this.name(_name);
    return new BuiltinType(primitive, _name);
  };

  TypeFactory.prototype.adt = function(primitive, contracts, name) {
    throw new NotImplementedError("Factory#adt");
  };

  TypeFactory.prototype.subtype = function(superType, _constraints, _name, callback) {
    var _ref1, _ref2;
    if (callback == null) {
      if (typeof _name === "function") {
        _ref1 = [_name, callback], callback = _ref1[0], _name = _ref1[1];
      }
    }
    if (callback == null) {
      if (typeof _constraints === "function") {
        _ref2 = [_constraints, callback], callback = _ref2[0], _constraints = _ref2[1];
      }
    }
    superType = this.type(superType);
    _constraints = this.constraints(_constraints, callback);
    _name = this.name(_name);
    return new SubType(superType, _constraints, _name);
  };

  TypeFactory.prototype.union = function() {
    var args, candidates, _name, _ref1;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _ref1 = [[], null], candidates = _ref1[0], _name = _ref1[1];
    _.each(args, function(arg) {
      if (arg.constructor === Array) {
        candidates = _.map(arg, function(t) {
          return this.type(t);
        });
      }
      if (arg.constructor === String) {
        return _name = this.name(_name);
      } else {
        return candidates.push(arg);
      }
    });
    return new UnionType(candidates, _name);
  };

  TypeFactory.prototype.seq = function(elmType, name) {
    elmType = this.type(elmType);
    name = this.name(name);
    return new SeqType(elmType, name);
  };

  TypeFactory.prototype.set = function(elmType, name) {
    elmType = this.type(elmType);
    name = this.name(name);
    return new SetType(elmType, name);
  };

  TypeFactory.prototype.tuple = function(heading, name) {
    heading = this.heading(heading);
    name = this.name(name);
    return new TupleType(heading, name);
  };

  TypeFactory.prototype.relation = function(heading, name) {
    heading = this.heading(heading);
    name = this.name(name);
    return new RelationType(heading, name);
  };

  return TypeFactory;

})();

isNativeType = function(t) {
  var match;
  if (t == null) {
    return false;
  }
  match = _.find([Number, Boolean, String], function(primitive) {
    return t === primitive;
  });
  return match != null;
};

isRegexp = function(t) {
  if (t == null) {
    return false;
  }
  return t.constructor === RegExp;
};

fail = function(msg, type) {
  if (type != null) {
    throw new ArgumentError(msg, type);
  } else {
    throw new ArgumentError(msg);
  }
};

module.exports = TypeFactory;


},{"../errors":1,"../type":9,"../type/builtin_type":11,"../type/relation_type":12,"../type/seq_type":13,"../type/set_type":14,"../type/sub_type":15,"../type/tuple_type":16,"../type/union_type":17,"./attribute":3,"./heading":7,"underscore":18}],7:[function(require,module,exports){
var ArgumentError, Attribute, Heading, TypeError, _, _ref;

_ref = require('../errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

Attribute = require('./attribute');

_ = require('underscore');

Heading = (function() {
  function Heading(attributes) {
    if (!(_.isArray(attributes) && _.every(attributes, function(a) {
      return a instanceof Attribute;
    }))) {
      throw new ArgumentError("Array of Attribute expected");
    }
    this.attributes = {};
    _.each(attributes, (function(_this) {
      return function(attr) {
        if (_this.attributes[attr.name] != null) {
          throw new ArgumentError("Attribute names must be unique");
        }
        return _this.attributes[attr.name] = attr;
      };
    })(this));
  }

  Heading.prototype.size = function() {
    return _.size(this.attributes);
  };

  Heading.prototype.isEmpty = function() {
    return this.size() === 0;
  };

  Heading.prototype.each = function(callback) {
    return _.each(_.values(this.attributes), callback);
  };

  Heading.prototype.toName = function() {
    return _.map(_.values(this.attributes), function(a) {
      return a.toName();
    }).join(', ');
  };

  Heading.prototype.names = function() {
    return _.map(_.values(this.attributes), function(a) {
      return a.name;
    });
  };

  Heading.prototype.equals = function(other) {
    var valid;
    if (!(other instanceof Heading)) {
      return null;
    }
    if (_.size(this.attributes) !== _.size(other.attributes)) {
      return false;
    }
    valid = _.every(this.attributes, function(attr, name) {
      var other_attr;
      other_attr = other.attributes[name];
      return attr.equals(attr);
    });
    return valid;
  };

  return Heading;

})();

module.exports = Heading;


},{"../errors":1,"./attribute":3,"underscore":18}],8:[function(require,module,exports){
var ArgumentError, Error, KeyError, Qjs, System, Type, TypeFactory, _, _ref;

_ = require('underscore');

_ref = require('./errors'), Error = _ref.Error, KeyError = _ref.KeyError, ArgumentError = _ref.ArgumentError;

Qjs = require('./qjs');

Type = require('./type');

TypeFactory = require('./support/factory');

System = (function() {
  function System(types, main) {
    var method, name, type, _i, _len, _ref1, _ref2;
    this.types = types;
    this.main = main;
    if (this.types == null) {
      this.types = {};
    }
    if (this.main == null) {
      this.main = null;
    }
    if (this.factory == null) {
      this.factory = new TypeFactory;
    }
    _ref1 = this.types;
    for (name in _ref1) {
      type = _ref1[name];
      this[type.name] = type;
    }
    _ref2 = Qjs.DSL_METHODS;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      method = _ref2[_i];
      this[method] = this.factory[method].bind(this.factory);
    }
  }

  System.prototype.addType = function(type) {
    if (!(type instanceof Type)) {
      throw new ArgumentError("Qjs.Type expected, got", type);
    }
    if (this.types[type.name] != null) {
      throw new Error("Duplicate type name `" + type.name + "`");
    }
    this.types[type.name] = type;
    return this[type.name] = type;
  };

  System.prototype.getType = function(name) {
    return this.types[name];
  };

  System.prototype.fetch = function(name, callback) {
    if (this.types[name] != null) {
      return this.types[name];
    }
    if (callback == null) {
      throw new KeyError("No type found: " + name);
    }
    return callback();
  };

  System.prototype.clone = function() {
    return new System(_.clone(this.types), _.clone(this.main));
  };

  return System;

})();

module.exports = System;


},{"./errors":1,"./qjs":2,"./support/factory":6,"./type":9,"underscore":18}],9:[function(require,module,exports){
var ArgumentError, NotImplementedError, Type, _ref;

_ref = require('./errors'), ArgumentError = _ref.ArgumentError, NotImplementedError = _ref.NotImplementedError;

Type = (function() {
  function Type(name) {
    this.name = name;
    if ((this.name != null) && typeof this.name !== "string") {
      throw new ArgumentError("String expected, got", this.name);
    }
    if (this.name == null) {
      this.name = this.defaultName();
    }
  }

  Type.prototype.dress = function() {
    throw new NotImplementedError(this, "up");
  };

  Type.prototype.toString = function() {
    return this.name.toString();
  };

  return Type;

})();

module.exports = Type;


},{"./errors":1}],10:[function(require,module,exports){
var AdType, ArgumentError, DressHelper, Type, TypeError, _, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('../errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

DressHelper = require('../support/dress_helper');

Type = require('../type');

_ = require('underscore');

AdType = (function(_super) {
  __extends(AdType, _super);

  function AdType(jsType, contracts, name) {
    var invalid;
    this.jsType = jsType;
    this.contracts = contracts;
    this.name = name;
    if (!(this.jsType instanceof Function)) {
      throw new ArgumentError("Constructor (function) expected, got", this.jsType);
    }
    if (typeof this.contracts !== "object") {
      throw new ArgumentError("Hash expected, got", this.contracts);
    }
    invalid = _.reject(_.values(this.contracts), function(v) {
      return v instanceof Array && v.length === 2 && v[0] instanceof Type && v[1] instanceof Function;
    });
    if (invalid.length !== 0) {
      throw new ArgumentError("Invalid contracts `" + invalid + "`");
    }
    AdType.__super__.constructor.call(this, this.name);
  }

  AdType.prototype.contractNames = function() {
    return _.keys(this.contracts);
  };

  AdType.prototype.defaultName = function() {
    return this.jsType.name;
  };

  AdType.prototype.include = function(value) {
    return value.constructor === this.jsType;
  };

  AdType.prototype.dress = function(value, helper) {
    var candidate, infoType, success, uped, upper, _ref1;
    if (helper == null) {
      helper = new DressHelper;
    }
    if (value instanceof this.jsType) {
      return value;
    }
    uped = null;
    candidate = _.find(this.contracts, function(contract, name) {
      var infotype, success, upper, _ref1;
      infotype = contract[0], upper = contract[1];
      _ref1 = helper.justTry(function() {
        return infotype.dress(value, helper);
      }), success = _ref1[0], uped = _ref1[1];
      return success;
    });
    if (candidate != null) {
      infoType = candidate[0], upper = candidate[1];
      _ref1 = helper.justTry(Error, function() {
        return upper(uped);
      }), success = _ref1[0], uped = _ref1[1];
      if (success) {
        return uped;
      }
    }
    return helper.failed(this, value);
  };

  return AdType;

})(Type);

module.exports = AdType;


},{"../errors":1,"../support/dress_helper":5,"../type":9,"underscore":18}],11:[function(require,module,exports){
var BuiltinType, DressHelper, NotImplementedError, Type, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

NotImplementedError = require('../errors').NotImplementedError;

DressHelper = require('../support/dress_helper');

Type = require('../type');

_ = require('underscore');

BuiltinType = (function(_super) {
  __extends(BuiltinType, _super);

  function BuiltinType(jsType, name) {
    this.jsType = jsType;
    this.name = name;
    this.equals = __bind(this.equals, this);
    BuiltinType.__super__.constructor.call(this, this.name);
  }

  BuiltinType.prototype.dress = function(value, helper) {
    if (helper == null) {
      helper = new DressHelper;
    }
    if (value.constructor !== this.jsType) {
      helper.failed(this, value);
    }
    return value;
  };

  BuiltinType.prototype.defaultName = function() {
    return this.jsType.name;
  };

  BuiltinType.prototype.include = function(value) {
    return value.constructor === this.jsType;
  };

  BuiltinType.prototype.equals = function(other) {
    if (!(other instanceof BuiltinType)) {
      return false;
    }
    return other.jsType === this.jsType;
  };

  return BuiltinType;

})(Type);

module.exports = BuiltinType;


},{"../errors":1,"../support/dress_helper":5,"../type":9,"underscore":18}],12:[function(require,module,exports){
var ArgumentError, DressHelper, Heading, RelationType, TupleType, Type, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

TupleType = require('./tuple_type');

Heading = require('../support/heading');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

RelationType = (function(_super) {
  __extends(RelationType, _super);

  function RelationType(heading, name) {
    this.heading = heading;
    this.name = name;
    if (!(this.heading instanceof Heading)) {
      throw new ArgumentError("Heading expected, got", this.heading);
    }
    this.tupleType = new TupleType(heading);
    RelationType.__super__.constructor.call(this, this.name);
  }

  RelationType.prototype.defaultName = function() {
    return "{{" + (this.heading.toName()) + "}}";
  };

  RelationType.prototype.include = function(value) {
    var k, tuple, v;
    if (typeof value !== "object") {
      return false;
    }
    for (k in value) {
      v = value[k];
      tuple = {};
      tuple[k] = v;
      if (!this.tupleType.include(tuple)) {
        return false;
      }
    }
    return true;
  };

  RelationType.prototype.dress = function(value, helper) {
    var set;
    if (helper == null) {
      helper = new DressHelper;
    }
    if (!(typeof value === "object" || typeof value === "array")) {
      helper.failed(this, value);
    }
    set = {};
    helper.iterate(value, (function(_this) {
      return function(tuple, index) {
        var key;
        tuple = _this.tupleType.dress(tuple, helper);
        key = JSON.stringify(tuple);
        if (set[key] != null) {
          helper.fail("Duplicate tuple");
        }
        return set[key] = tuple;
      };
    })(this));
    return _.values(set);
  };

  RelationType.prototype.equals = function(other) {
    if (!(other instanceof RelationType)) {
      return false;
    }
    return this.heading.equals(other.heading);
  };

  return RelationType;

})(Type);

module.exports = RelationType;


},{"../errors":1,"../support/dress_helper":5,"../support/heading":7,"../type":9,"./tuple_type":16,"underscore":18}],13:[function(require,module,exports){
var ArgumentError, CollectionType, DressHelper, SeqType, Type, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

CollectionType = require('../support/collection_type');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

SeqType = (function(_super) {
  __extends(SeqType, _super);

  function SeqType() {
    return SeqType.__super__.constructor.apply(this, arguments);
  }

  SeqType.prototype.include = function(value) {
    return value instanceof Array && _.every(value, (function(_this) {
      return function(v) {
        return _this.elmType.include(v);
      };
    })(this));
  };

  SeqType.prototype.dress = function(value, helper) {
    var array;
    if (helper == null) {
      helper = new DressHelper;
    }
    if (!(value instanceof Array)) {
      helper.failed(this, value);
    }
    array = [];
    helper.iterate(value, (function(_this) {
      return function(elm, index) {
        return array.push(_this.elmType.dress(elm, helper));
      };
    })(this));
    return array;
  };

  SeqType.prototype.defaultName = function() {
    return "[" + this.elmType.name + "]";
  };

  return SeqType;

})(CollectionType);

module.exports = SeqType;


},{"../errors":1,"../support/collection_type":4,"../support/dress_helper":5,"../type":9,"underscore":18}],14:[function(require,module,exports){
var ArgumentError, CollectionType, DressHelper, SetType, Type, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

CollectionType = require('../support/collection_type');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

SetType = (function(_super) {
  __extends(SetType, _super);

  function SetType() {
    return SetType.__super__.constructor.apply(this, arguments);
  }

  SetType.prototype.include = function(value) {
    if (!(value instanceof Array)) {
      return false;
    }
    if (!_.every(value, (function(_this) {
      return function(v) {
        return _this.elmType.include(v);
      };
    })(this))) {
      return false;
    }
    return _.uniq(value).length === value.length;
  };

  SetType.prototype.dress = function(value, helper) {
    var array;
    if (helper == null) {
      helper = new DressHelper;
    }
    if (!(value instanceof Array)) {
      helper.failed(this, value);
    }
    array = [];
    helper.iterate(value, (function(_this) {
      return function(elm, index) {
        var dressed;
        dressed = _this.elmType.dress(elm, helper);
        if (_.include(array, dressed)) {
          return helper.fail("Duplicate value `" + dressed + "`");
        } else {
          return array.push(dressed);
        }
      };
    })(this));
    return array;
  };

  SetType.prototype.defaultName = function() {
    return "{" + this.elmType.name + "}";
  };

  return SetType;

})(CollectionType);

module.exports = SetType;


},{"../errors":1,"../support/collection_type":4,"../support/dress_helper":5,"../type":9,"underscore":18}],15:[function(require,module,exports){
var ArgumentError, DEFAULT_CONSTRAINT_NAMES, DressHelper, SubType, Type, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

_.str = require('underscore.string');

DEFAULT_CONSTRAINT_NAMES = ['default', 'predicate'];

SubType = (function(_super) {
  __extends(SubType, _super);

  function SubType(superType, constraints, name) {
    this.superType = superType;
    this.constraints = constraints;
    this.name = name;
    if (this.name == null) {
      this.name = null;
    }
    if (!(this.superType instanceof Type)) {
      throw new ArgumentError("Qjs.Type expected, got", this.superType);
    }
    if (typeof this.constraints !== "object") {
      throw new ArgumentError("Hash expected for constraints, got", this.constraints);
    }
    SubType.__super__.constructor.call(this, this.name);
  }

  SubType.prototype.dress = function(value, helper) {
    var uped;
    if (helper == null) {
      helper = new DressHelper;
    }
    uped = helper["try"](this, value, (function(_this) {
      return function() {
        return _this.superType.dress(value, helper);
      };
    })(this));
    _.each(this.constraints, (function(_this) {
      return function(constraint, name) {
        var msg;
        if (typeof constraint === "function") {
          if (constraint(uped)) {
            return;
          }
        }
        if ((constraint != null) && constraint.constructor === RegExp) {
          if (constraint.test(uped)) {
            return;
          }
        }
        msg = helper.defaultErrorMessage(_this, value);
        if (!_this.isDefaultConstraint(name)) {
          msg += " (not " + name + ")";
        }
        return helper.fail(msg);
      };
    })(this));
    return uped;
  };

  SubType.prototype.defaultName = function() {
    return _.str.capitalize(_.keys(this.constraints)[0]);
  };

  SubType.prototype.include = function(value) {
    return this.superType.include(value) && _.every(this.constraints, function(c, n) {
      return c(value);
    });
  };

  SubType.prototype.equals = function(other) {
    if (!(other instanceof SubType)) {
      return false;
    }
    return other.superType === this.superType && _.isEqual(_.values(other.constraints), _.values(this.constraints));
  };

  SubType.prototype.isDefaultConstraint = function(name) {
    return _.contains(DEFAULT_CONSTRAINT_NAMES, name) || _.str.capitalize(name.toString()) === this.name;
  };

  return SubType;

})(Type);

module.exports = SubType;


},{"../errors":1,"../support/dress_helper":5,"../type":9,"underscore":18,"underscore.string":18}],16:[function(require,module,exports){
var ArgumentError, DressHelper, Heading, TupleType, Type, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

Heading = require('../support/heading');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

TupleType = (function(_super) {
  __extends(TupleType, _super);

  function TupleType(heading, name) {
    this.heading = heading;
    this.name = name;
    if (!(this.heading instanceof Heading)) {
      throw new ArgumentError("Heading expected, got", this.heading);
    }
    if (this.name == null) {
      this.name = null;
    }
    TupleType.__super__.constructor.call(this, this.name);
  }

  TupleType.prototype.dress = function(value, helper) {
    var extra, uped;
    if (helper == null) {
      helper = new DressHelper;
    }
    if (!(value instanceof Object)) {
      helper.failed(this, value);
    }
    uped = {};
    if (_.size(value) > _.size(this.heading.names())) {
      extra = _.difference(_.keys(value), this.heading.names());
      helper.fail("Unrecognized attribute `" + extra[0] + "`");
    }
    _.each(this.heading.attributes, function(attribute) {
      var val;
      val = attribute.fetchOn(value, function() {
        return helper.fail("Missing attribute `" + attribute.name + "`");
      });
      return helper.deeper(attribute.name, function() {
        return uped[attribute.name] = attribute.type.dress(val, helper);
      });
    });
    return uped;
  };

  TupleType.prototype.include = function(value) {
    if (typeof value !== "object") {
      return false;
    }
    if (_.size(value) > _.size(this.heading)) {
      return false;
    }
    return _.every(this.heading.attributes, function(attribute) {
      var attr_val;
      if (value[attribute.name] == null) {
        return false;
      }
      attr_val = value[attribute.name];
      return attribute.type.include(attr_val);
    });
  };

  TupleType.prototype.defaultName = function() {
    return "{" + (this.heading.toName()) + "}";
  };

  TupleType.prototype.equals = function(other) {
    if (!(other instanceof TupleType)) {
      return false;
    }
    return this.heading.equals(other.heading);
  };

  return TupleType;

})(Type);

module.exports = TupleType;


},{"../errors":1,"../support/dress_helper":5,"../support/heading":7,"../type":9,"underscore":18}],17:[function(require,module,exports){
var ArgumentError, DressHelper, Type, UnionType, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

_.str = require('underscore.string');

UnionType = (function(_super) {
  __extends(UnionType, _super);

  function UnionType(candidates, name) {
    this.candidates = candidates;
    this.name = name;
    if (this.name == null) {
      this.name = null;
    }
    _.each(this.candidates, (function(_this) {
      return function(c) {
        if (!(c instanceof Type)) {
          throw new ArgumentError("Qjs.Type expected, got", c);
        }
      };
    })(this));
    UnionType.__super__.constructor.call(this, this.name);
  }

  UnionType.prototype.dress = function(value, helper) {
    var match;
    if (helper == null) {
      helper = new DressHelper;
    }
    match = _.find(this.candidates, function(c) {
      var success, uped, _ref;
      _ref = helper.justTry(function() {
        return c.dress(value, helper);
      }), success = _ref[0], uped = _ref[1];
      return success;
    });
    if (match != null) {
      return match.dress(value, helper);
    }
    return helper.failed(this, value);
  };

  UnionType.prototype.include = function(value) {
    var found;
    found = _.find(this.candidates, function(c) {
      return c.include(value);
    });
    return found != null;
  };

  UnionType.prototype.defaultName = function() {
    return _.map(this.candidates, function(c) {
      return c.name;
    }).join('|');
  };

  UnionType.prototype.equals = function(other) {
    if (!(other instanceof UnionType)) {
      return false;
    }
    if (!_.isEqual(_.difference(other.candidates, this.candidates), [])) {
      return false;
    }
    if (!_.isEqual(_.difference(this.candidates, other.candidates), [])) {
      return false;
    }
    return true;
  };

  return UnionType;

})(Type);

module.exports = UnionType;


},{"../errors":1,"../support/dress_helper":5,"../type":9,"underscore":18,"underscore.string":18}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
var Attribute, should;

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Attribute#constructor", function() {
  var subject;
  subject = new Attribute('red', intType);
  return it('should correctly set the instance variables', function() {
    subject.name.should.equal('red');
    return subject.type.should.equal(intType);
  });
});


},{"../../../lib/support/attribute":3,"should":18}],20:[function(require,module,exports){
var Attribute, should;

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Attribute#equality", function() {
  var attr1, attr2, attr3;
  attr1 = new Attribute('red', intType);
  attr2 = new Attribute('red', intType);
  attr3 = new Attribute('blue', intType);
  it('should apply structural equality', function() {
    return attr1.equals(attr2).should.be["true"];
  });
  it('should distinguish different attributes', function() {
    return attr1.equals(attr3).should.be["false"];
  });
  return it('should return null if not equal', function() {
    return should.equal(attr1.equals(12), null);
  });
});


},{"../../../lib/support/attribute":3,"should":18}],21:[function(require,module,exports){
var ArgumentError, Attribute, KeyError, should, _ref;

Attribute = require('../../../lib/support/attribute');

should = require('should');

_ref = require('../../../lib/errors'), ArgumentError = _ref.ArgumentError, KeyError = _ref.KeyError;

describe("Attribute#fetchOn", function() {
  var attr, subject;
  attr = new Attribute('red', intType);
  subject = function(arg, cb) {
    return attr.fetchOn(arg, cb);
  };
  describe('with an object that does not support fetch', function() {
    var arg, e, lambda;
    arg = 12;
    lambda = (function(_this) {
      return function() {
        return subject(arg);
      };
    })(this);
    expect(lambda).toThrow();
    try {
      return lambda();
    } catch (_error) {
      e = _error;
      e.should.be.an["instanceof"](ArgumentError);
      return e.message.should.equal("Object expected, got Number");
    }
  });
  describe('with a valid object', function() {
    var arg;
    arg = {
      "red": 233
    };
    return subject(arg).should.equal(233);
  });
  describe('when the key is missing and no callback', function() {
    var arg, e, lambda;
    arg = {
      other: 123
    };
    lambda = function() {
      return subject(arg);
    };
    expect(lambda).toThrow();
    try {
      return lambda();
    } catch (_error) {
      e = _error;
      return e.should.be.an["instanceof"](KeyError);
    }
  });
  return describe('when the key is missing and a callback is present', (function(_this) {
    return function() {
      var arg;
      arg = {
        other: 123
      };
      return subject(arg, function() {
        return "none";
      }).should.equal("none");
    };
  })(this));
});


},{"../../../lib/errors":1,"../../../lib/support/attribute":3,"should":18}],22:[function(require,module,exports){
var Attribute, should;

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Attribute#toName", function() {
  var subject;
  subject = new Attribute('red', intType).toName();
  return subject.should.equal("red: intType");
});


},{"../../../lib/support/attribute":3,"should":18}],23:[function(require,module,exports){
var ArgumentError, Attribute, Heading, should;

Attribute = require('../../../lib/support/attribute');

Heading = require('../../../lib/support/heading');

ArgumentError = require('../../../lib/errors').ArgumentError;

should = require('should');

describe("Heading#constructor", function() {
  var subject;
  subject = function(attributes) {
    return new Heading(attributes);
  };
  describe('with no attribute', function() {
    return subject([]).should.be.an["instanceof"](Heading);
  });
  describe('with valid attributes', function() {
    var attrs;
    attrs = [new Attribute('red', intType)];
    return subject(attrs).should.be.an["instanceof"](Heading);
  });
  return describe('with invalid attributes', function() {
    var attributes, lambda;
    attributes = [new Attribute('red', intType), new Attribute('red', intType)];
    lambda = function() {
      return subject(attributes);
    };
    return it('should raise an error', function() {
      var e;
      expect(lambda).toThrow();
      try {
        return lambda();
      } catch (_error) {
        e = _error;
        e.should.be.an["instanceof"](ArgumentError);
        return e.message.should.equal("Attribute names must be unique");
      }
    });
  });
});


},{"../../../lib/errors":1,"../../../lib/support/attribute":3,"../../../lib/support/heading":7,"should":18}],24:[function(require,module,exports){
var Attribute, Heading, should, _;

Attribute = require('../../../lib/support/attribute');

Heading = require('../../../lib/support/heading');

should = require('should');

_ = require('underscore');

describe("Heading#each", function() {
  var a, b, h;
  a = new Attribute('a', intType);
  b = new Attribute('b', intType);
  h = new Heading([a, b]);
  describe('without a block', function() {
    return it('should be a function', function() {
      return h.each.should.be.a["function"];
    });
  });
  return describe('with a callback', function() {
    return it('should call with each attribute in turn', function() {
      var seen;
      seen = [];
      h.each(function(attr) {
        return seen.push(attr);
      });
      return _.isEqual(seen, [a, b]).should.be["true"];
    });
  });
});


},{"../../../lib/support/attribute":3,"../../../lib/support/heading":7,"should":18,"underscore":18}],25:[function(require,module,exports){
var Attribute, Heading, should;

Attribute = require('../../../lib/support/attribute');

Heading = require('../../../lib/support/heading');

should = require('should');

describe("Heading#equality", function() {
  var h1, h2, h3;
  h1 = new Heading([new Attribute('r', intType), new Attribute('b', intType)]);
  h2 = new Heading([new Attribute('b', intType), new Attribute('r', intType)]);
  h3 = new Heading([new Attribute('b', intType)]);
  it('should apply structural equality', function() {
    h1.equals(h2).should.be["true"];
    return h2.equals(h1).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    h1.equals(h3).should.be["false"];
    return h2.equals(h3).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return should.equal(h1.equals(12), null);
  });
});


},{"../../../lib/support/attribute":3,"../../../lib/support/heading":7,"should":18}],26:[function(require,module,exports){
var Attribute, Heading, should;

Attribute = require('../../../lib/support/attribute');

Heading = require('../../../lib/support/heading');

should = require('should');

describe("Heading#size", function() {
  var b, g, r;
  r = new Attribute('red', intType);
  g = new Attribute('green', intType);
  b = new Attribute('blue', intType);
  describe('on an empty heading', function() {
    var heading;
    heading = new Heading([]);
    return heading.size().should.equal(0);
  });
  describe('on an singleton heading', function() {
    var heading;
    heading = new Heading([r]);
    return heading.size().should.equal(1);
  });
  return describe('on an big heading', function() {
    var heading;
    heading = new Heading([r, g, b]);
    return heading.size().should.equal(3);
  });
});


},{"../../../lib/support/attribute":3,"../../../lib/support/heading":7,"should":18}],27:[function(require,module,exports){
var Attribute, Heading, should;

Attribute = require('../../../lib/support/attribute');

Heading = require('../../../lib/support/heading');

should = require('should');

describe("Heading#toName", function() {
  var subject;
  subject = function(attributes) {
    return new Heading(attributes).toName();
  };
  describe('with no attribute', function() {
    return subject([]).should.equal('');
  });
  describe('with one attribute', function() {
    var attributes;
    attributes = [new Attribute('red', intType)];
    return subject(attributes).should.equal('red: intType');
  });
  return describe('with multiple attributes', function() {
    var attributes;
    attributes = [new Attribute('red', intType), new Attribute('blue', floatType)];
    return subject(attributes).should.equal('red: intType, blue: floatType');
  });
});


},{"../../../lib/support/attribute":3,"../../../lib/support/heading":7,"should":18}],28:[function(require,module,exports){
var Qjs, SubType, Type, TypeError, should;

Qjs = require('../../lib/qjs');

Type = require('../../lib/type');

SubType = require('../../lib/type/sub_type');

TypeError = require('../../lib/errors').TypeError;

should = require('should');

describe('Qjs', function() {
  it("should have a version number", function() {
    (typeof Qjs.VERSION).should.not.equal('undefined');
    return (Qjs.VERSION != null).should.be["true"];
  });
  return it('should have DSL methods', function() {
    var e, lambda, t;
    t = Qjs.type(Number, function(i) {
      return i >= 0;
    });
    t.should.be.an["instanceof"](SubType);
    t.dress(12).should.equal(12);
    lambda = function() {
      return t.dress(-12);
    };
    expect(lambda).toThrow();
    try {
      return lambda();
    } catch (_error) {
      e = _error;
      return e.should.be.an["instanceof"](TypeError);
    }
  });
});


},{"../../lib/errors":1,"../../lib/qjs":2,"../../lib/type":9,"../../lib/type/sub_type":15,"should":18}],29:[function(require,module,exports){
var BuiltinType, SubType, boolType, byteType, floatType, intType, numType, stringType, _;

BuiltinType = require('../../lib/type/builtin_type');

SubType = require('../../lib/type/sub_type');

_ = require('underscore');

numType = new BuiltinType(Number, 'numType');

boolType = new BuiltinType(Boolean, 'boolType');

stringType = new BuiltinType(String, 'stringType');

intType = new SubType(numType, {
  noDecimal: function(i) {
    return i % 1 === 0;
  },
  noDot: function(i) {
    return i.toString().indexOf('.') === -1;
  }
}, 'intType');

floatType = new SubType(numType, {
  hasDecimal: function(i) {
    return i % 1 !== 0;
  },
  hasDot: function(i) {
    return i.toString().indexOf('.') !== -1;
  }
}, 'floatType');

byteType = new SubType(intType, {
  byte: function(i) {
    return i >= 0 && i <= 255;
  }
});

module.exports = {
  numType: numType,
  boolType: boolType,
  stringType: stringType,
  intType: intType,
  floatType: floatType,
  byteType: byteType
};


},{"../../lib/type/builtin_type":11,"../../lib/type/sub_type":15,"underscore":18}],30:[function(require,module,exports){
var ArgumentError, Error, System, should, _ref;

_ref = require('../../../lib/errors'), ArgumentError = _ref.ArgumentError, Error = _ref.Error;

System = require('../../../lib/system');

should = require('should');

describe("System#addType", function() {
  describe('with a valid type', function() {
    var res, system;
    system = new System;
    res = system.addType(numType);
    it('should return the created type', function() {
      return res.should.equal(numType);
    });
    return it('should add the type', function() {
      return system[numType.name].should.equal(numType);
    });
  });
  describe('with an invalid type', function() {
    var lambda, system;
    system = new System;
    lambda = function() {
      return system.addType("foo");
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](ArgumentError);
      return err.message.should.equal('Qjs.Type expected, got String');
    });
  });
  return describe('with a duplicate type name', function() {
    var lambda, system;
    system = new System;
    system.addType(numType);
    lambda = function() {
      return system.addType(numType);
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](Error);
      return err.message.should.equal("Duplicate type name `numType`");
    });
  });
});


},{"../../../lib/errors":1,"../../../lib/system":8,"should":18}],31:[function(require,module,exports){
var System, should;

System = require('../../../lib/system');

should = require('should');

describe("System#clone", function() {
  var subject, system;
  system = new System;
  system.addType(numType);
  subject = function() {
    return system.clone();
  };
  it('should return a System', function() {
    return subject().should.be.an["instanceof"](System);
  });
  it('should not be the same object', function() {
    var sys;
    sys = subject();
    return subject().should.not.equal(system);
  });
  it('should have numType', function() {
    return subject()['numType'].should.equal(numType);
  });
  return it('should not share internals with the original', function() {
    var clone;
    clone = subject();
    clone.addType(stringType);
    clone['stringType'].should.not.be["null"];
    return should.equal(system['stringType'], null);
  });
});


},{"../../../lib/system":8,"should":18}],32:[function(require,module,exports){
var System, should;

System = require('../../../lib/system');

should = require('should');

describe("System#constructor", function() {
  var subject;
  subject = new System();
  return it('should be a System', function() {
    return subject.should.be.an["instanceof"](System);
  });
});


},{"../../../lib/system":8,"should":18}],33:[function(require,module,exports){
var SubType, System, TupleType, TypeError, should;

TypeError = require('../../../lib/errors').TypeError;

System = require('../../../lib/system');

TupleType = require('../../../lib/type/tuple_type');

SubType = require('../../../lib/type/sub_type');

should = require('should');

describe("System#constructor", function() {
  var system;
  system = new System;
  describe('for building a tuple type', function() {
    var subject;
    subject = system.tuple({
      r: Number
    });
    return it('should be a TupleType', function() {
      return subject.should.be.an["instanceof"](TupleType);
    });
  });
  return describe('for building a sub type', function() {
    var subject;
    subject = system.subtype(Number, function(i) {
      return i >= 0;
    });
    it('should be a SubType', function() {
      return subject.should.be.an["instanceof"](SubType);
    });
    return it('should apply the constraint', function() {
      var e, err, lambda;
      lambda = function() {
        return subject.dress(-9);
      };
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      return err.should.be.an["instanceof"](TypeError);
    });
  });
});


},{"../../../lib/errors":1,"../../../lib/system":8,"../../../lib/type/sub_type":15,"../../../lib/type/tuple_type":16,"should":18}],34:[function(require,module,exports){
var KeyError, System, TupleType, should;

KeyError = require('../../../lib/errors').KeyError;

System = require('../../../lib/system');

TupleType = require('../../../lib/type/tuple_type');

should = require('should');

describe('System#fetch', function() {
  var subject, system;
  system = new System;
  beforeEach(function() {
    system = new System;
    return system.addType(numType);
  });
  subject = function(name) {
    return system.fetch(name);
  };
  describe('with an existing type name', function() {
    return it('should return the type', function() {
      return subject("numType").should.equal(numType);
    });
  });
  describe('with a non existing type name and no callback', function() {
    var lambda, name;
    name = "noSuchOne";
    lambda = function() {
      return subject(name);
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](KeyError);
      return err.message.should.match(/noSuchOne/);
    });
  });
  return describe('with a non existing type name and a callback', function() {
    var lambda;
    lambda = function() {
      return system.fetch("noSuchOne", function() {
        return "bar";
      });
    };
    return it('should call the callback', function() {
      return lambda().should.equal("bar");
    });
  });
});


},{"../../../lib/errors":1,"../../../lib/system":8,"../../../lib/type/tuple_type":16,"should":18}],35:[function(require,module,exports){
var System, TupleType, should;

System = require('../../../lib/system');

TupleType = require('../../../lib/type/tuple_type');

should = require('should');

describe("System#[]", function() {
  var subject, system;
  system = new System;
  beforeEach(function() {
    system = new System;
    return system.addType(numType);
  });
  subject = function(name) {
    return system[name];
  };
  describe('with an existing type name', function() {
    var name;
    name = "numType";
    return it('should return the type', function() {
      return subject(name).should.equal(numType);
    });
  });
  return describe('with a non existing type name', function() {
    var name;
    name = "noSuchOne";
    return it('should return nil', function() {
      return should.equal(subject(name), null);
    });
  });
});


},{"../../../lib/system":8,"../../../lib/type/tuple_type":16,"should":18}],36:[function(require,module,exports){
var AdType, ArgumentError, TypeError, should, _ref;

AdType = require('../../../../lib/type/ad_type');

_ref = require('../../../../lib/errors'), TypeError = _ref.TypeError, ArgumentError = _ref.ArgumentError;

should = require('should');

describe("AdType#constructor", function() {
  var subject;
  subject = new AdType(Date, {
    timestamp: [intType, Date],
    utc_string: [stringType, Date]
  });
  describe('with valid arguments', function() {
    subject.should.be.an["instanceof"](AdType);
    return it('should set the instance variables', function() {
      subject.jsType.should.equal(Date);
      return (typeof subject.contracts).should.equal("object");
    });
  });
  describe('with invalid arguments (I)', function() {
    var lambda;
    lambda = function() {
      return new AdType("foo", {});
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](ArgumentError);
      return err.message.should.equal('Constructor (function) expected, got String');
    });
  });
  return describe('with invalid arguments (II)', function() {
    var lambda;
    lambda = function() {
      return new AdType(Date, "bar");
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](ArgumentError);
      return err.message.should.equal("Hash expected, got String");
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/ad_type":10,"should":18}],37:[function(require,module,exports){
var AdType, should;

AdType = require('../../../../lib/type/ad_type');

should = require('should');

describe("AdType#defaultName", function() {
  var type;
  type = new AdType(Date, {
    timestamp: [intType, Date],
    utc_string: [stringType, Date]
  });
  return type.name.should.equal('Date');
});


},{"../../../../lib/type/ad_type":10,"should":18}],38:[function(require,module,exports){
var AdType, ArgumentError, TypeError, should, _ref;

AdType = require('../../../../lib/type/ad_type');

_ref = require('../../../../lib/errors'), TypeError = _ref.TypeError, ArgumentError = _ref.ArgumentError;

should = require('should');

describe("AdType#dress", function() {
  var subject, type;
  type = new AdType(Date, {
    timestamp: [
      intType, function(i) {
        return i * 2;
      }
    ],
    utc_string: [
      stringType, function(s) {
        return "foo";
      }
    ]
  });
  subject = function(arg) {
    return type.dress(arg);
  };
  describe('with a date', function() {
    var d;
    d = new Date();
    return subject(d).should.equal(d);
  });
  describe('with an integer', function() {
    return subject(12).should.equal(24);
  });
  describe('with a string', function() {
    return subject("bar").should.equal("foo");
  });
  describe('with an unrecognized', function() {
    var lambda;
    lambda = function() {
      return subject([]);
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow();
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](TypeError);
      return err.message.should.equal("Invalid value `[]` for Date");
    });
  });
  return describe('when the upper raises an error', function() {
    type = new AdType(Date, {
      timestamp: [
        intType, function(t) {
          throw new ArgumentError;
        }
      ]
    });
    return it('should hide the error', function() {
      var e, err;
      err = (function() {
        try {
          return type.dress(12);
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](TypeError);
      return err.message.should.equal("Invalid value `12` for Date");
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/ad_type":10,"should":18}],39:[function(require,module,exports){
var AdType, should;

AdType = require('../../../../lib/type/ad_type');

should = require('should');

describe("AdType#include", function() {
  var type;
  type = new AdType(Date, {});
  describe('when not included', function() {
    return type.include("12").should.be["false"];
  });
  return describe('when included', function() {
    return type.include(new Date()).should.be["true"];
  });
});


},{"../../../../lib/type/ad_type":10,"should":18}],40:[function(require,module,exports){
var AdType, ArgumentError, TypeError, should, _ref;

AdType = require('../../../../lib/type/ad_type');

_ref = require('../../../../lib/errors'), TypeError = _ref.TypeError, ArgumentError = _ref.ArgumentError;

should = require('should');

describe("AdType#name", function() {
  describe('when provided', function() {
    var type;
    type = new AdType(Date, {}, "Foo");
    return type.name.should.equal("Foo");
  });
  return describe('when not provided', function() {
    var type;
    type = new AdType(Date, {});
    return type.name.should.equal("Date");
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/ad_type":10,"should":18}],41:[function(require,module,exports){
var BuiltinType, should;

BuiltinType = require('../../../../lib/type/builtin_type');

should = require('should');

describe("BuiltinType#constructor", function() {
  var type;
  type = new BuiltinType(Number);
  return it('should set instance variables', function() {
    return type.jsType.should.equal(Number);
  });
});


},{"../../../../lib/type/builtin_type":11,"should":18}],42:[function(require,module,exports){
var BuiltinType, should;

BuiltinType = require('../../../../lib/type/builtin_type');

should = require('should');

describe('BuiltinType#defaultName', function() {
  var type;
  type = new BuiltinType(Number, "num");
  return it('uses the native name', function() {
    return type.defaultName().should.equal("Number");
  });
});


},{"../../../../lib/type/builtin_type":11,"should":18}],43:[function(require,module,exports){
var BuiltinType, TypeError;

BuiltinType = require('../../../../lib/type/builtin_type');

TypeError = require('../../../../lib/errors').TypeError;

describe("BuiltinType#dress", function() {
  var subject, type;
  type = new BuiltinType(Number, 'num');
  subject = function(arg) {
    return type.dress(arg);
  };
  describe('with an integer', function() {
    return subject(12).should.equal(12);
  });
  describe('with a float', function() {
    return subject(3.14).should.equal(3.14);
  });
  return describe('with a String', function() {
    var lambda;
    lambda = function() {
      return subject("Hello World!");
    };
    it('should throw an Error', function() {
      return expect(lambda).toThrow();
    });
    return it('should throw a TypeError', function() {
      var e, error;
      error = null;
      try {
        lambda();
      } catch (_error) {
        e = _error;
        error = e;
      }
      error.should.be.an["instanceof"](TypeError);
      error.message.should.equal("Invalid value `Hello World!` for num");
      return error.location.should.equal('');
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/builtin_type":11}],44:[function(require,module,exports){
var BuiltinType, should;

BuiltinType = require('../../../../lib/type/builtin_type');

should = require('should');

describe('BuiltinType#equals', function() {
  var numType, numType2, strType;
  numType = new BuiltinType(Number);
  numType2 = new BuiltinType(Number);
  strType = new BuiltinType(String);
  it('should apply structural equality', function() {
    return numType.equals(numType2).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    return numType.equals(strType).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return numType.equals(12).should.be["false"];
  });
});


},{"../../../../lib/type/builtin_type":11,"should":18}],45:[function(require,module,exports){
var BuiltinType, TypeError, should;

BuiltinType = require('../../../../lib/type/builtin_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe("BuiltinType#include", function() {
  var subject, type;
  type = new BuiltinType(Number);
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when not included', function() {
    return subject("12").should.be["false"];
  });
  return describe('when included', function() {
    return subject(12).should.be["true"];
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/builtin_type":11,"should":18}],46:[function(require,module,exports){
var BuiltinType, TypeError, should;

BuiltinType = require('../../../../lib/type/builtin_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe('BuiltinType#name', function() {
  var nameOf;
  nameOf = function(type) {
    return type.name;
  };
  describe('when not provided', function() {
    var subject;
    subject = nameOf(new BuiltinType(Number));
    return it('uses the default name', function() {
      return subject.should.equal("Number");
    });
  });
  return describe('when provided', function() {
    var subject;
    subject = nameOf(new BuiltinType(Number, "num"));
    return it('uses the specified name', function() {
      return subject.should.equal("num");
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/builtin_type":11,"should":18}],47:[function(require,module,exports){
var ArgumentError, Attribute, Heading, RelationType, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

RelationType = require('../../../../lib/type/relation_type');

ArgumentError = require('../../../../lib/errors').ArgumentError;

should = require('should');

describe("RelationType#initialize", function() {
  var heading;
  heading = new Heading([new Attribute('a', intType)]);
  describe('with a valid heading', function() {
    var subject;
    subject = new RelationType(heading);
    return subject.should.be.an["instanceof"](RelationType);
  });
  return describe('with an invalid heading', function() {
    var lambda;
    lambda = function() {
      var e;
      try {
        return new RelationType("foo", "bar");
      } catch (_error) {
        e = _error;
        return e;
      }
    };
    return it('should raise an error', function() {
      var e;
      e = lambda();
      e.should.be.an["instanceof"](ArgumentError);
      return e.message.should.equal("Heading expected, got String");
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/relation_type":12,"should":18}],48:[function(require,module,exports){
var Attribute, Heading, RelationType, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

RelationType = require('../../../../lib/type/relation_type');

should = require('should');

describe("RelationType#default_name", function() {
  var heading, subject, type;
  heading = new Heading([new Attribute('a', byteType)]);
  type = new RelationType(heading);
  subject = type.defaultName();
  return subject.should.equal("{{a: Byte}}");
});


},{"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/relation_type":12,"should":18}],49:[function(require,module,exports){
var Attribute, Heading, RelationType, TypeError, should, _;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

RelationType = require('../../../../lib/type/relation_type');

TypeError = require('../../../../lib/errors').TypeError;

_ = require('underscore');

should = require('should');

describe("RelationType#dress", function() {
  var factor, heading, type;
  heading = new Heading([new Attribute('r', byteType), new Attribute('g', byteType), new Attribute('b', byteType)]);
  type = new RelationType(heading, "colors");
  factor = function(arg) {
    return type.dress(arg);
  };
  describe('with a valid array of Hashes', function() {
    var expected, subject;
    subject = factor([
      {
        "r": 12,
        "g": 13,
        "b": 255
      }, {
        "r": 12,
        "g": 15,
        "b": 198
      }
    ]);
    expected = [
      {
        r: 12,
        g: 13,
        b: 255
      }, {
        r: 12,
        g: 15,
        b: 198
      }
    ];
    return it('should coerce to an array of tuples', function() {
      return _.isEqual(subject, expected).should.be["true"];
    });
  });
  describe('with an empty array', function() {
    var expected, subject;
    subject = factor([]);
    expected = [];
    return it('should coerce to an array of tuples', function() {
      return _.isEqual(subject, expected).should.be["true"];
    });
  });
  return describe('when raising an error', function() {
    var lambda;
    lambda = function(arg) {
      var e;
      try {
        return type.dress(arg);
      } catch (_error) {
        e = _error;
        return e;
      }
    };
    describe('with something else than an Array', function() {
      var subject;
      subject = lambda("foo");
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `foo` for colors");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have an empty location', function() {
        return subject.location.should.equal('');
      });
    });
    describe('with Array of non-tuples', function() {
      var subject;
      subject = lambda(["foo"]);
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `foo` for {r: Byte, g: Byte, b: Byte}");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have the correct location', function() {
        return subject.location.should.equal('0');
      });
    });
    describe('with a wrong tuple', function() {
      var subject;
      subject = lambda([
        {
          "r": 12,
          "g": 13,
          "b": 255
        }, {
          "r": 12,
          "g": 13
        }
      ]);
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Missing attribute `b`");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have the correct location', function() {
        return subject.location.should.equal('1');
      });
    });
    describe('with a wrong tuple attribute', function() {
      var subject;
      subject = lambda([
        {
          "r": 12,
          "g": 13,
          "b": 255
        }, {
          "r": 12,
          "g": 13,
          "b": '12'
        }
      ]);
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `12` for Byte");
      });
      it('should have a cause', function() {
        return subject.cause.should.not.be["null"];
      });
      return it('should have the correct location', function() {
        return subject.location.should.equal('1/b');
      });
    });
    return describe('with a duplicate tuple', function() {
      var subject;
      subject = lambda([
        {
          "r": 12,
          "g": 13,
          "b": 255
        }, {
          "r": 12,
          "g": 192,
          "b": 13
        }, {
          "r": 12,
          "g": 13,
          "b": 255
        }
      ]);
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Duplicate tuple");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have the correct location', function() {
        return subject.location.should.equal('2');
      });
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/relation_type":12,"should":18,"underscore":18}],50:[function(require,module,exports){
var Attribute, Heading, RelationType, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

RelationType = require('../../../../lib/type/relation_type');

should = require('should');

describe("RelationType#equality", function() {
  var h1, h2, h3, type1, type2, type3;
  h1 = new Heading([new Attribute('r', intType), new Attribute('b', intType)]);
  h2 = new Heading([new Attribute('b', intType), new Attribute('r', intType)]);
  h3 = new Heading([new Attribute('b', intType)]);
  type1 = new RelationType(h1);
  type2 = new RelationType(h2);
  type3 = new RelationType(h3);
  it('should apply structural equality', function() {
    type1.equals(type2).should.be["true"];
    return type2.equals(type1).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    type1.equals(type3).should.be["false"];
    return type2.equals(type3).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return type1.equals(12).should.be["false"];
  });
});


},{"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/relation_type":12,"should":18}],51:[function(require,module,exports){
var Attribute, Heading, RelationType, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

RelationType = require('../../../../lib/type/relation_type');

should = require('should');

describe("RelationType#include", function() {
  var heading, subject, type;
  heading = new Heading([new Attribute('a', intType)]);
  type = new RelationType(heading);
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when an empty set', function() {
    return subject({}).should.be["true"];
  });
  describe('when a valid, non empty set', function() {
    var arg;
    arg = {
      a: 14
    };
    return subject(arg).should.be["true"];
  });
  describe('when not a set', function() {
    return subject("foo").should.be["false"];
  });
  return describe('when a set containing invalid tuples', function() {
    var arg;
    arg = {
      a: "foo"
    };
    return subject(arg).should.be["false"];
  });
});


},{"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/relation_type":12,"should":18}],52:[function(require,module,exports){
var Attribute, Heading, RelationType, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

RelationType = require('../../../../lib/type/relation_type');

should = require('should');

describe("RelationType#name", function() {
  var heading, subject;
  heading = new Heading([new Attribute('a', byteType)]);
  subject = function(type) {
    return type.name;
  };
  describe('when not provided', function() {
    var type;
    type = new RelationType(heading);
    return subject(type).should.equal("{{a: Byte}}");
  });
  return describe('when provided', function() {
    var type;
    type = new RelationType(heading, "colors");
    return subject(type).should.equal("colors");
  });
});


},{"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/relation_type":12,"should":18}],53:[function(require,module,exports){
var ArgumentError, SeqType, TypeError, should, _, _ref;

SeqType = require('../../../../lib/type/seq_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SeqType#initialize", function() {
  var subject;
  subject = new SeqType(intType);
  describe('with valid arguments', function() {
    subject.should.be.an["instanceof"](SeqType);
    return it('should set the instance variables', function() {
      return subject.elmType.should.equal(intType);
    });
  });
  return describe('with invalid arguments', function() {
    var lambda;
    lambda = function() {
      return new SeqType("foo");
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow;
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](ArgumentError);
      return err.message.should.equal('Qjs.Type expected, got String');
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/seq_type":13,"should":18,"underscore":18}],54:[function(require,module,exports){
var SeqType, should;

SeqType = require('../../../../lib/type/seq_type');

should = require('should');

describe("SeqType#defaultName", function() {
  var subject, type;
  type = new SeqType(intType, "foo");
  subject = type.defaultName();
  return subject.should.equal('[intType]');
});


},{"../../../../lib/type/seq_type":13,"should":18}],55:[function(require,module,exports){
var ArgumentError, SeqType, TypeError, should, _, _ref;

SeqType = require('../../../../lib/type/seq_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SeqType#dress", function() {
  var subject, type;
  type = new SeqType(byteType);
  subject = function(arg) {
    return type.dress(arg);
  };
  describe('with an empty array', function() {
    var res;
    res = subject([]);
    return _.isEqual(res, []).should.be["true"];
  });
  describe('with a valid array', function() {
    var res;
    res = subject([12, 16]);
    return _.isEqual(res, [12, 16]).should.be["true"];
  });
  describe('with something else than array', function() {
    var e, lambda;
    lambda = function() {
      return subject("foo");
    };
    expect(lambda).toThrow();
    try {
      return lambda();
    } catch (_error) {
      e = _error;
      e.should.be.an["instanceof"](TypeError);
      return e.message.should.equal("Invalid value `foo` for [Byte]");
    }
  });
  return describe('with an array with non bytes', function() {
    var arg, e;
    arg = [2, 4, -12];
    subject = (function() {
      try {
        return type.dress(arg);
      } catch (_error) {
        e = _error;
        return e;
      }
    })();
    it('should raise an error', function() {
      subject.should.be.an["instanceof"](TypeError);
      return subject.message.should.equal("Invalid value `-12` for Byte");
    });
    return it('should have correct location', function() {
      return subject.location.should.equal("2");
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/seq_type":13,"should":18,"underscore":18}],56:[function(require,module,exports){
var ArgumentError, SeqType, TypeError, should, _, _ref;

SeqType = require('../../../../lib/type/seq_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SeqType#equality", function() {
  var type, type2, type3;
  type = new SeqType(intType);
  type2 = new SeqType(intType);
  type3 = new SeqType(floatType);
  it('should apply structural equality', function() {
    return type.equals(type2).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    return type.equals(type3).should.be["false"];
  });
  return it('should be a total function, with false for non types', function() {
    return type.equals(12).should.be["false"];
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/seq_type":13,"should":18,"underscore":18}],57:[function(require,module,exports){
var ArgumentError, SeqType, TypeError, should, _, _ref;

SeqType = require('../../../../lib/type/seq_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SeqType#include", function() {
  var subject, type;
  type = new SeqType(intType);
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when included on empty array', function() {
    return subject([]).should.be["true"];
  });
  describe('when included on non empty array', function() {
    return subject([12]).should.be["true"];
  });
  describe('when not an array', function() {
    return subject({}).should.be["false"];
  });
  return describe('when an array with non ints', function() {
    return subject([12, "foo"]).should.be["false"];
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/seq_type":13,"should":18,"underscore":18}],58:[function(require,module,exports){
var SeqType, should, _;

SeqType = require('../../../../lib/type/seq_type');

_ = require('underscore');

should = require('should');

describe("SeqType#name", function() {
  describe('when not specified', function() {
    var type;
    type = new SeqType(intType);
    return type.name.should.equal('[intType]');
  });
  return describe('when specified', function() {
    var type;
    type = new SeqType(intType, "foo");
    return type.name.should.equal('foo');
  });
});


},{"../../../../lib/type/seq_type":13,"should":18,"underscore":18}],59:[function(require,module,exports){
var ArgumentError, SetType, TypeError, should, _, _ref;

SetType = require('../../../../lib/type/set_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SetType#initialize", function() {
  var subject;
  subject = new SetType(intType);
  describe('with valid arguments', function() {
    subject.should.be.an["instanceof"](SetType);
    return it('should set the instance variables', function() {
      return subject.elmType.should.equal(intType);
    });
  });
  return describe('with invalid arguments', function() {
    var lambda;
    lambda = function() {
      return new SetType("foo");
    };
    return it('should raise an error', function() {
      var e, err;
      expect(lambda).toThrow;
      err = (function() {
        try {
          return lambda();
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      err.should.be.an["instanceof"](ArgumentError);
      return err.message.should.equal('Qjs.Type expected, got String');
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/set_type":14,"should":18,"underscore":18}],60:[function(require,module,exports){
var SetType, should;

SetType = require('../../../../lib/type/set_type');

should = require('should');

describe("SetType#defaultName", function() {
  var subject, type;
  type = new SetType(intType, "foo");
  subject = type.defaultName();
  return subject.should.equal('{intType}');
});


},{"../../../../lib/type/set_type":14,"should":18}],61:[function(require,module,exports){
var ArgumentError, SetType, TypeError, should, _, _ref;

SetType = require('../../../../lib/type/set_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SetType#dress", function() {
  var subject, type;
  type = new SetType(byteType);
  subject = function(arg) {
    return type.dress(arg);
  };
  describe('with an empty array', function() {
    var res;
    res = subject([]);
    return _.isEqual(res, []).should.be["true"];
  });
  describe('with a valid array', function() {
    var res;
    res = subject([12, 16]);
    return _.isEqual(res, [12, 16]).should.be["true"];
  });
  describe('with something else than array', function() {
    var e, lambda;
    lambda = function() {
      return subject("foo");
    };
    expect(lambda).toThrow();
    try {
      return lambda();
    } catch (_error) {
      e = _error;
      e.should.be.an["instanceof"](TypeError);
      return e.message.should.equal("Invalid value `foo` for {Byte}");
    }
  });
  return describe('when invalid', function() {
    describe('with an array with non bytes', function() {
      var arg, e;
      arg = [2, 4, -12];
      subject = (function() {
        try {
          return type.dress(arg);
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      it('should raise an error', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `-12` for Byte");
      });
      return it('should have correct location', function() {
        return subject.location.should.equal("2");
      });
    });
    return describe('with an array with duplicates', function() {
      var arg2, e, subject2;
      arg2 = [2, 4, 2];
      subject2 = (function() {
        try {
          return type.dress(arg2);
        } catch (_error) {
          e = _error;
          return e;
        }
      })();
      it('should raise an error', function() {
        subject2.should.be.an["instanceof"](TypeError);
        return subject2.message.should.equal("Duplicate value `2`");
      });
      return it('should have correct location', function() {
        return subject2.location.should.equal("2");
      });
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/set_type":14,"should":18,"underscore":18}],62:[function(require,module,exports){
var ArgumentError, SetType, TypeError, should, _, _ref;

SetType = require('../../../../lib/type/set_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SetType#equality", function() {
  var type, type2, type3;
  type = new SetType(intType);
  type2 = new SetType(intType);
  type3 = new SetType(floatType);
  it('should apply structural equality', function() {
    return type.equals(type2).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    return type.equals(type3).should.be["false"];
  });
  return it('should be a total function, with false for non types', function() {
    return type.equals(12).should.be["false"];
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/set_type":14,"should":18,"underscore":18}],63:[function(require,module,exports){
var ArgumentError, SetType, TypeError, should, _, _ref;

SetType = require('../../../../lib/type/set_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

should = require('should');

describe("SetType#include", function() {
  var subject, type;
  type = new SetType(intType);
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when included on empty array', function() {
    return subject([]).should.be["true"];
  });
  describe('when included on non empty array', function() {
    return subject([12]).should.be["true"];
  });
  describe('when not an array', function() {
    return subject({}).should.be["false"];
  });
  describe('when an array with non ints', function() {
    return subject([12, "foo"]).should.be["false"];
  });
  return describe('when an array with duplicates', function() {
    return subject([12, 12]).should.be["false"];
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/set_type":14,"should":18,"underscore":18}],64:[function(require,module,exports){
var SetType, should, _;

SetType = require('../../../../lib/type/set_type');

_ = require('underscore');

should = require('should');

describe("SetType#name", function() {
  describe('when not specified', function() {
    var type;
    type = new SetType(intType);
    return type.name.should.equal('{intType}');
  });
  return describe('when specified', function() {
    var type;
    type = new SetType(intType, "foo");
    return type.name.should.equal('foo');
  });
});


},{"../../../../lib/type/set_type":14,"should":18,"underscore":18}],65:[function(require,module,exports){
var SubType, should, _;

SubType = require('../../../../lib/type/sub_type');

should = require('should');

_ = require('underscore');

describe("SubType#constructor", function() {
  var c1, c2, sub;
  c1 = function(i) {
    return i > 0;
  };
  c2 = function(i) {
    return i < 255;
  };
  sub = new SubType(numType, {
    positive: c1,
    small: c2
  });
  return it('sets the variable instances', function() {
    sub.superType.should.equal(numType);
    return _.isEqual(sub.constraints, {
      positive: c1,
      small: c2
    }).should.be["true"];
  });
});


},{"../../../../lib/type/sub_type":15,"should":18,"underscore":18}],66:[function(require,module,exports){
var SubType, should;

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe('SubType#defaultName', function() {
  var type;
  type = new SubType(numType, {
    posint: function(i) {}
  });
  return it('uses the first constraint name', function() {
    return type.defaultName().should.equal("Posint");
  });
});


},{"../../../../lib/type/sub_type":15,"should":18}],67:[function(require,module,exports){
var SubType, TypeError, should;

SubType = require('../../../../lib/type/sub_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe("SubType#dress", function() {
  var factor, type, _default, _small;
  _default = function(i) {
    return i > 0;
  };
  _small = function(i) {
    return i < 255;
  };
  type = new SubType(numType, {
    "default": _default,
    small: _small
  }, "byte");
  factor = function(arg) {
    return type.dress(arg);
  };
  describe('with a valid Number', function() {
    return factor(12).should.equal(12);
  });
  return describe('when raising an Error', function() {
    factor = function(arg) {
      var e;
      try {
        return type.dress(arg);
      } catch (_error) {
        e = _error;
        return e;
      }
    };
    describe('with a Boolean', function() {
      var subject;
      subject = factor(true);
      it('should raise an Error', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `true` for byte");
      });
      it("should have the proper cause from super type's up", function() {
        subject.cause.should.be.an["instanceof"](TypeError);
        return subject.cause.message.should.equal("Invalid value `true` for numType");
      });
      return it("should have an empty location", function() {
        return subject.location.should.equal('');
      });
    });
    describe('with a negative Number', function() {
      var subject;
      subject = factor(-12);
      it('should raise an Error', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `-12` for byte");
      });
      it("should have no cause", function() {
        return should.equal(subject.cause, null);
      });
      return it("should have an empty location", function() {
        return subject.location.should.equal('');
      });
    });
    return describe('with a non small Number', function() {
      var subject;
      subject = factor(1000);
      it('should raise an Error', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `1000` for byte (not small)");
      });
      it("should have no cause", function() {
        return should.equal(subject.cause, null);
      });
      return it("should have an empty location", function() {
        return subject.location.should.equal('');
      });
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/sub_type":15,"should":18}],68:[function(require,module,exports){
var SubType, should;

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe('SubType#equals', function() {
  var c1, c2, type, type2, type3, type4, type5;
  c1 = function(i) {
    return i > 0;
  };
  c2 = function(i) {
    return i < 255;
  };
  type = new SubType(numType, {
    "default": c1
  });
  type2 = new SubType(numType, {
    "default": c1
  });
  type3 = new SubType(numType, {
    another_name: c1
  });
  type4 = new SubType(numType, {
    "default": c2
  });
  type5 = new SubType(stringType, {
    "default": c1
  });
  it('should apply structural equality', function() {
    type.equals(type2).should.be["true"];
    return type.equals(type3).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    type.equals(type4).should.be["false"];
    return type.equals(type5).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return type.equals(12).should.be["false"];
  });
});


},{"../../../../lib/type/sub_type":15,"should":18}],69:[function(require,module,exports){
var SubType, should;

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe("SubType#include", function() {
  var subject, type;
  type = new SubType(intType, {
    "default": function(i) {
      return i > 0;
    },
    small: function(i) {
      return i < 255;
    }
  }, "byte");
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when included on int', function() {
    return subject(12).should.be["true"];
  });
  describe('when not included on int (I)', function() {
    return subject(-12).should.be["false"];
  });
  describe('when not included on int (II)', function() {
    return subject(255).should.be["false"];
  });
  return describe('when not included', function() {
    return subject("12").should.be["false"];
  });
});


},{"../../../../lib/type/sub_type":15,"should":18}],70:[function(require,module,exports){
var SubType, should;

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe("SubType#name", function() {
  var get;
  get = function(type) {
    return type.name;
  };
  describe('when provided', function() {
    var subject;
    subject = get(new SubType(numType, {
      positive: function(i) {}
    }, "Foo"));
    return it('uses the specified one', function() {
      return subject.should.equal("Foo");
    });
  });
  return describe('when not provided', function() {
    var subject;
    subject = get(new SubType(numType, {
      positive: function(i) {}
    }));
    return it('uses the first constraint name', function() {
      return subject.should.equal("Positive");
    });
  });
});


},{"../../../../lib/type/sub_type":15,"should":18}],71:[function(require,module,exports){
var ArgumentError, Attribute, Heading, TupleType, TypeError, should, _ref;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TupleType = require('../../../../lib/type/tuple_type');

_ref = require('../../../../lib/errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

should = require('should');

describe("TupleType#constructor", function() {
  var heading;
  heading = new Heading([new Attribute('a', intType)]);
  describe('with a valid heading', function() {
    var subject;
    subject = new TupleType(heading);
    subject.should.be.an["instanceof"](TupleType);
    return it('correctly sets the instance variable', function() {
      return subject.heading.equals(heading).should.be["true"];
    });
  });
  return describe('with an invalid heading', function() {
    var e, subject;
    subject = (function() {
      try {
        return new TupleType("foo");
      } catch (_error) {
        e = _error;
        return e;
      }
    })();
    return it('should raise an error', function() {
      subject.should.be.an["instanceof"](ArgumentError);
      return subject.message.should.equal("Heading expected, got String");
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/tuple_type":16,"should":18}],72:[function(require,module,exports){
var Attribute, Heading, TupleType, TypeError, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TupleType = require('../../../../lib/type/tuple_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe("TupleType#defaultName", function() {
  var heading, subject;
  heading = new Heading([new Attribute('a', byteType)]);
  subject = new TupleType(heading).defaultName();
  return subject.should.equal("{a: Byte}");
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/tuple_type":16,"should":18}],73:[function(require,module,exports){
var Attribute, Heading, TupleType, TypeError, should, _;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TupleType = require('../../../../lib/type/tuple_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

_ = require('underscore');

describe("TupleType#dress", function() {
  var heading, lambda, type;
  heading = new Heading([new Attribute('r', byteType), new Attribute('g', byteType), new Attribute('b', byteType)]);
  type = new TupleType(heading, "color");
  lambda = function(arg) {
    return type.dress(arg);
  };
  describe('with a valid Hash', function() {
    var subject;
    subject = lambda({
      r: 12,
      g: 13,
      b: 255
    });
    return it('should coerce to a tuple', function() {
      return _.isEqual(subject, {
        r: 12,
        g: 13,
        b: 255
      }).should.be["true"];
    });
  });
  return describe('when raising an error', function() {
    lambda = function(arg) {
      var e;
      try {
        return type.dress(arg);
      } catch (_error) {
        e = _error;
        return e;
      }
    };
    describe('with something else than a Hash', function() {
      var subject;
      subject = lambda("foo");
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `foo` for color");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have an empty location', function() {
        return subject.location.should.equal('');
      });
    });
    describe('with a missing attribute', function() {
      var subject;
      subject = lambda({
        r: 12,
        g: 13
      });
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Missing attribute `b`");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have an empty location', function() {
        return subject.location.should.equal('');
      });
    });
    describe('with an extra attribute', function() {
      var subject;
      subject = lambda({
        r: 12,
        g: 13,
        b: 255,
        extr: 165
      });
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Unrecognized attribute `extr`");
      });
      it('should have no cause', function() {
        return should.equal(subject.cause, null);
      });
      return it('should have an empty location', function() {
        return subject.location.should.equal('');
      });
    });
    return describe('with an invalid attribute', function() {
      var subject;
      subject = lambda({
        r: 'abc',
        g: 13,
        b: 255
      });
      it('should raise a TypeError', function() {
        subject.should.be.an["instanceof"](TypeError);
        return subject.message.should.equal("Invalid value `abc` for Byte");
      });
      it('should have the correct cause', function() {
        subject.cause.should.be.an["instanceof"](TypeError);
        return subject.cause.message.should.equal("Invalid value `abc` for intType");
      });
      return it('should have the correct location', function() {
        return subject.location.should.equal("r");
      });
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/tuple_type":16,"should":18,"underscore":18}],74:[function(require,module,exports){
var Attribute, Heading, TupleType, TypeError, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TupleType = require('../../../../lib/type/tuple_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe("TupleType#equality", function() {
  var h1, h2, h3, type1, type2, type3;
  h1 = new Heading([new Attribute('r', intType), new Attribute('b', intType)]);
  h2 = new Heading([new Attribute('b', intType), new Attribute('r', intType)]);
  h3 = new Heading([new Attribute('b', intType)]);
  type1 = new TupleType(h1);
  type2 = new TupleType(h2);
  type3 = new TupleType(h3);
  it('should apply structural equality', function() {
    type1.equals(type2).should.be["true"];
    return type2.equals(type1).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    type1.equals(type3).should.be["false"];
    return type2.equals(type3).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return should.equal(type1.equals(12), false);
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/tuple_type":16,"should":18}],75:[function(require,module,exports){
var Attribute, Heading, TupleType, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TupleType = require('../../../../lib/type/tuple_type');

should = require('should');

describe("TupleType#include", function() {
  var heading, subject, type;
  heading = new Heading([new Attribute('a', intType)]);
  type = new TupleType(heading);
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when a valid hash', function() {
    return subject({
      a: 12
    }).should.be["true"];
  });
  describe('when an invalid hash (too many attributes)', function() {
    return subject({
      a: 12,
      b: 15
    }).should.be["false"];
  });
  describe('when an invalid hash (too few attributes)', function() {
    return subject({
      b: 12
    }).should.be["false"];
  });
  return describe('when an invalid hash (wrong type)', function() {
    return subject({
      a: "12"
    }).should.be["false"];
  });
});


},{"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/tuple_type":16,"should":18}],76:[function(require,module,exports){
var Attribute, Heading, TupleType, TypeError, should;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TupleType = require('../../../../lib/type/tuple_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe("TupleType#name", function() {
  var heading;
  heading = new Heading([new Attribute('a', byteType)]);
  describe('when not provided', function() {
    var t;
    t = new TupleType(heading);
    return t.name.should.equal("{a: Byte}");
  });
  return describe('when provided', function() {
    var t;
    t = new TupleType(heading, "Color");
    return t.name.should.equal("Color");
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/attribute":3,"../../../../lib/support/heading":7,"../../../../lib/type/tuple_type":16,"should":18}],77:[function(require,module,exports){
var ArgumentError, UnionType, should, _;

ArgumentError = require('../../../../lib/errors').ArgumentError;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

_ = require('underscore');

describe("UnionType#constructor", function() {
  describe('with valid candidates', function() {
    var union;
    union = new UnionType([intType, floatType]);
    return it('sets the variable instances', function() {
      return _.isEqual(union.candidates, [intType, floatType]).should.be["true"];
    });
  });
  return describe('with invalid candidates', function() {
    var lambda;
    lambda = function() {
      var union;
      return union = new UnionType(["bar"]);
    };
    it('should throw an error', function() {
      return expect(lambda).toThrow();
    });
    return it('should throw an ArgumentError', function() {
      var e;
      try {
        return lambda();
      } catch (_error) {
        e = _error;
        e.should.be.an["instanceof"](ArgumentError);
        return e.message.should.equal('Qjs.Type expected, got String');
      }
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/union_type":17,"should":18,"underscore":18}],78:[function(require,module,exports){
var UnionType, should;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

describe("UnionType#defaultName", function() {
  var type;
  type = new UnionType([intType, floatType]);
  return type.defaultName().should.equal('intType|floatType');
});


},{"../../../../lib/type/union_type":17,"should":18}],79:[function(require,module,exports){
var TypeError, UnionType, should;

TypeError = require('../../../../lib/errors').TypeError;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

describe("UnionType#dress", function() {
  var type;
  type = new UnionType([intType, floatType], "union");
  describe('with an Integer', function() {
    var subject;
    subject = type.dress(12);
    return subject.should.equal(12);
  });
  describe('with a Float', function() {
    var subject;
    subject = type.dress(3.14);
    return subject.should.equal(3.14);
  });
  return describe('with a String', function() {
    var e, subject;
    subject = (function() {
      try {
        return type.dress("foo");
      } catch (_error) {
        e = _error;
        return e;
      }
    })();
    it('should raise an Error', function() {
      subject.should.be.an["instanceof"](TypeError);
      return subject.message.should.equal("Invalid value `foo` for union");
    });
    it('should have no cause', function() {
      return should.equal(subject.cause, null);
    });
    return it('should have an empty location', function() {
      return subject.location.should.equal('');
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/type/union_type":17,"should":18}],80:[function(require,module,exports){
var UnionType, should;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

describe("UnionType#equality", function() {
  var uType, uType2, uType3, uType4;
  uType = new UnionType([intType, floatType]);
  uType2 = new UnionType([floatType, intType]);
  uType3 = new UnionType([floatType, intType]);
  uType4 = new UnionType([intType]);
  it('should apply structural equality', function() {
    uType.equals(uType2).should.be["true"];
    uType.equals(uType3).should.be["true"];
    return uType2.equals(uType3).should.be["true"];
  });
  it('should apply distinguish different types', function() {
    uType.equals(uType4).should.be["false"];
    return uType.equals(intType).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return uType.equals(12).should.be["false"];
  });
});


},{"../../../../lib/type/union_type":17,"should":18}],81:[function(require,module,exports){
var UnionType, should;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

describe("UnionType#include", function() {
  var subject, type;
  type = new UnionType([intType, floatType]);
  subject = function(arg) {
    return type.include(arg);
  };
  describe('when not included', function() {
    return subject("12").should.be["false"];
  });
  describe('when included on int', function() {
    return subject(12).should.be["true"];
  });
  return describe('when included on float', function() {
    return subject(12.0).should.be["true"];
  });
});


},{"../../../../lib/type/union_type":17,"should":18}],82:[function(require,module,exports){
var UnionType, should;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

describe("UnionType#name", function() {
  describe('when not provided', function() {
    var type;
    type = new UnionType([intType, floatType]);
    return type.name.should.equal('intType|floatType');
  });
  return describe('when provided', function() {
    var type;
    type = new UnionType([intType, floatType], "union");
    return type.name.should.equal('union');
  });
});


},{"../../../../lib/type/union_type":17,"should":18}],83:[function(require,module,exports){
var TypeFactory, should;

TypeFactory = require('../../../../lib/support/factory');

should = require('should');

describe('TypeFactory#builtin', function() {
  var factory;
  factory = new TypeFactory;
  describe('when used with a JS class', function() {
    var subject;
    subject = factory.type(Number);
    return subject.equals(numType).should.be["true"];
  });
  return describe('when used with a JS class and a name', function() {
    var subject;
    subject = factory.type(Number, 'Num');
    subject.equals(numType).should.be["true"];
    return it('should have the correct name', function() {
      return subject.name.should.equal("Num");
    });
  });
});


},{"../../../../lib/support/factory":6,"should":18}],84:[function(require,module,exports){
var SeqType, TypeFactory, should;

TypeFactory = require('../../../../lib/support/factory');

SeqType = require('../../../../lib/type/seq_type');

should = require('should');

describe("TypeFactory#seq", function() {
  var factory;
  factory = new TypeFactory;
  describe('for sequences of scalars', function() {
    var expected;
    expected = new SeqType(numType);
    describe('when used with [Class]', function() {
      var subject;
      subject = factory.type([Number]);
      return it('should give expected result', function() {
        return subject.equals(expected).should.be["true"];
      });
    });
    return describe('when used with [Class] and a name', function() {
      var subject;
      subject = factory.type([Number], "MySeq");
      it('should give expected result', function() {
        return subject.equals(expected).should.be["true"];
      });
      return it('should have the correct name', function() {
        return subject.name.should.equal("MySeq");
      });
    });
  });
  return describe('for pseudo-relations', function() {
    var expected, subject;
    subject = factory.type([
      {
        r: Number
      }
    ], "MySeq");
    expected = factory.seq(factory.tuple({
      r: Number
    }));
    it('should give expected result', function() {
      return subject.equals(expected).should.be["true"];
    });
    return it('should have the correct name', function() {
      return subject.name.should.equal("MySeq");
    });
  });
});


},{"../../../../lib/support/factory":6,"../../../../lib/type/seq_type":13,"should":18}],85:[function(require,module,exports){
var BuiltinType, SubType, TypeError, TypeFactory, numType, should;

TypeFactory = require('../../../../lib/support/factory');

TypeError = require('../../../../lib/errors').TypeError;

BuiltinType = require('../../../../lib/type/builtin_type');

SubType = require('../../../../lib/type/sub_type');

numType = require('../../spec_helpers').numType;

should = require('should');

describe('TypeFactory#subtype', function() {
  var factory;
  factory = new TypeFactory;
  describe('when used with a JS class and a block', function() {
    var subject;
    subject = factory.type(Number, function(i) {
      return i >= 0 && i <= 10;
    });
    it('should have the BuiltinType(Number) super type', function() {
      subject.superType.should.be.an["instanceof"](BuiltinType);
      return subject.superType.jsType.should.equal(Number);
    });
    return it('should have the correct constraint', function() {
      var e, lambda;
      subject.dress(10).should.equal(10);
      lambda = function(i) {
        return function() {
          return subject.dress(i);
        };
      };
      expect(lambda(12)).toThrow();
      expect(lambda(-1)).toThrow();
      try {
        return lambda(12);
      } catch (_error) {
        e = _error;
        return expect(e).to.be.an["instanceof"](TypeError);
      }
    });
  });
  return describe('when used with a regexp', function() {
    var subject;
    subject = factory.type(/[a-z]+/);
    subject.should.be.an["instanceof"](SubType);
    return it('should have the correct constraint', function() {
      var e, lambda;
      subject.dress('abc').should.equal('abc');
      lambda = function() {
        return subject.dress('123');
      };
      expect(lambda).toThrow();
      try {
        return lambda();
      } catch (_error) {
        e = _error;
        return e.should.be.an["instanceof"](TypeError);
      }
    });
  });
});


},{"../../../../lib/errors":1,"../../../../lib/support/factory":6,"../../../../lib/type/builtin_type":11,"../../../../lib/type/sub_type":15,"../../spec_helpers":29,"should":18}],86:[function(require,module,exports){
var TupleType, TypeFactory, should;

TupleType = require('../../../../lib/type/tuple_type');

TypeFactory = require('../../../../lib/support/factory');

should = require('should');

describe("TypeFactory#tuple", function() {
  var expected, factory;
  factory = new TypeFactory;
  expected = factory.tuple({
    r: Number
  });
  describe('when use with {r: Number}', function() {
    var subject;
    subject = factory.type({
      r: Number
    });
    return it('should give expected result', function() {
      return subject.equals(expected).should.be["true"];
    });
  });
  return describe('when use with {r: Number} and a name', function() {
    var subject;
    subject = factory.type({
      r: Number
    }, "MyTuple");
    it('should give expected result', function() {
      return subject.equals(expected).should.be["true"];
    });
    return it('should have the correct name', function() {
      return subject.name.should.equal("MyTuple");
    });
  });
});


},{"../../../../lib/support/factory":6,"../../../../lib/type/tuple_type":16,"should":18}]},{},[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86])