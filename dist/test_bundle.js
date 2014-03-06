(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DataType, DressHelper, Qjs;

Qjs = require('./qjs');

DressHelper = require('./support/dress_helper');

DataType = (function() {
  function DataType() {}

  DataType.contracts = function() {
    return this._contracts != null ? this._contracts : this._contracts = {};
  };

  DataType.adType = function() {
    return this._adType != null ? this._adType : this._adType = Qjs.adt(this, this.contracts());
  };

  DataType.dress = function(value, helper) {
    if (helper == null) {
      helper = new DressHelper;
    }
    return this.adType().dress(value, helper);
  };

  DataType.contract = function(name, infotype) {
    return this.contracts()[name] = [Qjs.type(infotype), this[name]];
  };

  return DataType;

})();

module.exports = DataType;


},{"./qjs":3,"./support/dress_helper":7}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
var Parser, Qjs, TypeFactory, _;

_ = require('underscore');

TypeFactory = require('./support/factory');

Parser = require('./syntax/parser');

Qjs = (function() {
  var method, _i, _len, _ref;

  function Qjs() {}

  Qjs.VERSION = "0.0.1";

  Qjs.DSL_METHODS = ['attribute', 'heading', 'constraint', 'constraints', 'any', 'builtin', 'adt', 'sub_type', 'union', 'seq', 'set', 'tuple', 'relation', 'type'];

  Qjs.DEFAULT_FACTORY = new TypeFactory;

  Qjs.parse = function(source) {
    return Parser.parse(source);
  };

  _ref = Qjs.DSL_METHODS;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    method = _ref[_i];
    Qjs[method] = Qjs.DEFAULT_FACTORY[method].bind(Qjs.DEFAULT_FACTORY);
  }

  return Qjs;

})();

module.exports = Qjs;


},{"./support/factory":8,"./syntax/parser":10,"underscore":22}],4:[function(require,module,exports){
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


},{"../errors":2,"../type":12,"underscore":22}],5:[function(require,module,exports){
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


},{"../errors":2,"../type":12}],6:[function(require,module,exports){
var ArgumentError, Constraint, TypeError, _, _ref;

_ref = require('../errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

_ = require('underscore');

Constraint = (function() {
  function Constraint(name, _native) {
    this.name = name;
    this["native"] = _native;
    if (typeof this.name !== "string") {
      throw new ArgumentError("String expected for constraint name, got", this.name);
    }
  }

  Constraint.prototype.isAnonymous = function() {
    return this.name === 'default';
  };

  Constraint.prototype.accept = function(arg) {
    if (typeof this["native"] === "function") {
      if (this["native"](arg)) {
        return true;
      }
    } else if (this["native"].constructor === RegExp) {
      if (this["native"].test(arg)) {
        return true;
      }
    }
    return false;
  };

  Constraint.prototype.equals = function(other) {
    if (!(other instanceof Constraint)) {
      return false;
    }
    return this["native"] === other["native"];
  };

  return Constraint;

})();

module.exports = Constraint;


},{"../errors":2,"underscore":22}],7:[function(require,module,exports){
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


},{"../errors":2,"underscore":22}],8:[function(require,module,exports){
var AdType, AnyType, ArgumentError, Attribute, BuiltinType, Constraint, Heading, NotImplementedError, RelationType, SeqType, SetType, SubType, TupleType, Type, TypeFactory, UnionType, fail, isNativeType, isRegexp, _, _ref,
  __slice = [].slice;

Type = require('../type');

_ = require('underscore');

Attribute = require('./attribute');

Heading = require('./heading');

Constraint = require('./constraint');

AnyType = require('../type/any_type');

AdType = require('../type/ad_type');

SeqType = require('../type/seq_type');

SetType = require('../type/set_type');

SubType = require('../type/sub_type');

TupleType = require('../type/tuple_type');

UnionType = require('../type/union_type');

BuiltinType = require('../type/builtin_type');

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
      return this.sub_type(this.type(t, name), callback);
    }
    if (t instanceof Type) {
      return t;
    } else if (isNativeType(t)) {
      return new BuiltinType(t, name || t.constructor.name);
    } else if (isRegexp(t)) {
      return this.sub_type(String, t);
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
    if (t === 'Number') {
      return Number;
    } else if (t === 'String') {
      return String;
    } else if (t === 'Boolean') {
      return Boolean;
    } else if (isNativeType(t) || t instanceof Function) {
      return t;
    } else {
      return fail("JS primitive expected, got `" + t + "`");
    }
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

  TypeFactory.prototype.constraint = function(_name, _native) {
    var _ref1;
    if (_name instanceof Constraint) {
      return _name;
    }
    if (typeof _name !== "string") {
      _ref1 = ['default', _name], _name = _ref1[0], _native = _ref1[1];
    }
    return new Constraint(_name, _native);
  };

  TypeFactory.prototype.constraints = function(constraints, callback) {
    var constrs;
    constrs = [];
    if (callback != null) {
      constrs.push(this.constraint('default', callback));
    }
    if (constraints != null) {
      if (constraints.constructor === Array) {
        _.each(constraints, (function(_this) {
          return function(c) {
            return constrs.push(_this.constraint(c));
          };
        })(this));
      } else if (constraints.constructor === RegExp) {
        constrs.push(this.constraint(constraints));
      } else if (typeof constraints === "object") {
        _.each(constraints, (function(_this) {
          return function(n, c) {
            return constrs.push(_this.constraint(n, c));
          };
        })(this));
      } else {
        constrs.push(this.constraint(constraints));
      }
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
    if (heading.constructor === Array) {
      return new Heading(heading);
    } else if (typeof heading === "object") {
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
    invalid = _.filter(_.keys(contracts), function(k) {
      return k instanceof String;
    });
    if (invalid.length > 0) {
      fail("Invalid contract names `" + invalid + "`");
    }
    return contracts;
  };

  TypeFactory.prototype.any = function(name) {
    if (name == null) {
      name = null;
    }
    name = this.name(name);
    return new AnyType(name);
  };

  TypeFactory.prototype.builtin = function(primitive, _name) {
    if (_name == null) {
      _name = null;
    }
    primitive = this.jsType(primitive);
    _name = this.name(_name);
    return new BuiltinType(primitive, _name);
  };

  TypeFactory.prototype.adt = function(primitive, _contracts, _name) {
    var contracts;
    if (_name == null) {
      _name = null;
    }
    if (primitive != null) {
      primitive = this.jsType(primitive);
    }
    contracts = this.contracts(_contracts);
    _name = this.name(_name);
    return new AdType(primitive, _contracts, _name);
  };

  TypeFactory.prototype.sub_type = function(superType, _constraints, _name, callback) {
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
    _.each(args, (function(_this) {
      return function(arg) {
        if (arg.constructor === Array) {
          return candidates = _.map(arg, function(t) {
            return _this.type(t);
          });
        } else if (arg.constructor === String) {
          return _name = _this.name(_name);
        } else {
          return candidates.push(arg);
        }
      };
    })(this));
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


},{"../errors":2,"../type":12,"../type/ad_type":13,"../type/any_type":14,"../type/builtin_type":15,"../type/relation_type":16,"../type/seq_type":17,"../type/set_type":18,"../type/sub_type":19,"../type/tuple_type":20,"../type/union_type":21,"./attribute":4,"./constraint":6,"./heading":9,"underscore":22}],9:[function(require,module,exports){
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
      return attr.equals(other_attr);
    });
    return valid;
  };

  return Heading;

})();

module.exports = Heading;


},{"../errors":2,"./attribute":4,"underscore":22}],10:[function(require,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { system: peg$parsesystem, type: peg$parsetype, attribute: peg$parseattribute, heading: peg$parseheading },
        peg$startRuleFunction  = peg$parsesystem,

        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = function(m) {
            if (m){ options.system.main = m }
            return options.system;
          },
        peg$c3 = [],
        peg$c4 = "=",
        peg$c5 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c6 = function(n, t) {
            t.name = n;
            options.system.addType(t);
            return t;
          },
        peg$c7 = "|",
        peg$c8 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c9 = function(head, tail) {
              return Qjs.union(headTailToArray(head, tail));
            },
        peg$c10 = function(t, c) {
              return Qjs.sub_type(t, c)
            },
        peg$c11 = "(",
        peg$c12 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c13 = ")",
        peg$c14 = { type: "literal", value: ")", description: "\")\"" },
        peg$c15 = function(n, c) {
            return compileConstraints(n, c)
          },
        peg$c16 = ",",
        peg$c17 = { type: "literal", value: ",", description: "\",\"" },
        peg$c18 = function(head, tail) {
              return headTailToArray(head, tail);
            },
        peg$c19 = function(c) {
            return [c];
          },
        peg$c20 = ":",
        peg$c21 = { type: "literal", value: ":", description: "\":\"" },
        peg$c22 = function(n, e) {
            return [n, e];
          },
        peg$c23 = function(e) {
            return ['default', e];
          },
        peg$c24 = "{",
        peg$c25 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c26 = "}",
        peg$c27 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c28 = function(h) {
            return Qjs.tuple(h)
          },
        peg$c29 = "{{",
        peg$c30 = { type: "literal", value: "{{", description: "\"{{\"" },
        peg$c31 = "}}",
        peg$c32 = { type: "literal", value: "}}", description: "\"}}\"" },
        peg$c33 = function(h) {
            return Qjs.relation(h)
          },
        peg$c34 = function(head, tail) {
              return Qjs.heading(headTailToArray(head, tail));
            },
        peg$c35 = function(n, t) {
            return Qjs.attribute(n, t)
          },
        peg$c36 = function(t) {
            return Qjs.set(t)
          },
        peg$c37 = "[",
        peg$c38 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c39 = "]",
        peg$c40 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c41 = function(t) {
            return Qjs.seq(t)
          },
        peg$c42 = ".",
        peg$c43 = { type: "literal", value: ".", description: "\".\"" },
        peg$c44 = function() {
            return Qjs.any();
          },
        peg$c45 = function(name) {
            return Qjs.builtin(name);
          },
        peg$c46 = function(n) {
            return options.system.fetch(n);
          },
        peg$c47 = "()",
        peg$c48 = { type: "literal", value: "()", description: "\"()\"" },
        peg$c49 = void 0,
        peg$c50 = /^[(,)]/,
        peg$c51 = { type: "class", value: "[(,)]", description: "[(,)]" },
        peg$c52 = { type: "any", description: "any character" },
        peg$c53 = /^[a-z]/,
        peg$c54 = { type: "class", value: "[a-z]", description: "[a-z]" },
        peg$c55 = /^[a-z0-9]/,
        peg$c56 = { type: "class", value: "[a-z0-9]", description: "[a-z0-9]" },
        peg$c57 = /^[a-zA-Z_]/,
        peg$c58 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c59 = /^[a-zA-Z0-9_]/,
        peg$c60 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c61 = /^[A-Z]/,
        peg$c62 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
        peg$c63 = /^[a-zA-Z]/,
        peg$c64 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c65 = /^[a-zA-Z0-9:]/,
        peg$c66 = { type: "class", value: "[a-zA-Z0-9:]", description: "[a-zA-Z0-9:]" },
        peg$c67 = "#",
        peg$c68 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c69 = /^[\n]/,
        peg$c70 = { type: "class", value: "[\\n]", description: "[\\n]" },
        peg$c71 = /^[ \t\n]/,
        peg$c72 = { type: "class", value: "[ \\t\\n]", description: "[ \\t\\n]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsesystem() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsedefinitions();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeof();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c2(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsedefinitions() {
      var s0, s1, s2, s3;

      s0 = [];
      s1 = peg$currPos;
      s2 = peg$parsespacing();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsetype_def();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$currPos;
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetype_def();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parsetype_def() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsetype_name();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseunion_type();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c6(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsetype() {
      var s0;

      s0 = peg$parseunion_type();

      return s0;
    }

    function peg$parseunion_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsesub_type();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 124) {
          s4 = peg$c7;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsesub_type();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 124) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesub_type();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c9(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsesub_type();
      }

      return s0;
    }

    function peg$parsesub_type() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parserel_type();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseconstraint_fn();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c10(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parserel_type();
      }

      return s0;
    }

    function peg$parseconstraint_fn() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 124) {
                s5 = peg$c7;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseconstraints();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsespacing();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s9 = peg$c13;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c14); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c15(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconstraints() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsenamed_constraint();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c16;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsespacing();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsenamed_constraint();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c16;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsespacing();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsenamed_constraint();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c18(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseunnamed_constraint();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c19(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsenamed_constraint() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseconstraint_name();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s2 = peg$c20;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c21); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseexpression();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s1, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseunnamed_constraint() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c23(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parserel_type() {
      var s0;

      s0 = peg$parserelation_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetuple_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecollection_type();
        }
      }

      return s0;
    }

    function peg$parsetuple_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c24;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseheading();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c26;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c27); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c28(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c29) {
        s1 = peg$c29;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseheading();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c31) {
                s5 = peg$c31;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c32); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c33(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseheading() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseattribute();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c16;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsespacing();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseattribute();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c16;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsespacing();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseattribute();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c34(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsespacing();
      }

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseattribute_name();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c20;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c21); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseunion_type();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c35(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecollection_type() {
      var s0;

      s0 = peg$parseset_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parseseq_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parseterm_type();
        }
      }

      return s0;
    }

    function peg$parseset_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c24;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c26;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c27); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c36(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseseq_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c37;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c39;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c40); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c41(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseterm_type() {
      var s0;

      s0 = peg$parsebuiltin_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parseany_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parsetype_ref();
        }
      }

      return s0;
    }

    function peg$parseany_type() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c44();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsebuiltin_type() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsebuiltin_type_name();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsetype_ref() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsetype_name();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c46(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseparen_expression();
      if (s2 === peg$FAILED) {
        s2 = peg$parseany_expression();
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseparen_expression();
          if (s2 === peg$FAILED) {
            s2 = peg$parseany_expression();
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseparen_expression() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c47) {
        s1 = peg$c47;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c48); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c11;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c13;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c14); }
            }
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseany_expression() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      if (peg$c50.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }
      peg$silentFails--;
      if (s4 === peg$FAILED) {
        s3 = peg$c49;
      } else {
        peg$currPos = s3;
        s3 = peg$c0;
      }
      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c52); }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          if (peg$c50.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c51); }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c49;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c52); }
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsevar_name() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c53.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c53.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c54); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecontract_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c53.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c55.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c56); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c55.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c56); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstraint_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c53.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c57.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c57.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c58); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseattribute_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c53.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c59.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c60); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c59.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c60); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsetype_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c61.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c62); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c63.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c63.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c64); }
            }
          }
        } else {
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsebuiltin_type_name() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c65.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c66); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsespacing() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsespaces();
      if (s2 === peg$FAILED) {
        s2 = peg$parsecomment();
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsespaces();
        if (s2 === peg$FAILED) {
          s2 = peg$parsecomment();
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s2 = peg$c67;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        s5 = peg$currPos;
        peg$silentFails++;
        if (peg$c69.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c70); }
        }
        peg$silentFails--;
        if (s6 === peg$FAILED) {
          s5 = peg$c49;
        } else {
          peg$currPos = s5;
          s5 = peg$c0;
        }
        if (s5 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c52); }
          }
          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (peg$c69.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c70); }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c49;
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c52); }
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
        }
        if (s3 !== peg$FAILED) {
          if (peg$c69.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c70); }
          }
          if (s4 === peg$FAILED) {
            s4 = peg$c1;
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsespaces() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c71.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c72); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c71.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c72); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseeof() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c49;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }


      Qjs        = require('../qjs');
      System     = require('../system');
      if (!options.system) {
        options.system = new System()
      }

      // converts head:X tail(... X)* to an array of Xs
      function headTailToArray(head, tail) {
        var result = [ head ];
        for (var i = 0; i < tail.length; i++) {
          result[i+1] = tail[i][tail[i].length-1];
        }
        return result;
      }

      // compile a [ [n1, expr1], ... ] to an array of constraints
      function compileConstraints(varname, defs) {
        var cs = [];
        for (var i = 0; i < defs.length; i++) {
          var name = defs[i][0];
          var expr = defs[i][1];
          var src  = "x = function(" + varname + ")" + "{ return " + expr + "; }";
          var fn   = null;
          try {
            var fn = eval(src);
          } catch(e) {
            error("Syntax error in constraint: `" + expr + "`");
          }
          cs[i] = Qjs.constraint(name, fn);
        }
        return cs;
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

},{"../qjs":3,"../system":11}],11:[function(require,module,exports){
var ArgumentError, Error, KeyError, Parser, Qjs, System, Type, TypeFactory, _, _ref;

_ = require('underscore');

_ref = require('./errors'), Error = _ref.Error, KeyError = _ref.KeyError, ArgumentError = _ref.ArgumentError;

Qjs = require('./qjs');

Type = require('./type');

TypeFactory = require('./support/factory');

Parser = require('./syntax/parser');

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

  System.prototype.merge = function(other) {
    var merged_main, merged_types;
    if (!(other instanceof System)) {
      throw new ArgumentError("Qjs.System expected, got", other);
    }
    merged_types = _.extend({}, this.types, other.types);
    merged_main = other.main || this.main;
    return new System(merged_types, merged_main);
  };

  System.prototype.parse = function(source) {
    return Parser.parse(source, {
      system: this.clone()
    });
  };

  System.prototype.dress = function(value) {
    if (!this.main) {
      throw new Error("No main on System");
    }
    return this.main.dress(value);
  };

  System.prototype.clone = function() {
    return new System(_.clone(this.types), this.main);
  };

  return System;

})();

module.exports = System;


},{"./errors":2,"./qjs":3,"./support/factory":8,"./syntax/parser":10,"./type":12,"underscore":22}],12:[function(require,module,exports){
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


},{"./errors":2}],13:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../type":12,"underscore":22}],14:[function(require,module,exports){
var AnyType, Type,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Type = require('../type');

AnyType = (function(_super) {
  __extends(AnyType, _super);

  function AnyType(name) {
    this.name = name;
    this.equals = __bind(this.equals, this);
    AnyType.__super__.constructor.call(this, this.name);
  }

  AnyType.prototype.dress = function(value, helper) {
    return value;
  };

  AnyType.prototype.defaultName = function() {
    return "Any";
  };

  AnyType.prototype.include = function(value) {
    return true;
  };

  AnyType.prototype.equals = function(other) {
    if (!(other instanceof AnyType)) {
      return false;
    }
    return true;
  };

  return AnyType;

})(Type);

module.exports = AnyType;


},{"../type":12}],15:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../type":12,"underscore":22}],16:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../support/heading":9,"../type":12,"./tuple_type":20,"underscore":22}],17:[function(require,module,exports){
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


},{"../errors":2,"../support/collection_type":5,"../support/dress_helper":7,"../type":12,"underscore":22}],18:[function(require,module,exports){
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


},{"../errors":2,"../support/collection_type":5,"../support/dress_helper":7,"../type":12,"underscore":22}],19:[function(require,module,exports){
var ArgumentError, Constraint, DressHelper, SubType, Type, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Type = require('../type');

Constraint = require('../support/constraint');

DressHelper = require('../support/dress_helper');

ArgumentError = require('../errors').ArgumentError;

_.str = require('underscore.string');

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
    if (this.constraints.constructor !== Array) {
      throw new ArgumentError("Array expected for constraints, got", this.constraints);
    }
    if (!(this.constraints.length > 0)) {
      throw new ArgumentError("Empty constraints not allowed on SubType");
    }
    if (!_.every(this.constraints, function(c) {
      return c.constructor === Constraint;
    })) {
      throw new ArgumentError("Array of constraints expected, got", this.constraints);
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
      return function(constraint) {
        var msg;
        if (constraint.accept(uped)) {
          return;
        }
        msg = helper.defaultErrorMessage(_this, value);
        if (!_this.defaultConstraint(constraint)) {
          msg += " (not " + constraint.name + ")";
        }
        return helper.fail(msg);
      };
    })(this));
    return uped;
  };

  SubType.prototype.defaultName = function() {
    return _.str.capitalize(this.constraints[0].name);
  };

  SubType.prototype.include = function(value) {
    return this.superType.include(value) && _.every(this.constraints, function(c) {
      return c.accept(value);
    });
  };

  SubType.prototype.equals = function(other) {
    if (!(other instanceof SubType)) {
      return false;
    }
    return this.superType.equals(other.superType) && this.constraints.length === other.constraints.length && _.every(_.zip(this.constraints, other.constraints), function(pair) {
      return pair[0].equals(pair[1]);
    });
  };

  SubType.prototype.defaultConstraint = function(constraint) {
    return constraint.isAnonymous() || _.str.capitalize(constraint.name) === this.name;
  };

  return SubType;

})(Type);

module.exports = SubType;


},{"../errors":2,"../support/constraint":6,"../support/dress_helper":7,"../type":12,"underscore":22,"underscore.string":22}],20:[function(require,module,exports){
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


},{"../errors":2,"../support/dress_helper":7,"../support/heading":9,"../type":12,"underscore":22}],21:[function(require,module,exports){
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
    _.each(this.candidates, function(c) {
      if (!(c instanceof Type)) {
        throw new ArgumentError("Qjs.Type expected, got", c);
      }
    });
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


},{"../errors":2,"../support/dress_helper":7,"../type":12,"underscore":22,"underscore.string":22}],22:[function(require,module,exports){

},{}],23:[function(require,module,exports){
var DataType, should, _;

_ = require('underscore');

DataType = require('../../../lib/data_type');

should = require('should');

describe("Using Q's abstract data types in JavaScript", function() {
  var MyColor;
  MyColor = (function() {
    function MyColor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    MyColor.prototype.toRGB = function() {
      return {
        r: this.r,
        g: this.g,
        b: this.b
      };
    };

    MyColor.rgb = function(tuple) {
      return new MyColor(tuple.r, tuple.g, tuple.b);
    };

    return MyColor;

  })();
  _.extend(MyColor, DataType);
  MyColor.contract('rgb', {
    r: byteType,
    g: byteType,
    b: byteType
  });
  describe('The example class', function() {
    return it('should be a class', function() {
      return MyColor.should.be.an["instanceof"](Function);
    });
  });
  describe('the dress method, when valid', function() {
    var subject;
    subject = MyColor.dress({
      r: 12,
      g: 13,
      b: 28
    });
    it('should be an instance of the example class', function() {
      return subject.should.be.an["instanceof"](MyColor);
    });
    return it('should set the instance variables correctly', function() {
      subject.r.should.equal(12);
      subject.g.should.equal(13);
      return subject.b.should.equal(28);
    });
  });
  return describe('the up method, when already a color', function() {
    var subject, value;
    value = new MyColor(12, 13, 28);
    subject = MyColor.dress(value);
    return it('should remain the same', function() {
      return subject.should.equal(value);
    });
  });
});


},{"../../../lib/data_type":1,"should":22,"underscore":22}],24:[function(require,module,exports){
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


},{"../../../lib/support/attribute":4,"should":22}],25:[function(require,module,exports){
var Attribute, BuiltinType, should;

Attribute = require('../../../lib/support/attribute');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Attribute#equality", function() {
  var attr1, attr2, attr3;
  attr1 = new Attribute('red', new BuiltinType(Number));
  attr2 = new Attribute('red', new BuiltinType(Number));
  attr3 = new Attribute('blue', new BuiltinType(Number));
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


},{"../../../lib/support/attribute":4,"../../../lib/type/builtin_type":15,"should":22}],26:[function(require,module,exports){
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
    lambda = function() {
      return subject(arg);
    };
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
  return describe('when the key is missing and a callback is present', function() {
    var arg;
    arg = {
      other: 123
    };
    return subject(arg, function() {
      return "none";
    }).should.equal("none");
  });
});


},{"../../../lib/errors":2,"../../../lib/support/attribute":4,"should":22}],27:[function(require,module,exports){
var Attribute, should;

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Attribute#toName", function() {
  var subject;
  subject = new Attribute('red', intType).toName();
  return subject.should.equal("red: intType");
});


},{"../../../lib/support/attribute":4,"should":22}],28:[function(require,module,exports){
var Constraint, should;

Constraint = require('../../../lib/support/constraint');

should = require('should');

describe("Constraint#accept", function() {
  describe('with a function', function() {
    var constraint;
    constraint = new Constraint('positive', function(i) {
      return i > 0;
    });
    it('accepts positive numbers', function() {
      return constraint.accept(12).should.be["true"];
    });
    return it('rejects negative numbers', function() {
      return constraint.accept(-12).should.be["false"];
    });
  });
  return describe('with a regexp', function() {
    var constraint;
    constraint = new Constraint('word', /[a-z]+/);
    it('accepts words', function() {
      return constraint.accept("abgd").should.be["true"];
    });
    return it('rejects numbers', function() {
      return constraint.accept("12").should.be["false"];
    });
  });
});


},{"../../../lib/support/constraint":6,"should":22}],29:[function(require,module,exports){
var Constraint, should;

Constraint = require('../../../lib/support/constraint');

should = require('should');

describe("Constraint#equals", function() {
  var c1, c2, c3, fn1, fn2;
  fn1 = function(i) {
    return i > 0;
  };
  fn2 = function(i) {
    return i > 100;
  };
  c1 = new Constraint('positive', fn1);
  c2 = new Constraint('othername', fn1);
  c3 = new Constraint('positive', fn2);
  it('applies structural equivalence', function() {
    return c1.equals(c2).should.be["true"];
  });
  return it('distinguishes different functions', function() {
    return c1.equals(c3).should.be["false"];
  });
});


},{"../../../lib/support/constraint":6,"should":22}],30:[function(require,module,exports){
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


},{"../../../lib/errors":2,"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"should":22}],31:[function(require,module,exports){
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


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"should":22,"underscore":22}],32:[function(require,module,exports){
var Attribute, BuiltinType, Heading, should;

Attribute = require('../../../lib/support/attribute');

Heading = require('../../../lib/support/heading');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Heading#equality", function() {
  var a, b, g, h1, h2, h3, h4, r;
  r = new Attribute('r', intType);
  g = new Attribute('g', intType);
  b = new Attribute('b', intType);
  a = new Attribute('a', intType);
  h1 = new Heading([r, g, b]);
  h2 = new Heading([r, b, g]);
  h3 = new Heading([r, b]);
  h4 = new Heading([r, b, a]);
  it('should apply structural equality', function() {
    h1.equals(h2).should.be["true"];
    return h2.equals(h1).should.be["true"];
  });
  it('should distinguish different types', function() {
    h1.equals(h3).should.be["false"];
    return h1.equals(h4).should.be["false"];
  });
  return it('should be a total function, with null for non types', function() {
    return should.equal(h1.equals(12), null);
  });
});


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"../../../lib/type/builtin_type":15,"should":22}],33:[function(require,module,exports){
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


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"should":22}],34:[function(require,module,exports){
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


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"should":22}],35:[function(require,module,exports){
var Qjs, SubType, System, Type, TypeError, should;

Qjs = require('../../lib/qjs');

Type = require('../../lib/type');

SubType = require('../../lib/type/sub_type');

System = require('../../lib/system');

TypeError = require('../../lib/errors').TypeError;

should = require('should');

describe('Qjs', function() {
  it("should have a version number", function() {
    (typeof Qjs.VERSION).should.not.equal('undefined');
    return (Qjs.VERSION != null).should.be["true"];
  });
  it('should have DSL methods', function() {
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
  return it('should have a parse method', function() {
    return Qjs.parse(".Number").should.be.an["instanceof"](System);
  });
});


},{"../../lib/errors":2,"../../lib/qjs":3,"../../lib/system":11,"../../lib/type":12,"../../lib/type/sub_type":19,"should":22}],36:[function(require,module,exports){
var BuiltinType, Constraint, SubType, boolType, byteType, floatType, intType, numType, stringType, _;

Constraint = require('../../lib/support/constraint');

BuiltinType = require('../../lib/type/builtin_type');

SubType = require('../../lib/type/sub_type');

_ = require('underscore');

numType = new BuiltinType(Number, 'numType');

boolType = new BuiltinType(Boolean, 'boolType');

stringType = new BuiltinType(String, 'stringType');

intType = new SubType(numType, [
  new Constraint('noDecimal', function(i) {
    return i % 1 === 0;
  }), new Constraint('noDot', function(i) {
    return i.toString().indexOf('.') === -1;
  })
], 'intType');

floatType = new SubType(numType, [
  new Constraint('hasDecimal', function(i) {
    return i % 1 !== 0;
  }), new Constraint('hasDot', function(i) {
    return i.toString().indexOf('.') !== -1;
  })
], 'floatType');

byteType = new SubType(intType, [
  new Constraint('byte', function(i) {
    return i >= 0 && i <= 255;
  })
]);

module.exports = {
  numType: numType,
  boolType: boolType,
  stringType: stringType,
  intType: intType,
  floatType: floatType,
  byteType: byteType
};


},{"../../lib/support/constraint":6,"../../lib/type/builtin_type":15,"../../lib/type/sub_type":19,"underscore":22}],37:[function(require,module,exports){
var AnyType, Parser, should;

Parser = require('../../../lib/syntax/parser');

AnyType = require('../../../lib/type/any_type');

should = require('should');

describe("Parser#any_type", function() {
  var subject;
  subject = Parser.parse(".", {
    startRule: "type"
  });
  return it('should return an AnyType', function() {
    return subject.should.be.an["instanceof"](AnyType);
  });
});


},{"../../../lib/syntax/parser":10,"../../../lib/type/any_type":14,"should":22}],38:[function(require,module,exports){
var Attribute, BuiltinType, Parser, should;

Parser = require('../../../lib/syntax/parser');

BuiltinType = require('../../../lib/type/builtin_type');

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Parser#attribute", function() {
  var subject;
  subject = Parser.parse("foo: .String", {
    startRule: "attribute"
  });
  return it('should return an Attribute', function() {
    subject.should.be.an["instanceof"](Attribute);
    subject.name.should.equal('foo');
    return subject.type.should.be.an["instanceof"](BuiltinType);
  });
});


},{"../../../lib/support/attribute":4,"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"should":22}],39:[function(require,module,exports){
var BuiltinType, Parser, should;

Parser = require('../../../lib/syntax/parser');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Parser#builtin_type", function() {
  var subject;
  subject = Parser.parse(".String", {
    startRule: "type"
  });
  return it('should return a BuiltinType', function() {
    subject.should.be.an["instanceof"](BuiltinType);
    return subject.jsType.should.equal(String);
  });
});


},{"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"should":22}],40:[function(require,module,exports){
var Attribute, BuiltinType, Heading, Parser, should;

Parser = require('../../../lib/syntax/parser');

BuiltinType = require('../../../lib/type/builtin_type');

Heading = require('../../../lib/support/heading');

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Parser#heading", function() {
  var subject;
  subject = Parser.parse("foo: .String, bar: .Number", {
    startRule: "heading"
  });
  return it('should return a Heading', function() {
    subject.should.be.an["instanceof"](Heading);
    return subject.size().should.equal(2);
  });
});


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"should":22}],41:[function(require,module,exports){
var Attribute, BuiltinType, Heading, Parser, RelationType, should;

Parser = require('../../../lib/syntax/parser');

BuiltinType = require('../../../lib/type/builtin_type');

RelationType = require('../../../lib/type/relation_type');

Heading = require('../../../lib/support/heading');

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Parser#relation_type", function() {
  var bar, expected, foo, heading, subject;
  subject = Parser.parse("{{foo: .String, bar: .Number}}", {
    startRule: "type"
  });
  foo = new Attribute('foo', new BuiltinType(String));
  bar = new Attribute('bar', new BuiltinType(Number));
  heading = new Heading([foo, bar]);
  expected = new RelationType(heading);
  return it('should return a RelationType', function() {
    subject.should.be.an["instanceof"](RelationType);
    return subject.equals(expected).should.be["true"];
  });
});


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"../../../lib/type/relation_type":16,"should":22}],42:[function(require,module,exports){
var BuiltinType, Parser, SeqType, should;

Parser = require('../../../lib/syntax/parser');

SeqType = require('../../../lib/type/seq_type');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Parser#seq_type", function() {
  var subject;
  subject = Parser.parse("[.String]", {
    startRule: "type"
  });
  return it('should return a SeqType', function() {
    subject.should.be.an["instanceof"](SeqType);
    subject.elmType.should.be.an["instanceof"](BuiltinType);
    return subject.elmType.jsType.should.equal(String);
  });
});


},{"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"../../../lib/type/seq_type":17,"should":22}],43:[function(require,module,exports){
var BuiltinType, Parser, SetType, should;

Parser = require('../../../lib/syntax/parser');

SetType = require('../../../lib/type/set_type');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Parser#set_type", function() {
  var subject;
  subject = Parser.parse("{.String}", {
    startRule: "type"
  });
  return it('should return a SetType', function() {
    subject.should.be.an["instanceof"](SetType);
    subject.elmType.should.be.an["instanceof"](BuiltinType);
    return subject.elmType.jsType.should.equal(String);
  });
});


},{"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"../../../lib/type/set_type":18,"should":22}],44:[function(require,module,exports){
var BuiltinType, Constraint, Parser, SubType, should;

Parser = require('../../../lib/syntax/parser');

Constraint = require('../../../lib/support/constraint');

BuiltinType = require('../../../lib/type/builtin_type');

SubType = require('../../../lib/type/sub_type');

should = require('should');

describe("Parser#sub_type", function() {
  describe('with a single constraint', function() {
    var subject;
    subject = Parser.parse(".Number( i | i >= 0 )", {
      startRule: "type"
    });
    it('should return a SubType', function() {
      return subject.should.be.an["instanceof"](SubType);
    });
    it('should have the correct constraint', function() {
      subject.constraints.length.should.equal(1);
      subject.constraints[0].should.be.an["instanceof"](Constraint);
      subject.constraints[0].accept(12).should.be["true"];
      return subject.constraints[0].accept(-12).should.be["false"];
    });
    return it('should dress properly', function() {
      var e;
      subject.dress(12).should.equal(12);
      try {
        subject.dress(-1);
        return false.should.be["true"];
      } catch (_error) {
        e = _error;
        return e;
      }
    });
  });
  describe('with a constraint on an AnyType', function() {
    var subject;
    subject = Parser.parse(".( v | v === null )", {
      startRule: "type"
    });
    it('should return a SubType', function() {
      return subject.should.be.an["instanceof"](SubType);
    });
    return it('should dress properly', function() {
      var e;
      should.equal(subject.dress(null), null);
      try {
        subject.dress(-1);
        return false.should.be["true"];
      } catch (_error) {
        e = _error;
        return e;
      }
    });
  });
  describe('with multiple, named constraints', function() {
    var subject;
    subject = Parser.parse(".Number( i | positive: i >= 0, small: i <= 255 )", {
      startRule: "type"
    });
    it('should return a SubType', function() {
      return subject.should.be.an["instanceof"](SubType);
    });
    it('should dress properly according to positive', function() {
      var e;
      subject.dress(12).should.equal(12);
      try {
        subject.dress(-1);
        return false.should.be["true"];
      } catch (_error) {
        e = _error;
        return e;
      }
    });
    return it('should dress properly according to small', function() {
      var e;
      try {
        subject.dress(256);
        return false.should.be["true"];
      } catch (_error) {
        e = _error;
        return e;
      }
    });
  });
  return describe('with a complex constraint expression', function() {
    var subject;
    subject = Parser.parse(".Number( i | noDot: i.toString().indexOf('.') == -1 )", {
      startRule: "type"
    });
    return it('should return a SubType', function() {
      return subject.should.be.an["instanceof"](SubType);
    });
  });
});


},{"../../../lib/support/constraint":6,"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"../../../lib/type/sub_type":19,"should":22}],45:[function(require,module,exports){
var BuiltinType, Parser, System, should;

Parser = require('../../../lib/syntax/parser');

System = require('../../../lib/system');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Parser#system", function() {
  describe('when a single type', function() {
    var subject;
    subject = Parser.parse(".String", {
      startRule: "system"
    });
    it('should return a System', function() {
      return subject.should.be.an["instanceof"](System);
    });
    it('should not have any type', function() {
      return subject.types.should.be.empty;
    });
    return it('should have a main type', function() {
      return subject.main.should.be.an["instanceof"](BuiltinType);
    });
  });
  describe('with some definitions and a main type', function() {
    var subject;
    subject = Parser.parse("Str = .String\nStr", {
      startRule: "system"
    });
    it('should return a System', function() {
      return subject.should.be.an["instanceof"](System);
    });
    it('should have a type', function() {
      subject.getType('Str').should.be.an["instanceof"](BuiltinType);
      return subject.getType('Str').name.should.equal('Str');
    });
    return it('should have a main type', function() {
      return subject.main.should.be.an["instanceof"](BuiltinType);
    });
  });
  return describe('with some definitions but no main type', function() {
    var subject;
    subject = Parser.parse("Str = .String\nInt = .Number", {
      startRule: "system"
    });
    it('should return a System', function() {
      return subject.should.be.an["instanceof"](System);
    });
    it('should have the types', function() {
      subject.getType('Str').should.be.an["instanceof"](BuiltinType);
      return subject.getType('Int').should.be.an["instanceof"](BuiltinType);
    });
    return it('should have no main type', function() {
      return expect(subject.main).toBeNull();
    });
  });
});


},{"../../../lib/syntax/parser":10,"../../../lib/system":11,"../../../lib/type/builtin_type":15,"should":22}],46:[function(require,module,exports){
var Attribute, BuiltinType, Heading, Parser, TupleType, should;

Parser = require('../../../lib/syntax/parser');

BuiltinType = require('../../../lib/type/builtin_type');

TupleType = require('../../../lib/type/tuple_type');

Heading = require('../../../lib/support/heading');

Attribute = require('../../../lib/support/attribute');

should = require('should');

describe("Parser#heading", function() {
  var bar, expected, foo, heading, subject;
  subject = Parser.parse("{foo: .String, bar: .Number}", {
    startRule: "type"
  });
  foo = new Attribute('foo', new BuiltinType(String));
  bar = new Attribute('bar', new BuiltinType(Number));
  heading = new Heading([foo, bar]);
  expected = new TupleType(heading);
  return it('should return a TupleType', function() {
    subject.should.be.an["instanceof"](TupleType);
    return subject.equals(expected).should.be["true"];
  });
});


},{"../../../lib/support/attribute":4,"../../../lib/support/heading":9,"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"../../../lib/type/tuple_type":20,"should":22}],47:[function(require,module,exports){
var BuiltinType, Parser, UnionType, should;

Parser = require('../../../lib/syntax/parser');

UnionType = require('../../../lib/type/union_type');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe("Parser#union_type", function() {
  var subject;
  subject = Parser.parse(".String|.Number|.Boolean", {
    startRule: "type"
  });
  return it('should return a SetType', function() {
    return subject.should.be.an["instanceof"](UnionType);
  });
});


},{"../../../lib/syntax/parser":10,"../../../lib/type/builtin_type":15,"../../../lib/type/union_type":21,"should":22}],48:[function(require,module,exports){
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


},{"../../../lib/errors":2,"../../../lib/system":11,"should":22}],49:[function(require,module,exports){
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


},{"../../../lib/system":11,"should":22}],50:[function(require,module,exports){
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


},{"../../../lib/system":11,"should":22}],51:[function(require,module,exports){
var System, TypeError, should;

TypeError = require('../../../lib/errors').TypeError;

System = require('../../../lib/system');

should = require('should');

describe('System#dress', function() {
  describe("when a main", function() {
    var system;
    system = Qjs.parse(".Number");
    return it('delegates to the main', function() {
      var e, error;
      system.dress(12).should.equal(12);
      try {
        system.dress("foo");
      } catch (_error) {
        e = _error;
        error = e;
      }
      return error.should.be.an["instanceof"](TypeError);
    });
  });
  return describe("when no main", function() {
    var system;
    system = Qjs.parse("Num = .Number");
    return it('throws an Error', function() {
      var e, error;
      try {
        system.dress("foo");
      } catch (_error) {
        e = _error;
        error = e;
      }
      error.should.be.an["instanceof"](Error);
      return error.message.should.equal("No main on System");
    });
  });
});


},{"../../../lib/errors":2,"../../../lib/system":11,"should":22}],52:[function(require,module,exports){
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
    subject = system.sub_type(Number, function(i) {
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


},{"../../../lib/errors":2,"../../../lib/system":11,"../../../lib/type/sub_type":19,"../../../lib/type/tuple_type":20,"should":22}],53:[function(require,module,exports){
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


},{"../../../lib/errors":2,"../../../lib/system":11,"../../../lib/type/tuple_type":20,"should":22}],54:[function(require,module,exports){
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


},{"../../../lib/system":11,"../../../lib/type/tuple_type":20,"should":22}],55:[function(require,module,exports){
var BuiltinType, KeyError, System, Type, should;

KeyError = require('../../../lib/errors').KeyError;

System = require('../../../lib/system');

Type = require('../../../lib/type');

BuiltinType = require('../../../lib/type/builtin_type');

should = require('should');

describe('System#merge', function() {
  var should_be_a_system;
  should_be_a_system = function(subject) {
    return function() {
      return subject.should.be.an["instanceof"](System);
    };
  };
  describe("when disjoint", function() {
    var s1, s2, subject;
    s1 = Qjs.parse("Str = .String");
    s2 = Qjs.parse("Num = .Number");
    subject = s1.merge(s2);
    it('should be a System', should_be_a_system(subject));
    return it('should merge the types, by name', function() {
      subject['Str'].should.be.an["instanceof"](Type);
      return subject['Num'].should.be.an["instanceof"](Type);
    });
  });
  describe("with two mains", function() {
    var s1, s2, subject;
    s1 = Qjs.parse(".String");
    s2 = Qjs.parse(".Number");
    subject = s1.merge(s2);
    it('should be a System', should_be_a_system(subject));
    return it('should give priority to the second one', function() {
      subject.main.should.be.an["instanceof"](BuiltinType);
      return subject.main.jsType.should.equal(Number);
    });
  });
  describe("with one main at left", function() {
    var s1, s2, subject;
    s1 = Qjs.parse(".String");
    s2 = Qjs.parse("Num = .Number");
    subject = s1.merge(s2);
    it('should be a System', should_be_a_system(subject));
    return it('should use the only main available', function() {
      subject.main.should.be.an["instanceof"](BuiltinType);
      return subject.main.jsType.should.equal(String);
    });
  });
  return describe("with one main at right", function() {
    var s1, s2, subject;
    s1 = Qjs.parse("Num = .Number");
    s2 = Qjs.parse(".String");
    subject = s1.merge(s2);
    it('should be a System', should_be_a_system(subject));
    return it('should use the only main available', function() {
      subject.main.should.be.an["instanceof"](BuiltinType);
      return subject.main.jsType.should.equal(String);
    });
  });
});


},{"../../../lib/errors":2,"../../../lib/system":11,"../../../lib/type":12,"../../../lib/type/builtin_type":15,"should":22}],56:[function(require,module,exports){
var KeyError, Qjs, System, Type, should;

KeyError = require('../../../lib/errors').KeyError;

Qjs = require('../../../lib/qjs');

System = require('../../../lib/system');

Type = require('../../../lib/type');

should = require('should');

describe('System#parse', function() {
  var system;
  system = Qjs.parse('Num = .Number');
  describe("when the new system does not make cross-references", function() {
    var subject;
    subject = system.parse('Str = .String');
    it('should return another System', function() {
      subject.should.be.an["instanceof"](System);
      return subject.should.not.equal(system);
    });
    it('should have the types of the original system', function() {
      return subject['Num'].should.be.an["instanceof"](Type);
    });
    return it('should have the new types', function() {
      return subject['Str'].should.be.an["instanceof"](Type);
    });
  });
  return describe("when the new system does make cross-references", function() {
    var subject;
    subject = system.parse('Int = Num( i | i >= 0 )');
    it('should return another System', function() {
      subject.should.be.an["instanceof"](System);
      return subject.should.not.equal(system);
    });
    return it('should have the new types', function() {
      return subject['Int'].should.be.an["instanceof"](Type);
    });
  });
});


},{"../../../lib/errors":2,"../../../lib/qjs":3,"../../../lib/system":11,"../../../lib/type":12,"should":22}],57:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/ad_type":13,"should":22}],58:[function(require,module,exports){
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


},{"../../../../lib/type/ad_type":13,"should":22}],59:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/ad_type":13,"should":22}],60:[function(require,module,exports){
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


},{"../../../../lib/type/ad_type":13,"should":22}],61:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/ad_type":13,"should":22}],62:[function(require,module,exports){
var AnyType, should;

AnyType = require('../../../../lib/type/any_type');

should = require('should');

describe("AnyType#constructor", function() {
  var type;
  type = new AnyType;
  return it('should create an AnyType instance', function() {
    return type.should.be.an["instanceof"](AnyType);
  });
});


},{"../../../../lib/type/any_type":14,"should":22}],63:[function(require,module,exports){
var AnyType, should;

AnyType = require('../../../../lib/type/any_type');

should = require('should');

describe('AnyType#defaultName', function() {
  var type;
  type = new AnyType("any");
  return it('has a default name', function() {
    return type.defaultName().should.equal("Any");
  });
});


},{"../../../../lib/type/any_type":14,"should":22}],64:[function(require,module,exports){
var AnyType, TypeError, should;

AnyType = require('../../../../lib/type/any_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require("should");

describe("AnyType#dress", function() {
  var subject, type;
  type = new AnyType('any');
  subject = function(arg) {
    return type.dress(arg);
  };
  describe('with a Number', function() {
    return subject(42).should.equal(42);
  });
  describe('with a String', function() {
    return subject("foo").should.equal("foo");
  });
  describe('with null', function() {
    var res;
    res = subject(null);
    return should(res).eql(null);
  });
  return describe('with undefined', function() {
    var res;
    res = subject(void 0);
    return should(res).eql(void 0);
  });
});


},{"../../../../lib/errors":2,"../../../../lib/type/any_type":14,"should":22}],65:[function(require,module,exports){
var AnyType, should;

AnyType = require('../../../../lib/type/any_type');

should = require('should');

describe('AnyType#equals', function() {
  var anyType1, anyType2;
  anyType1 = new AnyType();
  anyType2 = new AnyType();
  it('should apply structural equality', function() {
    return anyType1.equals(anyType2).should.be["true"];
  });
  return it('should be a total function, with null for non types', function() {
    return anyType1.equals(12).should.be["false"];
  });
});


},{"../../../../lib/type/any_type":14,"should":22}],66:[function(require,module,exports){
var AnyType, TypeError, should, _;

AnyType = require('../../../../lib/type/any_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

_ = require('underscore');

describe("AnyType#include", function() {
  var subject, type;
  type = new AnyType;
  subject = function(arg) {
    return type.include(arg);
  };
  return describe('in any case', function() {
    var cases;
    cases = [
      null, void 0, 42, 3.14, "foo", false, true, {
        'foo': 'bar'
      }, [12]
    ];
    return it('should return true', function() {
      var allpass;
      allpass = _.every(cases, function(val) {
        return subject(val).should.be["true"];
      });
      return allpass.should.be["true"];
    });
  });
});


},{"../../../../lib/errors":2,"../../../../lib/type/any_type":14,"should":22,"underscore":22}],67:[function(require,module,exports){
var AnyType, TypeError, should;

AnyType = require('../../../../lib/type/any_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe('AnyType#name', function() {
  var nameOf;
  nameOf = function(type) {
    return type.name;
  };
  describe('when not provided', function() {
    var subject;
    subject = nameOf(new AnyType);
    return it('uses the default name', function() {
      return subject.should.equal("Any");
    });
  });
  return describe('when provided', function() {
    var subject;
    subject = nameOf(new AnyType("anytype"));
    return it('uses the specified name', function() {
      return subject.should.equal("anytype");
    });
  });
});


},{"../../../../lib/errors":2,"../../../../lib/type/any_type":14,"should":22}],68:[function(require,module,exports){
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


},{"../../../../lib/type/builtin_type":15,"should":22}],69:[function(require,module,exports){
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


},{"../../../../lib/type/builtin_type":15,"should":22}],70:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/builtin_type":15}],71:[function(require,module,exports){
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


},{"../../../../lib/type/builtin_type":15,"should":22}],72:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/builtin_type":15,"should":22}],73:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/builtin_type":15,"should":22}],74:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/relation_type":16,"should":22}],75:[function(require,module,exports){
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


},{"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/relation_type":16,"should":22}],76:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/relation_type":16,"should":22,"underscore":22}],77:[function(require,module,exports){
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


},{"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/relation_type":16,"should":22}],78:[function(require,module,exports){
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


},{"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/relation_type":16,"should":22}],79:[function(require,module,exports){
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


},{"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/relation_type":16,"should":22}],80:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/seq_type":17,"should":22,"underscore":22}],81:[function(require,module,exports){
var SeqType, should;

SeqType = require('../../../../lib/type/seq_type');

should = require('should');

describe("SeqType#defaultName", function() {
  var subject, type;
  type = new SeqType(intType, "foo");
  subject = type.defaultName();
  return subject.should.equal('[intType]');
});


},{"../../../../lib/type/seq_type":17,"should":22}],82:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/seq_type":17,"should":22,"underscore":22}],83:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/seq_type":17,"should":22,"underscore":22}],84:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/seq_type":17,"should":22,"underscore":22}],85:[function(require,module,exports){
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


},{"../../../../lib/type/seq_type":17,"should":22,"underscore":22}],86:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/set_type":18,"should":22,"underscore":22}],87:[function(require,module,exports){
var SetType, should;

SetType = require('../../../../lib/type/set_type');

should = require('should');

describe("SetType#defaultName", function() {
  var subject, type;
  type = new SetType(intType, "foo");
  subject = type.defaultName();
  return subject.should.equal('{intType}');
});


},{"../../../../lib/type/set_type":18,"should":22}],88:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/set_type":18,"should":22,"underscore":22}],89:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/set_type":18,"should":22,"underscore":22}],90:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/set_type":18,"should":22,"underscore":22}],91:[function(require,module,exports){
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


},{"../../../../lib/type/set_type":18,"should":22,"underscore":22}],92:[function(require,module,exports){
var Constraint, SubType, should, _;

Constraint = require('../../../../lib/support/constraint');

SubType = require('../../../../lib/type/sub_type');

should = require('should');

_ = require('underscore');

describe("SubType#constructor", function() {
  var c1, c2, sub;
  c1 = new Constraint('a', function(i) {
    return i > 0;
  });
  c2 = new Constraint('b', function(i) {
    return i < 255;
  });
  sub = new SubType(numType, [c1, c2]);
  return it('sets the variable instances', function() {
    sub.superType.should.equal(numType);
    return _.isEqual(sub.constraints, [c1, c2]).should.be["true"];
  });
});


},{"../../../../lib/support/constraint":6,"../../../../lib/type/sub_type":19,"should":22,"underscore":22}],93:[function(require,module,exports){
var Constraint, SubType, should;

Constraint = require('../../../../lib/support/constraint');

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe('SubType#defaultName', function() {
  var type;
  type = new SubType(numType, [new Constraint('posint', function(i) {})]);
  return it('uses the first constraint name', function() {
    return type.defaultName().should.equal("Posint");
  });
});


},{"../../../../lib/support/constraint":6,"../../../../lib/type/sub_type":19,"should":22}],94:[function(require,module,exports){
var Constraint, SubType, TypeError, should;

Constraint = require('../../../../lib/support/constraint');

SubType = require('../../../../lib/type/sub_type');

TypeError = require('../../../../lib/errors').TypeError;

should = require('should');

describe("SubType#dress", function() {
  var factor, type, _default, _small;
  _default = new Constraint('default', function(i) {
    return i > 0;
  });
  _small = new Constraint('small', function(i) {
    return i < 255;
  });
  type = new SubType(numType, [_default, _small], "byte");
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


},{"../../../../lib/errors":2,"../../../../lib/support/constraint":6,"../../../../lib/type/sub_type":19,"should":22}],95:[function(require,module,exports){
var Constraint, SubType, should;

Constraint = require('../../../../lib/support/constraint');

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe('SubType#equals', function() {
  var c1, c2, c3, fn1, fn2, type, type2, type3, type4, type5;
  fn1 = function(i) {
    return i > 0;
  };
  fn2 = function(i) {
    return i < 255;
  };
  c1 = new Constraint('default', fn1);
  c2 = new Constraint('anothername', fn1);
  c3 = new Constraint('small', fn2);
  type = new SubType(numType, [c1]);
  type2 = new SubType(numType, [c1]);
  type3 = new SubType(numType, [c2]);
  type4 = new SubType(numType, [c3]);
  type5 = new SubType(stringType, [c1]);
  it('should apply structural equivalence', function() {
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


},{"../../../../lib/support/constraint":6,"../../../../lib/type/sub_type":19,"should":22}],96:[function(require,module,exports){
var Constraint, SubType, should;

Constraint = require('../../../../lib/support/constraint');

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe("SubType#include", function() {
  var subject, type;
  type = new SubType(intType, [
    new Constraint('default', function(i) {
      return i > 0;
    }), new Constraint('small', function(i) {
      return i < 255;
    })
  ], "byte");
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


},{"../../../../lib/support/constraint":6,"../../../../lib/type/sub_type":19,"should":22}],97:[function(require,module,exports){
var Constraint, SubType, should;

Constraint = require('../../../../lib/support/constraint');

SubType = require('../../../../lib/type/sub_type');

should = require('should');

describe("SubType#name", function() {
  var get;
  get = function(type) {
    return type.name;
  };
  describe('when provided', function() {
    var subject;
    subject = get(new SubType(numType, [
      new Constraint("default", function(i) {
        return true;
      })
    ], "Foo"));
    return it('uses the specified one', function() {
      return subject.should.equal("Foo");
    });
  });
  return describe('when not provided', function() {
    var subject;
    subject = get(new SubType(numType, [new Constraint('byte', function(i) {})]));
    return it('uses the first constraint name', function() {
      return subject.should.equal("Byte");
    });
  });
});


},{"../../../../lib/support/constraint":6,"../../../../lib/type/sub_type":19,"should":22}],98:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/tuple_type":20,"should":22}],99:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/tuple_type":20,"should":22}],100:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/tuple_type":20,"should":22,"underscore":22}],101:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/tuple_type":20,"should":22}],102:[function(require,module,exports){
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


},{"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/tuple_type":20,"should":22}],103:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/support/attribute":4,"../../../../lib/support/heading":9,"../../../../lib/type/tuple_type":20,"should":22}],104:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/union_type":21,"should":22,"underscore":22}],105:[function(require,module,exports){
var UnionType, should;

UnionType = require('../../../../lib/type/union_type');

should = require('should');

describe("UnionType#defaultName", function() {
  var type;
  type = new UnionType([intType, floatType]);
  return type.defaultName().should.equal('intType|floatType');
});


},{"../../../../lib/type/union_type":21,"should":22}],106:[function(require,module,exports){
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


},{"../../../../lib/errors":2,"../../../../lib/type/union_type":21,"should":22}],107:[function(require,module,exports){
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


},{"../../../../lib/type/union_type":21,"should":22}],108:[function(require,module,exports){
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


},{"../../../../lib/type/union_type":21,"should":22}],109:[function(require,module,exports){
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


},{"../../../../lib/type/union_type":21,"should":22}],110:[function(require,module,exports){
var AnyType, TypeFactory, should;

TypeFactory = require('../../../../lib/support/factory');

AnyType = require('../../../../lib/type/any_type');

should = require('should');

describe("TypeFactory#any", function() {
  var expected, factory;
  factory = new TypeFactory;
  expected = new AnyType;
  describe('when called', function() {
    var subject;
    subject = factory.any();
    return it('should give expected result', function() {
      return subject.equals(expected).should.be["true"];
    });
  });
  return describe('when called with a name', function() {
    var subject;
    subject = factory.any("MyAny");
    it('should give expected result', function() {
      return subject.equals(expected).should.be["true"];
    });
    return it('should have the correct name', function() {
      return subject.name.should.equal("MyAny");
    });
  });
});


},{"../../../../lib/support/factory":8,"../../../../lib/type/any_type":14,"should":22}],111:[function(require,module,exports){
var Attribute, BuiltinType, TypeFactory, should;

Attribute = require('../../../../lib/support/attribute');

TypeFactory = require('../../../../lib/support/factory');

BuiltinType = require('../../../../lib/type/builtin_type');

should = require('should');

describe('TypeFactory#attribute', function() {
  var factory;
  factory = new TypeFactory;
  describe('when used with a name and a JS class', function() {
    var subject;
    subject = factory.attribute('foo', Number);
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Attribute);
      subject.name.should.equal('foo');
      return subject.type.should.be.an["instanceof"](BuiltinType);
    });
  });
  return describe('when used with a name and a BuiltinType', function() {
    var subject;
    subject = factory.attribute('foo', intType);
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Attribute);
      subject.name.should.equal('foo');
      return subject.type.should.equal(intType);
    });
  });
});


},{"../../../../lib/support/attribute":4,"../../../../lib/support/factory":8,"../../../../lib/type/builtin_type":15,"should":22}],112:[function(require,module,exports){
var Attribute, BuiltinType, TypeFactory, should, _;

Attribute = require('../../../../lib/support/attribute');

TypeFactory = require('../../../../lib/support/factory');

BuiltinType = require('../../../../lib/type/builtin_type');

should = require('should');

_ = require('underscore');

describe('TypeFactory#attributes', function() {
  var factory;
  factory = new TypeFactory;
  return describe('when used with a name and a JS class', function() {
    var subject;
    subject = factory.attributes({
      foo: Number,
      bar: String
    });
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Array);
      return _.each(subject, function(arg) {
        return arg.should.be.an["instanceof"](Attribute);
      });
    });
  });
});


},{"../../../../lib/support/attribute":4,"../../../../lib/support/factory":8,"../../../../lib/type/builtin_type":15,"should":22,"underscore":22}],113:[function(require,module,exports){
var TypeFactory, should;

TypeFactory = require('../../../../lib/support/factory');

should = require('should');

describe('TypeFactory#builtin', function() {
  var factory;
  factory = new TypeFactory;
  describe('when used with a JS class', function() {
    var subject;
    subject = factory.type(Number);
    return it('should work as expected', function() {
      return subject.equals(numType).should.be["true"];
    });
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


},{"../../../../lib/support/factory":8,"should":22}],114:[function(require,module,exports){
var Constraint, TypeFactory, should;

Constraint = require('../../../../lib/support/constraint');

TypeFactory = require('../../../../lib/support/factory');

should = require('should');

describe('TypeFactory#constraint', function() {
  var factory;
  factory = new TypeFactory;
  describe('with a callback', function() {
    var subject;
    subject = factory.constraint(function(i) {
      return i > 0;
    });
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Constraint);
      subject.name.should.equal('default');
      subject.accept(12).should.be["true"];
      return subject.accept(-12).should.be["false"];
    });
  });
  describe('with only a function', function() {
    var subject;
    subject = factory.constraint(function(i) {
      return i > 0;
    });
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Constraint);
      subject.name.should.equal('default');
      subject.accept(12).should.be["true"];
      return subject.accept(-12).should.be["false"];
    });
  });
  describe('with a name and a function', function() {
    var subject;
    subject = factory.constraint('positive', function(i) {
      return i > 0;
    });
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Constraint);
      subject.name.should.equal('positive');
      subject.accept(12).should.be["true"];
      return subject.accept(-12).should.be["false"];
    });
  });
  describe('with only a regexp', function() {
    var subject;
    subject = factory.constraint(/[a-z]+/);
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Constraint);
      subject.name.should.equal('default');
      subject.accept("12").should.be["false"];
      return subject.accept("word").should.be["true"];
    });
  });
  return describe('with a constraint', function() {
    var c, subject;
    c = new Constraint('def', function(i) {
      return i > 0;
    });
    subject = factory.constraint(c);
    return it('should work as expected', function() {
      return subject.should.equal(c);
    });
  });
});


},{"../../../../lib/support/constraint":6,"../../../../lib/support/factory":8,"should":22}],115:[function(require,module,exports){
var Constraint, TypeFactory, should;

Constraint = require('../../../../lib/support/constraint');

TypeFactory = require('../../../../lib/support/factory');

should = require('should');

describe('TypeFactory#constraints', function() {
  var factory;
  factory = new TypeFactory;
  describe('with a callback', function() {
    var subject;
    subject = factory.constraints(function(i) {
      return i > 0;
    });
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Array);
      subject.length.should.equal(1);
      return subject[0].should.be.an["instanceof"](Constraint);
    });
  });
  return describe('with a regexp', function() {
    var regexp, subject;
    regexp = /[a-z]/;
    subject = factory.constraints(regexp);
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Array);
      subject.length.should.equal(1);
      return subject[0].should.be.an["instanceof"](Constraint);
    });
  });
});


},{"../../../../lib/support/constraint":6,"../../../../lib/support/factory":8,"should":22}],116:[function(require,module,exports){
var Attribute, BuiltinType, Heading, TypeFactory, should, _;

Attribute = require('../../../../lib/support/attribute');

Heading = require('../../../../lib/support/heading');

TypeFactory = require('../../../../lib/support/factory');

BuiltinType = require('../../../../lib/type/builtin_type');

should = require('should');

_ = require('underscore');

describe('TypeFactory#heading', function() {
  var attributes, bar, expected, factory, foo;
  factory = new TypeFactory;
  foo = factory.attribute('foo', Number);
  bar = factory.attribute('bar', String);
  attributes = [foo, bar];
  expected = new Heading(attributes);
  describe('when used with an array of attributes', function() {
    var subject;
    subject = factory.heading(attributes);
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Heading);
      return subject.equals(expected).should.be["true"];
    });
  });
  return describe('when used with an object name => native', function() {
    var subject;
    subject = factory.heading({
      foo: Number,
      bar: String
    });
    return it('should work as expected', function() {
      subject.should.be.an["instanceof"](Heading);
      return subject.equals(expected).should.be["true"];
    });
  });
});


},{"../../../../lib/support/attribute":4,"../../../../lib/support/factory":8,"../../../../lib/support/heading":9,"../../../../lib/type/builtin_type":15,"should":22,"underscore":22}],117:[function(require,module,exports){
var TypeFactory, should;

TypeFactory = require('../../../../lib/support/factory');

should = require('should');

describe('TypeFactory#jsType', function() {
  var factory;
  factory = new TypeFactory;
  describe('when used with a JS class', function() {
    var subject;
    subject = factory.jsType(Number);
    return it('should work as expected', function() {
      return subject.should.equal(Number);
    });
  });
  return describe('when used with a JS class name', function() {
    var subject;
    subject = factory.jsType('Number');
    return it('should work as expected', function() {
      return subject.should.equal(Number);
    });
  });
});


},{"../../../../lib/support/factory":8,"should":22}],118:[function(require,module,exports){
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


},{"../../../../lib/support/factory":8,"../../../../lib/type/seq_type":17,"should":22}],119:[function(require,module,exports){
var BuiltinType, Constraint, SubType, TypeError, TypeFactory, numType, should;

TypeFactory = require('../../../../lib/support/factory');

Constraint = require('../../../../lib/support/constraint');

TypeError = require('../../../../lib/errors').TypeError;

BuiltinType = require('../../../../lib/type/builtin_type');

SubType = require('../../../../lib/type/sub_type');

numType = require('../../spec_helpers').numType;

should = require('should');

describe('TypeFactory#sub_type', function() {
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
  describe('when used with a regexp', function() {
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
  return describe('when used with a super type and an array of constraints', function() {
    var subject;
    subject = factory.sub_type(numType, [
      new Constraint('foo', function(i) {
        return i > 0;
      })
    ]);
    it('should be a subtype', function() {
      return subject.should.be.an["instanceof"](SubType);
    });
    return it('should have the correct constraints', function() {
      subject.constraints.length.should.equal(1);
      subject.constraints[0].should.be.an["instanceof"](Constraint);
      subject.constraints[0].accept(12).should.be["true"];
      return subject.constraints[0].accept(-12).should.be["false"];
    });
  });
});


},{"../../../../lib/errors":2,"../../../../lib/support/constraint":6,"../../../../lib/support/factory":8,"../../../../lib/type/builtin_type":15,"../../../../lib/type/sub_type":19,"../../spec_helpers":36,"should":22}],120:[function(require,module,exports){
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


},{"../../../../lib/support/factory":8,"../../../../lib/type/tuple_type":20,"should":22}],121:[function(require,module,exports){
var BuiltinType, TypeError, TypeFactory, UnionType, numType, should;

TypeFactory = require('../../../../lib/support/factory');

TypeError = require('../../../../lib/errors').TypeError;

BuiltinType = require('../../../../lib/type/builtin_type');

UnionType = require('../../../../lib/type/union_type');

numType = require('../../spec_helpers').numType;

should = require('should');

describe('TypeFactory#union', function() {
  var factory;
  factory = new TypeFactory;
  return describe('when used with an array of types', function() {
    var subject;
    subject = factory.union([factory.builtin(Number), factory.builtin(String)]);
    return it('should be a UnionType', function() {
      return subject.should.be.an["instanceof"](UnionType);
    });
  });
});


},{"../../../../lib/errors":2,"../../../../lib/support/factory":8,"../../../../lib/type/builtin_type":15,"../../../../lib/type/union_type":21,"../../spec_helpers":36,"should":22}]},{},[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121])