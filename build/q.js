require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var qjs;

qjs = require("./lib/qjs");

module.exports = qjs;

module.exports.VERSION = "0.0.0";


},{"./lib/qjs":"Wfb730"}],2:[function(require,module,exports){
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


},{}],"Wfb730":[function(require,module,exports){
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


},{"./support/factory":8,"underscore":19}],"qjs":[function(require,module,exports){
module.exports=require('Wfb730');
},{}],5:[function(require,module,exports){
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


},{"../errors":2,"../type":10,"underscore":19}],6:[function(require,module,exports){
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


},{"../errors":2,"../type":10}],7:[function(require,module,exports){
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


},{"../errors":2,"underscore":19}],8:[function(require,module,exports){
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


},{"../errors":2,"../type":10,"../type/builtin_type":11,"../type/relation_type":12,"../type/seq_type":13,"../type/set_type":14,"../type/sub_type":15,"../type/tuple_type":16,"../type/union_type":17,"./attribute":5,"./heading":9,"underscore":19}],9:[function(require,module,exports){
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


},{"../errors":2,"./attribute":5,"underscore":19}],10:[function(require,module,exports){
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


},{"./errors":2}],11:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../type":10,"underscore":19}],12:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../support/heading":9,"../type":10,"./tuple_type":16,"underscore":19}],13:[function(require,module,exports){
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


},{"../errors":2,"../support/collection_type":6,"../support/dress_helper":7,"../type":10,"underscore":19}],14:[function(require,module,exports){
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


},{"../errors":2,"../support/collection_type":6,"../support/dress_helper":7,"../type":10,"underscore":19}],15:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../type":10,"underscore":19,"underscore.string":18}],16:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../support/heading":9,"../type":10,"underscore":19}],17:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../type":10,"underscore":19,"underscore.string":18}],18:[function(require,module,exports){
//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.2'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  // Helper for toBoolean
  function boolMatch(s, matchers) {
    var i, matcher, down = s.toLowerCase();
    matchers = [].concat(matchers);
    for (i = 0; i < matchers.length; i += 1) {
      matcher = matchers[i];
      if (!matcher) continue;
      if (matcher.test && matcher.test(s)) return true;
      if (matcher.toLowerCase() === down) return true;
    }
  }

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      str  = String(str).toLowerCase();
      return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', ';
      lastSeparator = lastSeparator || ' and ';
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
          to    = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str, quoteChar) {
      return _s.surround(str, quoteChar || '"');
    },

    unquote: function(str, quoteChar) {
      quoteChar = quoteChar || '"';
      if (str[0] === quoteChar && str[str.length-1] === quoteChar)
        return str.slice(1,str.length-1);
      else return str;
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    naturalCmp: function(str1, str2){
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;

      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1).toLowerCase().match(cmpRegex),
        tokens2 = String(str2).toLowerCase().match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

      for(var i = 0; i < count; i++) {
        var a = tokens1[i], b = tokens2[i];

        if (a !== b){
          var num1 = parseInt(a, 10);
          if (!isNaN(num1)){
            var num2 = parseInt(b, 10);
            if (!isNaN(num2) && num1 - num2)
              return num1 - num2;
          }
          return a < b ? -1 : 1;
        }
      }

      if (tokens1.length === tokens2.length)
        return tokens1.length - tokens2.length;

      return str1 < str2 ? -1 : 1;
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    },

    toBoolean: function(str, trueValues, falseValues) {
      if (typeof str === "number") str = "" + str;
      if (typeof str !== "string") return !!str;
      str = _s.trim(str);
      if (boolMatch(str, trueValues || ["true", "1"])) return true;
      if (boolMatch(str, falseValues || ["false", "0"])) return false;
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;
  _s.toBool   = _s.toBoolean;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);

},{}],19:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}]},{},[1])